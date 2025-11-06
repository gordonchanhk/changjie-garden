import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-200 to-green-200">
      <div className="text-center space-y-6 p-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-foreground">Page not found</p>
        <Link href="/">
          <Button data-testid="link-home">
            <Home className="w-4 h-4 mr-2" />
            回家 Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
