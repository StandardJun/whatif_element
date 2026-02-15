import Link from "next/link";

function Logo() {
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="만약... 홈">
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
      {/* Atom icon */}
      <circle cx="16" cy="16" r="3" fill="url(#logo-gradient)" />
      {/* Electron orbits */}
      <ellipse cx="16" cy="16" rx="12" ry="5" stroke="url(#logo-gradient)" strokeWidth="1.2" fill="none" opacity="0.7" />
      <ellipse cx="16" cy="16" rx="12" ry="5" stroke="url(#logo-gradient)" strokeWidth="1.2" fill="none" opacity="0.7" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="5" stroke="url(#logo-gradient)" strokeWidth="1.2" fill="none" opacity="0.7" transform="rotate(-60 16 16)" />
      {/* Text */}
      <text x="34" y="22" fontFamily="var(--font-noto-sans-kr), sans-serif" fontWeight="700" fontSize="16" fill="url(#logo-gradient)">
        만약...
      </text>
    </svg>
  );
}

export default function Header() {
  return (
    <header className="bg-white/60 backdrop-blur-sm border-b border-orange-100">
      <div className="container mx-auto px-4 py-3 max-w-4xl flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity" aria-label="홈">
          <Logo />
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-500">
          <Link href="/elements" className="hover:text-gray-700 transition-colors">
            원소 도감
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/about" className="hover:text-gray-700 transition-colors">
            소개
          </Link>
          <Link
            href="/"
            className="ml-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:from-orange-600 hover:to-rose-600 transition-all"
          >
            테스트 하기
          </Link>
        </nav>
      </div>
    </header>
  );
}
