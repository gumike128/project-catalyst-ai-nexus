
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Key, 
  Camera,
  Save,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Github,
  Linkedin,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+421 900 123 456',
    location: 'Bratislava, Slovakia',
    bio: 'Senior Full-Stack Developer s passion for AI and modern web technologies. Experienced in React, Node.js, and cloud architecture.',
    company: 'Tech Innovations Ltd.',
    website: 'https://johndoe.dev',
    github: 'johndoe',
    linkedin: 'johndoe',
    joinDate: '2024-01-15'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    projectUpdates: true,
    marketingEmails: false,
    twoFactorAuth: false,
    publicProfile: true,
    showEmail: false,
    showPhone: false
  });

  const handleSave = () => {
    // Save profile data
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setIsEditing(false);
    // Show success toast
    console.log('Profile saved successfully');
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const stats = {
    projectsCreated: 12,
    aiPrompsUsed: 156,
    analysesRun: 48,
    totalTime: '34h 26m'
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <User className="w-8 h-8" />
            Používateľský profil
          </h1>
          <p className="text-muted-foreground mt-1">
            Spravujte svoj účet a osobné nastavenia
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Zrušiť
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Uložiť zmeny
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="w-4 h-4 mr-2" />
              Upraviť profil
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Summary */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" alt={profileData.name} />
                  <AvatarFallback className="text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">{profileData.name}</h3>
                <p className="text-muted-foreground">{profileData.email}</p>
                <p className="text-sm text-muted-foreground">{profileData.company}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <Badge variant="outline">Professional</Badge>
                <Badge variant="outline" className="text-green-600">Verified</Badge>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 mt-4">
                {profileData.website && (
                  <Button variant="ghost" size="sm" className="p-2">
                    <Globe className="w-4 h-4" />
                  </Button>
                )}
                {profileData.github && (
                  <Button variant="ghost" size="sm" className="p-2">
                    <Github className="w-4 h-4" />
                  </Button>
                )}
                {profileData.linkedin && (
                  <Button variant="ghost" size="sm" className="p-2">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Nastavenia
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Bezpečnosť
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Štatistiky
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Osobné informácie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Meno a priezvisko</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefón</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Lokácia</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Spoločnosť</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Webstránka</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">O mne</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="github">GitHub username</Label>
                      <Input
                        id="github"
                        value={profileData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        disabled={!isEditing}
                        placeholder="username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn username</Label>
                      <Input
                        id="linkedin"
                        value={profileData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        disabled={!isEditing}
                        placeholder="username"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Notifikácie a preferencie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Email notifikácie</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">Email notifikácie</Label>
                          <p className="text-sm text-muted-foreground">
                            Dostávať dôležité upozornenia emailom
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={preferences.emailNotifications}
                          onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="project-updates">Aktualizácie projektov</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifikácie o zmenách v projektoch
                          </p>
                        </div>
                        <Switch
                          id="project-updates"
                          checked={preferences.projectUpdates}
                          onCheckedChange={(checked) => handlePreferenceChange('projectUpdates', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="weekly-reports">Týždenné reporty</Label>
                          <p className="text-sm text-muted-foreground">
                            Súhrn aktivít za týždeň
                          </p>
                        </div>
                        <Switch
                          id="weekly-reports"
                          checked={preferences.weeklyReports}
                          onCheckedChange={(checked) => handlePreferenceChange('weeklyReports', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketing-emails">Marketing emaily</Label>
                          <p className="text-sm text-muted-foreground">
                            Novinky a tips o produktoch
                          </p>
                        </div>
                        <Switch
                          id="marketing-emails"
                          checked={preferences.marketingEmails}
                          onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Súkromie</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="public-profile">Verejný profil</Label>
                          <p className="text-sm text-muted-foreground">
                            Povoliť ostatným vidieť váš profil
                          </p>
                        </div>
                        <Switch
                          id="public-profile"
                          checked={preferences.publicProfile}
                          onCheckedChange={(checked) => handlePreferenceChange('publicProfile', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="show-email">Zobraziť email</Label>
                          <p className="text-sm text-muted-foreground">
                            Ukázať email vo verejnom profile
                          </p>
                        </div>
                        <Switch
                          id="show-email"
                          checked={preferences.showEmail}
                          onCheckedChange={(checked) => handlePreferenceChange('showEmail', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Bezpečnosť účtu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor">Dvojfaktorová autentifikácia</Label>
                        <p className="text-sm text-muted-foreground">
                          Pridajte extra vrstvu zabezpečenia
                        </p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={preferences.twoFactorAuth}
                        onCheckedChange={(checked) => handlePreferenceChange('twoFactorAuth', checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Heslo a prihlasovacie údaje</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Key className="w-4 h-4 mr-2" />
                        Zmeniť heslo
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Spravovať API kľúče
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Aktívne relácie</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Aktuálna relácia</p>
                          <p className="text-sm text-muted-foreground">Chrome na Windows • Bratislava, SK</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">Aktívne</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-blue-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Projekty</p>
                          <p className="text-2xl font-bold">{stats.projectsCreated}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Settings className="w-8 h-8 text-purple-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">AI Prompts</p>
                          <p className="text-2xl font-bold">{stats.aiPrompsUsed}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Settings className="w-8 h-8 text-green-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Analýzy</p>
                          <p className="text-2xl font-bold">{stats.analysesRun}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-orange-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Čas aktivity</p>
                          <p className="text-2xl font-bold">{stats.totalTime}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Account Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informácie o účte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Typ účtu</Label>
                        <p className="font-medium">Professional Plan</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Členstvo od</Label>
                        <p className="font-medium">{new Date(profileData.joinDate).toLocaleDateString('sk-SK')}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Posledné prihlásenie</Label>
                        <p className="font-medium">Dnes o 14:30</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Využitie API</Label>
                        <p className="font-medium">1,234 / 10,000 požiadaviek</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
