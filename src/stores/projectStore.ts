
import { create } from 'zustand';
import { Project, FilterOptions, Analysis } from '../types';
import { mockProjects, generateMockAnalysis } from '../services/mockData';

interface ProjectStore {
  projects: Project[];
  currentProject: Project | null;
  filters: FilterOptions;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  analyzeProject: (id: string, type: 'initial' | 'deep') => Promise<void>;
  getFilteredProjects: () => Project[];
  getProjectById: (id: string) => Project | undefined;
  initializeProjects: () => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  currentProject: null,
  filters: {
    status: [],
    type: [],
    tags: [],
    searchQuery: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  },
  isLoading: false,
  error: null,

  setProjects: (projects) => {
    console.log('Setting projects:', projects.length);
    set({ projects, error: null });
  },
  
  setCurrentProject: (project) => {
    console.log('Setting current project:', project?.name || 'null');
    set({ currentProject: project });
  },
  
  addProject: (projectData) => {
    try {
      const newProject: Project = {
        ...projectData,
        id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: 0
      };
      console.log('Adding new project:', newProject.name);
      set((state) => ({ 
        projects: [newProject, ...state.projects],
        error: null
      }));
    } catch (error) {
      console.error('Error adding project:', error);
      set({ error: 'Failed to add project' });
    }
  },
  
  updateProject: (id, updates) => {
    try {
      console.log('Updating project:', id, updates);
      set((state) => {
        const updatedProjects = state.projects.map((project) =>
          project.id === id
            ? { ...project, ...updates, updatedAt: new Date() }
            : project
        );
        
        const updatedCurrentProject = state.currentProject?.id === id
          ? { ...state.currentProject, ...updates, updatedAt: new Date() }
          : state.currentProject;

        return {
          projects: updatedProjects,
          currentProject: updatedCurrentProject,
          error: null
        };
      });
    } catch (error) {
      console.error('Error updating project:', error);
      set({ error: 'Failed to update project' });
    }
  },
  
  deleteProject: (id) => {
    try {
      console.log('Deleting project:', id);
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject,
        error: null
      }));
    } catch (error) {
      console.error('Error deleting project:', error);
      set({ error: 'Failed to delete project' });
    }
  },
  
  setFilters: (newFilters) => {
    console.log('Setting filters:', newFilters);
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },
  
  setLoading: (loading) => {
    console.log('Setting loading:', loading);
    set({ isLoading: loading });
  },
  
  setError: (error) => {
    console.log('Setting error:', error);
    set({ error });
  },
  
  analyzeProject: async (id, type) => {
    console.log('Starting analysis for project:', id, type);
    set({ isLoading: true, error: null });
    
    try {
      // Update project status immediately
      get().updateProject(id, { status: 'analyzing' as const });
      
      // Simulate AI analysis delay
      const delay = 2000 + Math.random() * 3000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      const analysis = generateMockAnalysis(id, type);
      console.log('Analysis completed:', analysis);
      
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id
            ? { 
                ...project, 
                analysis,
                status: 'complete' as const,
                progress: 100,
                updatedAt: new Date()
              }
            : project
        ),
        currentProject: state.currentProject?.id === id
          ? {
              ...state.currentProject,
              analysis,
              status: 'complete' as const,
              progress: 100,
              updatedAt: new Date()
            }
          : state.currentProject,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      console.error('Analysis failed:', error);
      set({ 
        error: 'Failed to analyze project',
        isLoading: false 
      });
      
      // Update project status to error
      get().updateProject(id, { status: 'error' });
    }
  },
  
  getFilteredProjects: () => {
    try {
      const { projects, filters } = get();
      console.log('Filtering projects:', projects.length, 'with filters:', filters);
      
      let filtered = [...projects];
      
      // Apply search filter
      if (filters.searchQuery?.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(project => {
          const searchableText = [
            project.name,
            project.description,
            ...project.tags
          ].join(' ').toLowerCase();
          
          return searchableText.includes(query);
        });
      }
      
      // Apply status filter
      if (filters.status.length > 0) {
        filtered = filtered.filter(project =>
          filters.status.includes(project.status)
        );
      }
      
      // Apply type filter
      if (filters.type.length > 0) {
        filtered = filtered.filter(project =>
          filters.type.includes(project.type)
        );
      }
      
      // Apply tags filter
      if (filters.tags.length > 0) {
        filtered = filtered.filter(project =>
          filters.tags.some(tag => project.tags.includes(tag))
        );
      }
      
      // Apply sorting with null safety
      filtered.sort((a, b) => {
        const { sortBy, sortOrder } = filters;
        let aValue: any, bValue: any;
        
        try {
          switch (sortBy) {
            case 'name':
              aValue = a.name?.toLowerCase() || '';
              bValue = b.name?.toLowerCase() || '';
              break;
            case 'createdAt':
              aValue = a.createdAt?.getTime() || 0;
              bValue = b.createdAt?.getTime() || 0;
              break;
            case 'updatedAt':
              aValue = a.updatedAt?.getTime() || 0;
              bValue = b.updatedAt?.getTime() || 0;
              break;
            case 'progress':
              aValue = a.progress || 0;
              bValue = b.progress || 0;
              break;
            default:
              aValue = a.createdAt?.getTime() || 0;
              bValue = b.createdAt?.getTime() || 0;
          }
          
          if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
          } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
          }
        } catch (error) {
          console.warn('Sorting error:', error);
          return 0;
        }
      });
      
      console.log('Filtered projects:', filtered.length);
      return filtered;
    } catch (error) {
      console.error('Error filtering projects:', error);
      return [];
    }
  },
  
  getProjectById: (id) => {
    try {
      const project = get().projects.find(project => project.id === id);
      console.log('Getting project by ID:', id, project ? 'found' : 'not found');
      return project;
    } catch (error) {
      console.error('Error getting project by ID:', error);
      return undefined;
    }
  },
  
  initializeProjects: () => {
    try {
      console.log('Initializing projects with mock data');
      set({ 
        projects: mockProjects,
        error: null,
        isLoading: false
      });
    } catch (error) {
      console.error('Error initializing projects:', error);
      set({ 
        error: 'Failed to initialize projects',
        isLoading: false,
        projects: []
      });
    }
  }
}));
