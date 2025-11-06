import { useState } from 'react';
import FeedbackAnimation from '../FeedbackAnimation';
import { Button } from '@/components/ui/button';

export default function FeedbackAnimationExample() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMiss, setShowMiss] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-b from-blue-200 to-green-200 p-4 flex items-center justify-center gap-4">
      <Button onClick={() => setShowSuccess(true)} data-testid="button-show-success">
        Show Success
      </Button>
      <Button onClick={() => setShowMiss(true)} data-testid="button-show-miss">
        Show Miss
      </Button>
      
      {showSuccess && (
        <FeedbackAnimation 
          type="success"
          points={10}
          position={{ x: 50, y: 50 }}
          onComplete={() => setShowSuccess(false)}
        />
      )}
      
      {showMiss && (
        <FeedbackAnimation 
          type="miss"
          position={{ x: 50, y: 50 }}
          onComplete={() => setShowMiss(false)}
        />
      )}
    </div>
  );
}
