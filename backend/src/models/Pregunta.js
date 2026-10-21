import mongoose from "mongoose";

// Creamos un Schema, que es la estructura y las reglas que deben cumplir los documentos que guardemos.
const preguntaSchema = new mongoose.Schema(
  {
    pregunta: {
      type: String,
      required: true,
      trim: true
    },

    opciones: {
      type: [String],
      required: true,
      validate: {
        validator: (opciones) =>
          opciones.length === 4 &&
          opciones.every((opcion) => opcion.trim() !== ""),
        message: "Debes proporcionar 4 opciones válidas"
      }
    },

    respuestaCorrecta: {
      type: Number,
      required: true,
      min: 0,
      max: 3
    },

    categoria: {
      type: String,
      required: true
    },

    dificultad: {
      type: String,
      enum: ["facil", "medio", "dificil"],
      required: true
    },

    explicacion: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Pregunta = mongoose.model("Pregunta", preguntaSchema);

export default Pregunta;