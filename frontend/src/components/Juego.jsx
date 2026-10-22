
import { useQuiz } from "../context/QuizContext";
import PreguntaJuego from "../context/PreguntaJuego";
import { useState  } from "react";

function Juego() {

  const { preguntas, cargando, error } = useQuiz();

//   Falta guardar la posicion de la pregunta

    const [indicePregunta, setIndicePregunta] = useState(0);

  if (cargando) {
    return <p>Cargando juego...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (preguntas.length === 0) {
    return <p>No hay preguntas disponibles.</p>;
  }

  const siguientePregunta = () => {
    setIndicePregunta((prev) => prev + 1);
  }

  const reiniciarJuego = () => {
    setIndicePregunta(0)
  }

  if (indicePregunta >= preguntas.length) {
    return (
        <section className= "juego" >
            <div className="juego-card">
                <h2>Terminaste el juego</h2>
                <p>Has respondido todas las preguntas</p>
            </div>
            <button className="btn-comprobar"
            onClick={reiniciarJuego}>
                Volver jugar
            </button>
        </section>
    );

  }


  return (
    <section className="juego">
      <h1>QuizLab — Pon a prueba tus conocimientos</h1>

      <PreguntaJuego
        key={preguntas[indicePregunta]._id}
        pregunta={preguntas[indicePregunta]}
      />

      <button
        className="btn-comprobar"
        onClick={siguientePregunta}
      >
        {indicePregunta === preguntas.length - 1
          ? "Finalizar juego"
          : "Siguiente pregunta →"}
      </button>

    </section>
  );
}

export default Juego;
