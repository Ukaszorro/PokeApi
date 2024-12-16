import PokemonTile from "./PokemonTile";
import axios from "axios";
import { Suspense } from "react";

const PokemonList = ({ pokemons }) => {
  return (
    <div id="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonTile key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
