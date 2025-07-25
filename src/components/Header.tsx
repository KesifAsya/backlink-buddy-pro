import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Activity, Moon, Sun, Monitor, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  userPlan: 'free' | 'premium';
  remainingChecks: number;
  onUpgrade: () => void;
}

export const Header = ({ userPlan, remainingChecks, onUpgrade }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t("backlink_checker")}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Select value={i18n.language} onValueChange={changeLanguage}>
            <SelectTrigger className="w-32">
              <Globe className="h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t("english")}</SelectItem>
              <SelectItem value="tr">{t("turkish")}</SelectItem>
              <SelectItem value="fr">{t("french")}</SelectItem>
              <SelectItem value="de">{t("german")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={theme} onValueChange={(value: any) => setTheme(value)}>
            <SelectTrigger className="w-32">
              {theme === "light" && <Sun className="h-4 w-4" />}
              {theme === "dark" && <Moon className="h-4 w-4" />}
              {theme === "system" && <Monitor className="h-4 w-4" />}
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{t("light")}</SelectItem>
              <SelectItem value="dark">{t("dark")}</SelectItem>
              <SelectItem value="system">{t("system")}</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              {userPlan === 'free' ? t("free") : t("premium")} {t("plan")}
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              {remainingChecks} {t("remaining_checks")}
            </Badge>
          </div>
          
          {userPlan === 'free' && (
            <Button onClick={onUpgrade} size="sm" className="gap-2">
              <CreditCard className="h-4 w-4" />
              {t("upgrade_to_premium")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};