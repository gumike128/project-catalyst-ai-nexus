
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  FileText, 
  MessageSquare,
  BarChart3,
  Play,
  Edit3,
  Download
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useProjectStore } from '../stores/projectStore';
import { ProjectAnalysis } from '../components/features/ProjectAnalysis';
import { ProjectFiles } from '../components/features/ProjectFiles';
import { ProjectNotes } from '../components/features/ProjectNotes';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { getProjectById, analyzeProject, isLoading } = useProjectStore();
  
  const project = id ? getProjectById(id) : null;

  useEffect(() => {
    if (project) {
      // Set as current project for context
    }
  }, [project]);

  if (!project) {
    return (
      <div className="p-6">
        <EmptyState
          icon={FileText}
          title="Project not found"
          description="The project you're looking for doesn't exist or has been deleted."
          action={{
            label: "Back to Dashboard",
            onClick: () => window.history.back()
          }}
        />
      </div>
    );
  }

  const handleAnalyze = async () => {
    if (project.id) {
      await analyzeProject(project.id, 'deep');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary">{t(`types.${project.type}`)}</Badge>
            <Badge variant={project.status === 'complete' ? 'default' : 'secondary'}>
              {t(`status.${project.status}`)}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
          <p className="text-muted-foreground mt-1">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit3 className="w-4 h-4 mr-2" />
            {t('common.edit')}
          </Button>
          <Button onClick={handleAnalyze} disabled={isLoading} size="sm">
            {isLoading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {t('project.analyzeProject')}
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              {t('project.progress')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{project.progress}%</span>
                <span className="text-sm text-muted-foreground">Complete</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t('project.createdAt')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-1">
              {formatDate(project.createdAt)}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              Updated {formatDate(project.updatedAt)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {t('project.tags')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t('project.overview')}</TabsTrigger>
          <TabsTrigger value="analysis">{t('project.analysis')}</TabsTrigger>
          <TabsTrigger value="files">{t('project.files')}</TabsTrigger>
          <TabsTrigger value="notes">{t('project.notes')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>{t('project.metrics')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('project.complexity')}</p>
                    <p className="text-lg font-semibold">{project.metrics.complexity}/10</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('project.estimatedHours')}</p>
                    <p className="text-lg font-semibold">{project.metrics.estimatedHours}h</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('project.riskLevel')}</p>
                    <Badge variant={
                      project.metrics.riskLevel === 'low' ? 'default' : 
                      project.metrics.riskLevel === 'medium' ? 'secondary' : 'destructive'
                    }>
                      {project.metrics.riskLevel}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('project.successProbability')}</p>
                    <p className="text-lg font-semibold">{project.metrics.successProbability}%</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{t('project.resourcesNeeded')}</p>
                  <div className="space-y-1">
                    {project.metrics.resourcesNeeded.map((resource, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Analysis completed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Files uploaded</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Project created</p>
                      <p className="text-xs text-muted-foreground">{formatDate(project.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <ProjectAnalysis project={project} />
        </TabsContent>

        <TabsContent value="files">
          <ProjectFiles project={project} />
        </TabsContent>

        <TabsContent value="notes">
          <ProjectNotes project={project} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
