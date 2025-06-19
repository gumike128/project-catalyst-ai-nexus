
import React from 'react';
import { FolderOpen, Plus, List, Grid } from 'lucide-react';
import { Button } from '../ui/button';

interface ProjectsHeaderProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onCreateProject: () => void;
}

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  viewMode,
  onViewModeChange,
  onCreateProject
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <FolderOpen className="w-8 h-8" />
          Projekty
        </h1>
        <p className="text-muted-foreground mt-1">
          Spravujte svoje AI projekty a analýzy
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => onViewModeChange(viewMode === 'grid' ? 'list' : 'grid')}
        >
          {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
        </Button>
        <Button onClick={onCreateProject} className="gap-2">
          <Plus className="w-4 h-4" />
          Nový projekt
        </Button>
      </div>
    </div>
  );
};
