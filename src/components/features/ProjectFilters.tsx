
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Card, CardContent } from '../ui/card';

export interface FilterState {
  search: string;
  status: string;
  type: string;
  sortBy: string;
}

interface ProjectFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'analyzing', label: 'Analyzing' },
  { value: 'complete', label: 'Complete' },
  { value: 'error', label: 'Error' }
];

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'web', label: 'Web Application' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'desktop', label: 'Desktop Application' },
  { value: 'ai', label: 'AI/ML Project' },
  { value: 'research', label: 'Research' },
  { value: 'other', label: 'Other' }
];

const sortOptions = [
  { value: 'updatedAt', label: 'Recently Updated' },
  { value: 'createdAt', label: 'Recently Created' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'progress', label: 'Progress' }
];

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status !== 'all') count++;
    if (filters.type !== 'all') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search and Quick Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t('dashboard.searchPlaceholder')}
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                {t('common.filter')}
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {isExpanded && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('dashboard.filterByStatus')}
                </label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('dashboard.filterByType')}
                </label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('dashboard.sortBy')}
                </label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => handleFilterChange('sortBy', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
              {filters.search && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{filters.search}"
                  <button
                    onClick={() => handleFilterChange('search', '')}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.status !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  Status: {statusOptions.find(opt => opt.value === filters.status)?.label}
                  <button
                    onClick={() => handleFilterChange('status', 'all')}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.type !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  Type: {typeOptions.find(opt => opt.value === filters.type)?.label}
                  <button
                    onClick={() => handleFilterChange('type', 'all')}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
