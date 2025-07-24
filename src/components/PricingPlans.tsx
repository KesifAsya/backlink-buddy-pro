import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Shield, Crown, Star } from "lucide-react";
import { toast } from "sonner";

interface PricingPlansProps {
  userPlan: 'free' | 'premium';
  onPlanSelect: (plan: 'free' | 'premium') => void;
}

export const PricingPlans = ({ userPlan, onPlanSelect }: PricingPlansProps) => {
  const plans = [
    {
      name: "Ücretsiz",
      id: "free",
      price: "₺0",
      period: "aylık",
      description: "Başlangıç için ideal",
      icon: <Shield className="h-6 w-6" />,
      features: [
        "10 backlink kontrolü / ay",
        "Günlük 1 kontrol",
        "Manuel kontrol",
        "Temel raporlama",
        "E-posta desteği"
      ],
      limitations: [
        "Otomatik kontrol yok",
        "Bildirimler yok",
        "Detaylı analitik yok"
      ],
      buttonText: userPlan === 'free' ? "Mevcut Plan" : "Ücretsiz Başlat",
      popular: false,
      gradient: "bg-gradient-to-br from-muted to-muted/50"
    },
    {
      name: "Premium",
      id: "premium",
      price: "₺99",
      period: "aylık",
      description: "Profesyonel kullanım",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "100 backlink kontrolü / ay",
        "Saatlik otomatik kontrol",
        "Gerçek zamanlı bildirimler",
        "Detaylı analitik ve raporlar",
        "API erişimi",
        "Öncelikli destek",
        "Toplu URL import",
        "Özel webhook entegrasyonu"
      ],
      limitations: [],
      buttonText: userPlan === 'premium' ? "Mevcut Plan" : "Premium'a Geç",
      popular: true,
      gradient: "bg-gradient-to-br from-premium to-premium-glow"
    }
  ];

  const handlePlanSelect = (planId: 'free' | 'premium') => {
    if (planId === userPlan) {
      toast.info(`Zaten ${planId === 'free' ? 'ücretsiz' : 'premium'} plandayız!`);
      return;
    }

    if (planId === 'premium') {
      // Simulate payment process
      toast.success("Premium plana geçiş başlatıldı! (Demo)");
      setTimeout(() => {
        onPlanSelect('premium');
        toast.success("Premium plana başarıyla geçtiniz!");
      }, 2000);
    } else {
      onPlanSelect('free');
      toast.success("Ücretsiz plana geri döndünüz.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Fiyatlandırma Planları
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          İhtiyacınıza uygun planı seçin ve backlink kontrollerinizi etkili bir şekilde yönetin
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
              plan.popular ? 'ring-2 ring-premium scale-105' : ''
            } ${userPlan === plan.id ? 'ring-2 ring-primary' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-none rounded-bl-lg bg-premium text-premium-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Popüler
                </Badge>
              </div>
            )}

            {userPlan === plan.id && (
              <div className="absolute top-0 left-0">
                <Badge className="rounded-none rounded-br-lg bg-success text-success-foreground">
                  <Check className="h-3 w-3 mr-1" />
                  Aktif Plan
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className={`w-16 h-16 mx-auto rounded-full ${plan.gradient} flex items-center justify-center text-white mb-4`}>
                {plan.icon}
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">
                  {plan.price}
                  <span className="text-sm text-muted-foreground font-normal">/{plan.period}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Özellikler
                </h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              {plan.limitations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Sınırlamalar
                  </h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full bg-destructive/20 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Button */}
              <Button
                onClick={() => handlePlanSelect(plan.id as 'free' | 'premium')}
                variant={
                  userPlan === plan.id ? "outline" :
                  plan.id === 'premium' ? "premium" : "default"
                }
                size="lg"
                className="w-full"
                disabled={userPlan === plan.id}
              >
                {plan.id === 'premium' && userPlan !== 'premium' && (
                  <Zap className="h-4 w-4 mr-2" />
                )}
                {plan.buttonText}
              </Button>

              {plan.id === 'premium' && userPlan !== 'premium' && (
                <p className="text-xs text-center text-muted-foreground">
                  30 gün para iade garantisi
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="mt-12 p-6 rounded-lg bg-muted/50">
        <h3 className="text-lg font-semibold mb-4 text-center">Plan Karşılaştırması</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center">
            <h4 className="font-medium mb-2">Kontrol Sıklığı</h4>
            <p className="text-sm text-muted-foreground">
              Ücretsiz: Günde 1 kez<br />
              Premium: Saatte 1 kez
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-medium mb-2">Otomatik İzleme</h4>
            <p className="text-sm text-muted-foreground">
              Sadece Premium planda<br />
              7/24 otomatik kontrol
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-medium mb-2">Bildirimler</h4>
            <p className="text-sm text-muted-foreground">
              Premium'da anında<br />
              e-posta bildirimleri
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};