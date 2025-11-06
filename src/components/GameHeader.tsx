'use client'

import { Trophy, Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  score: number;
  onPause?: () => void;
  onRestart?: () => void;
  timeRemaining?: number;
}

export default function GameHeader({ score, onPause, onRestart, timeRemaining }: GameHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
        
        <div className="flex items-center gap-2">
          {timeRemaining !== undefined && (
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">時間 Time</p>
                <p className="text-xl font-bold text-primary" data-testid="text-time">{formatTime(timeRemaining)}</p>
              </div>
            </div>
          )}
          {onRestart && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRestart}
              data-testid="button-restart-header"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
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
    </div>
  );
}
