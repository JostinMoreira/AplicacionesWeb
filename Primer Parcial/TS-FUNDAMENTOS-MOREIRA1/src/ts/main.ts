// Interfaces y tipos
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

// Clases implementadas
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

// Base de datos
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

let comentarios: Comentario[] = [
  new ComentarioImpl(1, usuarios[0], "Sería ideal tener más puntos de reciclaje en la facultad.", categorias[0], new Date().toISOString(), "Pendiente"),
  new ComentarioImpl(2, usuarios[1], "Los proyectores de las aulas necesitan mantenimiento.", categorias[0], new Date().toISOString(), "En revisión"),
  new ComentarioImpl(3, usuarios[3], "Deberíamos tener más opciones de materias optativas.", categorias[1], new Date().toISOString(), "Pendiente"),
  new ComentarioImpl(4, usuarios[0], "Faltan espacios de estudio con aire acondicionado.", categorias[0], new Date().toISOString(), "Implementado"),
  new ComentarioImpl(5, usuarios[1], "El sistema de matrículas necesita mejoras.", categorias[2], new Date().toISOString(), "En revisión"),
  new ComentarioImpl(6, usuarios[3], "Incluir más cursos en línea sería beneficioso.", categorias[1], new Date().toISOString(), "Pendiente")
];

// Clase principal para manejar la aplicación
class SistemaComentarios {
  private nextId: number = 7;

  constructor() {
    this.inicializar();
  }

  private inicializar(): void {
    this.cargarCategorias();
    this.renderizarUsuarios();
    this.renderizarComentarios();
    this.configurarEventos();
  }

  // 1. VALIDACIONES EN FORMULARIOS
  private configurarEventos(): void {
    const form = document.getElementById('comentarioForm') as HTMLFormElement;
    form.addEventListener('submit', (e) => this.manejarSubmitFormulario(e));

    // Botones de filtro
    document.getElementById('btnTodos')?.addEventListener('click', () => this.filtrarComentarios('todos'));
    document.getElementById('btnPendientes')?.addEventListener('click', () => this.filtrarComentarios('Pendiente'));
    document.getElementById('btnRevision')?.addEventListener('click', () => this.filtrarComentarios('En revisión'));
    document.getElementById('btnImplementados')?.addEventListener('click', () => this.filtrarComentarios('Implementado'));
  }

  private manejarSubmitFormulario(e: Event): void {
    e.preventDefault();

    if (this.validarFormulario()) {
      this.crearNuevoComentario();
      this.limpiarFormulario();
      this.renderizarComentarios();
    }
  }

  private validarFormulario(): boolean {
    let esValido = true;

    // Validar nombre
    const nombre = (document.getElementById('autorNombre') as HTMLInputElement).value.trim();
    if (!nombre || nombre.length < 2) {
      this.mostrarError('errorAutorNombre', 'El nombre debe tener al menos 2 caracteres');
      esValido = false;
    } else {
      this.ocultarError('errorAutorNombre');
    }

    // Validar correo
    const correo = (document.getElementById('autorCorreo') as HTMLInputElement).value.trim();
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !regexCorreo.test(correo)) {
      this.mostrarError('errorAutorCorreo', 'Ingrese un correo electrónico válido');
      esValido = false;
    } else {
      this.ocultarError('errorAutorCorreo');
    }

    // Validar edad
    const edad = parseInt((document.getElementById('autorEdad') as HTMLInputElement).value);
    if (!edad || edad < 16 || edad > 100) {
      this.mostrarError('errorAutorEdad', 'La edad debe estar entre 16 y 100 años');
      esValido = false;
    } else {
      this.ocultarError('errorAutorEdad');
    }

    // Validar contenido
    const contenido = (document.getElementById('contenidoComentario') as HTMLTextAreaElement).value.trim();
    if (!contenido || contenido.length < 10) {
      this.mostrarError('errorContenido', 'El comentario debe tener al menos 10 caracteres');
      esValido = false;
    } else {
      this.ocultarError('errorContenido');
    }

    // Validar categoría
    const categoriaId = (document.getElementById('categoriaSelect') as HTMLSelectElement).value;
    if (!categoriaId) {
      this.mostrarError('errorCategoria', 'Debe seleccionar una categoría');
      esValido = false;
    } else {
      this.ocultarError('errorCategoria');
    }

