import { useState, useEffect, useCallback } from "react";
import GameHeader from "@/components/GameHeader";
import InputArea from "@/components/InputArea";
import FallingCharacter from "@/components/FallingCharacter";
import FeedbackAnimation from "@/components/FeedbackAnimation";
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

export default function Game() {
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [fallingChars, setFallingChars] = useState<Character[]>([]);
  const [nextId, setNextId] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [gameSpeed, setGameSpeed] = useState(3000);

  const spawnCharacter = useCallback(() => {
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
  }, [nextId]);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      spawnCharacter();
    }, gameSpeed);

    return () => clearInterval(spawnInterval);
  }, [spawnCharacter, gameSpeed]);

  useEffect(() => {
    const fallInterval = setInterval(() => {
      setFallingChars(prev => 
        prev
          .map(char => ({ ...char, top: char.top + 0.4 }))
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
  }, []);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    const matchedChar = fallingChars.find(
      char => char.changjieCode.toLowerCase() === inputValue.toLowerCase()
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
      
      <GameHeader score={score} />
      
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
      
      <InputArea
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
