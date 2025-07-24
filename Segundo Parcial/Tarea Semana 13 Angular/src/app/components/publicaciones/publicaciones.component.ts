import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { PublicacionService } from "../../services/publicacion.service"
import { UsuarioService } from "../../services/usuario.service"
import { IPublicacion } from "../../models/publicacion.interface"
import { IUsuario } from "../../models/usuario.interface"

@Component({
  selector: "app-publicaciones",
  templateUrl: "./publicaciones.component.html",
  styleUrls: ["./publicaciones.component.css"],
})
export class PublicacionesComponent implements OnInit {
  publicaciones: IPublicacion[] = []
  usuarios: IUsuario[] = []
  publicacionForm: FormGroup
  editandoPublicacion: IPublicacion | null = null
  mostrarFormulario = false

  categorias = [
    "Servicios Académicos",
    "Servicios Estudiantiles",
    "Infraestructura",
    "Tecnología",
    "Biblioteca",
    "Deportes",
    "Cultura",
    "Administrativo",
    "Otros",
  ]

  tipos = [
    { value: "queja", label: "⚠️ Queja" },
    { value: "idea", label: "💡 Idea" },
  ]

  estados = [
    { value: "pendiente", label: "⏳ Pendiente" },
    { value: "en_revision", label: "👀 En Revisión" },
    { value: "resuelta", label: "✅ Resuelta" },
    { value: "rechazada", label: "❌ Rechazada" },
  ]

  prioridades = [
    { value: "baja", label: "🟢 Baja" },
    { value: "media", label: "🟡 Media" },
    { value: "alta", label: "🔴 Alta" },
  ]

  constructor(
    private publicacionService: PublicacionService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
  ) {
    this.publicacionForm = this.fb.group({
      titulo: ["", [Validators.required, Validators.minLength(5)]],
      contenido: ["", [Validators.required, Validators.minLength(10)]],
      tipo: ["", Validators.required],
      categoria: ["", Validators.required],
      usuarioId: ["", Validators.required],
      estado: ["pendiente", Validators.required],
      prioridad: ["media", Validators.required],
    })
  }

  ngOnInit(): void {
    this.cargarPublicaciones()
    this.cargarUsuarios()
  }

  cargarPublicaciones(): void {
    this.publicacionService.obtenerPublicaciones().subscribe((publicaciones) => {
      this.publicaciones = publicaciones.sort(
        (a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime(),
      )
    })
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios.filter((u) => u.activo)
    })
  }

  mostrarFormularioNuevo(): void {
    this.editandoPublicacion = null
    this.publicacionForm.reset({
      titulo: "",
      contenido: "",
      tipo: "",
      categoria: "",
      usuarioId: "",
      estado: "pendiente",
      prioridad: "media",
    })
    this.mostrarFormulario = true
  }

  editarPublicacion(publicacion: IPublicacion): void {
    this.editandoPublicacion = publicacion
    this.publicacionForm.patchValue({
      titulo: publicacion.titulo,
      contenido: publicacion.contenido,
      tipo: publicacion.tipo,
      categoria: publicacion.categoria,
      usuarioId: publicacion.usuarioId,
      estado: publicacion.estado,
      prioridad: publicacion.prioridad,
    })
    this.mostrarFormulario = true
  }

  guardarPublicacion(): void {
    if (this.publicacionForm.valid) {
      const datosPublicacion = this.publicacionForm.value
      const usuario = this.usuarios.find((u) => u.id == datosPublicacion.usuarioId)

      if (usuario) {
        const publicacionData = {
          ...datosPublicacion,
          usuarioNombre: `${usuario.nombre} ${usuario.apellido}`,
        }

        if (this.editandoPublicacion) {
          // Actualizar publicación existente
          const publicacionActualizada: IPublicacion = {
            ...this.editandoPublicacion,
            ...publicacionData,
          }
          this.publicacionService.actualizarPublicacion(publicacionActualizada)
        } else {
          // Crear nueva publicación
          this.publicacionService.agregarPublicacion(publicacionData)
        }

        this.cancelarEdicion()
      }
    }
  }

  eliminarPublicacion(id: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
      this.publicacionService.eliminarPublicacion(id)
    }
  }

  cancelarEdicion(): void {
    this.mostrarFormulario = false
    this.editandoPublicacion = null
    this.publicacionForm.reset()
  }

  getErrorMessage(campo: string): string {
    const control = this.publicacionForm.get(campo)
    if (control?.errors && control.touched) {
      if (control.errors["required"]) {
        return `${campo} es requerido`
      }
      if (control.errors["minlength"]) {
        return `${campo} debe tener al menos ${control.errors["minlength"].requiredLength} caracteres`
      }
    }
    return ""
  }

  getEstadoTexto(estado: string): string {
    const estadoObj = this.estados.find((e) => e.value === estado)
    return estadoObj ? estadoObj.label : estado
  }

  getTipoTexto(tipo: string): string {
    const tipoObj = this.tipos.find((t) => t.value === tipo)
    return tipoObj ? tipoObj.label : tipo
  }

  getPrioridadTexto(prioridad: string): string {
    const prioridadObj = this.prioridades.find((p) => p.value === prioridad)
    return prioridadObj ? prioridadObj.label : prioridad
  }
}