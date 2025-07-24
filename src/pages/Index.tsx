import { useState } from "react";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { BacklinkChecker } from "@/components/BacklinkChecker";
import { PricingPlans } from "@/components/PricingPlans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Index = () => {
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [remainingChecks, setRemainingChecks] = useState(10);
  
  const totalChecks = userPlan === 'free' ? 10 : 100;

  const handleUpgrade = () => {
    toast.info("Premium plana geçiş için Fiyatlandırma sekmesine gidin!");
  };

  const handleCheckComplete = () => {
    if (remainingChecks > 0) {
      setRemainingChecks(prev => prev - 1);
    }
  };

  const handlePlanSelect = (plan: 'free' | 'premium') => {
    setUserPlan(plan);
    setRemainingChecks(plan === 'free' ? 10 : 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userPlan={userPlan}
        remainingChecks={remainingChecks}
        onUpgrade={handleUpgrade}
      />
      
      <main className="container py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="checker">Backlink Kontrol</TabsTrigger>
            <TabsTrigger value="pricing">Fiyatlandırma</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <Dashboard 
              userPlan={userPlan}
              remainingChecks={remainingChecks}
              totalChecks={totalChecks}
            />
          </TabsContent>
          
          <TabsContent value="checker" className="mt-6">
            <BacklinkChecker 
              userPlan={userPlan}
              remainingChecks={remainingChecks}
              onCheckComplete={handleCheckComplete}
            />
          </TabsContent>
          
          <TabsContent value="pricing" className="mt-6">
            <PricingPlans 
              userPlan={userPlan}
              onPlanSelect={handlePlanSelect}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;