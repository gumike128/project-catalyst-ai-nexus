
import { useState } from 'react';
import { ProjectFilters } from '../types/enhanced';

export const useProjectsFilters = () => {
  const [filters, setFilters] = useState<ProjectFilters>({
    searchTerm: '',
    status: 'all',
    type: 'all',
    sortBy: 'updatedAt',
    sortOrder: 'desc'
  });

  const handleFilterChange = (key: keyof ProjectFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    handleFilterChange
  };
};
