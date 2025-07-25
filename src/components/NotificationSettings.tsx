import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export const NotificationSettings = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    notifyBrokenBacklinks: true,
    notifyBeforeExpiry: true,
    emailAddress: "",
    phoneNumber: ""
  });

  const handleSaveSettings = () => {
    // Here you would integrate with NetGSM and email service
    toast.success(t("save_settings") + " - Integration with NetGSM/Email pending");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          {t("notification_settings")}
        </CardTitle>
        <CardDescription>
          Configure how you want to be notified about backlink issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t("email_notifications")}
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive email alerts for important events
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => 
                setSettings({...settings, emailNotifications: checked})
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {t("sms_notifications")}
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive SMS alerts via NetGSM integration
              </p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => 
                setSettings({...settings, smsNotifications: checked})
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notification Types</h3>
          
          <div className="flex items-center justify-between">
            <Label>{t("notify_broken_backlinks")}</Label>
            <Switch
              checked={settings.notifyBrokenBacklinks}
              onCheckedChange={(checked) => 
                setSettings({...settings, notifyBrokenBacklinks: checked})
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>{t("notify_before_expiry")}</Label>
            <Switch
              checked={settings.notifyBeforeExpiry}
              onCheckedChange={(checked) => 
                setSettings({...settings, notifyBeforeExpiry: checked})
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t("email_address")}</Label>
            <Input
              id="email"
              type="email"
              value={settings.emailAddress}
              onChange={(e) => setSettings({...settings, emailAddress: e.target.value})}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone_number")}</Label>
            <Input
              id="phone"
              type="tel"
              value={settings.phoneNumber}
              onChange={(e) => setSettings({...settings, phoneNumber: e.target.value})}
              placeholder="+90 555 123 45 67"
            />
          </div>
        </div>

        <Button onClick={handleSaveSettings} className="w-full">
          {t("save_settings")}
        </Button>
      </CardContent>
    </Card>
  );
};