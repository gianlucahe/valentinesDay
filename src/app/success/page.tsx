"use client"

import { useRef } from "react"

export default function Success() {
  const audioRef = useRef(null)


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black relative">
      {/* Hintergrundmusik */}
      <audio ref={audioRef} loop>
        <source src="/new-york-new-york.mp3" type="audio/mpeg" />
      </audio>

      {/* Großes Herz im Hintergrund */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg
          className="w-[500px] h-[500px] text-red-600"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      <div className="text-center relative z-10">
        <h1 className="mb-6 text-4xl font-bold text-white">
          Yay! Ich wusste doch, wir sind obsessed miteinander. ❤️
        </h1>
        <p className="text-xl text-gray-300">
          Ich hole dich um 20:30 Uhr ab und wir gehen etwas bei Sahoi essen
        </p>
      </div>
    </main>
  )
}
