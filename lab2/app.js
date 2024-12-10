const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

const PokemonTile = ({ pokemon, detailsFunction }) => (
  <div className="pokemon-tile" onClick={() => detailsFunction(pokemon.name)}>
    <img src={pokemon.sprite} alt={pokemon.name} />
    <p>
      <strong>{pokemon.name}</strong>
    </p>
    <p>#{pokemon.id}</p>
  </div>
);

const PokemonList = ({ pokemons, detailsFunction }) => (
  <div id="pokemon-list">
    {pokemons.map((pokemon) => (
      <PokemonTile
        key={pokemon.id}
        pokemon={pokemon}
        detailsFunction={detailsFunction}
      />
    ))}
  </div>
);

const ListRenderer = ({ items, renderItems, className }) => (
  <ul className={className}>{items.map(renderItems)}</ul>
);

const PokemonStats = ({ stats }) => (
  <ListRenderer
    items={stats}
    className="stats"
    renderItems={(stat) => (
      <li key={stat.stat.name}>
        {stat.stat.name}: {stat.base_stat}
      </li>
    )}
  />
);

const PokemonTypes = ({ types }) => (
  <ListRenderer
    items={types}
    className={"types"}
    renderItems={(type) => <li key={type.type.name}>{type.type.name}</li>}
  />
);

const PokemonDetails = ({ details }) => (
  <>
    <p>
      <strong>{details.name}</strong>
    </p>
    <img src={details.sprite} alt={details.name} />
    <PokemonTypes types={details.types} />
    <PokemonStats name="stats" stats={details.stats} />
    <ul className="metrics">
      <li>weight: {details.weight}</li>
      <li>height: {details.height}</li>
    </ul>
  </>
);

const App = () => {
  let currentRequestId = 0;
  let pokemonData = [];
  let pokemonDetailsContainer = {};
  async function searchPokemon(inputValue) {
    const requestId = ++currentRequestId;

    try {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`;
      const data = await fetchData(apiUrl);
      const data_filtered = data.results.filter((pokemon) =>
        pokemon.name.includes(inputValue)
      );

      const data_collected = await Promise.all(
        data_filtered.map(async (pokemon) => {
          const pokemonDetails = await fetchData(pokemon.url);
          return {
            name: pokemonDetails.name,
            id: pokemonDetails.id,
            sprite: pokemonDetails.sprites.front_default,
          };
        })
      );
      if (requestId === currentRequestId) {
        pokemonData = [...data_collected];
        renderApp();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function renderPokemonDetails(pokemonDetails) {
    // ReactDOM.render(
    //   <PokemonDetails details={pokemonDetails} />,
    //   document.getElementById("pokemon-details")
    // );

    pokemonDetailsContainer = { ...pokemonDetails };
    renderApp();
  }

  async function detailsFunction(pokemonName) {
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
  const renderApp = () => {
    root.render(
      <div id="content">
        <div id="title">
          <h1 className="name">PokeDex</h1>
          <div id="logo"></div>
        </div>
        <div id="search-bar">
          <input
            type="text"
            id="search-input"
            placeholder="Search Pokemon"
            onInput={(e) => searchPokemon(e.target.value)}
          />
          <button id="search-button">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div id="pokemon-details">
          {Object.keys(pokemonDetailsContainer).length > 0 ? (
            <PokemonDetails details={pokemonDetailsContainer} />
          ) : (
            <p></p>
          )}
        </div>
        {pokemonData.length > 0 ? (
          <PokemonList
            pokemons={pokemonData}
            detailsFunction={detailsFunction}
          />
        ) : (
          <div id="pokemon-list">Not Found</div>
        )}
      </div>
    );
  };

  searchPokemon("");
  renderApp();
};
const root = ReactDOM.createRoot(document.getElementById("root"));
App();
