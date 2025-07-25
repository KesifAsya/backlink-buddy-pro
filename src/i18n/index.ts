import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      "backlink_checker": "Backlink Checker",
      "remaining_checks": "Remaining Checks",
      "upgrade_to_premium": "Upgrade to Premium",
      
      // Navigation
      "dashboard": "Dashboard",
      "backlink_control": "Backlink Control", 
      "pricing": "Pricing",
      
      // Dashboard
      "welcome_back": "Welcome Back!",
      "account_summary": "Account Summary",
      "plan": "Plan",
      "free": "Free",
      "premium": "Premium",
      "checks_used": "Checks Used",
      "monthly_limit": "Monthly Limit",
      "quick_stats": "Quick Stats",
      "active_backlinks": "Active Backlinks",
      "broken_backlinks": "Broken Backlinks",
      "total_monitored": "Total Monitored",
      "success_rate": "Success Rate",
      "recent_activity": "Recent Activity",
      "no_recent_activity": "No recent activity",
      
      // Backlink Checker
      "your_website": "Your Website",
      "enter_your_website": "Enter your website URL",
      "backlink_sources": "Backlink Sources",
      "enter_sources_desc": "Enter the websites where you expect to find backlinks to your site (one URL per line)",
      "free_plan_limit": "Free plan allows checking up to 5 sources at once.",
      "premium_plan_limit": "Premium plan allows checking up to 50 sources at once.",
      "check_backlinks": "Check Backlinks",
      "checking": "Checking...",
      "check_results": "Check Results",
      "total_checked": "Total {{count}} sources checked",
      "active": "Active",
      "broken": "Broken", 
      "redirect": "Redirect",
      "checking_status": "Checking...",
      "last_check": "Last check",
      "no_checks_remaining": "No checks remaining. Upgrade to Premium!",
      "enter_urls": "Please enter URLs to check",
      "backlinks_checked": "{{count}} backlink check completed!",
      
      // Backlink Management
      "backlink_management": "Backlink Management",
      "add_backlink": "Add Backlink",
      "purchase_info": "Purchase Information",
      "seller_name": "Seller Name/Nickname",
      "contact_info": "Contact Information",
      "duration": "Duration",
      "months": "{{count}} months",
      "1_month": "1 month",
      "3_months": "3 months", 
      "6_months": "6 months",
      "12_months": "12 months",
      "source_url": "Source URL",
      "target_url": "Target URL",
      "save_backlink": "Save Backlink",
      "purchased_backlinks": "Purchased Backlinks",
      "seller": "Seller",
      "expires": "Expires",
      
      // Notifications
      "notification_settings": "Notification Settings",
      "email_notifications": "Email Notifications",
      "sms_notifications": "SMS Notifications", 
      "notify_broken_backlinks": "Notify when backlinks are broken",
      "notify_before_expiry": "Notify before backlink expiry",
      "email_address": "Email Address",
      "phone_number": "Phone Number",
      "save_settings": "Save Settings",
      
      // Pricing
      "choose_plan": "Choose Your Plan",
      "current_plan": "Current Plan",
      "select_plan": "Select Plan",
      "monthly": "Monthly",
      "checks_per_month": "checks per month",
      "manual_checking": "Manual checking only",
      "daily_limit": "Daily checking limit",
      "automatic_checking": "Automatic checking",
      "hourly_checks": "Hourly checks available",
      "email_sms_alerts": "Email & SMS alerts",
      "detailed_reports": "Detailed reports",
      "priority_support": "Priority support",
      
      // Theme
      "theme": "Theme",
      "light": "Light",
      "dark": "Dark",
      "system": "System",
      
      // Language
      "language": "Language",
      "english": "English",
      "turkish": "Türkçe",
      "french": "Français",
      "german": "Deutsch"
    }
  },
  tr: {
    translation: {
      // Header
      "backlink_checker": "Backlink Kontrol",
      "remaining_checks": "Kalan Kontrol",
      "upgrade_to_premium": "Premium'a Geç",
      
      // Navigation
      "dashboard": "Dashboard", 
      "backlink_control": "Backlink Kontrol",
      "pricing": "Fiyatlandırma",
      
      // Dashboard
      "welcome_back": "Tekrar Hoş Geldiniz!",
      "account_summary": "Hesap Özeti",
      "plan": "Plan",
      "free": "Ücretsiz",
      "premium": "Premium",
      "checks_used": "Kullanılan Kontrol",
      "monthly_limit": "Aylık Limit",
      "quick_stats": "Hızlı İstatistikler",
      "active_backlinks": "Aktif Backlinkler",
      "broken_backlinks": "Kırık Backlinkler", 
      "total_monitored": "Toplam İzlenen",
      "success_rate": "Başarı Oranı",
      "recent_activity": "Son Aktiviteler",
      "no_recent_activity": "Son aktivite yok",
      
      // Backlink Checker
      "your_website": "Web Siteniz",
      "enter_your_website": "Web sitenizin URL'sini girin",
      "backlink_sources": "Backlink Kaynakları",
      "enter_sources_desc": "Sitenize backlink verdiğini düşündüğünüz web sitelerini girin (her satıra bir URL)",
      "free_plan_limit": "Ücretsiz planda aynı anda en fazla 5 kaynak kontrol edebilirsiniz.",
      "premium_plan_limit": "Premium planda aynı anda en fazla 50 kaynak kontrol edebilirsiniz.",
      "check_backlinks": "Backlink Kontrol Et",
      "checking": "Kontrol Ediliyor...",
      "check_results": "Kontrol Sonuçları",
      "total_checked": "Toplam {{count}} kaynak kontrol edildi",
      "active": "Aktif",
      "broken": "Kırık",
      "redirect": "Yönlendirme", 
      "checking_status": "Kontrol Ediliyor...",
      "last_check": "Son kontrol",
      "no_checks_remaining": "Kontrol hakkınız kalmadı. Premium plana geçin!",
      "enter_urls": "Lütfen kontrol edilecek URL'leri girin",
      "backlinks_checked": "{{count}} backlink kontrolü tamamlandı!",
      
      // Backlink Management
      "backlink_management": "Backlink Yönetimi",
      "add_backlink": "Backlink Ekle",
      "purchase_info": "Satın Alma Bilgileri",
      "seller_name": "Satıcı Adı/Takma Adı",
      "contact_info": "İletişim Bilgileri",
      "duration": "Süre",
      "months": "{{count}} ay",
      "1_month": "1 ay",
      "3_months": "3 ay",
      "6_months": "6 ay", 
      "12_months": "12 ay",
      "source_url": "Kaynak URL",
      "target_url": "Hedef URL",
      "save_backlink": "Backlink Kaydet",
      "purchased_backlinks": "Satın Alınan Backlinkler",
      "seller": "Satıcı",
      "expires": "Bitiş",
      
      // Notifications
      "notification_settings": "Bildirim Ayarları",
      "email_notifications": "E-posta Bildirimleri",
      "sms_notifications": "SMS Bildirimleri",
      "notify_broken_backlinks": "Backlinkler kırıldığında bildir",
      "notify_before_expiry": "Backlink bitiminden önce bildir",
      "email_address": "E-posta Adresi",
      "phone_number": "Telefon Numarası",
      "save_settings": "Ayarları Kaydet",
      
      // Pricing
      "choose_plan": "Planınızı Seçin",
      "current_plan": "Mevcut Plan",
      "select_plan": "Plan Seç",
      "monthly": "Aylık",
      "checks_per_month": "aylık kontrol",
      "manual_checking": "Sadece manuel kontrol",
      "daily_limit": "Günlük kontrol sınırı",
      "automatic_checking": "Otomatik kontrol",
      "hourly_checks": "Saatlik kontrol mevcut",
      "email_sms_alerts": "E-posta ve SMS uyarıları",
      "detailed_reports": "Detaylı raporlar",
      "priority_support": "Öncelikli destek",
      
      // Theme
      "theme": "Tema",
      "light": "Açık",
      "dark": "Koyu",
      "system": "Sistem",
      
      // Language
      "language": "Dil",
      "english": "English",
      "turkish": "Türkçe", 
      "french": "Français",
      "german": "Deutsch"
    }
  },
  fr: {
    translation: {
      "backlink_checker": "Vérificateur de Backlinks",
      "remaining_checks": "Vérifications Restantes",
      "upgrade_to_premium": "Passer à Premium",
      "dashboard": "Tableau de Bord",
      "backlink_control": "Contrôle des Backlinks",
      "pricing": "Tarification",
      "language": "Langue",
      "english": "English",
      "turkish": "Türkçe",
      "french": "Français", 
      "german": "Deutsch"
    }
  },
  de: {
    translation: {
      "backlink_checker": "Backlink-Checker",
      "remaining_checks": "Verbleibende Prüfungen",
      "upgrade_to_premium": "Auf Premium upgraden",
      "dashboard": "Dashboard",
      "backlink_control": "Backlink-Kontrolle",
      "pricing": "Preise",
      "language": "Sprache",
      "english": "English",
      "turkish": "Türkçe",
      "french": "Français",
      "german": "Deutsch"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;