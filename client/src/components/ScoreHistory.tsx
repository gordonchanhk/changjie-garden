import { Trophy, Calendar, Zap, Target, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getScores } from "@/lib/scoreStorage";
import { useEffect, useState } from "react";

export default function ScoreHistory() {
  const [scores, setScores] = useState(getScores());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setScores(getScores());
    };
    
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(() => {
      setScores(getScores());
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '剛剛 Just now';
    if (diffMins < 60) return `${diffMins}分鐘前 ${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}小時前 ${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}天前 ${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getModeLabel = (mode: string) => {
    if (mode === 'practice') return '練習 Practice';
    if (mode === 'challenge-1') return '1分鐘 1 Min';
    if (mode === 'challenge-2') return '2分鐘 2 Min';
    if (mode === 'challenge-3') return '3分鐘 3 Min';
    return mode;
  };

  const getSpeedLabel = (speed: string) => {
    if (speed === 'very-slow') return '很慢 Very Slow';
    if (speed === 'slow') return '慢 Slow';
    if (speed === 'normal') return '正常 Normal';
    if (speed === 'fast') return '快 Fast';
    return speed;
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="fixed top-20 left-4 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-toggle-scores"
          className="bg-white/95 dark:bg-card/95 backdrop-blur-sm shadow-lg"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Scores Panel */}
      {isOpen && (
        <div className="fixed top-20 left-16 z-20 w-64 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">最高分 High Scores</h3>
            </div>
            
            {scores.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                還沒有記錄<br />No scores yet
              </p>
            ) : (
              <div className="space-y-2">
                {scores.map((entry, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      index === 0 
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'bg-muted/50'
                    }`}
                    data-testid={`score-entry-${index}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Trophy className="w-4 h-4 text-primary" />}
                        <span className={`font-bold ${index === 0 ? 'text-primary text-xl' : 'text-foreground text-lg'}`}>
                          {entry.score}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">#{index + 1}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Target className="w-3 h-3" />
                      <span>{getModeLabel(entry.mode)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Zap className="w-3 h-3" />
                      <span>{getSpeedLabel(entry.speed)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(entry.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
