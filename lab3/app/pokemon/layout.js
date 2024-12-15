export default function PokemonsLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="search-bar">
          <input type="text" id="search-input" placeholder="Search Pokemon" />
          <button id="search-button">search</button>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
