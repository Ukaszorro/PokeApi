import PokemonTypes from "./PokemonTypes";
import PokemonStats from "./PokemonStats";

const PokemonDetails = ({ details }) => (
  <>
    <p>{details.name}</p>
    <img src={details.sprites.front_default} alt={details.name} />
    <PokemonTypes types={details.types} />
    <PokemonStats name="stats" stats={details.stats} />
    <ul className="metrics">
      <li>weight: {details.weight}</li>
      <li>height: {details.height}</li>
    </ul>
  </>
);

export default PokemonDetails;
