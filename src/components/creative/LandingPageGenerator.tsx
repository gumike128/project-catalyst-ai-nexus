
import React, { useState } from 'react';
import { Monitor, Wand2, Eye, Code, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const LandingPageGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    targetAudience: '',
    keyFeatures: '',
    callToAction: '',
    template: 'modern'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPage, setGeneratedPage] = useState<string | null>(null);

  const templates = [
    { value: 'modern', label: 'Modern SaaS' },
    { value: 'startup', label: 'Tech Startup' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'agency', label: 'Creative Agency' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'blog', label: 'Blog/Content' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Vygeneruj mock HTML
    const html = `
<!DOCTYPE html>
<html lang="sk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.productName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-6">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold text-gray-900">${formData.productName}</h1>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#features" class="text-gray-600 hover:text-gray-900">Funkcie</a>
                    <a href="#pricing" class="text-gray-600 hover:text-gray-900">Ceny</a>
                    <a href="#contact" class="text-gray-600 hover:text-gray-900">Kontakt</a>
                </div>
                <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    ${formData.callToAction || 'Začať'}
                </button>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-5xl font-bold mb-6">${formData.productName}</h1>
            <p class="text-xl mb-8 max-w-3xl mx-auto">${formData.description}</p>
            <button class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
                ${formData.callToAction || 'Začať hneď'}
            </button>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">Kľúčové funkcie</h2>
                <p class="text-xl text-gray-600">Prečo si vybrať ${formData.productName}?</p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                ${formData.keyFeatures.split(',').map((feature, index) => `
                <div class="text-center p-6 bg-white rounded-lg shadow-lg">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">${feature.trim()}</h3>
                    <p class="text-gray-600">Popis funkcie ${feature.trim()}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gray-900 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-4xl font-bold mb-6">Pripravený začať?</h2>
            <p class="text-xl mb-8">Cieľová skupina: ${formData.targetAudience}</p>
            <button class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                ${formData.callToAction || 'Začať teraz'}
            </button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-600">&copy; 2024 ${formData.productName}. Všetky práva vyhradené.</p>
        </div>
    </footer>
</body>
</html>`;

    setGeneratedPage(html);
    setIsGenerating(false);
  };

  const downloadHtml = () => {
    if (!generatedPage) return;
    
    const blob = new Blob([generatedPage], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.productName || 'landing-page'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Landing Page Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="product-name">Názov produktu/služby</Label>
              <Input
                id="product-name"
                value={formData.productName}
                onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                placeholder="napr. SuperApp"
              />
            </div>

            <div>
              <Label htmlFor="description">Popis produktu</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Krátky popis vašeho produktu..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="target-audience">Cieľová skupina</Label>
              <Input
                id="target-audience"
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="napr. malé firmy, freelanceri"
              />
            </div>

            <div>
              <Label htmlFor="key-features">Kľúčové funkcie (oddelené čiarkou)</Label>
              <Textarea
                id="key-features"
                value={formData.keyFeatures}
                onChange={(e) => setFormData(prev => ({ ...prev, keyFeatures: e.target.value }))}
                placeholder="Funkcia 1, Funkcia 2, Funkcia 3"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="cta">Call to Action</Label>
              <Input
                id="cta"
                value={formData.callToAction}
                onChange={(e) => setFormData(prev => ({ ...prev, callToAction: e.target.value }))}
                placeholder="napr. Začať zadarmo, Kúpiť teraz"
              />
            </div>

            <div>
              <Label>Template</Label>
              <Select 
                value={formData.template} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, template: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!formData.productName || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                  Generujem landing page...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Vygenerovať landing page
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Náhľad</CardTitle>
              {generatedPage && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Otvoriť v novom okne
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadHtml}>
                    <Download className="w-4 h-4 mr-2" />
                    Stiahnuť HTML
                  </Button>
                  <Button variant="outline" size="sm">
                    <Code className="w-4 h-4 mr-2" />
                    Zobraziť kód
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedPage ? (
              <div className="border rounded-lg h-[500px]">
                <iframe
                  srcDoc={generatedPage}
                  className="w-full h-full rounded-lg"
                  title="Landing Page Preview"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Náhľad sa zobrazí po vygenerovaní</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
