'use client'

import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { queryClient } from "@/lib/queryClient"
import StartScreen from "@/components/StartScreen"
import Game from "@/components/Game"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {!gameStarted ? (
          <StartScreen onStart={() => setGameStarted(true)} />
        ) : (
          <Game />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  )
}
