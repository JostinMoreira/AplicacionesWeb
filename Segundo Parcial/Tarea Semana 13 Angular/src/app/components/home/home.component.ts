import { Component, OnInit } from "@angular/core"
import { UsuarioService } from "../../services/usuario.service"
import { PublicacionService } from "../../services/publicacion.service"
import { IPublicacion } from "../../models/publicacion.interface"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  totalUsuarios = 0
  totalPublicaciones = 0
  publicacionesRecientes: IPublicacion[] = []
  usuariosActivos = 0

  constructor(
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionService,
  ) {}

  ngOnInit(): void {
    this.cargarEstadisticas()
  }

  private cargarEstadisticas(): void {
    // Cargar estadísticas de usuarios
    this.usuarioService.obtenerUsuarios().subscribe((usuarios) => {
      this.totalUsuarios = usuarios.length
      this.usuariosActivos = usuarios.filter((u) => u.activo).length
    })

    // Cargar estadísticas de publicaciones
    this.publicacionService.obtenerPublicaciones().subscribe((publicaciones) => {
      this.totalPublicaciones = publicaciones.length
      // Obtener las 3 publicaciones más recientes
      this.publicacionesRecientes = publicaciones
        .sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
        .slice(0, 3)
    })
  }

  getEstadoTexto(estado: string): string {
    const estados: { [key: string]: string } = {
      pendiente: "⏳ Pendiente",
      en_revision: "👀 En Revisión",
      resuelta: "✅ Resuelta",
      rechazada: "❌ Rechazada",
    }
    return estados[estado] || estado
  }
}