import { useState, useEffect, useCallback } from "react";
import GameHeader from "@/components/GameHeader";
import InputArea from "@/components/InputArea";
import FallingCharacter from "@/components/FallingCharacter";
import FeedbackAnimation from "@/components/FeedbackAnimation";
import GameSettings from "@/components/GameSettings";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import gardenBg from "@assets/generated_images/Cheerful_cartoon_garden_background_c4e43092.png";

interface Character {
  id: number;
  character: string;
  changjieCode: string;
  position: number;
  top: number;
  fruitType: number;
}

interface Feedback {
  id: number;
  type: 'success' | 'miss';
  points?: number;
  position: { x: number; y: number };
}

const characterPool = [
  { character: "日", changjieCode: "A" },
  { character: "月", changjieCode: "B" },
  { character: "水", changjieCode: "E" },
  { character: "火", changjieCode: "F" },
  { character: "木", changjieCode: "D" },
  { character: "金", changjieCode: "C" },
  { character: "土", changjieCode: "G" },
  { character: "人", changjieCode: "O" },
  { character: "心", changjieCode: "P" },
  { character: "手", changjieCode: "Q" },
  { character: "口", changjieCode: "R" },
  { character: "山", changjieCode: "U" },
  { character: "女", changjieCode: "V" },
  { character: "田", changjieCode: "W" },
  { character: "竹", changjieCode: "H" },
];

const SPEED_CONFIG = {
  'very-slow': 0.2,    // 50% slower than current
  'slow': 0.4,         // Current speed
  'normal': 2,         // Original speed
  'fast': 0.46,        // 15% faster than current
};

export default function Game() {
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [fallingChars, setFallingChars] = useState<Character[]>([]);
  const [nextId, setNextId] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [gameSpeed, setGameSpeed] = useState(3000);
  const [gameMode, setGameMode] = useState('practice');
  const [fallSpeed, setFallSpeed] = useState('slow');
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>(undefined);
  const [gameOver, setGameOver] = useState(false);

  const handleGameModeChange = (mode: string) => {
    setGameMode(mode);
    setGameOver(false);
    setScore(0);
    setFallingChars([]);
    setFeedbacks([]);
    
    if (mode === 'challenge-1') {
      setTimeRemaining(60);
    } else if (mode === 'challenge-2') {
      setTimeRemaining(120);
    } else if (mode === 'challenge-3') {
      setTimeRemaining(180);
    } else {
      setTimeRemaining(undefined);
    }
  };

  const handleReset = () => {
    setGameOver(false);
    setScore(0);
    setFallingChars([]);
    setFeedbacks([]);
    setInputValue("");
    
    if (gameMode === 'challenge-1') {
      setTimeRemaining(60);
    } else if (gameMode === 'challenge-2') {
      setTimeRemaining(120);
    } else if (gameMode === 'challenge-3') {
      setTimeRemaining(180);
    }
  };

  useEffect(() => {
    if (gameMode.startsWith('challenge') && timeRemaining !== undefined && timeRemaining > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === undefined || prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameMode, timeRemaining, gameOver]);

  const spawnCharacter = useCallback(() => {
    if (gameOver) return;
    const randomChar = characterPool[Math.floor(Math.random() * characterPool.length)];
    const newChar: Character = {
      id: nextId,
      character: randomChar.character,
      changjieCode: randomChar.changjieCode,
      position: Math.random() * 80 + 10,
      top: -10,
      fruitType: Math.floor(Math.random() * 4),
    };
    setFallingChars(prev => [...prev, newChar]);
    setNextId(prev => prev + 1);
  }, [nextId, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const spawnInterval = setInterval(() => {
      spawnCharacter();
    }, gameSpeed);

    return () => clearInterval(spawnInterval);
  }, [spawnCharacter, gameSpeed, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const currentSpeed = SPEED_CONFIG[fallSpeed as keyof typeof SPEED_CONFIG];
    const fallInterval = setInterval(() => {
      setFallingChars(prev => 
        prev
          .map(char => ({ ...char, top: char.top + currentSpeed }))
          .filter(char => {
            if (char.top > 100) {
              setFeedbacks(f => [...f, {
                id: Date.now(),
                type: 'miss',
                position: { x: char.position, y: 75 }
              }]);
              return false;
            }
            return true;
          })
      );
    }, 50);

    return () => clearInterval(fallInterval);
  }, [fallSpeed, gameOver]);

  const handleSubmit = () => {
    if (!inputValue.trim() || gameOver) return;

    const matchedChar = fallingChars.find(
      char => char.changjieCode.toLowerCase() === inputValue.toLowerCase() || 
              char.character === inputValue
    );

    if (matchedChar) {
      const points = Math.max(10, Math.floor((100 - matchedChar.top) / 5));
      setScore(prev => prev + points);
      setFallingChars(prev => prev.filter(c => c.id !== matchedChar.id));
      setFeedbacks(f => [...f, {
        id: Date.now(),
        type: 'success',
        points,
        position: { x: matchedChar.position, y: matchedChar.top }
      }]);
      
      if (score > 0 && score % 50 === 0) {
        setGameSpeed(prev => Math.max(1500, prev - 200));
      }
    }

    setInputValue("");
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${gardenBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/10" />
      
      <GameHeader score={score} timeRemaining={timeRemaining} />
      <GameSettings 
        gameMode={gameMode}
        onGameModeChange={handleGameModeChange}
        fallSpeed={fallSpeed}
        onFallSpeedChange={setFallSpeed}
      />
      
      <div className="relative w-full h-full" data-testid="game-canvas">
        {fallingChars.map(char => (
          <FallingCharacter
            key={char.id}
            character={char.character}
            changjieCode={char.changjieCode}
            position={char.position}
            top={char.top}
            fruitType={char.fruitType}
          />
        ))}
      </div>

      {feedbacks.map(feedback => (
        <FeedbackAnimation
          key={feedback.id}
          type={feedback.type}
          points={feedback.points}
          position={feedback.position}
          onComplete={() => setFeedbacks(f => f.filter(fb => fb.id !== feedback.id))}
        />
      ))}
      
      {gameOver && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white/95 dark:bg-card/95 rounded-lg shadow-xl p-8 max-w-md text-center space-y-4">
            <h2 className="text-4xl font-bold text-primary">遊戲結束！</h2>
            <h3 className="text-2xl font-semibold text-foreground">Game Over!</h3>
            <div className="py-6">
              <p className="text-muted-foreground mb-2">最終得分 Final Score</p>
              <p className="text-6xl font-bold text-primary" data-testid="text-final-score">{score}</p>
            </div>
            <Button 
              size="lg" 
              onClick={handleReset}
              className="w-full"
              data-testid="button-restart"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              再玩一次 Play Again
            </Button>
          </div>
        </div>
      )}
      
      <InputArea
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
