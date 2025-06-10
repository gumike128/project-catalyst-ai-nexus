
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, FolderOpen, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { EmptyState } from '../components/ui/EmptyState';
import { ProjectCard } from '../components/features/ProjectCard';
import { ProjectFilters } from '../components/features/ProjectFilters';
import { StatsCard } from '../components/features/StatsCard';
import { useProjectStore } from '../stores/projectStore';
import { getProjectStats } from '../services/mockData';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { getFilteredProjects, initializeProjects } = useProjectStore();
  
  const projects = getFilteredProjects();
  const stats = getProjectStats();

  useEffect(() => {
    initializeProjects();
  }, [initializeProjects]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('dashboard.title')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/project/new">
            <Plus className="w-4 h-4" />
            {t('dashboard.newProject')}
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('dashboard.totalProjects')}
          value={stats.total}
          icon={FolderOpen}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={t('dashboard.activeProjects')}
          value={stats.active}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title={t('dashboard.completedProjects')}
          value={stats.completed}
          icon={CheckCircle}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Issues"
          value={stats.error}
          icon={AlertCircle}
          trend={{ value: -5, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <ProjectFilters />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="lg:col-span-3">
          {projects.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title={t('dashboard.emptyState')}
              description="Create your first project to start managing and analyzing your work with AI."
              action={{
                label: t('dashboard.newProject'),
                onClick: () => {
                  // Navigate to new project
                  window.location.href = '/project/new';
                }
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
