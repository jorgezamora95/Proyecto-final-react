
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

  // Funcion que sirve para que el usuario al darle clic avance la pregunta
  const siguientePregunta = () => {
    setIndicePregunta((prev) => prev + 1);
  }


// No importa en que pregunta vaya, si le da clic el usuario se reinicia el juego
  const reiniciarJuego = () => {
    setIndicePregunta(0)
  }

//   Valida cuantas preguntas lleva
// Tons si es igual o mayor pues ya no hay mas y ahi queda
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

//   Si es menor y aun hay pregunta las seguira mostrando

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
