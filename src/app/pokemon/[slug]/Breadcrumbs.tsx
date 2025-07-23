import Link from "next/link";

export default function Breadcrumbs({ name }: { name: string }) {
  return (
    <nav className="mb-4 text-sm text-gray-500 flex items-center gap-2" aria-label="Breadcrumb">
      <Link href="/pokemon" className="hover:underline text-blue-600 dark:text-blue-400">ポケモン一覧</Link>
      <span className="mx-1">&gt;</span>
      <span className="font-bold text-gray-800 dark:text-gray-100">{name}</span>
    </nav>
  );
}
