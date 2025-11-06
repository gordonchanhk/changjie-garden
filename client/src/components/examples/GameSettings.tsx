import { useState } from 'react';
import GameSettings from '../GameSettings';

export default function GameSettingsExample() {
  const [gameMode, setGameMode] = useState('practice');
  const [fallSpeed, setFallSpeed] = useState('slow');

  return (
    <div className="h-screen bg-gradient-to-b from-blue-200 to-green-200 p-4">
      <GameSettings
        gameMode={gameMode}
        onGameModeChange={(mode) => {
          console.log('Game mode changed to:', mode);
          setGameMode(mode);
        }}
        fallSpeed={fallSpeed}
        onFallSpeedChange={(speed) => {
          console.log('Fall speed changed to:', speed);
          setFallSpeed(speed);
        }}
      />
    </div>
  );
}
