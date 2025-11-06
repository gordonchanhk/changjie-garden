import { useEffect } from "react";

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
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (type === 'success') {
    return (
      <div
        className="fixed z-30 pointer-events-none animate-bounce"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="text-4xl font-bold text-primary drop-shadow-lg">
          +{points}
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed z-30 pointer-events-none animate-pulse"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="text-2xl text-destructive drop-shadow-lg">
        ✗
      </div>
    </div>
  );
}
