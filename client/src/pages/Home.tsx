import { useState } from "react";
import StartScreen from "@/components/StartScreen";
import Game from "./Game";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return <StartScreen onStart={() => setGameStarted(true)} />;
  }

  return <Game />;
}
