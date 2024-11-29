// Función para buscar Pokémon por nombre
async function searchPokemon() {
    const pokemonNameInput = document.getElementById('pokemonName');
    const pokemonInfo = document.getElementById('pokemonInfo');
    const errorMessage = document.getElementById('errorMessage');

    // Limpiar resultados previos
    pokemonInfo.innerHTML = '';
    errorMessage.textContent = '';

    // Obtener el nombre del Pokémon ingresado
    const pokemonName = pokemonNameInput.value.toLowerCase();

    if (!pokemonName) {
        errorMessage.textContent = 'Por favor, ingresa el nombre de un Pokémon.';
        return;
    }

    try {
        // Solicitud a la API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const pokemonData = await response.json();

        // Extraer habilidades
        const abilities = pokemonData.abilities
            .map(ability => ability.ability.name)
            .join(', ');

        // Extraer estadísticas base
        const stats = pokemonData.stats
            .map(stat => `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`)
            .join('<br>');

        // Mostrar la información del Pokémon
        pokemonInfo.innerHTML = `
            <h2>${pokemonData.name.toUpperCase()}</h2>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <p><strong>Altura:</strong> ${pokemonData.height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemonData.weight / 10} kg</p>
            <p><strong>Tipos:</strong> ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Habilidades:</strong> ${abilities}</p>
            <p><strong>Experiencia Base:</strong> ${pokemonData.base_experience}</p>
            <h3>Estadísticas Base:</h3>
            <p>${stats}</p>
        `;
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
