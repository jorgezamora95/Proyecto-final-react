import { Router } from 'express';
import Pregunta from '../models/Pregunta.js';

const router = Router();

// Obtener todas las preguntas de nuestro quzi
// Pregunta.find() consulta documentos de MongoDB.
// Pregunta.create() crea y guarda un documento nuevo, aplicando las validaciones del modelo.


router.get('/', async (req, res) => {
    try {
        const preguntas = await Pregunta.find();

        res.json(preguntas);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener preguntas"
        });
    }
});


// Registrar una pregunta
router.post("/", async (req, res) => {
  try {
    const nuevaPregunta = await Pregunta.create(req.body);

    res.status(201).json(nuevaPregunta);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
    try {
        const preguntaEliminada =
        await Pregunta.findByIdAndDelete(req.params.id);

        if (!preguntaEliminada) {
            return res.status(404),json({
                error: "Pregunta no encontrada"
            });
        }
        
        res.status(204).end();
    
    } catch (error) {
        res.status(400).json({
            error: "No se pudo eliminar la rpegunta"
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const preguntaActualizada =
        await Pregunta.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidator: true
        });
    
        if (!preguntaActualizada) {
            return res.status(400).json({
                error: "Pregunta no econtrada"
            });
        }
        req.json(preguntaActualizada);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


export default router;