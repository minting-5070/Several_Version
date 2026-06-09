"use client";
export default function GenyvaLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="genyva_g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#genyva_g)" />
      <path fill="#fff" d="M20 40c0-8.837 7.163-16 16-16h8v6h-8a10 10 0 1 0 9.17 14.5l5.2 2.4A16 16 0 0 1 20 40Z" />
      <path fill="#fff" d="M24 24l8 0c6.627 0 12 5.373 12 12v4h-6v-4a6 6 0 0 0-6-6h-8v-6z" opacity=".9" />
    </svg>
  );
}


