import FallingCharacter from '../FallingCharacter';

export default function FallingCharacterExample() {
  return (
    <div className="relative h-screen bg-gradient-to-b from-blue-200 to-green-200">
      <FallingCharacter 
        character="日" 
        changjieCode="A"
        position={20} 
        top={20} 
        fruitType={0} 
      />
      <FallingCharacter 
        character="月" 
        changjieCode="B"
        position={50} 
        top={40} 
        fruitType={1} 
      />
      <FallingCharacter 
        character="水" 
        changjieCode="E"
        position={80} 
        top={60} 
        fruitType={2} 
      />
    </div>
  );
}
