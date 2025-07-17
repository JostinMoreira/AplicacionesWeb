export interface Publicacion {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  usuarioId: number;
  tipo: 'idea' | 'queja' | 'opinion';
}