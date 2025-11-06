'use client'

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, ChevronDown, ChevronUp } from "lucide-react";

interface GameSettingsProps {
  gameMode: string;
  onGameModeChange: (mode: string) => void;
  fallSpeed: string;
  onFallSpeedChange: (speed: string) => void;
}

export default function GameSettings({
  gameMode,
  onGameModeChange,
  fallSpeed,
  onFallSpeedChange,
}: GameSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed top-20 right-4 z-20 w-64">
      <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between hover-elevate"
          data-testid="button-toggle-settings"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">遊戲設定 Settings</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {isExpanded && (
          <div className="p-4 pt-0 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="game-mode" className="text-sm text-foreground">
                遊戲模式 Game Mode
              </Label>
              <Select value={gameMode} onValueChange={onGameModeChange}>
                <SelectTrigger id="game-mode" data-testid="select-game-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="practice">練習 Practice</SelectItem>
                  <SelectItem value="challenge-1">挑戰 1分鐘 1 Min</SelectItem>
                  <SelectItem value="challenge-2">挑戰 2分鐘 2 Min</SelectItem>
                  <SelectItem value="challenge-3">挑戰 3分鐘 3 Min</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fall-speed" className="text-sm text-foreground">
                掉落速度 Fall Speed
              </Label>
              <Select value={fallSpeed} onValueChange={onFallSpeedChange}>
                <SelectTrigger id="fall-speed" data-testid="select-fall-speed">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-slow">很慢 Very Slow</SelectItem>
                  <SelectItem value="slow">慢 Slow (Current)</SelectItem>
                  <SelectItem value="normal">正常 Normal</SelectItem>
                  <SelectItem value="fast">快 Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
