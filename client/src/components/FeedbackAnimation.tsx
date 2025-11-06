import { useEffect } from "react";
import { Sparkles } from "lucide-react";

interface FeedbackAnimationProps {
  type: 'success' | 'miss';
  points?: number;
  position: { x: number; y: number };
  onComplete: () => void;
}

export default function FeedbackAnimation({ 
  type, 
  points = 10, 
  position,
  onComplete 
}: FeedbackAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (type === 'success') {
    return (
      <div
        className="fixed z-30 pointer-events-none"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative">
          <div className="text-4xl font-bold text-primary drop-shadow-lg animate-bounce">
            +{points}
          </div>
          
          <Sparkles className="absolute -top-4 -left-4 w-6 h-6 text-yellow-400 animate-spin" />
          <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-yellow-400 animate-spin" style={{ animationDelay: '0.2s' }} />
          <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-orange-400 animate-spin" style={{ animationDelay: '0.4s' }} />
          <Sparkles className="absolute -bottom-4 -right-4 w-6 h-6 text-orange-400 animate-spin" style={{ animationDelay: '0.6s' }} />
          
          <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ top: '-20px', left: '0' }} />
          <div className="absolute top-0 right-0 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ top: '-10px', right: '-10px', animationDelay: '0.3s' }} />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ bottom: '-10px', left: '-15px', animationDelay: '0.5s' }} />
        </div>
      </div>
    );
  }

  return null;
}
