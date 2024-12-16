// app/pokemon/[id]/page.js

import axios from "axios";
import PokemonDetails from "../../components/PokemonDetails";

async function fetchData(url) {
  const { data } = await axios.get(url);
  return data;
}

export default async function PokemonPage({ params }) {
  const { id } = params;
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const details = await fetchData(url);

  return (
    <div id="pokemon-details">
      <PokemonDetails details={details} />
    </div>
  );
}
