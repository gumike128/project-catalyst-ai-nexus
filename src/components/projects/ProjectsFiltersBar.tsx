
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ProjectFilters } from '../../types/enhanced';

interface ProjectsFiltersBarProps {
  filters: ProjectFilters;
  onFilterChange: (key: keyof ProjectFilters, value: any) => void;
}

export const ProjectsFiltersBar: React.FC<ProjectsFiltersBarProps> = ({
  filters,
  onFilterChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Hľadať projekty..."
          value={filters.searchTerm}
          onChange={(e) => onFilterChange('searchTerm', e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={filters.status} onValueChange={(value) => onFilterChange('status', value)}>
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

      <Select value={filters.type} onValueChange={(value) => onFilterChange('type', value)}>
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

      <Select value={filters.sortBy} onValueChange={(value) => onFilterChange('sortBy', value)}>
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
  );
};
