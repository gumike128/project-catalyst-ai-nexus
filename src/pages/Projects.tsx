
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

export const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { projects, initializeProjects } = useProjectStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('updated');

  useEffect(() => {
    initializeProjects();
  }, [initializeProjects]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesType = selectedType === 'all' || project.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'created':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'updated':
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      case 'progress':
        return b.progress - a.progress;
      default:
        return 0;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return CheckCircle;
      case 'analyzing': return BarChart3;
      case 'draft': return Clock;
      case 'error': return AlertCircle;
      default: return FolderOpen;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-green-600';
      case 'analyzing': return 'text-blue-600';
      case 'draft': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'analyzing' || p.status === 'draft').length,
    completed: projects.filter(p => p.status === 'complete').length,
    errors: projects.filter(p => p.status === 'error').length
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
          <Button asChild className="gap-2">
            <Link to="/project/new">
              <Plus className="w-4 h-4" />
              Nový projekt
            </Link>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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

        <Select value={selectedType} onValueChange={setSelectedType}>
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

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Zoradiť podľa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Posledná aktualizácia</SelectItem>
            <SelectItem value="created">Dátum vytvorenia</SelectItem>
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
          description={searchTerm ? "Nenašli sa žiadne projekty zodpovedajúce vašim kritériám." : "Začnite vytvorením svojho prvého projektu."}
          action={{
            label: "Vytvoriť projekt",
            onClick: () => window.location.href = '/project/new'
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
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
