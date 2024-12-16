"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function TypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [typeOption, setTypeOption] = useState("");
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    const currentType = searchParams.get("type") || "";
    setTypeOption(currentType);
  }, [searchParams]);

  useEffect(() => {
    const fetchTypes = async () => {
      const results = await fetch("https://pokeapi.co/api/v2/type")
        .then((res) => res.json())
        .then((res) => res.results);

      const types = results.map((result) => result.name).slice(0, -2);
      console.log(types);
      setTypeList(types);
    };

    fetchTypes();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setTypeOption(value);

    const params = new URLSearchParams(searchParams);
    if (value != "all") {
      params.set("type", value);
    } else {
      params.delete("type");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <select value={typeOption} onChange={(e) => handleChange(e)}>
      <option value="all">All Types</option>
      {typeList.map((type) => (
        <option value={type} key={type}>
          {type}
        </option>
      ))}
    </select>
  );
}
