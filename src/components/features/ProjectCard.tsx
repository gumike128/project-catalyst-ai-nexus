
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  Clock, 
  MoreHorizontal, 
  Play, 
  Trash2, 
  Edit3,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { Project } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { useProjectStore } from '../../stores/projectStore';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: Project;
}

const statusIcons = {
  draft: Edit3,
  analyzing: Loader2,
  complete: CheckCircle,
  error: AlertCircle
};

const statusColors = {
  draft: 'bg-yellow-500/10 text-yellow-500',
  analyzing: 'bg-blue-500/10 text-blue-500',
  complete: 'bg-green-500/10 text-green-500',
  error: 'bg-red-500/10 text-red-500'
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation();
  const { deleteProject, analyzeProject } = useProjectStore();
  
  const StatusIcon = statusIcons[project.status];
  const isAnalyzing = project.status === 'analyzing';

  const handleAnalyze = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await analyzeProject(project.id, 'initial');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(project.id);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {t(`types.${project.type}`)}
              </Badge>
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                statusColors[project.status]
              )}>
                <StatusIcon className={cn(
                  "w-3 h-3",
                  isAnalyzing && "animate-spin"
                )} />
                {t(`status.${project.status}`)}
              </div>
            </div>
            <Link to={`/project/${project.id}`}>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {project.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/project/${project.id}`}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  {t('common.view')}
                </Link>
              </DropdownMenuItem>
              {project.status !== 'analyzing' && (
                <DropdownMenuItem onClick={handleAnalyze}>
                  <Play className="w-4 h-4 mr-2" />
                  {t('project.analyzeProject')}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                {t('common.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{t('project.progress')}</span>
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(project.createdAt)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(project.updatedAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
