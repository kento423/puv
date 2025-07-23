import Image from "next/image";

export default function PokemonInfo({ name, imageUrl }: { name: string, imageUrl: string }) {
  return (
    <div className="flex items-center mb-6">
      <Image src={imageUrl} alt={name} width={120} height={120} className="mr-4" />
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-600">このポケモンのカウンターは……</p>
      </div>
    </div>
  );
}
