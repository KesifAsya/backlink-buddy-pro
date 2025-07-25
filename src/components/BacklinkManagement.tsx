import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, User, Clock, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface PurchasedBacklink {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  sellerName: string;
  contactInfo: string;
  duration: number;
  purchaseDate: string;
  expiryDate: string;
}

export const BacklinkManagement = () => {
  const { t } = useTranslation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [purchasedBacklinks, setPurchasedBacklinks] = useState<PurchasedBacklink[]>([]);
  
  const [formData, setFormData] = useState({
    sourceUrl: "",
    targetUrl: "",
    sellerName: "",
    contactInfo: "",
    duration: "1"
  });

  const handleAddBacklink = () => {
    if (!formData.sourceUrl || !formData.targetUrl || !formData.sellerName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const purchaseDate = new Date();
    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + parseInt(formData.duration));

    const newBacklink: PurchasedBacklink = {
      id: Date.now().toString(),
      sourceUrl: formData.sourceUrl,
      targetUrl: formData.targetUrl,
      sellerName: formData.sellerName,
      contactInfo: formData.contactInfo,
      duration: parseInt(formData.duration),
      purchaseDate: purchaseDate.toLocaleDateString(),
      expiryDate: expiryDate.toLocaleDateString()
    };

    setPurchasedBacklinks([...purchasedBacklinks, newBacklink]);
    setFormData({
      sourceUrl: "",
      targetUrl: "",
      sellerName: "",
      contactInfo: "",
      duration: "1"
    });
    setShowAddForm(false);
    toast.success("Backlink added successfully!");
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t("backlink_management")}
              </CardTitle>
              <CardDescription>
                Track your purchased backlinks and their expiry dates
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4" />
              {t("add_backlink")}
            </Button>
          </div>
        </CardHeader>
        
        {showAddForm && (
          <CardContent className="border-t">
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold">{t("purchase_info")}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sellerName">{t("seller_name")}</Label>
                  <Input
                    id="sellerName"
                    value={formData.sellerName}
                    onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
                    placeholder="John Doe or @username"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactInfo">{t("contact_info")}</Label>
                  <Input
                    id="contactInfo"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                    placeholder="Email or phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">{t("duration")}</Label>
                  <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{t("1_month")}</SelectItem>
                      <SelectItem value="3">{t("3_months")}</SelectItem>
                      <SelectItem value="6">{t("6_months")}</SelectItem>
                      <SelectItem value="12">{t("12_months")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sourceUrl">{t("source_url")}</Label>
                  <Input
                    id="sourceUrl"
                    value={formData.sourceUrl}
                    onChange={(e) => setFormData({...formData, sourceUrl: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetUrl">{t("target_url")}</Label>
                  <Input
                    id="targetUrl"
                    value={formData.targetUrl}
                    onChange={(e) => setFormData({...formData, targetUrl: e.target.value})}
                    placeholder="https://yoursite.com"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleAddBacklink}>{t("save_backlink")}</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {purchasedBacklinks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("purchased_backlinks")}</CardTitle>
            <CardDescription>
              Manage your backlink portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purchasedBacklinks.map((backlink) => {
                const daysLeft = getDaysUntilExpiry(backlink.expiryDate);
                return (
                  <div key={backlink.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{backlink.sourceUrl}</span>
                        <ExternalLink 
                          className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary"
                          onClick={() => window.open(backlink.sourceUrl, '_blank')}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("seller")}: {backlink.sellerName} • {backlink.contactInfo}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Target: {backlink.targetUrl}
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant={daysLeft < 30 ? "destructive" : "default"}>
                        <Clock className="h-3 w-3 mr-1" />
                        {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {t("expires")}: {backlink.expiryDate}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};