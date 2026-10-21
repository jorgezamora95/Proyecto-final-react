import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { conectarDB } from './src/config/db.js';
import preguntasRouter from './src/routes/preguntas.js'

// Ahora que ya tenemos la de models y routes
// podemos importar la de preguntas pa que jale chido
// tomando de ejemplo el proyecto server visto en clase que nos proporciono el porfe
const app = express ();

app.use(cors());
app.use(express.json());

app.get('/api/salud', (req, res) => res.json({ok: true}));
app.use('/api/preguntas', preguntasRouter);

const PORT = process.env.PORT || 4000;

conectarDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`API escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('No se pudo conectar a MongoDB:', err.message);
        process.exit(1);
    });