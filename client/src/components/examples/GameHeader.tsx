import GameHeader from '../GameHeader';

export default function GameHeaderExample() {
  return (
    <div className="h-screen bg-gradient-to-b from-blue-200 to-green-200 p-4">
      <GameHeader score={125} onPause={() => console.log('Pause clicked')} />
    </div>
  );
}
