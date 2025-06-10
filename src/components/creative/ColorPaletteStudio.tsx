
import React, { useState, useEffect } from 'react';
import { Palette, Copy, Download, RefreshCw, Eye, Heart, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  mood: string;
  usage: string;
  accessibility: 'AAA' | 'AA' | 'A';
}

export const ColorPaletteStudio: React.FC = () => {
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedUsage, setSelectedUsage] = useState('');
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [isGenerating, setIsGenerating] = useState(false);

  const moods = [
    { value: 'energetic', label: 'Energický', colors: ['#FF6B35', '#F7931E', '#FFD23F'] },
    { value: 'calm', label: 'Pokojný', colors: ['#A8DADC', '#457B9D', '#1D3557'] },
    { value: 'professional', label: 'Profesionálny', colors: ['#2F3E46', '#354F52', '#52796F'] },
    { value: 'creative', label: 'Kreatívny', colors: ['#E63946', '#F77F00', '#FCBF49'] },
    { value: 'minimal', label: 'Minimálny', colors: ['#FFFFFF', '#F8F9FA', '#6C757D'] },
    { value: 'luxury', label: 'Luxusný', colors: ['#212529', '#6F42C1', '#FFD700'] }
  ];

  const usageTypes = [
    'Web Design', 'Mobile App', 'Print Design', 'Branding', 'UI/UX', 'Marketing'
  ];

  useEffect(() => {
    // Generuj základné palety pri načítaní
    generateInitialPalettes();
  }, []);

  const generateInitialPalettes = () => {
    const initialPalettes: ColorPalette[] = [
      {
        id: '1',
        name: 'Ocean Breeze',
        colors: ['#0077BE', '#00A8CC', '#7DD3FC', '#BAE6FD', '#F0F9FF'],
        mood: 'calm',
        usage: 'Web Design',
        accessibility: 'AAA'
      },
      {
        id: '2',
        name: 'Sunset Glow',
        colors: ['#DC2626', '#EA580C', '#F59E0B', '#FDE047', '#FEF3C7'],
        mood: 'energetic',
        usage: 'Marketing',
        accessibility: 'AA'
      },
      {
        id: '3',
        name: 'Forest Deep',
        colors: ['#0F172A', '#166534', '#22C55E', '#86EFAC', '#F0FDF4'],
        mood: 'professional',
        usage: 'Branding',
        accessibility: 'AAA'
      }
    ];
    setPalettes(initialPalettes);
  };

  const generatePalette = async () => {
    setIsGenerating(true);
    
    // Simulácia AI generovania palety
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPalette: ColorPalette = {
      id: Date.now().toString(),
      name: `AI Palette ${palettes.length + 1}`,
      colors: generateColorsFromBase(baseColor),
      mood: selectedMood || 'creative',
      usage: selectedUsage || 'Web Design',
      accessibility: Math.random() > 0.5 ? 'AAA' : 'AA'
    };
    
    setPalettes([newPalette, ...palettes]);
    setIsGenerating(false);
  };

  const generateColorsFromBase = (base: string): string[] => {
    // Jednoduchá logika generovania farieb z base farby
    const colors = [base];
    
    // Generuj komplementárne a analogické farby
    for (let i = 1; i < 5; i++) {
      const hue = (parseInt(base.slice(1), 16) + i * 50000) % 16777215;
      colors.push(`#${hue.toString(16).padStart(6, '0')}`);
    }
    
    return colors;
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    // Tu by sa zobrazil toast
  };

  const getContrastRatio = (color1: string, color2: string): number => {
    // Zjednodušená kalkulácia kontrastu
    return Math.random() * 21; // Mock hodnota
  };

  const AccessibilityBadge: React.FC<{ level: string }> = ({ level }) => {
    const colors = {
      AAA: 'bg-green-100 text-green-800',
      AA: 'bg-yellow-100 text-yellow-800',
      A: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[level as keyof typeof colors]} variant="outline">
        WCAG {level}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Generator Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            AI Color Palette Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="base-color">Základná farba</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="base-color"
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-12 h-10 p-1 rounded"
                />
                <Input
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label>Nálada</Label>
              <Select value={selectedMood} onValueChange={setSelectedMood}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte náladu" />
                </SelectTrigger>
                <SelectContent>
                  {moods.map((mood) => (
                    <SelectItem key={mood.value} value={mood.value}>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {mood.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        {mood.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Použitie</Label>
              <Select value={selectedUsage} onValueChange={setSelectedUsage}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte použitie" />
                </SelectTrigger>
                <SelectContent>
                  {usageTypes.map((usage) => (
                    <SelectItem key={usage} value={usage}>
                      {usage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={generatePalette} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generujem...
                  </>
                ) : (
                  <>
                    <Palette className="w-4 h-4 mr-2" />
                    Generovať
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Palettes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {palettes.map((palette) => (
          <Card key={palette.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{palette.name}</CardTitle>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">{palette.mood}</Badge>
                    <Badge variant="outline">{palette.usage}</Badge>
                    <AccessibilityBadge level={palette.accessibility} />
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Color Swatches */}
                <div className="flex rounded-lg overflow-hidden h-20">
                  {palette.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => copyColor(color)}
                      className="flex-1 relative group cursor-pointer transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                      title={`Copy ${color}`}
                    >
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Copy className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Color Codes */}
                <div className="grid grid-cols-5 gap-2 text-xs">
                  {palette.colors.map((color, index) => (
                    <div key={index} className="text-center">
                      <div className="font-mono text-muted-foreground">
                        {color.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Usage Examples */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Odporúčané použitie:</Label>
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    <div>Primárna</div>
                    <div>Sekundárna</div>
                    <div>Accent</div>
                    <div>Pozadie</div>
                    <div>Text</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {palettes.length === 0 && !isGenerating && (
        <Card>
          <CardContent className="text-center py-12">
            <Palette className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Zatiaľ žiadne palety</h3>
            <p className="text-muted-foreground">
              Vygenerujte si krásne farebné palety pomocou AI
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
