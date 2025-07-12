import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">My Website</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-600">
              Home
            </a>
            <a href="#" className="hover:text-gray-600">
              About
            </a>
            <a href="#" className="hover:text-gray-600">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Welcome to My Website</h1>
          <p className="text-lg text-gray-600 mb-8">
            This is a simple and clean website template built with Next.js and
            Tailwind CSS. Feel free to customize it according to your needs.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </main>

      <footer className="p-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>© 2025 My Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
