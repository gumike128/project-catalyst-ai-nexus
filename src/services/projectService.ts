
import { Project } from '../types';
import { ProjectFilters, ProjectStats, ProjectOperationResult } from '../types/enhanced';

export class ProjectService {
  static filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
    try {
      if (!Array.isArray(projects)) {
        console.warn('Invalid projects array provided to filterProjects');
        return [];
      }

      return projects.filter(project => {
        try {
          const matchesSearch = !filters.searchTerm?.trim() || 
            project.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            project.description?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            project.tags?.some(tag => tag?.toLowerCase().includes(filters.searchTerm.toLowerCase()));
          
          const matchesStatus = filters.status === 'all' || project.status === filters.status;
          const matchesType = filters.type === 'all' || project.type === filters.type;
          
          return matchesSearch && matchesStatus && matchesType;
        } catch (error) {
          console.warn('Error filtering individual project:', project.id, error);
          return false;
        }
      });
    } catch (error) {
      console.error('Error in filterProjects:', error);
      return [];
    }
  }

  static sortProjects(projects: Project[], sortBy: string, sortOrder: string = 'desc'): Project[] {
    try {
      if (!Array.isArray(projects)) {
        console.warn('Invalid projects array provided to sortProjects');
        return [];
      }

      return [...projects].sort((a, b) => {
        try {
          let comparison = 0;
          
          switch (sortBy) {
            case 'name':
              const nameA = a.name?.toLowerCase() || '';
              const nameB = b.name?.toLowerCase() || '';
              comparison = nameA.localeCompare(nameB);
              break;
            case 'created':
            case 'createdAt':
              const createdA = a.createdAt?.getTime() || 0;
              const createdB = b.createdAt?.getTime() || 0;
              comparison = createdA - createdB;
              break;
            case 'updated':
            case 'updatedAt':
              const updatedA = a.updatedAt?.getTime() || 0;
              const updatedB = b.updatedAt?.getTime() || 0;
              comparison = updatedA - updatedB;
              break;
            case 'progress':
              const progressA = a.progress || 0;
              const progressB = b.progress || 0;
              comparison = progressA - progressB;
              break;
            default:
              comparison = 0;
          }
          
          return sortOrder === 'asc' ? comparison : -comparison;
        } catch (error) {
          console.warn('Error comparing projects in sort:', error);
          return 0;
        }
      });
    } catch (error) {
      console.error('Error in sortProjects:', error);
      return projects || [];
    }
  }

  static calculateStats(projects: Project[]): ProjectStats {
    try {
      if (!Array.isArray(projects)) {
        console.warn('Invalid projects array provided to calculateStats');
        return { total: 0, active: 0, completed: 0, errors: 0 };
      }

      const stats = {
        total: projects.length,
        active: projects.filter(p => p?.status === 'analyzing' || p?.status === 'draft').length,
        completed: projects.filter(p => p?.status === 'complete').length,
        errors: projects.filter(p => p?.status === 'error').length
      };

      console.log('Calculated project stats:', stats);
      return stats;
    } catch (error) {
      console.error('Error calculating stats:', error);
      return { total: 0, active: 0, completed: 0, errors: 0 };
    }
  }

  static async safeDeleteProject(projectId: string, deleteFunction: (id: string) => void): Promise<ProjectOperationResult> {
    try {
      if (!projectId?.trim()) {
        throw new Error('Invalid project ID provided');
      }

      if (typeof deleteFunction !== 'function') {
        throw new Error('Invalid delete function provided');
      }

      console.log('Safely deleting project:', projectId);
      deleteFunction(projectId);
      
      return {
        success: true,
        message: 'Project deleted successfully'
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error deleting project:', errorMessage);
      
      return {
        success: false,
        error: error instanceof Error ? error : new Error(errorMessage),
        message: `Failed to delete project: ${errorMessage}`
      };
    }
  }

  static async safeAnalyzeProject(
    projectId: string, 
    analyzeFunction: (id: string, type: string) => Promise<void>
  ): Promise<ProjectOperationResult> {
    try {
      if (!projectId?.trim()) {
        throw new Error('Invalid project ID provided');
      }

      if (typeof analyzeFunction !== 'function') {
        throw new Error('Invalid analyze function provided');
      }

      console.log('Safely analyzing project:', projectId);
      await analyzeFunction(projectId, 'initial');
      
      return {
        success: true,
        message: 'Analysis started successfully'
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error analyzing project:', errorMessage);
      
      return {
        success: false,
        error: error instanceof Error ? error : new Error(errorMessage),
        message: `Failed to start analysis: ${errorMessage}`
      };
    }
  }

  static validateProject(project: Partial<Project>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!project.name?.trim()) {
      errors.push('Project name is required');
    }

    if (!project.description?.trim()) {
      errors.push('Project description is required');
    }

    if (!project.type) {
      errors.push('Project type is required');
    }

    if (!Array.isArray(project.tags)) {
      errors.push('Project tags must be an array');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
