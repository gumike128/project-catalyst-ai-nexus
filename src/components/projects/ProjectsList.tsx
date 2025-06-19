
import React from 'react';
import { FolderOpen } from 'lucide-react';
import { Project } from '../../types';
import { ProjectCard } from '../features/ProjectCard';
import { EmptyState } from '../ui/EmptyState';
import { ProjectFilters } from '../../types/enhanced';

interface ProjectsListProps {
  projects: Project[];
  filters: ProjectFilters;
  viewMode: 'grid' | 'list';
  onCreateProject: () => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  filters,
  viewMode,
  onCreateProject
}) => {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderOpen}
        title="Žiadne projekty"
        description={
          filters.searchTerm 
            ? "Nenašli sa žiadne projekty zodpovedajúce vašim kritériám." 
            : "Začnite vytvorením svojho prvého projektu."
        }
        action={{
          label: "Vytvoriť projekt",
          onClick: onCreateProject
        }}
      />
    );
  }

  return (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "space-y-4"
    }>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
};
