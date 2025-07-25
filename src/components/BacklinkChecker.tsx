import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, ExternalLink, CheckCircle, XCircle, Clock, AlertCircle, Globe } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface BacklinkResult {
  url: string;
  status: 'active' | 'broken' | 'redirect' | 'pending';
  responseTime: number;
  statusCode: number;
  lastChecked: string;
}

interface BacklinkCheckerProps {
  userPlan: 'free' | 'premium';
  remainingChecks: number;
  onCheckComplete: () => void;
}

export const BacklinkChecker = ({ userPlan, remainingChecks, onCheckComplete }: BacklinkCheckerProps) => {
  const { t } = useTranslation();
  const [yourWebsite, setYourWebsite] = useState("");
  const [backlinkSources, setBacklinkSources] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<BacklinkResult[]>([]);
  const [progress, setProgress] = useState(0);

  const mockCheck = async (url: string): Promise<BacklinkResult> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
    
    const statuses: BacklinkResult['status'][] = ['active', 'broken', 'redirect'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      url,
      status: randomStatus,
      responseTime: Math.floor(Math.random() * 500 + 100),
      statusCode: randomStatus === 'active' ? 200 : randomStatus === 'redirect' ? 301 : 404,
      lastChecked: new Date().toLocaleString('tr-TR')
    };
  };

  const handleCheck = async () => {
    if (remainingChecks <= 0) {
      toast.error(t("no_checks_remaining"));
      return;
    }

    if (!yourWebsite.trim()) {
      toast.error("Please enter your website URL");
      return;
    }

    const sourceList = backlinkSources.split('\n').filter(url => url.trim()).slice(0, userPlan === 'free' ? 5 : 50);
    
    if (sourceList.length === 0) {
      toast.error(t("enter_urls"));
      return;
    }

    setIsChecking(true);
    setResults([]);
    setProgress(0);

    const newResults: BacklinkResult[] = [];
    
    for (let i = 0; i < sourceList.length; i++) {
      const url = sourceList[i].trim();
      try {
        // Mock checking if yourWebsite appears in the source URL
        const result = await mockCheck(url);
        newResults.push(result);
        setResults([...newResults]);
        setProgress(((i + 1) / sourceList.length) * 100);
      } catch (error) {
        newResults.push({
          url,
          status: 'broken',
          responseTime: 0,
          statusCode: 500,
          lastChecked: new Date().toLocaleString()
        });
      }
    }

    setIsChecking(false);
    onCheckComplete();
    toast.success(t("backlinks_checked", { count: sourceList.length }));
  };

  const getStatusIcon = (status: BacklinkResult['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'broken':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'redirect':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground animate-spin" />;
    }
  };

  const getStatusBadge = (status: BacklinkResult['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-success text-success-foreground">{t("active")}</Badge>;
      case 'broken':
        return <Badge variant="destructive">{t("broken")}</Badge>;
      case 'redirect':
        return <Badge variant="default" className="bg-warning text-warning-foreground">{t("redirect")}</Badge>;
      case 'pending':
        return <Badge variant="outline">{t("checking_status")}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {t("backlink_control")}
          </CardTitle>
          <CardDescription>
            {userPlan === 'free' 
              ? t("free_plan_limit")
              : t("premium_plan_limit")
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {t("your_website")}
            </Label>
            <Input
              placeholder={t("enter_your_website")}
              value={yourWebsite}
              onChange={(e) => setYourWebsite(e.target.value)}
              disabled={isChecking}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{t("backlink_sources")}</Label>
            <p className="text-xs text-muted-foreground">{t("enter_sources_desc")}</p>
            <Textarea
              className="min-h-[120px] resize-none"
              placeholder={`https://example.com/page1\nhttps://example.com/page2\nhttps://example.com/page3${userPlan === 'premium' ? '\n...' : ''}`}
              value={backlinkSources}
              onChange={(e) => setBacklinkSources(e.target.value)}
              disabled={isChecking}
            />
          </div>

          {isChecking && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{t("checking")}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          <Button 
            onClick={handleCheck} 
            disabled={isChecking || remainingChecks <= 0}
            className="w-full"
            size="lg"
          >
            {isChecking ? (
              <>
                <Clock className="h-4 w-4 animate-spin" />
                {t("checking")}
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                {t("check_backlinks")} ({remainingChecks} {t("remaining_checks")})
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("check_results")}</CardTitle>
            <CardDescription>
              {t("total_checked", { count: results.length })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getStatusIcon(result.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{result.url}</span>
                        <ExternalLink 
                          className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary" 
                          onClick={() => window.open(result.url, '_blank')}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.responseTime}ms • {t("last_check")}: {result.lastChecked}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {result.statusCode}
                    </Badge>
                    {getStatusBadge(result.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};