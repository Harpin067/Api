// Importamos express, el framework para manejar rutas y peticiones
import express from 'express';

// IMportamos nuestro router de usuarios
import usersRouter from './routes/users.js';

// Importamos las variables de entorno desde el archivo .env
import dotenv from 'dotenv';
dotenv.config();

// Creamos una instancia de express (nuestro servidor)
const app = express();

// Middleware que permite interpretar JSON en las peticiones
app.use(express.json());

// Definimos una ruta GET en la raíz del servidor
app.get('/', (req, res) => {
    res.send('¡Hola, mundo UNICAES! El servidor está funcionando correctamente.');
});

// Asociamos todas las rutas de usuarios al prefijo "/users"
app.use('/users', usersRouter);

// Iniciamos el servidor en el puerto definido en la variable de entorno
// o de lo contrario usamos el puerto 3000
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});