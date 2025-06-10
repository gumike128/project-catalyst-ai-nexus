
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'analyzing' | 'complete' | 'error';
  type: 'web' | 'mobile' | 'desktop' | 'ai' | 'research' | 'other';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  analysis?: Analysis;
  files: ProjectFile[];
  notes: Note[];
  metrics: ProjectMetrics;
  progress: number;
}

export interface Analysis {
  id: string;
  projectId: string;
  type: 'initial' | 'deep';
  keywords: string[];
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  recommendations: string[];
  completedAt: Date;
  confidence: number;
  technicalScore: number;
  complexityLevel: 'low' | 'medium' | 'high';
}

export interface ProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  processed: boolean;
  url?: string;
}

export interface Note {
  id: string;
  content: string;
  type: 'user' | 'ai';
  createdAt: Date;
  tags: string[];
  projectId?: string;
}

export interface ProjectMetrics {
  complexity: number;
  estimatedHours: number;
  riskLevel: 'low' | 'medium' | 'high';
  successProbability: number;
  resourcesNeeded: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  projectId?: string;
}

export interface FilterOptions {
  status: string[];
  type: string[];
  tags: string[];
  searchQuery: string;
  sortBy: 'name' | 'createdAt' | 'updatedAt' | 'progress';
  sortOrder: 'asc' | 'desc';
}
