// === Componente creado por Jostin Moreira ===
import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export interface IComentario {
  id: number;
  autor: string;
  mensaje: string;
  fecha: string;
}

// Componente creado por Jostin Moreira - Módulo de Comentarios
const Comentario = () => {
  const [comentarios, setComentarios] = useState<IComentario[]>([]);
  const [autor, setAutor] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const comentariosSimulados: IComentario[] = [
      { id: 1, autor: 'Ana', mensaje: 'La sala de estudio estaba muy fría.', fecha: '2025-06-22' },
      { id: 2, autor: 'Carlos', mensaje: 'Excelente atención en secretaría.', fecha: '2025-06-23' },
    ];
    setTimeout(() => setComentarios(comentariosSimulados), 1000);
  }, []);

  const handleAutorChange = (e: ChangeEvent<HTMLInputElement>) => setAutor(e.target.value);
  const handleMensajeChange = (e: ChangeEvent<HTMLTextAreaElement>) => setMensaje(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!autor.trim() || !mensaje.trim()) {
      alert('Por favor, completa ambos campos');
      return;
    }

    const nuevoComentario: IComentario = {
      id: comentarios.length + 1,
      autor: autor.trim(),
      mensaje: mensaje.trim(),
      fecha: new Date().toISOString().split('T')[0],
    };

    setComentarios([...comentarios, nuevoComentario]);
    setAutor('');
    setMensaje('');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Comentarios de los usuarios</h2>

      <ul className="space-y-4 max-h-64 overflow-y-auto border border-gray-300 rounded p-3">
        {comentarios.map((c) => (
          <li key={c.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">{c.fecha}</p>
            <p className="font-semibold text-gray-800">{c.autor}</p>
            <p className="text-gray-700 whitespace-pre-line">{c.mensaje}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tu nombre"
          value={autor}
          onChange={handleAutorChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Escribe tu comentario"
          value={mensaje}
          onChange={handleMensajeChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Agregar comentario
        </button>
      </form>
    </div>
  );
};

export default Comentario;
