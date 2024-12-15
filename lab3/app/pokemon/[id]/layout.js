"use client";
import { useRouter } from "next/navigation";
export default function PokemonLayout({ children }) {
  const router = useRouter();
  const handleBack = () => {
    router.push("/pokemon");
  };
  return (
    <>
      <button onClick={handleBack}>Go Back</button>
      <main>{children}</main>
    </>
  );
}
