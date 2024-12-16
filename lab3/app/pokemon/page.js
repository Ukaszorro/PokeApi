"use client";

import PokemonList from "../components/PokemonList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PokemonPage() {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const search = searchParams.get("search") || "";
  const limit = searchParams.get("limit") || 20;

  useEffect(() => {
    async function fetchData(
      url = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
    ) {
      const data = await fetch(url).then((res) => res.json());
      const cachedData = localStorage.getItem("pokemonData");

      if (cachedData) {
        setPokemonData(JSON.parse(cachedData));
        console.log("skiiiibidi");
        return;
      }
      const fetchDetails = async (pokemonList) =>
        await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url).then((res) =>
              res.json()
            );
            return {
              name: detailsResponse.name || "unknown",
              id: detailsResponse.id || 0,
              sprite: detailsResponse.sprites.front_default,
              types: detailsResponse.types.map((t) => t.type.name),
            };
          })
        );

      const preparedData = await fetchDetails(data.results);
      console.log(preparedData);
      setPokemonData(preparedData);

      localStorage.setItem("pokemonData", JSON.stringify(preparedData));
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...pokemonData];

    if (search)
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );

    if (type)
      filtered = filtered.filter((pokemon) => pokemon.types.includes(type));

    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    setFilteredData(filtered);
  }, [searchParams, pokemonData]);

  return <PokemonList pokemons={filteredData} />;
}
