
import { useQuiz } from "../context/QuizContext";

function ListaPreguntas({ seleccionarPregunta }) {

  const { preguntas, cargando, error, eliminarPregunta } = useQuiz();

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar esta pregunta?"
    );

    if (!confirmar) return;

    try {
      await eliminarPregunta(id);
    } catch (error) {
      alert(error.message);
    }
  };

  if (cargando) {
    return <p>Cargando preguntas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="lista-preguntas">

      <h2>Preguntas registradas</h2>

      {preguntas.length === 0 ? (
        <p>No hay preguntas registradas.</p>
      ) : (

        <div className="preguntas-grid">

          {preguntas.map((pregunta) => (

            <article
              className="pregunta-card"
              key={pregunta._id}
            >

              <h3>{pregunta.pregunta}</h3>

              <div className="pregunta-meta">
                <span>{pregunta.categoria}</span>
                <span>{pregunta.dificultad}</span>
              </div>

              <ul className="pregunta-opciones">

                {pregunta.opciones.map((opcion, index) => (

                  <li key={index}>
                    {String.fromCharCode(65 + index)}. {opcion}
                  </li>

                ))}

              </ul>

              <div className="pregunta-acciones">

                <button
                  type="button"
                  onClick={() => seleccionarPregunta(pregunta)}
                >
                  Editar pregunta
                </button>

                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => handleEliminar(pregunta._id)}
                >
                  Eliminar pregunta
                </button>

              </div>

            </article>

          ))}

        </div>

      )}

    </section>
  );
}

export default ListaPreguntas;