    return esValido;
  }

  private mostrarError(elementoId: string, mensaje: string): void {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
      elemento.textContent = mensaje;
      elemento.classList.remove('hidden');
    }
  }

  private ocultarError(elementoId: string): void {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
      elemento.classList.add('hidden');
    }
  }

  private crearNuevoComentario(): void {
    const nombre = (document.getElementById('autorNombre') as HTMLInputElement).value.trim();
    const correo = (document.getElementById('autorCorreo') as HTMLInputElement).value.trim();
    const edad = parseInt((document.getElementById('autorEdad') as HTMLInputElement).value);
    const contenido = (document.getElementById('contenidoComentario') as HTMLTextAreaElement).value.trim();
    const categoriaId = parseInt((document.getElementById('categoriaSelect') as HTMLSelectElement).value);

    // Crear nuevo usuario
    const nuevoUsuario = new UsuarioImpl(this.nextId, nombre, edad, correo, false);
    usuarios.push(nuevoUsuario);

    // Encontrar categoría
    const categoria = categorias.find(c => c.id === categoriaId)!;

    // Crear nuevo comentario
    const nuevoComentario = new ComentarioImpl(
      this.nextId,
      nuevoUsuario,
      contenido,
      categoria,
      new Date().toISOString(),
      "Pendiente"
    );

    comentarios.push(nuevoComentario);
    this.nextId++;

    // Re-renderizar usuarios
    this.renderizarUsuarios();
  }

  private limpiarFormulario(): void {
    (document.getElementById('comentarioForm') as HTMLFormElement).reset();
  }

  private cargarCategorias(): void {
    const select = document.getElementById('categoriaSelect') as HTMLSelectElement;
    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.id.toString();
      option.textContent = categoria.nombre;
      select.appendChild(option);
    });
  }

  // 2. CREAR ESTRUCTURA HTML CON TYPESCRIPT 
  private renderizarUsuarios(): void {
    const container = document.getElementById('usuariosContainer');
    if (!container) return;

    // Limpiar contenedor
    container.innerHTML = '';

    usuarios.forEach(usuario => {
      // Crear tarjeta dinámicamente
      const tarjeta = document.createElement('div');
      tarjeta.className = 'bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 hover:shadow-md transition-shadow';

      // Crear elementos internos
      const nombre = document.createElement('h3');
      nombre.className = 'text-lg font-semibold text-gray-800 mb-2';
      nombre.textContent = usuario.nombre;

      const correo = document.createElement('p');
      correo.className = 'text-sm text-gray-600 mb-1';
      correo.innerHTML = `<strong>Correo:</strong> ${usuario.correo}`;

      const edad = document.createElement('p');
      edad.className = 'text-sm text-gray-600 mb-1';
      edad.innerHTML = `<strong>Edad:</strong> ${usuario.edad} años`;

      const autoridad = document.createElement('span');
      autoridad.className = usuario.esAutoridad 
        ? 'inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full'
        : 'inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full';
      autoridad.textContent = usuario.esAutoridad ? 'Autoridad' : 'Estudiante';

      // Ensamblar tarjeta
      tarjeta.appendChild(nombre);
      tarjeta.appendChild(correo);
      tarjeta.appendChild(edad);
      tarjeta.appendChild(autoridad);

      container.appendChild(tarjeta);
    });
  }

  // 3. LISTA DE ELEMENTOS RENDERIZADOS DESDE ARREGLO
  private renderizarComentarios(filtro?: EstadoComentario | 'todos'): void {
    const container = document.getElementById('comentariosContainer');
    if (!container) return;

    container.innerHTML = '';

    let comentariosFiltrados = comentarios;
    if (filtro && filtro !== 'todos') {
      comentariosFiltrados = comentarios.filter(c => c.estado === filtro);
    }

    comentariosFiltrados.forEach(comentario => {
      const comentarioDiv = document.createElement('div');
      comentarioDiv.className = 'bg-gray-50 p-4 rounded-lg border border-gray-200';

      // Header del comentario
      const header = document.createElement('div');
      header.className = 'flex justify-between items-start mb-3';

      const infoAutor = document.createElement('div');
      const nombreAutor = document.createElement('h4');
      nombreAutor.className = 'font-semibold text-gray-800';
      nombreAutor.textContent = comentario.autor.nombre;

      const categoriaSpan = document.createElement('span');
      categoriaSpan.className = 'text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded';
      categoriaSpan.textContent = comentario.categoria.nombre;

      infoAutor.appendChild(nombreAutor);
      infoAutor.appendChild(categoriaSpan);

      // Estado
      const estadoSpan = document.createElement('span');
      const estadoClases = {
        'Pendiente': 'bg-yellow-100 text-yellow-800',
        'En revisión': 'bg-blue-100 text-blue-800',
        'Implementado': 'bg-green-100 text-green-800'
      };
      estadoSpan.className = `text-sm px-2 py-1 rounded ${estadoClases[comentario.estado]}`;
      estadoSpan.textContent = comentario.estado;

      header.appendChild(infoAutor);
      header.appendChild(estadoSpan);

      // Contenido
      const contenido = document.createElement('p');
      contenido.className = 'text-gray-700 mb-3';
      contenido.textContent = comentario.contenido;

      // Fecha
      const fecha = document.createElement('p');
      fecha.className = 'text-xs text-gray-500 mb-3';
      fecha.textContent = `Fecha: ${new Date(comentario.fecha).toLocaleDateString()}`;

      // Botones de acción
      const acciones = document.createElement('div');
      acciones.className = 'flex space-x-2';

      const btnEditar = document.createElement('button');
      btnEditar.className = 'bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600';
      btnEditar.textContent = 'Editar';
      btnEditar.addEventListener('click', () => this.editarComentario(comentario.id));

      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => this.eliminarComentario(comentario.id));

      acciones.appendChild(btnEditar);
      acciones.appendChild(btnEliminar);

      // Ensamblar comentario
      comentarioDiv.appendChild(header);
      comentarioDiv.appendChild(contenido);
      comentarioDiv.appendChild(fecha);
      comentarioDiv.appendChild(acciones);

      container.appendChild(comentarioDiv);
    });
  }

  private filtrarComentarios(filtro: EstadoComentario | 'todos'): void {
    this.renderizarComentarios(filtro);
  }

  private editarComentario(id: number): void {
    const comentario = comentarios.find(c => c.id === id);
    if (!comentario) return;

    const nuevoContenido = prompt('Editar comentario:', comentario.contenido);
    if (nuevoContenido && nuevoContenido.trim().length > 10) {
      comentario.contenido = nuevoContenido.trim();
      this.renderizarComentarios();
    } else if (nuevoContenido !== null) {
      alert('El comentario debe tener al menos 10 caracteres');
    }
  }

  private eliminarComentario(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este comentario?')) {
      comentarios = comentarios.filter(c => c.id !== id);
      this.renderizarComentarios();
    }
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new SistemaComentarios();
});