import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import type { IPublicacion } from "../models/publicacion.interface"

@Injectable({
  providedIn: "root",
})
export class PublicacionService {
  private publicacionesSubject = new BehaviorSubject<IPublicacion[]>([
    {
      id: 1,
      titulo: "Problema con el sistema de biblioteca",
      contenido:
        "El sistema de préstamos de libros está presentando fallas constantes, no permite renovar los préstamos.",
      tipo: "queja",
      categoria: "Servicios Académicos",
      usuarioId: 1,
      usuarioNombre: "Juan Pérez",
      fechaCreacion: new Date("2024-01-15"),
      estado: "pendiente",
      prioridad: "alta",
    },
    {
      id: 2,
      titulo: "Propuesta para mejorar la cafetería",
      contenido: "Sería excelente tener más opciones vegetarianas en el menú de la cafetería universitaria.",
      tipo: "idea",
      categoria: "Servicios Estudiantiles",
      usuarioId: 2,
      usuarioNombre: "María González",
      fechaCreacion: new Date("2024-01-20"),
      estado: "en_revision",
      prioridad: "media",
    },
    {
      id: 3,
      titulo: "Falta de mantenimiento en aulas",
      contenido:
        "Las aulas del edificio B necesitan mantenimiento urgente, hay problemas con la iluminación y ventilación.",
      tipo: "queja",
      categoria: "Infraestructura",
      usuarioId: 3,
      usuarioNombre: "Carlos Rodríguez",
      fechaCreacion: new Date("2024-01-10"),
      estado: "resuelta",
      prioridad: "alta",
    },
  ])

  private nextId = 4

  constructor() {}

  obtenerPublicaciones(): Observable<IPublicacion[]> {
    return this.publicacionesSubject.asObservable()
  }

  obtenerPublicacionPorId(id: number): IPublicacion | undefined {
    return this.publicacionesSubject.value.find((publicacion) => publicacion.id === id)
  }

  agregarPublicacion(publicacion: Omit<IPublicacion, "id" | "fechaCreacion">): void {
    const nuevaPublicacion: IPublicacion = {
      ...publicacion,
      id: this.nextId++,
      fechaCreacion: new Date(),
    }

    const publicacionesActuales = this.publicacionesSubject.value
    this.publicacionesSubject.next([...publicacionesActuales, nuevaPublicacion])
  }

  actualizarPublicacion(publicacionActualizada: IPublicacion): void {
    const publicacionesActuales = this.publicacionesSubject.value
    const index = publicacionesActuales.findIndex((p) => p.id === publicacionActualizada.id)

    if (index !== -1) {
      publicacionesActuales[index] = publicacionActualizada
      this.publicacionesSubject.next([...publicacionesActuales])
    }
  }

  eliminarPublicacion(id: number): void {
    const publicacionesActuales = this.publicacionesSubject.value
    const publicacionesFiltradas = publicacionesActuales.filter((p) => p.id !== id)
    this.publicacionesSubject.next(publicacionesFiltradas)
  }
}
