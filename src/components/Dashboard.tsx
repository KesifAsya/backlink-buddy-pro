import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, Zap, BarChart3, PieChart } from "lucide-react";

interface DashboardProps {
  userPlan: 'free' | 'premium';
  remainingChecks: number;
  totalChecks: number;
}

export const Dashboard = ({ userPlan, remainingChecks, totalChecks }: DashboardProps) => {
  const usedChecks = totalChecks - remainingChecks;
  const usagePercentage = (usedChecks / totalChecks) * 100;

  // Mock data for charts
  const weeklyData = [
    { day: 'Pzt', checks: 12, active: 10, broken: 2 },
    { day: 'Sal', checks: 19, active: 16, broken: 3 },
    { day: 'Çar', checks: 8, active: 7, broken: 1 },
    { day: 'Per', checks: 15, active: 12, broken: 3 },
    { day: 'Cum', checks: 22, active: 18, broken: 4 },
    { day: 'Cmt', checks: 5, active: 4, broken: 1 },
    { day: 'Paz', checks: 3, active: 3, broken: 0 },
  ];

  const statusData = [
    { name: 'Aktif', value: 156, color: 'hsl(var(--success))' },
    { name: 'Kırık', value: 24, color: 'hsl(var(--destructive))' },
    { name: 'Yönlendirme', value: 12, color: 'hsl(var(--warning))' },
  ];

  const recentChecks = [
    { url: 'https://example.com/page1', status: 'active', time: '2 dakika önce' },
    { url: 'https://example.com/page2', status: 'broken', time: '5 dakika önce' },
    { url: 'https://example.com/page3', status: 'active', time: '10 dakika önce' },
    { url: 'https://example.com/page4', status: 'redirect', time: '15 dakika önce' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'broken':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'redirect':
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kalan Kontrol</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{remainingChecks}</div>
            <p className="text-xs text-muted-foreground">
              {totalChecks} toplam hak
            </p>
            <div className="mt-2">
              <Progress value={usagePercentage} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Hafta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground">
              +20.1% geçen haftaya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Linkler</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              81.2% başarı oranı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kırık Linkler</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              -5.4% geçen haftaya göre
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Haftalık Aktivite
            </CardTitle>
            <CardDescription>
              Son 7 günde yapılan kontroller
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-8">{day.day}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success"></div>
                      <span className="text-xs text-muted-foreground">{day.active} aktif</span>
                      <div className="w-2 h-2 rounded-full bg-destructive ml-2"></div>
                      <span className="text-xs text-muted-foreground">{day.broken} kırık</span>
                    </div>
                  </div>
                  <Badge variant="outline">{day.checks} toplam</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Link Durumu Dağılımı
            </CardTitle>
            <CardDescription>
              Toplam kontrol edilen linklerin durumu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusData.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-sm font-medium">{status.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{status.value}</span>
                    <Progress 
                      value={(status.value / 192) * 100} 
                      className="w-16 h-2" 
                    />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Toplam Kontrol</span>
                  <span>192 link</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Son Kontroller</CardTitle>
            <CardDescription>
              En son yapılan backlink kontrolleri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {check.url}
                      </p>
                      <p className="text-xs text-muted-foreground">{check.time}</p>
                    </div>
                  </div>
                  <Badge variant={
                    check.status === 'active' ? 'default' :
                    check.status === 'broken' ? 'destructive' : 'secondary'
                  } className={
                    check.status === 'active' ? 'bg-success text-success-foreground' :
                    check.status === 'redirect' ? 'bg-warning text-warning-foreground' : ''
                  }>
                    {check.status === 'active' ? 'Aktif' :
                     check.status === 'broken' ? 'Kırık' : 'Yönlendirme'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {userPlan === 'premium' ? (
                <Zap className="h-5 w-5 text-premium" />
              ) : (
                <Activity className="h-5 w-5" />
              )}
              {userPlan === 'premium' ? 'Premium Plan' : 'Ücretsiz Plan'}
            </CardTitle>
            <CardDescription>
              Mevcut plan özellikleriniz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Kontrol Limiti</span>
                <span className="text-sm font-medium">{totalChecks} / ay</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Kontrol Sıklığı</span>
                <span className="text-sm font-medium">
                  {userPlan === 'premium' ? 'Saatlik' : 'Günlük'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Otomatik Kontrol</span>
                <span className="text-sm font-medium">
                  {userPlan === 'premium' ? 'Aktif' : 'Pasif'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">E-posta Bildirimleri</span>
                <span className="text-sm font-medium">
                  {userPlan === 'premium' ? 'Aktif' : 'Pasif'}
                </span>
              </div>
            </div>
            
            {userPlan === 'free' && (
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  Premium plana geçerek daha fazla özellik kullanabilirsiniz.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};