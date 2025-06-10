
import React, { useState } from 'react';
import { FileText, Wand2, Send, Copy, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  wordCount: number;
  readingTime: number;
}

export const BlogPostGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    tone: 'professional',
    length: 'medium',
    audience: '',
    wpUrl: '',
    wpUsername: '',
    wpPassword: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<BlogPost | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const tones = [
    { value: 'professional', label: 'Profesionálny' },
    { value: 'casual', label: 'Neformálny' },
    { value: 'friendly', label: 'Priateľský' },
    { value: 'authoritative', label: 'Autoritatívny' },
    { value: 'conversational', label: 'Konverzačný' },
    { value: 'humorous', label: 'Humorný' }
  ];

  const lengths = [
    { value: 'short', label: 'Krátky (300-500 slov)' },
    { value: 'medium', label: 'Stredný (800-1200 slov)' },
    { value: 'long', label: 'Dlhý (1500-2500 slov)' },
    { value: 'comprehensive', label: 'Komplexný (3000+ slov)' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Mock generovaný obsah
    const mockPost: BlogPost = {
      title: `Komplexný sprievodca: ${formData.topic}`,
      content: `# ${formData.topic}

## Úvod

V dnešnej digitálnej dobe je ${formData.topic} kľúčovým faktorom úspechu. Tento článok vám poskytne podrobný prehľad a praktické rady.

## Kľúčové body

### 1. Základy ${formData.topic}

${formData.keywords.split(',').map(keyword => `- **${keyword.trim()}**: Dôležitý aspekt, ktorý musíte pochopiť`).join('\n')}

### 2. Praktické aplikácie

Implementácia ${formData.topic} v praxi vyžaduje:

1. **Plánovanie** - Vytvorte si jasnú stratégiu
2. **Implementácia** - Postupujte krok za krokom
3. **Optimalizácia** - Neustále vylepšujte proces

### 3. Tipsy a triky

- Používajte moderné nástroje a technológie
- Sledujte najnovšie trendy v oblasti
- Pravidelně analyzujte výsledky

## Záver

${formData.topic} je oblasť s obrovským potenciálom. S correct approach a dostatočnými znalosťami môžete dosiahnuť výnimočné výsledky.

Ak máte otázky alebo potrebujete pomoc s implementáciou, neváhajte nás kontaktovať.`,
      excerpt: `Objavte všetko, čo potrebujete vedieť o ${formData.topic}. Praktický sprievodca s tipmi a stratégiami pre ${formData.audience || 'každého'}.`,
      tags: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
      wordCount: 847,
      readingTime: 4
    };

    setGeneratedPost(mockPost);
    setIsGenerating(false);
  };

  const publishToWordPress = async () => {
    if (!generatedPost || !formData.wpUrl) return;

    setIsPublishing(true);
    
    try {
      // Tu by bola implementácia WordPress API
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Článok bol úspešne publikovaný na WordPress!');
    } catch (error) {
      alert('Chyba pri publikovaní. Skontrolujte prihlasovacie údaje.');
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedPost) {
      navigator.clipboard.writeText(generatedPost.content);
    }
  };

  const downloadAsMarkdown = () => {
    if (!generatedPost) return;
    
    const blob = new Blob([generatedPost.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedPost.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
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
                AI Blog Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="topic">Téma článku</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="napr. SEO optimalizácia"
                />
              </div>

              <div>
                <Label htmlFor="keywords">Kľúčové slová (oddelené čiarkou)</Label>
                <Textarea
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="SEO, optimalizácia, vyhľadávače"
                  rows={2}
                />
              </div>

              <div>
                <Label>Tón písania</Label>
                <Select 
                  value={formData.tone} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Dĺžka článku</Label>
                <Select 
                  value={formData.length} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, length: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lengths.map((length) => (
                      <SelectItem key={length.value} value={length.value}>
                        {length.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="audience">Cieľová skupina</Label>
                <Input
                  id="audience"
                  value={formData.audience}
                  onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
                  placeholder="napr. marketéri, podnikatelia"
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={!formData.topic || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                    Generujem článok...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Vygenerovať článok
                  </>
                )}
              </Button>

              {/* WordPress Integration */}
              <div className="border-t pt-4 space-y-4">
                <h4 className="font-semibold">WordPress integrácia</h4>
                
                <div>
                  <Label htmlFor="wp-url">WordPress URL</Label>
                  <Input
                    id="wp-url"
                    value={formData.wpUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, wpUrl: e.target.value }))}
                    placeholder="https://yourblog.com"
                  />
                </div>

                <div>
                  <Label htmlFor="wp-username">Používateľské meno</Label>
                  <Input
                    id="wp-username"
                    value={formData.wpUsername}
                    onChange={(e) => setFormData(prev => ({ ...prev, wpUsername: e.target.value }))}
                    placeholder="admin"
                  />
                </div>

                <div>
                  <Label htmlFor="wp-password">Heslo aplikácie</Label>
                  <Input
                    id="wp-password"
                    type="password"
                    value={formData.wpPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, wpPassword: e.target.value }))}
                    placeholder="Application password"
                  />
                </div>

                <Button 
                  onClick={publishToWordPress}
                  disabled={!generatedPost || !formData.wpUrl || isPublishing}
                  variant="outline"
                  className="w-full"
                >
                  {isPublishing ? (
                    <>
                      <Send className="w-4 h-4 mr-2 animate-spin" />
                      Publikujem...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Publikovať na WordPress
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Vygenerovaný článok</CardTitle>
                {generatedPost && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4 mr-2" />
                      Kopírovať
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadAsMarkdown}>
                      <Download className="w-4 h-4 mr-2" />
                      Stiahnuť MD
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedPost ? (
                <div className="space-y-4">
                  {/* Article Stats */}
                  <div className="flex gap-4 p-4 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="font-semibold">{generatedPost.wordCount}</div>
                      <div className="text-sm text-muted-foreground">slov</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{generatedPost.readingTime} min</div>
                      <div className="text-sm text-muted-foreground">čítanie</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Tagy:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {generatedPost.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <Label>Nadpis</Label>
                    <h2 className="text-2xl font-bold mt-1">{generatedPost.title}</h2>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <Label>Úryvok</Label>
                    <p className="text-muted-foreground mt-1">{generatedPost.excerpt}</p>
                  </div>

                  {/* Content */}
                  <div>
                    <Label>Obsah</Label>
                    <div className="mt-2 p-4 border rounded-lg bg-white prose max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm">
                        {generatedPost.content}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Zatiaľ žiadny obsah</h3>
                  <p className="text-muted-foreground">
                    Vyplňte formulár a vygenerujte si kvalitný článok
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
