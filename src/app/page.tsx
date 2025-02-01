"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [leaveItCount, setLeaveItCount] = useState(0)
  const [leaveItPosition, setLeaveItPosition] = useState({ x: 0, y: 0 })
  const [spawnedButtons, setSpawnedButtons] = useState([])
  const [intervalDuration, setIntervalDuration] = useState(1000) // Startintervall von 1000ms
  const router = useRouter()

  const handleTakeIt = () => {
    router.push("/success")
  }

  const handleLeaveIt = () => {
    if (leaveItCount >= 4) {
      handleTakeIt()
    } else {
      setLeaveItCount(leaveItCount + 1)
      setLeaveItPosition({
        x: Math.random() * 500 - 150,
        y: Math.random() * 500 - 150,
      })
    }
  }

  const getComment = () => {
    switch (leaveItCount) {
      case 1:
        return "Ohhhh"
      case 2:
        return "Dein Ernst?"
      case 3:
        return "TAKE IT IST AUCH EINE OPTION"
      default:
        return ""
    }
  }

  useEffect(() => {
    let interval
    if (leaveItCount >= 4 && spawnedButtons.length < 120) {
      interval = setInterval(() => {
        const randomX = Math.random() * (window.innerWidth - 100) // 100 px Puffer für Button-Breite
        const randomY = Math.random() * (window.innerHeight - 50) // 50 px Puffer für Button-Höhe
        setSpawnedButtons((prev) => [...prev, { x: randomX, y: randomY }])

        // Intervallzeit halbieren, aber nicht unter 50ms gehen
        setIntervalDuration((prev) => Math.max(prev / 1.2, 50))
      }, intervalDuration)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [leaveItCount, intervalDuration, spawnedButtons.length])

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/nyc-jazz.jpg')", // Hintergrundbild (bitte im public-Ordner bereitstellen)
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-2xl max-w-xl text-center z-10">
        <h1 className="mb-8 text-5xl font-serif font-bold text-white">
          Will you be my Valentine?
        </h1>
        {/* Hier kannst du deine eigenen Texte einfügen */}
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleTakeIt}
              className="rounded-full bg-green-500 px-6 py-2 font-semibold text-white transition-all hover:bg-green-600 shadow-lg"
            >
              Take it
            </button>
            {/* Container für den "Leave it"-Button und den daneben angezeigten Kommentar */}
            <div
              className="relative"
              style={{
                transform: `translate(${leaveItPosition.x}px, ${leaveItPosition.y}px)`,
              }}
            >
              <div className="flex items-center">
                <button
                  onClick={handleLeaveIt}
                  className={`rounded-full px-6 py-2 font-semibold text-white transition-all shadow-lg ${
                    leaveItCount >= 4
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {leaveItCount >= 4 ? "Take it" : "Leave it"}
                </button>
                {leaveItCount > 0 && leaveItCount < 4 && (
                  <p className="ml-2 text-xl font-semibold text-white animate-bounce">
                    {getComment()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gespawnte "Take it"-Buttons */}
      {spawnedButtons.map((btn, index) => (
        <button
          key={index}
          onClick={handleTakeIt}
          className="absolute rounded-full bg-green-500 px-4 py-2 font-semibold text-white transition-all hover:bg-green-600 shadow-lg z-10"
          style={{
            left: btn.x,
            top: btn.y,
          }}
        >
          Take it
        </button>
      ))}
    </main>
  )
}
