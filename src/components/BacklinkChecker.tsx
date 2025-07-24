import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, ExternalLink, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

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
  const [urls, setUrls] = useState("");
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
      toast.error("Kontrol hakkınız kalmadı. Premium plana geçin!");
      return;
    }

    const urlList = urls.split('\n').filter(url => url.trim()).slice(0, userPlan === 'free' ? 5 : 50);
    
    if (urlList.length === 0) {
      toast.error("Lütfen kontrol edilecek URL'leri girin");
      return;
    }

    setIsChecking(true);
    setResults([]);
    setProgress(0);

    const newResults: BacklinkResult[] = [];
    
    for (let i = 0; i < urlList.length; i++) {
      const url = urlList[i].trim();
      try {
        const result = await mockCheck(url);
        newResults.push(result);
        setResults([...newResults]);
        setProgress(((i + 1) / urlList.length) * 100);
      } catch (error) {
        newResults.push({
          url,
          status: 'broken',
          responseTime: 0,
          statusCode: 500,
          lastChecked: new Date().toLocaleString('tr-TR')
        });
      }
    }

    setIsChecking(false);
    onCheckComplete();
    toast.success(`${urlList.length} backlink kontrolü tamamlandı!`);
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
        return <Badge variant="default" className="bg-success text-success-foreground">Aktif</Badge>;
      case 'broken':
        return <Badge variant="destructive">Kırık</Badge>;
      case 'redirect':
        return <Badge variant="default" className="bg-warning text-warning-foreground">Yönlendirme</Badge>;
      case 'pending':
        return <Badge variant="outline">Kontrol Ediliyor...</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Backlink Kontrolü
          </CardTitle>
          <CardDescription>
            {userPlan === 'free' 
              ? "Ücretsiz planda aynı anda en fazla 5 URL kontrol edebilirsiniz."
              : "Premium planda aynı anda en fazla 50 URL kontrol edebilirsiniz."
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">URL'leri girin (her satıra bir URL)</label>
            <textarea
              className="w-full min-h-[120px] px-3 py-2 text-sm border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder={`https://example.com/page1\nhttps://example.com/page2\nhttps://example.com/page3${userPlan === 'premium' ? '\n...' : ''}`}
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              disabled={isChecking}
            />
          </div>

          {isChecking && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Kontrol ediliyor...</span>
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
                Kontrol Ediliyor...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Kontrol Et ({remainingChecks} hak kaldı)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Kontrol Sonuçları</CardTitle>
            <CardDescription>
              Toplam {results.length} URL kontrol edildi
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
                        {result.responseTime}ms • Son kontrol: {result.lastChecked}
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