import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/60 backdrop-blur-sm border-b border-orange-100">
      <div className="container mx-auto px-4 py-4 max-w-4xl flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-700 hover:text-gray-900 transition-colors">
          만약...
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-500">
          <Link href="/elements" className="hover:text-gray-700 transition-colors">
            원소 도감
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/about" className="hover:text-gray-700 transition-colors">
            소개
          </Link>
        </nav>
      </div>
    </header>
  );
}
