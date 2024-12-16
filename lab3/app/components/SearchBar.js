"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    setSearchInput(currentSearch);
  }, [searchParams]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <input
      type="text"
      value={searchInput}
      onChange={handleChange}
      placeholder="Search Pokémon"
    />
  );
}
