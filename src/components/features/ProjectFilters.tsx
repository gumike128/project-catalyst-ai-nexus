
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useProjectStore } from '../../stores/projectStore';
import { getAllTags } from '../../services/mockData';

const PROJECT_TYPES = ['web', 'mobile', 'desktop', 'ai', 'research', 'other'];
const PROJECT_STATUSES = ['draft', 'analyzing', 'complete', 'error'];
const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'updatedAt', label: 'Updated Date' },
  { value: 'name', label: 'Name' },
  { value: 'progress', label: 'Progress' }
];

export const ProjectFilters: React.FC = () => {
  const { t } = useTranslation();
  const { filters, setFilters } = useProjectStore();
  const allTags = getAllTags();

  const handleSearchChange = (value: string) => {
    setFilters({ searchQuery: value });
  };

  const handleStatusFilter = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    setFilters({ status: newStatuses });
  };

  const handleTypeFilter = (type: string) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    setFilters({ type: newTypes });
  };

  const handleTagFilter = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    setFilters({ tags: newTags });
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      type: [],
      tags: [],
      searchQuery: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = filters.status.length > 0 || filters.type.length > 0 || 
                          filters.tags.length > 0 || filters.searchQuery.length > 0;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder={t('dashboard.searchPlaceholder')}
          value={filters.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Sort */}
        <Select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onValueChange={(value) => {
            const [sortBy, sortOrder] = value.split('-') as [string, 'asc' | 'desc'];
            setFilters({ sortBy: sortBy as any, sortOrder });
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder={t('dashboard.sortBy')} />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <React.Fragment key={option.value}>
                <SelectItem value={`${option.value}-desc`}>
                  {option.label} (Newest first)
                </SelectItem>
                <SelectItem value={`${option.value}-asc`}>
                  {option.label} (Oldest first)
                </SelectItem>
              </React.Fragment>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} className="gap-2">
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Filter Tags */}
      <div className="space-y-3">
        {/* Status Filters */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            {t('dashboard.filterByStatus')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {PROJECT_STATUSES.map((status) => (
              <Badge
                key={status}
                variant={filters.status.includes(status) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => handleStatusFilter(status)}
              >
                {t(`status.${status}`)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Type Filters */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">
            {t('dashboard.filterByType')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {PROJECT_TYPES.map((type) => (
              <Badge
                key={type}
                variant={filters.type.includes(type) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => handleTypeFilter(type)}
              >
                {t(`types.${type}`)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              {t('project.tags')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 10).map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
