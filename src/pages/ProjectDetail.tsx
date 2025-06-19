
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Edit3, 
  Play, 
  Trash2, 
  Brain,
  FileText,
  MessageSquare,
  Settings,
  Lightbulb
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useProjectStore } from '../stores/projectStore';
import { ProjectAnalysis } from '../components/features/ProjectAnalysis';
import { ProjectNotes } from '../components/features/ProjectNotes';
import { ProjectIntelligenceComponent } from '../components/features/ProjectIntelligence';
import { EnhancedChatInterface } from '../components/features/EnhancedChatInterface';
import { EmptyState } from '../components/ui/EmptyState';
import { formatDate } from '../utils/dateUtils';
import { getStatusConfig } from '../utils/uiUtils';
import { ProjectService } from '../services/projectService';
import { toast } from '../hooks/use-toast';

export const ProjectDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, deleteProject, analyzeProject } = useProjectStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  
  const project = id ? projects.find(p => p.id === id) : null;

  useEffect(() => {
    if (!project && id) {
      console.log('Project not found:', id);
    }
  }, [project, id]);

  if (!project) {
    return (
      <div className="p-6">
        <EmptyState
          icon={FileText}
          title="Projekt nenájdený"
          description="Projekt s týmto ID neexistuje alebo bol odstránený."
          action={{
            label: "Späť na dashboard",
            onClick: () => navigate('/')
          }}
        />
      </div>
    );
  }

  const handleDelete = async () => {
    if (!confirm('Ste si istí, že chcete odstrániť tento projekt?')) return;
    
    setIsLoading(true);
    try {
      deleteProject(project.id);
      toast({
        title: "Projekt odstránený",
        description: "Projekt bol úspešne odstránený.",
      });
      navigate('/');
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa odstrániť projekt.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      await analyzeProject(project.id, 'deep');
      toast({
        title: "Analýza dokončená",
        description: "AI analýza projektu bola úspešne dokončená.",
      });
    } catch (error) {
      console.error('Failed to analyze project:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa spustiť analýzu projektu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statusConfig = getStatusConfig(project.status);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Späť
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleAnalyze} 
            disabled={project.status === 'analyzing' || isLoading}
          >
            <Play className="w-4 h-4 mr-2" />
            {project.status === 'analyzing' ? 'Analyzujem...' : 'Spustiť analýzu'}
          </Button>
          <Button variant="outline">
            <Edit3 className="w-4 h-4 mr-2" />
            Upraviť
          </Button>
          <Button variant="outline" onClick={handleDelete} disabled={isLoading}>
            <Trash2 className="w-4 h-4 mr-2" />
            Odstrániť
          </Button>
        </div>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={`${statusConfig.bgColor} ${statusConfig.textColor}`} variant="outline">
                  {t(`status.${project.status}`)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Pokrok</p>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={project.progress} className="flex-1" />
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Typ</p>
              <p className="font-semibold">{t(`types.${project.type}`)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Posledná aktualizácia</p>
              <p className="text-sm font-medium">{formatDate(project.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Prehľad
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Intelligence
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Analýza
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Poznámky
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            AI Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detaily projektu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Názov</label>
                  <p className="font-semibold">{project.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Popis</label>
                  <p className="text-sm">{project.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Vytvorené</label>
                  <p className="text-sm">{formatDate(project.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tags</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Rýchle akcie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2" onClick={handleAnalyze} disabled={isLoading}>
                  <Brain className="w-4 h-4" />
                  Spustiť AI analýzu
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="w-4 h-4" />
                  Upraviť nastavenia
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Exportovať report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="intelligence">
          <ProjectIntelligenceComponent project={project} />
        </TabsContent>

        <TabsContent value="analysis">
          <ProjectAnalysis project={project} />
        </TabsContent>

        <TabsContent value="notes">
          <ProjectNotes project={project} />
        </TabsContent>

        <TabsContent value="chat">
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              <EnhancedChatInterface 
                projectId={project.id} 
                context={`project-${project.type}`}
                projectType={project.type}
                projectName={project.name}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
