import PokemonTile from "./PokemonTile";
import axios from "axios";
import { Suspense } from "react";

export async function fetchData(
  url = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
) {
  const data = await axios.get(url).then((res) => res.data);
  return data;
}

const prepareList = async (pokemonList) =>
  await Promise.all(
    pokemonList.map(async (pokemon) => {
      const pokemonDetails = await fetchData(pokemon.url);
      return {
        name: pokemonDetails.name,
        id: pokemonDetails.id,
        sprite: pokemonDetails.sprites.front_default,
      };
    })
  );

const PokemonList = async ({ pokemons }) => {
  const data = await fetchData().then((res) => res.results);
  // const preparedPokemons = await prepareList(data);

  return (
    <div id="pokemon-list">
      {data.map((pokemon, index) => (
        <Suspense key={index + 1} fallback={<p>Loading...</p>}>
          <PokemonTile pokemon={pokemon} />
        </Suspense>
      ))}
    </div>
  );
};

export default PokemonList;
