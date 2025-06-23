import Comentario from './components/Comentario';
import Estudiante from './components/Estudiante';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
        Red Social del Cine - Proyecto Colaborativo
      </h1>

      <div className="grid gap-8 max-w-6xl mx-auto md:grid-cols-2">
        <Comentario />
        <Estudiante />
      </div>
    </div>
  );
}

export default App;
