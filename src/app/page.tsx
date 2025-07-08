'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 to-fuchsia-600 flex flex-col items-center justify-center text-white p-8">
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={150}
        height={30}
        className="mb-6 invert"
      />
      
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">
        Tugas Pertama Next.js
      </h1>
      
      <p className="text-lg sm:text-xl text-center max-w-xl mb-10">
        Project ini dibuat menggunakan Next.js + Tailwind CSS ✨
        <br />
        Silakan lihat dokumentasi atau deploy ke Vercel!
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          📘 Dokumentasi Next.js
        </a>

        <a
          href="https://vercel.com/new"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          🚀 Deploy ke Vercel
        </a>
      </div>

      <footer className="mt-16 text-sm text-white/70 text-center">
        &copy; {new Date().getFullYear()} Sakum - Tugas Next.js
      </footer>
    </main>
  );
}
