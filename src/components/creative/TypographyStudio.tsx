
import React, { useState } from 'react';
import { Type, Download, RefreshCw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';

interface TypographyPair {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  mood: string;
  usage: string;
  googleFonts: boolean;
}

export const TypographyStudio: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<string>('');
  const [customText, setCustomText] = useState('Váš text na ukážku');
  const [fontSize, setFontSize] = useState([16]);
  const [lineHeight, setLineHeight] = useState([1.5]);
  const [letterSpacing, setLetterSpacing] = useState([0]);

  const typographyPairs: TypographyPair[] = [
    {
      id: '1',
      name: 'Modern Professional',
      headingFont: 'Inter',
      bodyFont: 'Source Sans Pro',
      mood: 'professional',
      usage: 'Corporate websites',
      googleFonts: true
    },
    {
      id: '2',
      name: 'Creative Editorial',
      headingFont: 'Playfair Display',
      bodyFont: 'Lora',
      mood: 'elegant',
      usage: 'Blogs, magazines',
      googleFonts: true
    },
    {
      id: '3',
      name: 'Tech Startup',
      headingFont: 'Poppins',
      bodyFont: 'Open Sans',
      mood: 'modern',
      usage: 'Tech websites',
      googleFonts: true
    },
    {
      id: '4',
      name: 'Minimalist Clean',
      headingFont: 'Helvetica Neue',
      bodyFont: 'Arial',
      mood: 'minimal',
      usage: 'Design portfolios',
      googleFonts: false
    },
    {
      id: '5',
      name: 'Artistic Creative',
      headingFont: 'Abril Fatface',
      bodyFont: 'Merriweather',
      mood: 'creative',
      usage: 'Art galleries',
      googleFonts: true
    },
    {
      id: '6',
      name: 'E-commerce Friendly',
      headingFont: 'Roboto',
      bodyFont: 'Noto Sans',
      mood: 'trustworthy',
      usage: 'Online stores',
      googleFonts: true
    }
  ];

  const generateCSS = (pair: TypographyPair) => {
    const googleFontsImport = pair.googleFonts 
      ? `@import url('https://fonts.googleapis.com/css2?family=${pair.headingFont.replace(' ', '+')}:wght@400;600;700&family=${pair.bodyFont.replace(' ', '+')}:wght@400;500&display=swap');`
      : '';

    return `${googleFontsImport}

/* Typography System - ${pair.name} */
:root {
  --font-heading: '${pair.headingFont}', sans-serif;
  --font-body: '${pair.bodyFont}', sans-serif;
  --font-size-base: ${fontSize[0]}px;
  --line-height-base: ${lineHeight[0]};
  --letter-spacing-base: ${letterSpacing[0]}em;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5em;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }
h5 { font-size: 1.125rem; }
h6 { font-size: 1rem; }

/* Body text */
body, p, div {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing-base);
}

/* Utilities */
.text-large { font-size: 1.125rem; }
.text-small { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }

.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.font-normal { font-weight: 400; }`;
  };

  const copyCSS = (pair: TypographyPair) => {
    const css = generateCSS(pair);
    navigator.clipboard.writeText(css);
  };

  const downloadCSS = (pair: TypographyPair) => {
    const css = generateCSS(pair);
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `typography-${pair.name.toLowerCase().replace(' ', '-')}.css`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedPairData = typographyPairs.find(p => p.id === selectedPair);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Typography Studio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Typografická dvojica</Label>
              <Select value={selectedPair} onValueChange={setSelectedPair}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte dvojicu" />
                </SelectTrigger>
                <SelectContent>
                  {typographyPairs.map((pair) => (
                    <SelectItem key={pair.id} value={pair.id}>
                      {pair.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Ukážkový text</Label>
              <Input
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Váš text..."
              />
            </div>

            <div>
              <Label>Veľkosť písma: {fontSize[0]}px</Label>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                min={12}
                max={24}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Riadkovanie: {lineHeight[0]}</Label>
              <Slider
                value={lineHeight}
                onValueChange={setLineHeight}
                min={1}
                max={2}
                step={0.1}
                className="mt-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label>Rozostup písmen: {letterSpacing[0]}em</Label>
            <Slider
              value={letterSpacing}
              onValueChange={setLetterSpacing}
              min={-0.05}
              max={0.2}
              step={0.01}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Typography Pairs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {typographyPairs.map((pair) => (
          <Card 
            key={pair.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedPair === pair.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedPair(pair.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{pair.name}</CardTitle>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyCSS(pair);
                    }}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadCSS(pair);
                    }}
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {pair.usage} • {pair.mood}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Heading Preview */}
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Nadpis: {pair.headingFont}
                </div>
                <h3 
                  className="text-xl font-semibold"
                  style={{ 
                    fontFamily: pair.googleFonts ? `'${pair.headingFont}', sans-serif` : pair.headingFont,
                    fontSize: selectedPair === pair.id ? `${fontSize[0] * 1.5}px` : '1.25rem',
                    lineHeight: selectedPair === pair.id ? lineHeight[0] : 1.2,
                    letterSpacing: selectedPair === pair.id ? `${letterSpacing[0]}em` : 'normal'
                  }}
                >
                  {selectedPair === pair.id ? customText : 'Ukážkový nadpis'}
                </h3>
              </div>

              {/* Body Preview */}
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Text: {pair.bodyFont}
                </div>
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: pair.googleFonts ? `'${pair.bodyFont}', sans-serif` : pair.bodyFont,
                    fontSize: selectedPair === pair.id ? `${fontSize[0]}px` : '0.875rem',
                    lineHeight: selectedPair === pair.id ? lineHeight[0] : 1.5,
                    letterSpacing: selectedPair === pair.id ? `${letterSpacing[0]}em` : 'normal'
                  }}
                >
                  {selectedPair === pair.id 
                    ? customText 
                    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
                  }
                </p>
              </div>

              {/* Font Details */}
              <div className="pt-2 border-t">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{pair.googleFonts ? 'Google Fonts' : 'System'}</span>
                  <span>{pair.mood}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CSS Output */}
      {selectedPairData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>CSS pre {selectedPairData.name}</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyCSS(selectedPairData)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Kopírovať CSS
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => downloadCSS(selectedPairData)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Stiahnuť CSS
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{generateCSS(selectedPairData)}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
