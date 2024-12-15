const ListRenderer = ({ items, renderItems, className }) => (
  <ul className={className}>{items.map(renderItems)}</ul>
);

export default ListRenderer;
