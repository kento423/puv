import { getPokemonList } from "@/app/actions/pokemon";
import PokemonListClient from "./PokemonListClient";

export const revalidate = 60;

export default async function PokemonListPage() {
  const { pokemons: initialPokemons, uniqueValues } = await getPokemonList();

  return (
    <div className="w-full">
      <PokemonListClient
        initialPokemons={initialPokemons}
        uniqueValues={uniqueValues}
      />
    </div>
  );
}