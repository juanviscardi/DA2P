const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Endpoint para obtener la lista de todos
app.get('/todos', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const todos = response.data;
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
