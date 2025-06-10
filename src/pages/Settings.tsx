
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings as SettingsIcon, 
  User, 
  Globe, 
  Bell,
  Monitor,
  Key,
  Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <SettingsIcon className="w-8 h-8" />
          {t('settings.title')}
        </h1>
        <p className="text-muted-foreground mt-1">
          Spravujte nastavenia aplikácie a integrácie
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              {t('settings.general')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t('settings.language')}
              </Label>
              <Select value={i18n.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sk">Slovenčina</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Display Settings */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Zobrazenie
              </Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-mode">Kompaktný režim</Label>
                    <p className="text-sm text-muted-foreground">
                      Zobraziť viac obsahu na obrazovke
                    </p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Animácie</Label>
                    <p className="text-sm text-muted-foreground">
                      Povoliť animácie rozhrania
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {t('settings.account')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Email</Label>
              <p className="font-medium">user@example.com</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Plan</Label>
              <p className="font-medium">Professional</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Member since</Label>
              <p className="font-medium">January 2024</p>
            </div>
            <Button variant="outline" className="w-full">
              Manage Account
            </Button>
          </CardContent>
        </Card>

        {/* API Integration */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Integrácie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>OpenAI API</Label>
                    <p className="text-sm text-muted-foreground">
                      GPT-4 a DALL-E integrácia
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-600">Aktívne</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Google Gemini</Label>
                    <p className="text-sm text-muted-foreground">
                      Gemini Pro AI model
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Konfigurovať</Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Anthropic Claude</Label>
                    <p className="text-sm text-muted-foreground">
                      Claude AI asistent
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Pridať</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Supabase</Label>
                    <p className="text-sm text-muted-foreground">
                      Database a autentifikácia
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-600">Pripojené</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {t('settings.notifications')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">{t('settings.emailNotifications')}</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your projects
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="project-updates">{t('settings.projectUpdates')}</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when projects are analyzed
                    </p>
                  </div>
                  <Switch id="project-updates" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-insights">{t('settings.aiInsights')}</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive AI-generated insights and recommendations
                    </p>
                  </div>
                  <Switch id="ai-insights" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">{t('settings.weeklyReports')}</Label>
                    <p className="text-sm text-muted-foreground">
                      Weekly summary of your project progress
                    </p>
                  </div>
                  <Switch id="weekly-reports" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
