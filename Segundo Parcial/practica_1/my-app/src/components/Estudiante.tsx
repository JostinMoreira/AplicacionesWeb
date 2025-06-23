import { useEffect, useState} from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface IEstudiante {
  id: number;
  nombre: string;
  carrera: string;
  Semestre: string;
}


// Componente creado por Javier Zamora - Módulo de Estudiantes
const Estudiante = () => {
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [Semestre, setSemestre] = useState('');

  useEffect(() => {
    const estudiantesSimulados: IEstudiante[] = [
      { id: 1, nombre: 'Luis Torres', carrera: 'Ingeniería en Sistemas', Semestre: 'Semestre 6' },
      { id: 2, nombre: 'María Paredes', carrera: 'Administración', Semestre: 'Semestre 3' },
    ];
    setTimeout(() => setEstudiantes(estudiantesSimulados), 1000);
  }, []);

  const handleAgregar = (e: FormEvent) => {
    e.preventDefault();
    if (!nombre || !carrera || !Semestre) {
      alert('Completa todos los campos');
      return;
    }
    const nuevo: IEstudiante = {
      id: estudiantes.length > 0 ? estudiantes[estudiantes.length - 1].id + 1 : 1,
      nombre,
      carrera,
      Semestre,
    };
    setEstudiantes([...estudiantes, nuevo]);
    setNombre('');
    setCarrera('');
    setSemestre('');
  };

  const handleEliminar = (id: number) => {
    const filtrados = estudiantes.filter((e) => e.id !== id);
    setEstudiantes(filtrados);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Gestión de Estudiantes</h2>

      <form onSubmit={handleAgregar} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Carrera"
          value={carrera}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCarrera(e.target.value)}
          className="border p-2 rounded"
        />
        <select
            value={Semestre}
            onChange={(e) => setSemestre(e.target.value)}
            className="border p-2 rounded"
            >
            <option value="">Selecciona semestre</option>
            {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={`Nivel ${i + 1}`}>
                Semestre {i + 1}
                </option>
            ))}
        </select>
        <button
          type="submit"
          className="col-span-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Agregar Estudiante
        </button>
      </form>

      <ul className="space-y-4">
        {estudiantes.map((est) => (
          <li key={est.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold">{est.nombre}</p>
              <p className="text-sm text-gray-600">{est.carrera} — {est.Semestre}</p>
            </div>
            <button
              onClick={() => handleEliminar(est.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estudiante;
