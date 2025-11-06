import { useState } from 'react';
import InputArea from '../InputArea';

export default function InputAreaExample() {
  const [value, setValue] = useState('');

  return (
    <div className="h-screen bg-gradient-to-b from-blue-200 to-green-200 p-4">
      <InputArea 
        value={value}
        onChange={setValue}
        onSubmit={() => {
          console.log('Submitted:', value);
          setValue('');
        }}
      />
    </div>
  );
}
