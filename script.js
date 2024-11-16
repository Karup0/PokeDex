const pokedex = document.getElementById('pokedex');
const searchBar = document.getElementById('searchBar');
let allPokemon = [];

// Fetch Pokémon data from the API
const fetchPokemon = async () => {
    for (let i = 1; i <= 150; i++) { // Fetch first 150 Pokémon
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemon = await res.json();
        allPokemon.push({
            name: pokemon.name,
            id: pokemon.id,
            image: pokemon.sprites.front_default,
            type: pokemon.types.map(t => t.type.name).join(', ')
        });
    }
    displayPokemon(allPokemon);
};

// Display Pokémon as cards
const displayPokemon = (pokemonList) => {
    pokedex.innerHTML = pokemonList.map(pokemon => `
        <div class="card">
            <div class="card-inner">
                <div class="card-front">
                    <img src="${pokemon.image}" alt="${pokemon.name}">
                    <h3>#${pokemon.id} ${pokemon.name}</h3>
                </div>
                <div class="card-back">
                    <h3>${pokemon.name}</h3>
                    <p>Type: ${pokemon.type}</p>
                </div>
            </div>
        </div>
    `).join('');
};

// Search Pokémon
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPokemon = allPokemon.filter(p => 
        p.name.toLowerCase().includes(searchTerm)
    );
    displayPokemon(filteredPokemon);
});

// Load Pokémon on page load
fetchPokemon();
