// Importamos Router desde express para crear un conjunto de rutas
import { Router } from 'express';

// Importamos los métodos que definimos en services/usersServices.js
import { getAllUsers, getUserByEmail, getBuscarNombre, postCrearUsuario, actualizarUsuario, eliminarUsuario} from '../services/usersServices.js';

// Creamos una instancia de Router
const router = Router();

// Ruta para obtener todos los usuarios (GET /users)
router.get('/', getAllUsers);

// Ruta para obtener un usuario por email (GET /users/buscarPorEmail/:email)
router.get('/buscarPorEmail/:email', getUserByEmail);

// Ruta para buscar usuarios por nombre (GET /users/buscarPorNombre/:nombre)
// Esta ruta usa una función anónima que llama a getBuscarNombre y devuelve los resultados
router.get('/buscarPorNombre/:nombre', async (req, res) => {
    const { nombre } = req.params;
    try {
        const allUsersByName = await getBuscarNombre(nombre);
        res.json(allUsersByName);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para crear un nuevo usuario (POST /users)
router.post('/', async (req, res) => {
    try {
        // Extraemos los datos enviados en el body
        const { nombre, documento, carnet, email, contrasenia } = req.body;

        // Llamamos al servicio que maneja la inserción en la BD
        const newUser = await postCrearUsuario(nombre, documento, carnet, email, contrasenia);

        // Respondemos con el usuario recién creado
        res.status(201).json(newUser);

    } catch (err) {
        // Si hay error, respondemos con un mensaje de error
        res.status(500).json({ error: err.message });
    }
});

// Ruta para actualizar un usuario existente (PUT /users)
router.put('/id_usuario', async (req, res) => {
    try {
    // Extraemos los datos enviados en el body
    const { nombre, documento, carnet, email, contraseña } = req.body;

    // Extraemos el id_usuario de los parámetros de la URL
    const { id_usuario } = req.params;

    // Creamos un arreglo con los datos del usuario a actualizar
    const usuario = [nombre, documento, carnet, email, contraseña, id_usuario];

    // Llamamos al servicio que maneja la actualización en la BD
    const updatedUser = await actualizarUsuario(usuario);

    // Respondemos con el usuario actualizado
    res.status(201).json(updatedUser);

    } catch (err) {
    // Si hay error, respondemos con un mensaje de error
    res.status(500).json({ error: err.message });
    }
});

// Ruta para eliminar un usuario (DELETE /users/:id_usuario)
router.delete('/:id_usuario', async (req, res) => {
    try {
    // Extraemos el id_usuario de los parámetros de la URL
    const { id_usuario } = req.params;

    // Llamamos al servicio que maneja la eliminación en la BD
    const result = await eliminarUsuario(id_usuario);

    // Respondemos con el resultado de la eliminación
    res.status(200).json(result);
    } catch (err) {
    // Si hay error, respondemos con un mensaje de error
    res.status(500).json({ error: err.message });
    }
});
// Exportamos el router para usarlo en index.js
export default router;