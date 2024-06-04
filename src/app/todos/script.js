document.addEventListener('DOMContentLoaded', async () => {
    const todosList = document.getElementById('todos-list');
    const todoDetails = document.getElementById('todo-details');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Fetch todos list
    const fetchTodos = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        return await response.json();
    };

    // Fetch todo details
    const fetchTodoDetails = async (id) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        return await response.json();
    };

    // Display todos list
    const displayTodos = (todos) => {
        todosList.innerHTML = '';
        if (todos.length === 0) {
            todosList.innerHTML = '<p>No results found</p>';
        } else {
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
        }
    };

    // Display todo details
    const displayTodoDetails = (todo) => {
        todoDetails.innerHTML = `
            <p>ID: ${todo.id}</p>
            <p>Title: ${todo.title}</p>
            <p>Completed: ${todo.completed ? 'Yes' : 'No'}</p>
        `;
    };

    // Search todos based on input
    const searchTodos = async () => {
        const query = searchInput.value.toLowerCase();
        const todos = await fetchTodos();
        const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(query));
        displayTodos(filteredTodos);
    };

    // Enable/disable search button
    searchInput.addEventListener('input', () => {
        searchButton.disabled = searchInput.value.trim().length === 0;
    });

    // Handle search button click
    searchButton.addEventListener('click', searchTodos);

    // Initial load
    const todos = await fetchTodos();
    displayTodos(todos);
});
