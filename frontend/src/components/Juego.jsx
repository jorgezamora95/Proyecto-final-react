
import { useQuiz } from "../context/QuizContext";
import PreguntaJuego from "../context/PreguntaJuego";

function Juego() {

  const { preguntas, cargando, error } = useQuiz();

  if (cargando) {
    return <p>Cargando juego...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (preguntas.length === 0) {
    return <p>No hay preguntas disponibles.</p>;
  }

  return (
    <section className="juego">
      <h1>QuizLab — Pon a prueba tus conocimientos</h1>

      <PreguntaJuego pregunta={preguntas[0]} />

    </section>
  );
}

export default Juego;
