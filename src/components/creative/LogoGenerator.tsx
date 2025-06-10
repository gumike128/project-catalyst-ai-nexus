
import React, { useState } from 'react';
import { Wand2, Download, RefreshCw, Palette, Type, Shapes } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';

export const LogoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('modern');
  const [industry, setIndustry] = useState('');
  const [colors, setColors] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogos, setGeneratedLogos] = useState<string[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulácia generovania loga
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock URLs - v reálnej implementácii by sa volalo AI API
    const mockLogos = [
      'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Logo+1',
      'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Logo+2',
      'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Logo+3',
      'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Logo+4'
    ];
    
    setGeneratedLogos(mockLogos);
    setIsGenerating(false);
  };

  const styles = [
    { value: 'modern', label: 'Modern', color: 'bg-blue-100 text-blue-800' },
    { value: 'minimalist', label: 'Minimalistický', color: 'bg-gray-100 text-gray-800' },
    { value: 'vintage', label: 'Vintage', color: 'bg-orange-100 text-orange-800' },
    { value: 'playful', label: 'Hravý', color: 'bg-pink-100 text-pink-800' },
    { value: 'professional', label: 'Profesionálny', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'creative', label: 'Kreatívny', color: 'bg-purple-100 text-purple-800' }
  ];

  const industries = [
    'Technológie', 'Zdravotníctvo', 'Financie', 'Vzdelávanie', 'E-commerce',
    'Reštaurácie', 'Nehnuteľnosti', 'Móda', 'Fitness', 'Konzultácie'
  ];

  return (
    <div className="space-y-6">
      {/* Generator Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Logo Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company-name">Názov spoločnosti</Label>
                <Input
                  id="company-name"
                  placeholder="napr. TechnoVation"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="industry">Odvetvie</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vyberte odvetvie" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind.toLowerCase()}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Štýl</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {styles.map((styleOption) => (
                    <button
                      key={styleOption.value}
                      onClick={() => setStyle(styleOption.value)}
                      className={`p-2 rounded-lg border text-sm transition-colors ${
                        style === styleOption.value 
                          ? 'bg-primary/10 border-primary' 
                          : 'border-border hover:bg-accent'
                      }`}
                    >
                      <Badge className={styleOption.color} variant="outline">
                        {styleOption.label}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="colors">Preferované farby</Label>
                <Input
                  id="colors"
                  placeholder="napr. modrá, zelená"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={!prompt.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generujem...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Vygenerovať logo
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Vygenerované logá</CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : generatedLogos.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {generatedLogos.map((logo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={logo}
                        alt={`Logo ${index + 1}`}
                        className="w-full aspect-video object-cover rounded-lg border"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary">
                            <Download className="w-4 h-4 mr-2" />
                            Stiahnuť
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Palette className="w-4 h-4 mr-2" />
                            Upraviť
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Shapes className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Zatiaľ žiadne logá</h3>
                  <p className="text-muted-foreground">
                    Vyplňte formulár a vygenerujte si úžasné logá pomocou AI
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
