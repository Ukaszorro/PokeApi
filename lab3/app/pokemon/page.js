import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import axios from "axios";
import { Suspense } from "react";

// export async function fetchData(
//   url = "https://pokeapi.co/api/v2/pokemon?limit=1510&offset=0"
// ) {
//   const data = await axios.get(url).then((res) => res.data);
//   return data;
// }
export default async function Homepage() {
  let currentRequestId = 0;
  let pokemonData = [];
  let pokemonDetailsContainer = {};

  // const data = await fetchData().then((res) => res.results);

  //   const searchFilter = (array) => {
  //     return array.filter((el) => el.name.toLowerCase().includes(query));
  //   };
  // const prepareList = async (pokemonList) =>
  //   await Promise.all(
  //     pokemonList.map(async (pokemon) => {
  //       const pokemonDetails = await fetchData(pokemon.url);
  //       return {
  //         name: pokemonDetails.name,
  //         id: pokemonDetails.id,
  //         sprite: pokemonDetails.sprites.front_default,
  //       };
  //     })
  //   );

  // pokemonData = await prepareList(data);

  //pokemonData = searchFilter(data);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PokemonList pokemons={pokemonData} />
    </Suspense>
  );
}
