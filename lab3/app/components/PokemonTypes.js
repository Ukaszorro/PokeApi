import ListRenderer from "./ListRenderer";

const PokemonTypes = ({ types }) => (
  <ListRenderer
    items={types}
    className={"types"}
    renderItems={(type) => <li key={type.type.name}>{type.type.name}</li>}
  />
);

export default PokemonTypes;
