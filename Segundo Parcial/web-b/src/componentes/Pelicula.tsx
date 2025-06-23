interface Ipelicula {
    id: number;
    nombre: string;
    genero: string;
    año: number;
    calificacion: number;
}

interface IPeliculaProps {
    pelicula: Ipelicula;
    url: string;
}

const Pelicula = ({ pelicula, url }: IPeliculaProps) => {
    return (
        <div className="pelicula">
            <h1 style={{ backgroundColor: 'red' }}>{pelicula.nombre}</h1>
            <img style={{ width: '450px', height: 'auto' }} src={url} alt={pelicula.nombre} />
        </div>
    );
};

export default Pelicula;
export type { Ipelicula, IPeliculaProps };
