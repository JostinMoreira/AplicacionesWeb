import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { IUsuario } from "../models/usuario.interface"

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private usuariosSubject = new BehaviorSubject<IUsuario[]>([
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan.perez@universidad.edu",
      carrera: "Ingeniería en Sistemas",
      semestre: 6,
      fechaRegistro: new Date("2023-01-15"),
      activo: true,
    },
    {
      id: 2,
      nombre: "María",
      apellido: "González",
      email: "maria.gonzalez@universidad.edu",
      carrera: "Administración de Empresas",
      semestre: 4,
      fechaRegistro: new Date("2023-03-20"),
      activo: true,
    },
    {
      id: 3,
      nombre: "Carlos",
      apellido: "Rodríguez",
      email: "carlos.rodriguez@universidad.edu",
      carrera: "Derecho",
      semestre: 8,
      fechaRegistro: new Date("2022-08-10"),
      activo: false,
    },
  ])

  private nextId = 4

  constructor() {}

  obtenerUsuarios(): Observable<IUsuario[]> {
    return this.usuariosSubject.asObservable()
  }

  obtenerUsuarioPorId(id: number): IUsuario | undefined {
    return this.usuariosSubject.value.find((usuario) => usuario.id === id)
  }

  agregarUsuario(usuario: Omit<IUsuario, "id" | "fechaRegistro">): void {
    const nuevoUsuario: IUsuario = {
      ...usuario,
      id: this.nextId++,
      fechaRegistro: new Date(),
    }

    const usuariosActuales = this.usuariosSubject.value
    this.usuariosSubject.next([...usuariosActuales, nuevoUsuario])
  }

  actualizarUsuario(usuarioActualizado: IUsuario): void {
    const usuariosActuales = this.usuariosSubject.value
    const index = usuariosActuales.findIndex((u) => u.id === usuarioActualizado.id)

    if (index !== -1) {
      usuariosActuales[index] = usuarioActualizado
      this.usuariosSubject.next([...usuariosActuales])
    }
  }

  eliminarUsuario(id: number): void {
    const usuariosActuales = this.usuariosSubject.value
    const usuariosFiltrados = usuariosActuales.filter((u) => u.id !== id)
    this.usuariosSubject.next(usuariosFiltrados)
  }
}
