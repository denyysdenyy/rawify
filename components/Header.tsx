import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full px-4 py-4 flex items-center justify-between max-w-lg mx-auto">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight text-gray-900">
          Rawify
        </span>
        <span className="text-xs text-gray-400 font-medium mt-0.5">beta</span>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100">
        <span className="text-base">🇺🇦</span>
        <span className="text-sm font-medium text-gray-700">Українська</span>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </header>
  );
}
