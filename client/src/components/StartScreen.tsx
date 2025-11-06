import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import gardenBg from "@assets/generated_images/Cheerful_cartoon_garden_background_c4e43092.png";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${gardenBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-green-900/20" />
      
      <div className="relative z-10 text-center space-y-6 p-6 max-w-md">
        <h1 className="text-5xl sm:text-6xl font-bold text-white drop-shadow-lg" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
          倉頡花園
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white drop-shadow-md">
          Changjie Garden
        </h2>
        
        <div className="bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-lg p-6 shadow-xl space-y-4">
          <div className="flex items-start gap-3 text-left">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="text-sm text-foreground">
                打字遊戲，練習倉頡輸入法！
              </p>
              <p className="text-sm text-muted-foreground">
                Type the Changjie code to match falling characters and score points!
              </p>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="w-full h-14 text-xl"
            onClick={onStart}
            data-testid="button-start-game"
          >
            <Play className="w-6 h-6 mr-2" />
            開始遊戲 Start Game
          </Button>
        </div>
      </div>
    </div>
  );
}
