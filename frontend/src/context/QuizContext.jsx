import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const QuizContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || '/api/preguntas';

export function QuizProvider({ children }) {
    const [preguntas, setPreguntas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargarPreguntas = useCallback(async () => {
        try{
            setCargando(true);
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('No se pudieron cargar las preguntas');
            const datos = await res.json();
            console.log(datos)
            setPreguntas(datos);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarPreguntas();
    }, [cargarPreguntas]);

    const agregarPregunta = async (nuevaPregunta) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaPregunta),
        });

        const datos = await res.json();
        if (!res.ok) {
            throw new Error(datos.error || "Error al guardar la pregunta");
        }
        setPreguntas((prev) => [...prev, datos]);

        return datos;

    }

    const eliminarPregunta = async (id) => {
        const respuesta = await fetch(`/api/preguntas/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error ("No se pudo eliminar la pregunta");
        }

        setPreguntas((prev) =>
            prev.filter((pregunta) => pregunta._id !== id)
        );
    };

    const actualizarPregunta = async (id, datosActualizados) => {
        const respuesta = await fetch(`/api/preguntas/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(datosActualizados)
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.error || "No se pudo actualizar");
        }

        setPreguntas((prev) =>
            prev.map((pregunta) =>
            pregunta._id === id ? datos : pregunta
            )
        );

        return datos;
    };

  return (
    <QuizContext.Provider
      value={{
        preguntas,
        cargando,
        error,
        cargarPreguntas,
        agregarPregunta,
        eliminarPregunta
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

    // Hook personalizado
    export function useQuiz() {
    const contexto = useContext(QuizContext);

    if (!contexto) {
        throw new Error(
        "useQuiz debe utilizarse dentro de <QuizProvider>"
        );
    }

    return contexto;

}
