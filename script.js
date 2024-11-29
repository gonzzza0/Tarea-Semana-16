// URL de la API
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

// Elemento HTML donde mostraremos los usuarios
const userList = document.getElementById('userList');

// Función para obtener los usuarios
async function getUsers() {
    try {
        const response = await fetch(apiUrl); // Realizar la solicitud
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const users = await response.json(); // Convertir la respuesta a JSON

        // Mostrar usuarios en la página
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `Nombre: ${user.name}, Email: ${user.email}`;
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Hubo un problema al consumir la API:', error);
    }
}

// Llamar a la función al cargar la página
getUsers();
