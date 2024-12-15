// app/components/PokemonTile
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export async function fetchData(url) {
  const data = await axios.get(url).then((res) => res.data);
  return data;
}
const preparePokemon = async (pokemon) => {
  const pokemonDetails = await fetchData(pokemon.url);
  return {
    name: pokemonDetails.name,
    id: pokemonDetails.id,
    sprite: pokemonDetails.sprites.front_default,
  };
};

const PokemonTile = async ({ pokemon }) => {
  const pokemonInfo = await preparePokemon(pokemon);
  return (
    <Link href={`/pokemon/${pokemonInfo.id}`} className="pokemon-tile">
      <img src={pokemonInfo.sprite} alt={pokemonInfo.name} />
      <p>
        <strong>{pokemonInfo.name}</strong>
      </p>
      <p>#{pokemonInfo.id}</p>
    </Link>
  );
};

export default PokemonTile;
