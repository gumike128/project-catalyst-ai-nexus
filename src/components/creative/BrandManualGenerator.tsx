
import React, { useState } from 'react';
import { FileText, Wand2, Download, Palette, Type, Image } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface BrandManual {
  companyName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string[];
  };
  typography: {
    heading: string;
    body: string;
  };
  logo: {
    primary: string;
    variations: string[];
  };
  voice: {
    tone: string;
    personality: string[];
    language: string;
  };
  usage: {
    dos: string[];
    donts: string[];
  };
}

export const BrandManualGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    targetAudience: '',
    brandValues: '',
    brandPersonality: '',
    competitorAnalysis: '',
    style: 'modern'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedManual, setGeneratedManual] = useState<BrandManual | null>(null);

  const styles = [
    { value: 'modern', label: 'Modern & Clean' },
    { value: 'classic', label: 'Classic & Timeless' },
    { value: 'bold', label: 'Bold & Dynamic' },
    { value: 'elegant', label: 'Elegant & Sophisticated' },
    { value: 'playful', label: 'Playful & Creative' },
    { value: 'minimal', label: 'Minimal & Simple' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock generovaný brand manual
    const mockManual: BrandManual = {
      companyName: formData.companyName,
      colors: {
        primary: '#2563EB',
        secondary: '#10B981',
        accent: '#F59E0B',
        neutral: ['#1F2937', '#6B7280', '#D1D5DB', '#F9FAFB']
      },
      typography: {
        heading: 'Inter',
        body: 'Source Sans Pro'
      },
      logo: {
        primary: '/api/placeholder/200/80',
        variations: [
          '/api/placeholder/200/80',
          '/api/placeholder/80/80',
          '/api/placeholder/200/40'
        ]
      },
      voice: {
        tone: 'Professional yet approachable',
        personality: ['Innovative', 'Trustworthy', 'Customer-focused', 'Expert'],
        language: 'Clear, concise, and jargon-free'
      },
      usage: {
        dos: [
          'Používajte logo v jasnom kontraste',
          'Dodržiavajte minimálne rozostupy',
          'Používajte schválené farebné kombinácie',
          'Konzistentne aplikujte typografiu'
        ],
        donts: [
          'Nedeformujte logo proporcie',
          'Nepoužívajte neschválené farby',
          'Neumiesťujte logo na rušivé pozadia',
          'Nemiešajte rôzne štýly písma'
        ]
      }
    };

    setGeneratedManual(mockManual);
    setIsGenerating(false);
  };

  const generatePDF = () => {
    // Tu by bola implementácia PDF generovania
    console.log('Generating PDF...');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Brand Manual Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company">Názov spoločnosti</Label>
                <Input
                  id="company"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="napr. TechnoVation"
                />
              </div>

              <div>
                <Label htmlFor="industry">Odvetvie</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="napr. Technológie, Zdravotníctvo"
                />
              </div>

              <div>
                <Label htmlFor="audience">Cieľová skupina</Label>
                <Textarea
                  id="audience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="Opíšte vašu cieľovú skupinu..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="values">Hodnoty značky</Label>
                <Textarea
                  id="values"
                  value={formData.brandValues}
                  onChange={(e) => setFormData(prev => ({ ...prev, brandValues: e.target.value }))}
                  placeholder="Kľúčové hodnoty a princípy..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="personality">Osobnosť značky</Label>
                <Input
                  id="personality"
                  value={formData.brandPersonality}
                  onChange={(e) => setFormData(prev => ({ ...prev, brandPersonality: e.target.value }))}
                  placeholder="napr. inovatívna, dôveryhodná"
                />
              </div>

              <div>
                <Label>Štýl</Label>
                <Select 
                  value={formData.style} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, style: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="competitors">Analýza konkurencie</Label>
                <Textarea
                  id="competitors"
                  value={formData.competitorAnalysis}
                  onChange={(e) => setFormData(prev => ({ ...prev, competitorAnalysis: e.target.value }))}
                  placeholder="Hlavní konkurenti a ich brand identity..."
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={!formData.companyName || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                    Generujem manual...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Vygenerovať brand manual
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generated Manual Preview */}
        <div className="lg:col-span-2">
          {generatedManual ? (
            <div className="space-y-6">
              {/* Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">
                      Brand Manual: {generatedManual.companyName}
                    </CardTitle>
                    <Button onClick={generatePDF}>
                      <Download className="w-4 h-4 mr-2" />
                      Stiahnuť PDF
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Color Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Farebná paleta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div 
                        className="w-full h-20 rounded-lg mb-2"
                        style={{ backgroundColor: generatedManual.colors.primary }}
                      />
                      <div className="font-semibold">Primárna</div>
                      <div className="text-sm text-muted-foreground">
                        {generatedManual.colors.primary}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div 
                        className="w-full h-20 rounded-lg mb-2"
                        style={{ backgroundColor: generatedManual.colors.secondary }}
                      />
                      <div className="font-semibold">Sekundárna</div>
                      <div className="text-sm text-muted-foreground">
                        {generatedManual.colors.secondary}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div 
                        className="w-full h-20 rounded-lg mb-2"
                        style={{ backgroundColor: generatedManual.colors.accent }}
                      />
                      <div className="font-semibold">Accent</div>
                      <div className="text-sm text-muted-foreground">
                        {generatedManual.colors.accent}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="grid grid-cols-2 gap-1 h-20 mb-2">
                        {generatedManual.colors.neutral.map((color, index) => (
                          <div 
                            key={index}
                            className="rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="font-semibold">Neutrálne</div>
                      <div className="text-xs text-muted-foreground">
                        4 odtiene
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Typography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="w-5 h-5" />
                    Typografia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Nadpisy</Label>
                      <span className="text-sm text-muted-foreground">
                        {generatedManual.typography.heading}
                      </span>
                    </div>
                    <div 
                      className="text-3xl font-bold"
                      style={{ fontFamily: `'${generatedManual.typography.heading}', sans-serif` }}
                    >
                      Váš úžasný nadpis
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Bežný text</Label>
                      <span className="text-sm text-muted-foreground">
                        {generatedManual.typography.body}
                      </span>
                    </div>
                    <p 
                      className="text-base"
                      style={{ fontFamily: `'${generatedManual.typography.body}', sans-serif` }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Logo Variations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Logo variácie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="h-20 bg-muted rounded mb-2 flex items-center justify-center">
                        <span className="text-muted-foreground">Primárne logo</span>
                      </div>
                      <div className="text-sm">Hlavné logo</div>
                    </div>
                    
                    <div className="text-center p-4 border rounded-lg">
                      <div className="h-20 bg-muted rounded mb-2 flex items-center justify-center">
                        <span className="text-muted-foreground">Symbol</span>
                      </div>
                      <div className="text-sm">Iba symbol</div>
                    </div>
                    
                    <div className="text-center p-4 border rounded-lg">
                      <div className="h-20 bg-muted rounded mb-2 flex items-center justify-center">
                        <span className="text-muted-foreground">Horizontálne</span>
                      </div>
                      <div className="text-sm">Horizontálna verzia</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Brand Voice */}
              <Card>
                <CardHeader>
                  <CardTitle>Hlas značky</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Tón komunikácie</Label>
                    <p className="text-sm mt-1">{generatedManual.voice.tone}</p>
                  </div>
                  
                  <div>
                    <Label>Osobnostné črty</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {generatedManual.voice.personality.map((trait, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Štýl jazyka</Label>
                    <p className="text-sm mt-1">{generatedManual.voice.language}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Guidelines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">✓ Odporúčané</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedManual.usage.dos.map((item, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">✗ Neodporúčané</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedManual.usage.donts.map((item, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-red-600 mt-1">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Zatiaľ žiadny manual</h3>
                <p className="text-muted-foreground">
                  Vyplňte formulár a vygenerujte si profesionálny brand manual
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
