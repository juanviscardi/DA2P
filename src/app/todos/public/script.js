document.addEventListener('DOMContentLoaded', async () => {
    const todosList = document.getElementById('todos-list');
    const todoDetails = document.getElementById('todo-details');

    // Fetch todos list
    const fetchTodos = async () => {
        const response = await fetch('http://localhost:3000/todos');
        return await response.json();
    };

    // Fetch todo details
    const fetchTodoDetails = async (id) => {
        const response = await fetch(`http://localhost:3000/todos/${id}`);
        return await response.json();
    };

    // Display todos list
    const displayTodos = async () => {
        const todos = await fetchTodos();
        todosList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            const button = document.createElement('button');
            button.textContent = 'View Details';
            button.addEventListener('click', async () => {
                const details = await fetchTodoDetails(todo.id);
                displayTodoDetails(details);
            });
            li.appendChild(button);
            todosList.appendChild(li);
        });
    };

    // Display todo details
    const displayTodoDetails = (todo) => {
        todoDetails.innerHTML = `
            <p>ID: ${todo.id}</p>
            <p>Title: ${todo.title}</p>
            <p>Completed: ${todo.completed}</p>
        `;
    };

    // Initial load
    displayTodos();
});
