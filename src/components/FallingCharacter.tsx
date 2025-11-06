import { Apple, Cherry, Grape, Rainbow } from "lucide-react";

interface FallingCharacterProps {
  character: string;
  changjieCode: string;
  position: number;
  top: number;
  fruitType: number;
  onMatch?: () => void;
}

const fruits = [
  { icon: Apple, color: "bg-red-400", name: "apple" },
  { icon: Rainbow, color: "bg-orange-400", name: "orange" },
  { icon: Grape, color: "bg-purple-400", name: "grape" },
  { icon: Cherry, color: "bg-pink-400", name: "cherry" },
];

export default function FallingCharacter({
  character,
  position,
  top,
  fruitType,
}: FallingCharacterProps) {
  const fruit = fruits[fruitType % fruits.length];
  const FruitIcon = fruit.icon;

  return (
    <div
      className="absolute transition-all duration-100 ease-linear"
      style={{
        left: `${position}%`,
        top: `${top}%`,
        transform: 'translateX(-50%)',
      }}
      data-testid={`falling-character-${character}`}
    >
      <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full ${fruit.color} flex items-center justify-center shadow-lg animate-pulse`}>
        <FruitIcon className="absolute inset-0 w-full h-full text-white opacity-20" />
        <span className="relative z-10 text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
          {character}
        </span>
      </div>
    </div>
  );
}
