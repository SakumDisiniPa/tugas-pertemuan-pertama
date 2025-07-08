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
    </main>
  );
}
