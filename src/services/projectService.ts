
import { Project } from '../types';
import { ProjectFilters, ProjectStats, ProjectOperationResult } from '../types/enhanced';

export class ProjectService {
  static filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
    return projects.filter(project => {
      const matchesSearch = filters.searchTerm === '' || 
        project.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || project.status === filters.status;
      const matchesType = filters.type === 'all' || project.type === filters.type;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }

  static sortProjects(projects: Project[], sortBy: string, sortOrder: string = 'desc'): Project[] {
    return [...projects].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'created':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'updated':
          comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
          break;
        case 'progress':
          comparison = a.progress - b.progress;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  static calculateStats(projects: Project[]): ProjectStats {
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'analyzing' || p.status === 'draft').length,
      completed: projects.filter(p => p.status === 'complete').length,
      errors: projects.filter(p => p.status === 'error').length
    };
  }

  static async safeDeleteProject(projectId: string, deleteFunction: (id: string) => void): Promise<ProjectOperationResult> {
    try {
      deleteFunction(projectId);
      return {
        success: true,
        message: 'Project deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting project:', error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
        message: 'Failed to delete project'
      };
    }
  }

  static async safeAnalyzeProject(
    projectId: string, 
    analyzeFunction: (id: string, type: string) => Promise<void>
  ): Promise<ProjectOperationResult> {
    try {
      await analyzeFunction(projectId, 'initial');
      return {
        success: true,
        message: 'Analysis started successfully'
      };
    } catch (error) {
      console.error('Error analyzing project:', error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
        message: 'Failed to start analysis'
      };
    }
  }
}
