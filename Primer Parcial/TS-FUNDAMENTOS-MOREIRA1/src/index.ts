// index.ts

// 1. Tipos básicos
const nombreUsuario: string = "Juan Pérez";
const edadUsuario: number = 22;
const esAutoridad: boolean = false;
const categoriaComentario: string = "Infraestructura";
const cantidadComentarios: number = 10;

// 2. Interfaces
type Identificador = string | number;
type EstadoComentario = "Pendiente" | "En revisión" | "Implementado";

interface Usuario {
  id: number;
  nombre: string;
  edad: number;
  correo: string;
  esAutoridad: boolean;
}

interface Comentario {
  id: number;
  autor: Usuario;
  contenido: string;
  categoria: Categoria;
  fecha: string;
  estado: EstadoComentario;
}

interface Categoria {
  readonly id: number;
  nombre: string;
}

// 3. Clases
class UsuarioImpl implements Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public edad: number,
    public correo: string,
    public esAutoridad: boolean
  ) {}

  validarEdad(): boolean {
    return this.edad >= 18;
  }
}

class CategoriaImpl implements Categoria {
  constructor(
    public readonly id: number,
    public nombre: string
  ) {}
}

class ComentarioImpl implements Comentario {
  constructor(
    public id: number,
    public autor: Usuario,
    public contenido: string,
    public categoria: Categoria,
    public fecha: string,
    public estado: EstadoComentario
  ) {}

  esComentarioValido(): boolean {
    return this.contenido.length > 10;
  }
}

// 4. Arreglos Tipados
const usuarios: Usuario[] = [
  new UsuarioImpl(1, "Ana Martínez", 20, "ana@mail.com", false),
  new UsuarioImpl(2, "Carlos Torres", 23, "carlos@mail.com", false),
  new UsuarioImpl(3, "Laura Mena", 35, "laura@mail.com", true),
  new UsuarioImpl(4, "Esteban Ríos", 21, "esteban@mail.com", false),
  new UsuarioImpl(5, "Marta Ríos", 42, "marta@mail.com", true)
];

const categorias: Categoria[] = [
  new CategoriaImpl(1, "Infraestructura"),
  new CategoriaImpl(2, "Académico"),
  new CategoriaImpl(3, "Administrativo")
];

const comentarios: Comentario[] = [
  new ComentarioImpl(1, usuarios[0], "Sería ideal tener más puntos de reciclaje en la facultad.", categorias[0], new Date().toISOString(), "Pendiente"),
  new ComentarioImpl(2, usuarios[1], "Los proyectores de las aulas necesitan mantenimiento.", categorias[0], new Date().toISOString(), "En revisión"),
  new ComentarioImpl(3, usuarios[3], "Deberíamos tener más opciones de materias optativas.", categorias[1], new Date().toISOString(), "Pendiente"),
  new ComentarioImpl(4, usuarios[0], "Faltan espacios de estudio con aire acondicionado.", categorias[0], new Date().toISOString(), "Implementado"),
  new ComentarioImpl(5, usuarios[1], "El sistema de matrículas necesita mejoras.", categorias[2], new Date().toISOString(), "En revisión"),
  new ComentarioImpl(6, usuarios[3], "Incluir más cursos en línea sería beneficioso.", categorias[1], new Date().toISOString(), "Pendiente")
];

// 5. Funciones Tipadas
function mostrarComentarios(): void {
  console.log("=== COMENTARIOS REGISTRADOS ===");
  comentarios.forEach(c => {
    console.log(`Autor: ${c.autor.nombre} (${c.autor.esAutoridad ? "Autoridad" : "Estudiante"})`);
    console.log(`Categoría: ${c.categoria.nombre}`);
    console.log(`Comentario: ${c.contenido}`);
    console.log(`Estado: ${c.estado}`);
    console.log("--------------------------------------");
  });
}

function contarComentariosPorEstado(estado: EstadoComentario): number {
  return comentarios.filter(c => c.estado === estado).length;
}

function agregarComentario(nuevo: Comentario): void {
  comentarios.push(nuevo);
}

function eliminarComentarioPorId(id: number): void {
  const index = comentarios.findIndex(c => c.id === id);
  if (index !== -1) comentarios.splice(index, 1);
}

// 6. Tipos especiales ya aplicados en interfaces y funciones

// 7. map()
const correosUsuarios = usuarios.map(u => u.correo.toUpperCase());
console.log("Correos de usuarios:", correosUsuarios);

// 8. filter()
const comentariosPendientes = comentarios.filter(c => c.estado === "Pendiente");
console.log("Comentarios pendientes:", comentariosPendientes);

// 9. reduce()
const totalComentarios = comentarios.reduce(acc => acc + 1, 0);
console.log("Total de comentarios:", totalComentarios);

// 10. Relaciones entre entidades
const sistema = {
  usuarios,
  categorias,
  comentarios
};

// 11. Operación de negocio
function resumenComentario(idComentario: number): void {
  const comentario = comentarios.find(c => c.id === idComentario);
  if (comentario) {
    console.log(`Resumen del Comentario:`);
    console.log(`Autor: ${comentario.autor.nombre}`);
    console.log(`Categoría: ${comentario.categoria.nombre}`);
    console.log(`Comentario: ${comentario.contenido}`);
    console.log(`Estado: ${comentario.estado}`);
  }
}

// 12. Imprimir estructuras anidadas
mostrarComentarios();
