import { Input } from "@/components/ui/input";
import { Keyboard } from "lucide-react";

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export default function InputArea({ 
  value, 
  onChange, 
  onSubmit,
  placeholder = "輸入倉頡碼 Type Changjie..." 
}: InputAreaProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-11/12 max-w-md">
      <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-3">
          <Keyboard className="w-6 h-6 text-primary flex-shrink-0" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="text-xl h-12 border-2 focus:border-primary"
            autoFocus
            autoComplete="off"
            data-testid="input-changjie"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          按 Enter 提交 Press Enter to submit
        </p>
      </div>
    </div>
  );
}
