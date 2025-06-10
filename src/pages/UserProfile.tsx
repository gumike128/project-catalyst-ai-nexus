
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Mail, 
  Settings, 
  Bell, 
  Shield, 
  Palette,
  Brain,
  Save,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const [maxSuggestions, setMaxSuggestions] = useState(10);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'AI enthusiast and project manager',
    avatar: '/placeholder.svg'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    aiSuggestions: true,
    weeklyReports: false,
    realTimeUpdates: true,
    autoAnalysis: false
  });

  const handleSave = () => {
    console.log('Saving profile:', { profile, preferences, maxSuggestions });
    // TODO: Implement profile save
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <User className="w-8 h-8" />
          Používateľský profil
        </h1>
        <p className="text-muted-foreground mt-1">
          Spravujte svoj profil a nastavenia aplikácie
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Osobné údaje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Nahrať foto
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG max. 5MB
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Meno</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">O mne</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Napíšte niečo o sebe..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Štatistiky účtu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Členstvo od</Label>
              <p className="font-medium">Január 2024</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Vytvorené projekty</Label>
              <p className="font-medium">12</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">AI interakcie</Label>
              <p className="font-medium">148</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Posledná aktivita</Label>
              <p className="font-medium">Dnes</p>
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Nastavenia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maxSuggestions">Maximálny počet AI odporúčaní</Label>
                  <Select value={maxSuggestions.toString()} onValueChange={(value) => setMaxSuggestions(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 odporúčaní</SelectItem>
                      <SelectItem value="10">10 odporúčaní</SelectItem>
                      <SelectItem value="15">15 odporúčaní</SelectItem>
                      <SelectItem value="20">20 odporúčaní</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Počet odporúčaní zobrazovaných v AI Chat tabe
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoAnalysis">Automatická analýza projektov</Label>
                    <p className="text-sm text-muted-foreground">
                      Spúšťa AI analýzu pri vytvorení projektu
                    </p>
                  </div>
                  <Switch 
                    id="autoAnalysis" 
                    checked={preferences.autoAnalysis}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, autoAnalysis: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="aiSuggestions">AI odporúčania</Label>
                    <p className="text-sm text-muted-foreground">
                      Zobrazovať AI odporúčania v dashboarde
                    </p>
                  </div>
                  <Switch 
                    id="aiSuggestions" 
                    checked={preferences.aiSuggestions}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, aiSuggestions: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="realTimeUpdates">Real-time aktualizácie</Label>
                    <p className="text-sm text-muted-foreground">
                      Okamžité notifikácie o zmenách
                    </p>
                  </div>
                  <Switch 
                    id="realTimeUpdates" 
                    checked={preferences.realTimeUpdates}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, realTimeUpdates: checked }))}
                  />
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
              Notifikácie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email notifikácie</Label>
                    <p className="text-sm text-muted-foreground">
                      Dostávať emaily o aktualizáciách projektov
                    </p>
                  </div>
                  <Switch 
                    id="emailNotifications" 
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyReports">Týždenné reporty</Label>
                    <p className="text-sm text-muted-foreground">
                      Súhrn aktivity za týždeň
                    </p>
                  </div>
                  <Switch 
                    id="weeklyReports" 
                    checked={preferences.weeklyReports}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, weeklyReports: checked }))}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="lg:col-span-3 flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Uložiť zmeny
          </Button>
        </div>
      </div>
    </div>
  );
};
