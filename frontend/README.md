# QuizLab

QuizLab es una aplicación web de preguntas y respuestas que desarrollé para practicar los temas vistos durante el curso de React.

La idea es tener un pequeño juego de trivia donde se puedan registrar preguntas de diferentes categorías, seleccionar una respuesta y comprobar si es correcta o incorrecta

## Tecnologías utilizadas

- React con Vite
- JavaScript
- HTML y CSS
- Node.js y Express
- MongoDB y Mongoose

## Funcionalidades

La aplicación cuenta con dos partes principales:

**Administración de preguntas**

Desde esta sección se pueden registrar nuevas preguntas con cuatro opciones de respuesta, seleccionar cuál es la correcta, agregar una categoría, dificultad y una explicación.

También se pueden consultar, editar y eliminar las preguntas que ya están guardadas en la base de datos.

**Juego de preguntas**

En esta sección se muestran las preguntas registradas, una por una. El usuario puede seleccionar una respuesta y comprobar si acertó o no.

Después de responder, se muestra una explicación y se puede continuar con la siguiente pregunta hasta terminar el cuestionario.

## Temas que puse en práctica

Durante el desarrollo utilicé componentes de React, props, `useState`, `useEffect`, Context API, eventos, formularios controlados y renderizado condicional.

## Cómo ejecutar el proyecto

Primero es necesario tener instalado Node.js y MongoDB.

En la carpeta `backend`:

```bash
npm install
npm run dev
```

En otra terminal, dentro de `frontend`:

```bash
npm install
npm run dev
```

Es necesario configurar el archivo `.env` del backend con la conexión a MongoDB y el puerto correspondiente.
