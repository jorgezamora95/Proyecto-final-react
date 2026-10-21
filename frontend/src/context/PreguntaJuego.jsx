
import { useState } from "react";

function PreguntaJuego({ pregunta }) {

  const [respuestaSeleccionada, setRespuestaSeleccionada] =
    useState(null);

  const [respuestaValidada, setRespuestaValidada] =
    useState(false);

  const comprobarRespuesta = () => {
    if (respuestaSeleccionada === null) return;

    setRespuestaValidada(true);
  };

  const esCorrecta =
    respuestaSeleccionada === pregunta.respuestaCorrecta;

  return (
    <div className="juego-card">

      <span className="juego-categoria">
        {pregunta.categoria}
      </span>

      <h2>{pregunta.pregunta}</h2>

      <div className="juego-opciones">

        {pregunta.opciones.map((opcion, index) => (

          <button
            key={index}
            type="button"
            disabled={respuestaValidada}
            className={
              respuestaSeleccionada === index
                ? "opcion-juego seleccionada"
                : "opcion-juego"
            }
            onClick={() => setRespuestaSeleccionada(index)}
          >
            {String.fromCharCode(65 + index)}. {opcion}
          </button>

        ))}

      </div>

      {!respuestaValidada ? (

        <button
          className="btn-comprobar"
          onClick={comprobarRespuesta}
          disabled={respuestaSeleccionada === null}
        >
          Comprobar respuesta
        </button>

      ) : (

        <div className="juego-resultado">

          <h3>
            {esCorrecta
              ? "¡Correcto! 🎉"
              : "Respuesta incorrecta"}
          </h3>

          <p>{pregunta.explicacion}</p>

        </div>

      )}

    </div>
  );
}

export default PreguntaJuego;
