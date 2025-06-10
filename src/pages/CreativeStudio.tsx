
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Palette, 
  Image, 
  FileText, 
  Monitor,
  Brain,
  Wand2,
  Download,
  Share2,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LogoGenerator } from '../components/creative/LogoGenerator';
import { LandingPageGenerator } from '../components/creative/LandingPageGenerator';
import { BlogPostGenerator } from '../components/creative/BlogPostGenerator';
import { ColorPaletteStudio } from '../components/creative/ColorPaletteStudio';
import { TypographyStudio } from '../components/creative/TypographyStudio';
import { BrandManualGenerator } from '../components/creative/BrandManualGenerator';
import { MindMapViewer } from '../components/creative/MindMapViewer';
import { KanbanBoard } from '../components/creative/KanbanBoard';
import { ArchitectureDiagram } from '../components/creative/ArchitectureDiagram';

export const CreativeStudio: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('logo');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-primary" />
            AI Creative Studio
          </h1>
          <p className="text-muted-foreground mt-1">
            Komplexná AI-driven kreativna platforma pre dizajn a tvorbu obsahu
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Zdieľať
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Nastavenia
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Image className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Vygenerované logá</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Palette className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Farebné palety</p>
                <p className="text-2xl font-bold">28</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Brand manuály</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Monitor className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Landing pages</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="logo" className="flex items-center gap-1">
            <Image className="w-3 h-3" />
            Logo
          </TabsTrigger>
          <TabsTrigger value="landing" className="flex items-center gap-1">
            <Monitor className="w-3 h-3" />
            Landing
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            Blog
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-1">
            <Palette className="w-3 h-3" />
            Farby
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            Typo
          </TabsTrigger>
          <TabsTrigger value="brand" className="flex items-center gap-1">
            <Brain className="w-3 h-3" />
            Brand
          </TabsTrigger>
          <TabsTrigger value="mindmap" className="flex items-center gap-1">
            <Brain className="w-3 h-3" />
            Mind Map
          </TabsTrigger>
          <TabsTrigger value="kanban" className="flex items-center gap-1">
            <Settings className="w-3 h-3" />
            Kanban
          </TabsTrigger>
          <TabsTrigger value="architecture" className="flex items-center gap-1">
            <Monitor className="w-3 h-3" />
            Arch
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logo">
          <LogoGenerator />
        </TabsContent>

        <TabsContent value="landing">
          <LandingPageGenerator />
        </TabsContent>

        <TabsContent value="blog">
          <BlogPostGenerator />
        </TabsContent>

        <TabsContent value="colors">
          <ColorPaletteStudio />
        </TabsContent>

        <TabsContent value="typography">
          <TypographyStudio />
        </TabsContent>

        <TabsContent value="brand">
          <BrandManualGenerator />
        </TabsContent>

        <TabsContent value="mindmap">
          <MindMapViewer />
        </TabsContent>

        <TabsContent value="kanban">
          <KanbanBoard />
        </TabsContent>

        <TabsContent value="architecture">
          <ArchitectureDiagram />
        </TabsContent>
      </Tabs>
    </div>
  );
};
