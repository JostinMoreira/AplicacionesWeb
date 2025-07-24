import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { UsuarioService } from "../../services/usuario.service"
import { IUsuario } from "../../models/usuario.interface"

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {
  usuarios: IUsuario[] = []
  usuarioForm: FormGroup
  editandoUsuario: IUsuario | null = null
  mostrarFormulario = false

  carreras = [
    "Ingeniería en Sistemas",
    "Administración de Empresas",
    "Derecho",
    "Medicina",
    "Psicología",
    "Arquitectura",
    "Contabilidad",
    "Marketing",
  ]

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      apellido: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      carrera: ["", Validators.required],
      semestre: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      activo: [true],
    })
  }

  ngOnInit(): void {
    this.cargarUsuarios()
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios
    })
  }

  mostrarFormularioNuevo(): void {
    this.editandoUsuario = null
    this.usuarioForm.reset({
      nombre: "",
      apellido: "",
      email: "",
      carrera: "",
      semestre: 1,
      activo: true,
    })
    this.mostrarFormulario = true
  }

  editarUsuario(usuario: IUsuario): void {
    this.editandoUsuario = usuario
    this.usuarioForm.patchValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      carrera: usuario.carrera,
      semestre: usuario.semestre,
      activo: usuario.activo,
    })
    this.mostrarFormulario = true
  }

  guardarUsuario(): void {
    if (this.usuarioForm.valid) {
      const datosUsuario = this.usuarioForm.value

      if (this.editandoUsuario) {
        // Actualizar usuario existente
        const usuarioActualizado: IUsuario = {
          ...this.editandoUsuario,
          ...datosUsuario,
        }
        this.usuarioService.actualizarUsuario(usuarioActualizado)
      } else {
        // Crear nuevo usuario
        this.usuarioService.agregarUsuario(datosUsuario)
      }

      this.cancelarEdicion()
    }
  }

  eliminarUsuario(id: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      this.usuarioService.eliminarUsuario(id)
    }
  }

  cancelarEdicion(): void {
    this.mostrarFormulario = false
    this.editandoUsuario = null
    this.usuarioForm.reset()
  }

  getErrorMessage(campo: string): string {
    const control = this.usuarioForm.get(campo)
    if (control?.errors && control.touched) {
      if (control.errors["required"]) {
        return `${campo} es requerido`
      }
      if (control.errors["email"]) {
        return "Email no válido"
      }
      if (control.errors["minlength"]) {
        return `${campo} debe tener al menos ${control.errors["minlength"].requiredLength} caracteres`
      }
      if (control.errors["min"]) {
        return `${campo} debe ser mayor a ${control.errors["min"].min}`
      }
      if (control.errors["max"]) {
        return `${campo} debe ser menor a ${control.errors["max"].max}`
      }
    }
    return ""
  }
}