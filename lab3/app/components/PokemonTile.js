// app/components/PokemonTile
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const PokemonTile = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const getFavoritesFromStorage = () => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    return savedFavorites;
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const wasFavorite = favorites.some((fav) => fav.id == pokemon.id);
    setIsFavorite(wasFavorite);
  }, []);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const favorites = getFavoritesFromStorage();

    const updatedFavorites = isFavorite
      ? favorites.filter((favPokemon) => favPokemon.id != pokemon.id)
      : [...favorites, pokemon];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
    console.log(!isFavorite);
  };
  return (
    <Link href={`/pokemon/${pokemon.id}`} className="pokemon-tile">
      <div className="pokemon-tile" style={{ position: "relative" }}>
        <img src={pokemon.sprite} alt={pokemon.name} />
        <p>
          <strong>{pokemon.name}</strong>
        </p>
        <p>#{pokemon.id}</p>

        <button
          className="favorite-button"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
            padding: "0",
            width: "auto",
            height: "auto",
          }}
          onClick={(e) => handleFavoriteToggle(e)}
        >
          {isFavorite ? (
            <AiFillHeart style={{ fill: "red" }} />
          ) : (
            <AiOutlineHeart />
          )}
        </button>
      </div>
    </Link>
  );
};

export default PokemonTile;
