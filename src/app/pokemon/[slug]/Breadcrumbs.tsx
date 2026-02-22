import Link from "next/link";

export default function Breadcrumbs({ name }: { name: string }) {
  return (
    <nav className="mb-4 md:mb-6 text-xs md:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2" aria-label="Breadcrumb">
      <Link href="/pokemon" className="hover:underline text-blue-600 dark:text-blue-400 transition">カウンター図鑑</Link>
      <span className="mx-1">&gt;</span>
      <span className="font-bold text-gray-800 dark:text-gray-100 truncate">{name}</span>
    </nav>
  );
}
