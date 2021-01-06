import { useState } from 'react';
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {

    const [termino, gurdarTermino] = useState('');
    const [error, guardarError] = useState(false);


    const buscarImagenes = e => {
        e.preventDefault();

        //validar 

        if(termino.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        //enviar el termino de busuqueda hacia el componente pricipal

        guardarBusqueda(termino);
    }


    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una Imagen , Ejemplo: cafe"
                        onChange={e => gurdarTermino(e.target.value)}
                    >
                    </input>
                </div>

                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    >
                    </input>
                </div>
            </div>

            {error ? <Error mensaje="Agregar un termino de Busqueda"/> : null}

        </form>
     );
}
 
export default Formulario;