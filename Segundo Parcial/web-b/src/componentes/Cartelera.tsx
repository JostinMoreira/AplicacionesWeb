import type { Ipelicula } from "./Pelicula";
import Pelicula from "./Pelicula";


interface ICartelera {
    listaPeli : Ipelicula[]
}

const Cartelera = ({ listaPeli }: ICartelera) => {

    return(
        <div className="cartelera">
            <h1> Cartelera</h1>
            {listaPeli.map((pelicula) => (
                <Pelicula
                    key={pelicula.id}
                    pelicula={pelicula}
                    url={`https://picsum.photos/id/${pelicula.id}/450/300`}
                />
            ))}
        </div>
    );
};

export default Cartelera;