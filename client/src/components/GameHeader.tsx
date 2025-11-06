import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  score: number;
  onPause?: () => void;
}

export default function GameHeader({ score, onPause }: GameHeaderProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20 w-11/12 max-w-md">
      <div className="bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-lg shadow-lg px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">得分 Score</p>
            <p className="text-3xl font-bold text-primary" data-testid="text-score">{score}</p>
          </div>
        </div>
        {onPause && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onPause}
            data-testid="button-pause"
          >
            暫停
          </Button>
        )}
      </div>
    </div>
  );
}
