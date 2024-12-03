const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pokemonList = document.getElementById("pokemon-list");
const pokemonDetailsBox = document.getElementById("pokemon-details");

// Event Listeners

searchButton.addEventListener("click", searchPokemon);

// functions

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

async function searchPokemon(event) {
  // if (searchInput.value != "") {
  //   console.log(searchInput.value);
  //   const data = await fetchData(
  //     `https://pokeapi.co/api/v2/pokemon/${searchInput.value}`
  //   );

  //   renderPokemonDetails(data);
  // }
  pokemonList.innerHTML = "";
  try {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`;
    const data = await fetchData(apiUrl);
    const data_filtered = data.results.filter((pokemon) =>
      pokemon.name.includes(searchInput.value)
    );
    data_filtered.map(async (pokemon) => {
      const pokemonDetails = await fetchData(pokemon.url);

      pokemon_info = {
        name: pokemonDetails.name,
        id: pokemonDetails.id,
        sprite: pokemonDetails.sprites.front_default,
      };
      renderPokemonTile(pokemon_info);
    });
  } catch (error) {
    console.log(error);
  }
}

function renderPokemonList(pokemonData) {
  pokemonData.reduce((_, pokemon) => {
    const pokemonTile = document.createElement("div");
    pokemonTile.className = "pokemon-tile";
    pokemonTile.addEventListener("click", pokemonDetails);
    pokemonTile.innerHTML = `<img src="${pokemon.sprite}" alt="${pokemon.name}" />
    <p><strong>${pokemon.name}</strong></p>
    <p>ID: ${pokemon.id}</p>`;
    pokemonList.appendChild(pokemonTile);
  }, "");
}

function renderPokemonTile(pokemon) {
  const pokemonTile = document.createElement("div");
  pokemonTile.className = "pokemon-tile";
  pokemonTile.addEventListener("click", pokemonDetails);
  pokemonTile.innerHTML = `<img src="${pokemon.sprite}" alt="${pokemon.name}" />
    <p><strong>${pokemon.name}</strong></p>
    <p>ID: ${pokemon.id}</p>`;
  pokemonList.appendChild(pokemonTile);
}

function renderPokemonListNotFound(message) {
  pokemonMessage = document.createElement("p");
  pokemonMessage.innerText = message;
  pokemonList.appendChild(pokemonMessage);
}

async function pokemonDetails(event) {
  // get name of pokemon, in this case its second child of Tile
  const pokemonName = event.currentTarget.children[1].innerText;
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const pokemonObject = await fetchData(url);

  const pokemonDetails = {
    name: pokemonObject.name,
    id: pokemonObject.id,
    sprite: pokemonObject.sprites.front_default,
    height: pokemonObject.height,
    weight: pokemonObject.weight,
    types: pokemonObject.types,
    stats: pokemonObject.stats,
  };

  renderPokemonDetails(pokemonDetails);
}

function renderPokemonDetails(pokemonDetails) {
  pokemonDetailsBox.innerHTML = `<p><strong>${pokemonDetails.name}</strong></p>
  <img src="${pokemonDetails.sprite}" alt="${pokemonDetails.name}" />`;

  const pokemonTypes = document.createElement("ul");
  pokemonTypes.className = "types";
  pokemonDetails.types.reduce((_, type) => {
    const li = document.createElement("li");
    li.innerText = `${type.type.name}`;
    pokemonTypes.appendChild(li);
  }, "");

  const pokemonStats = document.createElement("ul");
  pokemonStats.className = "stats";
  pokemonDetails.stats.reduce((_, stat) => {
    const li = document.createElement("li");
    li.innerText = `${stat.stat.name}: ${stat.base_stat}`;
    pokemonStats.appendChild(li);
  }, "");

  const pokemonMetrics = document.createElement("ul");
  pokemonMetrics.className = "metrics";
  pokemonMetrics.innerHTML = `<li>weight: ${pokemonDetails.weight}</li>
            <li>height: ${pokemonDetails.height}</li>`;

  pokemonDetailsBox.appendChild(pokemonTypes);
  pokemonDetailsBox.appendChild(pokemonStats);
  pokemonDetailsBox.appendChild(pokemonMetrics);
}
