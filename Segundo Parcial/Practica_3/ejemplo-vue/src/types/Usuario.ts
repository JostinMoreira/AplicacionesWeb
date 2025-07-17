export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  carrera: string;
  rol: 'estudiante' | 'administrador';
}