const express = require('express');
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static('public'));

// ------------------- Rutas ------------------- 

// Ruta para listar todos los usuarios

app.get('/users', (req, res) => { });

// Ruta para listar un usuario por ID

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
});

// Ruta para agregar un usuario nuevo

app.post('/users', (req, res) => {
    const newUser = req.body;
});

// Ruta para modificar un usuario

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
});

// Ruta para eliminar un usuario

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
});

// Iniciar servidor

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});