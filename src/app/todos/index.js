const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener la lista de todos
app.get('/api/todos', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const todos = response.data;
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// Endpoint para obtener el detalle de un todo
app.get('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const todo = response.data;
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
