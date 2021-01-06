import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardaPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {

    if (busqueda === '') return;

    const ConsultarAPI = async () => {

      const imagenesPorPagina = 30;
      const key = `18602283-c9b4d2f517dc085456125f195`;
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);


      // calcular numero de paginas para el paginador

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }

    ConsultarAPI();

  }, [busqueda, paginaactual])


  //definir la pagina anterior del paginador

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    guardaPaginaActual(nuevaPaginaActual)
  }

  //definir la siguiente pagina del paginador 

  const paginaSiguiente = () => {

    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    guardaPaginaActual(nuevaPaginaActual)
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center font-weight-bold">Buscador de Imagenes</p>

        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />

        {(paginaactual === 1) ? null : (

          <button
            onClick={paginaAnterior}
            type="button"
            className="bbtn btn-info mr-1"
          > &laquo; Anterior</button>

        )}

        {(paginaactual === totalpaginas) ? null : (
          <button
            onClick={paginaSiguiente}
            type="button"
            className="bbtn btn-info"
          >Siguiente &raquo;</button>
        )}

      </div>


    </div>
  );
}

export default App;
