import { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

const formularioInicial = {
    pregunta: "",
    opciones: ["", "", "", ""],
    respuestaCorrecta: 0,
    categoria: "Astronomía",
    dificultad: "facil",
    explicacion: ""
};

function FormularioPregunta({ preguntaEditar, cancelarEdicion }) {
    const { agregarPregunta, actualizarPregunta } = useQuiz();

    const [formulario, setFormulario] = useState(formularioInicial);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        if (preguntaEditar) {
            setFormulario({
                pregunta: preguntaEditar.pregunta,
                opciones: [...preguntaEditar.opciones],
                respuestaCorrecta: preguntaEditar.respuestaCorrecta,
                categoria: preguntaEditar.categoria,
                dificultad: preguntaEditar.dificultad,
                explicacion: preguntaEditar.explicacion
            });
        } else {
            setFormulario({
                ...formularioInicial,
                opciones: [...formularioInicial.opciones]
            });
        }

        setError("");
        setMensaje("");
    }, [preguntaEditar]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormulario((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOpcionChange = (index, value) => {
        setFormulario((prev) => ({
            ...prev,
            opciones: prev.opciones.map((opcion, i) =>
                i === index ? value : opcion
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMensaje("");
        setGuardando(true);

        try {
            if (preguntaEditar) {
                await actualizarPregunta(
                    preguntaEditar._id,
                    formulario
                );

                cancelarEdicion();

            } else {
                await agregarPregunta(formulario);

                setFormulario({
                    ...formularioInicial,
                    opciones: [...formularioInicial.opciones]
                });

                setMensaje("¡Pregunta registrada correctamente!");
            }

        } catch (err) {
            setError(err.message);

        } finally {
            setGuardando(false);
        }
    };

    return (
        <form className="formulario-pregunta" onSubmit={handleSubmit}>
            <h2>{preguntaEditar ? "Editar pregunta" : "Registrar pregunta"}</h2>

            <label htmlFor="pregunta">Pregunta</label>
            <input
                id="pregunta"
                name="pregunta"
                value={formulario.pregunta}
                onChange={handleChange}
                placeholder="¿Cuál es el planeta más grande?"
                required
            />

            <h3>Opciones de respuesta</h3>

            <div className="opciones-grid">
            {formulario.opciones.map((opcion, index) => (
                <div key={index}>
                <label htmlFor={`opcion-${index}`}>
                    Opción {index + 1}
                </label>

                <input
                    id={`opcion-${index}`}
                    value={opcion}
                    onChange={(e) =>
                    handleOpcionChange(index, e.target.value)
                    }
                    required
                />
                </div>
            ))}
            </div>

            <label htmlFor="respuestaCorrecta">
                Respuesta correcta
            </label>

            <select
                id="respuestaCorrecta"
                name="respuestaCorrecta"
                value={formulario.respuestaCorrecta}
                onChange={(e) =>
                    setFormulario((prev) => ({
                        ...prev,
                        respuestaCorrecta: Number(e.target.value)
                    }))
                }
            >
                {formulario.opciones.map((_, index) => (
                    <option key={index} value={index}>
                        Opción {index + 1}
                    </option>
                ))}
            </select>

            <label htmlFor="categoria">Categoría</label>
            <select
                id="categoria"
                name="categoria"
                value={formulario.categoria}
                onChange={handleChange}
            >
                <option value="Astronomía">Astronomia</option>
                <option value="Biología">Biologia</option>
                <option value="Física">Fisica</option>
                <option value="Tecnología">Tecnologia</option>
                <option value="Ciencia general">Ciencia general</option>
            </select>

            <label htmlFor="dificultad">Dificultad</label>
            <select
                id="dificultad"
                name="dificultad"
                value={formulario.dificultad}
                onChange={handleChange}
            >
                <option value="facil">Facil</option>
                <option value="medio">Medio</option>
                <option value="dificil">Dificil</option>
            </select>

            <label htmlFor="explicacion">
                Explicación científica
            </label>
            <textarea
                id="explicacion"
                name="explicacion"
                value={formulario.explicacion}
                onChange={handleChange}
                required
            />

            <button type="submit" disabled={guardando}>
                {guardando
                    ? "Guardando..."
                    : preguntaEditar
                        ? "Actualizar pregunta"
                        : "Guardar pregunta"}
            </button>

            {preguntaEditar && (
                <button
                    type="button"
                    onClick={cancelarEdicion}
                    disabled={guardando}
                >
                    Cancelar edición
                </button>
            )}

            {error && <p role="alert">{error}</p>}
            {mensaje && <p role="status">{mensaje}</p>}
        </form>
    );
}

export default FormularioPregunta;