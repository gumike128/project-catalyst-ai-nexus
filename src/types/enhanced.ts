
import { Project } from './index';

export type ProjectStatus = 'draft' | 'analyzing' | 'complete' | 'error';
export type ProjectType = 'web' | 'mobile' | 'desktop' | 'ai' | 'research' | 'other';
export type SortField = 'name' | 'createdAt' | 'updatedAt' | 'progress';
export type SortOrder = 'asc' | 'desc';

export interface ProjectFilters {
  searchTerm: string;
  status: ProjectStatus | 'all';
  type: ProjectType | 'all';
  sortBy: SortField;
  sortOrder: SortOrder;
}

export interface ProjectStats {
  total: number;
  active: number;
  completed: number;
  errors: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  timestamp: Date;
}

export interface ProjectOperationResult {
  success: boolean;
  message?: string;
  project?: Project;
  error?: Error;
}
