import LimitBar from "../components/LimitBar";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";

export default function PokemonsLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SearchBar />
        <TypeFilter />
        <LimitBar></LimitBar>
        <main>{children}</main>
      </body>
    </html>
  );
}
