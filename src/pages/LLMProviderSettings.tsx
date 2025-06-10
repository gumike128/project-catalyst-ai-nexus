
import React, { useState } from 'react';
import { Settings, Key, Brain, Zap, Save, TestTube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';

interface LLMProvider {
  id: string;
  name: string;
  description: string;
  models: string[];
  pricing: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'testing';
}

export const LLMProviderSettings: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState('gemini');
  const [settings, setSettings] = useState({
    apiKey: '',
    model: '',
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: '',
    enabled: false
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const providers: LLMProvider[] = [
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Pokročilý multimodálny AI model od Google',
      models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro'],
      pricing: 'Freemium - od $0.001/1K tokenov',
      capabilities: ['Text', 'Obrázky', 'Video', 'Kód', 'Dlhý kontext'],
      status: 'active'
    },
    {
      id: 'openai',
      name: 'OpenAI GPT',
      description: 'Najpopulárnejšie GPT modely od OpenAI',
      models: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'],
      pricing: 'Platené - od $0.002/1K tokenov',
      capabilities: ['Text', 'Kód', 'Analýza', 'Tvorba'],
      status: 'active'
    },
    {
      id: 'claude',
      name: 'Anthropic Claude',
      description: 'Bezpečný a užitočný AI asistent',
      models: ['claude-3.5-sonnet', 'claude-3-opus', 'claude-3-haiku'],
      pricing: 'Platené - od $0.003/1K tokenov',
      capabilities: ['Text', 'Analýza', 'Dlhý kontext', 'Bezpečnosť'],
      status: 'inactive'
    },
    {
      id: 'llama',
      name: 'Meta Llama',
      description: 'Open-source veľký jazykový model',
      models: ['llama-3.1-405b', 'llama-3.1-70b', 'llama-3.1-8b'],
      pricing: 'Open-source - hosting náklady',
      capabilities: ['Text', 'Kód', 'Lokálne spustenie'],
      status: 'testing'
    }
  ];

  const selectedProviderData = providers.find(p => p.id === selectedProvider);

  const testConnection = async () => {
    setIsTestingConnection(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTestingConnection(false);
    alert('Pripojenie úspešné!');
  };

  const saveSettings = () => {
    // Tu by sa uložili nastavenia do localStorage alebo API
    localStorage.setItem(`llm_settings_${selectedProvider}`, JSON.stringify(settings));
    alert('Nastavenia uložené!');
  };

  const loadSettings = (providerId: string) => {
    const saved = localStorage.getItem(`llm_settings_${providerId}`);
    if (saved) {
      setSettings(JSON.parse(saved));
    } else {
      // Predvolené nastavenia pre každého providera
      const defaults = {
        gemini: {
          apiKey: '',
          model: 'gemini-1.5-flash',
          temperature: 0.7,
          maxTokens: 1000,
          systemPrompt: 'Si užitočný AI asistent. Odpovedaj v slovenčine.',
          enabled: false
        },
        openai: {
          apiKey: '',
          model: 'gpt-4o-mini',
          temperature: 0.7,
          maxTokens: 1000,
          systemPrompt: 'You are a helpful AI assistant.',
          enabled: false
        },
        claude: {
          apiKey: '',
          model: 'claude-3-haiku-20240307',
          temperature: 0.7,
          maxTokens: 1000,
          systemPrompt: 'You are Claude, a helpful AI assistant.',
          enabled: false
        },
        llama: {
          apiKey: '',
          model: 'llama-3.1-8b',
          temperature: 0.7,
          maxTokens: 1000,
          systemPrompt: 'You are a helpful AI assistant.',
          enabled: false
        }
      };
      setSettings(defaults[providerId as keyof typeof defaults] || defaults.gemini);
    }
  };

  React.useEffect(() => {
    loadSettings(selectedProvider);
  }, [selectedProvider]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Brain className="w-8 h-8" />
          LLM Provider Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Konfigurácia AI provajderov a modelov pre aplikáciu
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Provider Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>AI Provideri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedProvider === provider.id
                      ? 'bg-primary/10 border-primary'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{provider.name}</h4>
                    <Badge className={getStatusColor(provider.status)} variant="outline">
                      {provider.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {provider.description}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {provider.pricing}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Provider Configuration */}
        <div className="lg:col-span-2">
          {selectedProviderData && (
            <div className="space-y-6">
              {/* Provider Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      {selectedProviderData.name} - Konfigurácia
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={testConnection}
                        disabled={!settings.apiKey || isTestingConnection}
                      >
                        {isTestingConnection ? (
                          <>
                            <TestTube className="w-4 h-4 mr-2 animate-spin" />
                            Testujem...
                          </>
                        ) : (
                          <>
                            <TestTube className="w-4 h-4 mr-2" />
                            Test pripojenia
                          </>
                        )}
                      </Button>
                      <Button onClick={saveSettings}>
                        <Save className="w-4 h-4 mr-2" />
                        Uložiť
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Modely</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedProviderData.models.map((model, index) => (
                          <Badge key={index} variant="outline">
                            {model}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Schopnosti</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedProviderData.capabilities.map((capability, index) => (
                          <Badge key={index} variant="secondary">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    API Konfigurácia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enabled">Povoliť providera</Label>
                      <p className="text-sm text-muted-foreground">
                        Aktivovať tohto AI providera pre aplikáciu
                      </p>
                    </div>
                    <Switch
                      id="enabled"
                      checked={settings.enabled}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({ ...prev, enabled: checked }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="api-key">API Kľúč</Label>
                    <Input
                      id="api-key"
                      type="password"
                      value={settings.apiKey}
                      onChange={(e) =>
                        setSettings(prev => ({ ...prev, apiKey: e.target.value }))
                      }
                      placeholder="Zadajte váš API kľúč"
                    />
                  </div>

                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Select
                      value={settings.model}
                      onValueChange={(value) =>
                        setSettings(prev => ({ ...prev, model: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Vyberte model" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedProviderData.models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="temperature">
                        Temperature: {settings.temperature}
                      </Label>
                      <Input
                        id="temperature"
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={settings.temperature}
                        onChange={(e) =>
                          setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))
                        }
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="max-tokens">Max tokeny</Label>
                      <Input
                        id="max-tokens"
                        type="number"
                        value={settings.maxTokens}
                        onChange={(e) =>
                          setSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))
                        }
                        min="100"
                        max="4000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="system-prompt">Systémový prompt</Label>
                    <Textarea
                      id="system-prompt"
                      value={settings.systemPrompt}
                      onChange={(e) =>
                        setSettings(prev => ({ ...prev, systemPrompt: e.target.value }))
                      }
                      placeholder="Definujte správanie AI..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Setup Guide */}
              {selectedProvider === 'gemini' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Google Gemini - Rýchle nastavenie
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Získanie API kľúča:</h4>
                        <ol className="list-decimal list-inside space-y-1">
                          <li>Prejdite na <a href="https://makersuite.google.com/app/apikey" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Google AI Studio</a></li>
                          <li>Prihláste sa s Google účtom</li>
                          <li>Kliknite na "Create API Key"</li>
                          <li>Skopírujte vygenerovaný kľúč</li>
                        </ol>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Odporúčané nastavenia:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li><strong>Model:</strong> gemini-1.5-flash (rýchly a efektívny)</li>
                          <li><strong>Temperature:</strong> 0.7 (vyvážená kreativita)</li>
                          <li><strong>Max tokeny:</strong> 1000 (optimálna dĺžka)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Globálne nastavenia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Fallback provider</Label>
                <p className="text-sm text-muted-foreground">
                  Záložný provider pri výpadku
                </p>
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Žiadny" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-retry</Label>
                <p className="text-sm text-muted-foreground">
                  Automaticky opakovať neúspešné požiadavky
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Cache responses</Label>
                <p className="text-sm text-muted-foreground">
                  Uložiť odpovede do cache
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
