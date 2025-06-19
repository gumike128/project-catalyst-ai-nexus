
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  FolderOpen, 
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useProjectStore } from '../stores/projectStore';
import { ProjectCard } from '../components/features/ProjectCard';
import { ProjectFilters } from '../components/features/ProjectFilters';
import { EmptyState } from '../components/ui/EmptyState';
import { ProjectService } from '../services/projectService';
import { ProjectFilters as ProjectFiltersType } from '../types/enhanced';

export const Projects: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projects, initializeProjects } = useProjectStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ProjectFiltersType>({
    searchTerm: '',
    status: 'all',
    type: 'all',
    sortBy: 'updatedAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    initializeProjects();
  }, [initializeProjects]);

  const filteredProjects = ProjectService.filterProjects(projects, filters);
  const sortedProjects = ProjectService.sortProjects(filteredProjects, filters.sortBy, filters.sortOrder);
  const stats = ProjectService.calculateStats(projects);

  const handleFilterChange = (key: keyof ProjectFiltersType, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCreateProject = () => {
    navigate('/project/new');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
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
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
          <Button onClick={handleCreateProject} className="gap-2">
            <Plus className="w-4 h-4" />
            Nový projekt
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FolderOpen className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Celkom projektov</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Aktívne</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Dokončené</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Chyby</p>
                <p className="text-2xl font-bold">{stats.errors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Hľadať projekty..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Všetky statusy</SelectItem>
            <SelectItem value="draft">Koncept</SelectItem>
            <SelectItem value="analyzing">Analyzuje sa</SelectItem>
            <SelectItem value="complete">Dokončený</SelectItem>
            <SelectItem value="error">Chyba</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Typ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Všetky typy</SelectItem>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="api">API</SelectItem>
            <SelectItem value="ai">AI/ML</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Zoradiť podľa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updatedAt">Posledná aktualizácia</SelectItem>
            <SelectItem value="createdAt">Dátum vytvorenia</SelectItem>
            <SelectItem value="name">Názov</SelectItem>
            <SelectItem value="progress">Pokrok</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects List */}
      {sortedProjects.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="Žiadne projekty"
          description={filters.searchTerm ? "Nenašli sa žiadne projekty zodpovedajúce vašim kritériám." : "Začnite vytvorením svojho prvého projektu."}
          action={{
            label: "Vytvoriť projekt",
            onClick: handleCreateProject
          }}
        />
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
        }>
          {sortedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      )}
    </div>
  );
};
