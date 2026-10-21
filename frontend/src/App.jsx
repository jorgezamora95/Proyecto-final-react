import ListaPreguntas from './components/ListaPreguntas';
import FormularioPregunta from './components/FormularioPergunta';
import { useState } from 'react';
import './App.css'
import Juego from "./components/Juego";

function App() {

  const [preguntaEditar, setPreguntaEditar] = useState(null);
  const [pantalla, setPantalla] = useState("admin");

  const cancelarEdicion = () => {
    setPreguntaEditar(null);
  };


  return (
    <div className="App">

      <header className="quiz-header">
        <h1>QuizLab</h1>

        <div className="quiz-nav">
          <button onClick={() => setPantalla("admin")}>
            Administración
          </button>

          <button onClick={() => setPantalla("juego")}>
            Jugar
          </button>
        </div>
      </header>

      {pantalla === "admin" ? (
        <>
          <p>Administración de preguntas científicas</p>

          <FormularioPregunta
            preguntaEditar={preguntaEditar}
            cancelarEdicion={cancelarEdicion}
          />

          <ListaPreguntas
            seleccionarPregunta={setPreguntaEditar}
          />
        </>
      ) : (
        <Juego />
      )}

    </div>
  );

}

export default App
