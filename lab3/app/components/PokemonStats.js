import ListRenderer from "./ListRenderer";

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

export default PokemonStats;
