import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, Search, Shield, Zap } from "lucide-react";

interface HeaderProps {
  userPlan: 'free' | 'premium';
  remainingChecks: number;
  onUpgrade: () => void;
}

export const Header = ({ userPlan, remainingChecks, onUpgrade }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <Link className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              BacklinkControl
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {userPlan === 'free' ? (
              <Badge variant="outline" className="gap-1">
                <Shield className="h-3 w-3" />
                Ücretsiz Plan
              </Badge>
            ) : (
              <Badge className="gap-1 bg-gradient-to-r from-premium to-premium-glow border-0">
                <Zap className="h-3 w-3" />
                Premium Plan
              </Badge>
            )}
            
            <Badge variant="secondary" className="gap-1">
              <Search className="h-3 w-3" />
              {remainingChecks} kontrol kaldı
            </Badge>
          </div>

          {userPlan === 'free' && (
            <Button 
              variant="premium" 
              size="sm"
              onClick={onUpgrade}
              className="font-medium"
            >
              Premium'a Geç
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};