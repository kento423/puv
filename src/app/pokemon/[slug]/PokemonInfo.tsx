import Image from "next/image";

export default function PokemonInfo({ name, imageUrl }: { name: string, imageUrl: string }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200 dark:border-gray-700">
      <Image src={imageUrl} alt={name} width={100} height={100} className="md:w-32 md:h-32 w-20 h-20" />
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{name}</h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">このポケモンのカウンターは……</p>
      </div>
    </div>
  );
}
