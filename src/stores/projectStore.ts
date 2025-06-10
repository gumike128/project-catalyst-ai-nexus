
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

  setProjects: (projects) => set({ projects }),
  
  setCurrentProject: (project) => set({ currentProject: project }),
  
  addProject: (projectData) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      progress: 0
    };
    set((state) => ({ 
      projects: [newProject, ...state.projects] 
    }));
  },
  
  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date() }
          : project
      ),
      currentProject: state.currentProject?.id === id
        ? { ...state.currentProject, ...updates, updatedAt: new Date() }
        : state.currentProject
    }));
  },
  
  deleteProject: (id) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
      currentProject: state.currentProject?.id === id ? null : state.currentProject
    }));
  },
  
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  analyzeProject: async (id, type) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      const analysis = generateMockAnalysis(id, type);
      
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
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: 'Failed to analyze project',
        isLoading: false 
      });
      
      // Update project status to error
      get().updateProject(id, { status: 'error' });
    }
  },
  
  getFilteredProjects: () => {
    const { projects, filters } = get();
    
    let filtered = [...projects];
    
    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
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
    
    // Apply sorting
    filtered.sort((a, b) => {
      const { sortBy, sortOrder } = filters;
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'createdAt':
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        case 'updatedAt':
          aValue = a.updatedAt.getTime();
          bValue = b.updatedAt.getTime();
          break;
        case 'progress':
          aValue = a.progress;
          bValue = b.progress;
          break;
        default:
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  },
  
  getProjectById: (id) => {
    return get().projects.find(project => project.id === id);
  },
  
  initializeProjects: () => {
    set({ projects: mockProjects });
  }
}));
