
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../stores/projectStore';
import { ProjectService } from '../services/projectService';
import { ProjectsHeader } from '../components/projects/ProjectsHeader';
import { ProjectsStats } from '../components/projects/ProjectsStats';
import { ProjectsFiltersBar } from '../components/projects/ProjectsFiltersBar';
import { ProjectsList } from '../components/projects/ProjectsList';
import { useProjectsFilters } from '../hooks/useProjectsFilters';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { projects, initializeProjects } = useProjectStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { filters, handleFilterChange } = useProjectsFilters();

  useEffect(() => {
    initializeProjects();
  }, [initializeProjects]);

  const filteredProjects = ProjectService.filterProjects(projects, filters);
  const sortedProjects = ProjectService.sortProjects(filteredProjects, filters.sortBy, filters.sortOrder);
  const stats = ProjectService.calculateStats(projects);

  const handleCreateProject = () => {
    navigate('/project/new');
  };

  return (
    <div className="p-6 space-y-6">
      <ProjectsHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCreateProject={handleCreateProject}
      />

      <ProjectsStats stats={stats} />

      <ProjectsFiltersBar
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <ProjectsList
        projects={sortedProjects}
        filters={filters}
        viewMode={viewMode}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};
