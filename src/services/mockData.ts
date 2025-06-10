
import { Project, Analysis, ProjectFile, Note, ProjectMetrics } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Modern React-based e-commerce platform with microservices architecture',
    status: 'complete',
    type: 'web',
    tags: ['react', 'typescript', 'microservices', 'ecommerce'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-05-20'),
    progress: 100,
    files: [
      {
        id: '1',
        name: 'project-requirements.pdf',
        size: 2456789,
        type: 'application/pdf',
        uploadedAt: new Date('2024-01-15'),
        processed: true
      },
      {
        id: '2',
        name: 'architecture-diagram.png',
        size: 1234567,
        type: 'image/png',
        uploadedAt: new Date('2024-01-16'),
        processed: true
      }
    ],
    notes: [
      {
        id: '1',
        content: 'Initial project setup completed. Database schema designed.',
        type: 'user',
        createdAt: new Date('2024-01-16'),
        tags: ['setup', 'database']
      },
      {
        id: '2',
        content: 'Based on the analysis, I recommend implementing Redis caching for better performance.',
        type: 'ai',
        createdAt: new Date('2024-01-17'),
        tags: ['performance', 'caching']
      }
    ],
    metrics: {
      complexity: 8,
      estimatedHours: 480,
      riskLevel: 'medium',
      successProbability: 85,
      resourcesNeeded: ['Senior React Developer', 'Backend Developer', 'DevOps Engineer']
    },
    analysis: {
      id: '1',
      projectId: '1',
      type: 'deep',
      keywords: ['react', 'ecommerce', 'microservices', 'scalability', 'user experience'],
      summary: 'This e-commerce platform project demonstrates excellent architectural planning with modern technologies. The microservices approach will ensure scalability and maintainability.',
      sentiment: 'positive',
      recommendations: [
        'Implement comprehensive testing strategy',
        'Set up CI/CD pipeline early',
        'Consider implementing progressive web app features',
        'Plan for mobile-first responsive design'
      ],
      completedAt: new Date('2024-01-18'),
      confidence: 92,
      technicalScore: 85,
      complexityLevel: 'high'
    }
  },
  {
    id: '2',
    name: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking app with AI-powered workout recommendations',
    status: 'analyzing',
    type: 'mobile',
    tags: ['react-native', 'ai', 'fitness', 'health'],
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-25'),
    progress: 65,
    files: [
      {
        id: '3',
        name: 'user-research.docx',
        size: 987654,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        uploadedAt: new Date('2024-05-01'),
        processed: true
      }
    ],
    notes: [
      {
        id: '3',
        content: 'User research phase completed. 500 responses collected.',
        type: 'user',
        createdAt: new Date('2024-05-02'),
        tags: ['research', 'users']
      }
    ],
    metrics: {
      complexity: 7,
      estimatedHours: 360,
      riskLevel: 'medium',
      successProbability: 78,
      resourcesNeeded: ['React Native Developer', 'AI/ML Engineer', 'UI/UX Designer']
    }
  },
  {
    id: '3',
    name: 'AI Chatbot System',
    description: 'Intelligent customer service chatbot with natural language processing',
    status: 'draft',
    type: 'ai',
    tags: ['nlp', 'chatbot', 'ai', 'customer-service'],
    createdAt: new Date('2024-05-28'),
    updatedAt: new Date('2024-05-28'),
    progress: 15,
    files: [],
    notes: [],
    metrics: {
      complexity: 9,
      estimatedHours: 600,
      riskLevel: 'high',
      successProbability: 70,
      resourcesNeeded: ['AI/ML Engineer', 'NLP Specialist', 'Backend Developer', 'Data Scientist']
    }
  },
  {
    id: '4',
    name: 'Data Analytics Dashboard',
    description: 'Real-time business intelligence dashboard with interactive visualizations',
    status: 'complete',
    type: 'web',
    tags: ['dashboard', 'analytics', 'bi', 'visualization'],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-04-15'),
    progress: 100,
    files: [
      {
        id: '4',
        name: 'data-requirements.xlsx',
        size: 654321,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        uploadedAt: new Date('2024-03-10'),
        processed: true
      }
    ],
    notes: [
      {
        id: '4',
        content: 'Dashboard prototype approved by stakeholders.',
        type: 'user',
        createdAt: new Date('2024-03-15'),
        tags: ['prototype', 'approval']
      }
    ],
    metrics: {
      complexity: 6,
      estimatedHours: 240,
      riskLevel: 'low',
      successProbability: 90,
      resourcesNeeded: ['Frontend Developer', 'Data Engineer', 'UX Designer']
    },
    analysis: {
      id: '4',
      projectId: '4',
      type: 'initial',
      keywords: ['dashboard', 'analytics', 'real-time', 'visualization', 'business intelligence'],
      summary: 'Well-scoped analytics project with clear requirements and proven technologies. Low risk with high value potential.',
      sentiment: 'positive',
      recommendations: [
        'Use established charting libraries like D3.js or Chart.js',
        'Implement caching for frequently accessed data',
        'Design for different screen sizes and devices',
        'Plan for data export functionality'
      ],
      completedAt: new Date('2024-03-12'),
      confidence: 88,
      technicalScore: 92,
      complexityLevel: 'medium'
    }
  },
  {
    id: '5',
    name: 'IoT Monitoring System',
    description: 'Industrial IoT system for monitoring equipment and environmental conditions',
    status: 'error',
    type: 'other',
    tags: ['iot', 'monitoring', 'industrial', 'sensors'],
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-05-10'),
    progress: 45,
    files: [],
    notes: [
      {
        id: '5',
        content: 'Sensor integration challenges identified. Need hardware compatibility review.',
        type: 'user',
        createdAt: new Date('2024-05-05'),
        tags: ['hardware', 'sensors', 'issue']
      }
    ],
    metrics: {
      complexity: 9,
      estimatedHours: 720,
      riskLevel: 'high',
      successProbability: 65,
      resourcesNeeded: ['IoT Developer', 'Hardware Engineer', 'DevOps Engineer', 'Systems Architect']
    }
  },
  {
    id: '6',
    name: 'Blockchain Voting Platform',
    description: 'Secure and transparent voting system using blockchain technology',
    status: 'draft',
    type: 'web',
    tags: ['blockchain', 'voting', 'security', 'transparency'],
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-05-20'),
    progress: 25,
    files: [],
    notes: [],
    metrics: {
      complexity: 10,
      estimatedHours: 800,
      riskLevel: 'high',
      successProbability: 60,
      resourcesNeeded: ['Blockchain Developer', 'Security Expert', 'Frontend Developer', 'Legal Advisor']
    }
  },
  {
    id: '7',
    name: 'Learning Management System',
    description: 'Comprehensive LMS with video streaming and interactive assessments',
    status: 'analyzing',
    type: 'web',
    tags: ['education', 'lms', 'video', 'assessment'],
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-05-30'),
    progress: 75,
    files: [
      {
        id: '5',
        name: 'educational-requirements.pdf',
        size: 1987654,
        type: 'application/pdf',
        uploadedAt: new Date('2024-04-01'),
        processed: true
      }
    ],
    notes: [],
    metrics: {
      complexity: 7,
      estimatedHours: 420,
      riskLevel: 'medium',
      successProbability: 80,
      resourcesNeeded: ['Full-stack Developer', 'Video Streaming Specialist', 'UX Designer']
    }
  },
  {
    id: '8',
    name: 'Smart Home Controller',
    description: 'Central hub application for controlling smart home devices and automation',
    status: 'complete',
    type: 'mobile',
    tags: ['smart-home', 'iot', 'automation', 'mobile'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-30'),
    progress: 100,
    files: [],
    notes: [],
    metrics: {
      complexity: 6,
      estimatedHours: 300,
      riskLevel: 'low',
      successProbability: 85,
      resourcesNeeded: ['Mobile Developer', 'IoT Developer', 'UX Designer']
    }
  },
  {
    id: '9',
    name: 'Research Data Platform',
    description: 'Platform for collecting, analyzing and sharing scientific research data',
    status: 'draft',
    type: 'research',
    tags: ['research', 'data', 'science', 'collaboration'],
    createdAt: new Date('2024-05-25'),
    updatedAt: new Date('2024-05-27'),
    progress: 10,
    files: [],
    notes: [],
    metrics: {
      complexity: 8,
      estimatedHours: 540,
      riskLevel: 'medium',
      successProbability: 75,
      resourcesNeeded: ['Research Software Engineer', 'Data Scientist', 'Backend Developer']
    }
  },
  {
    id: '10',
    name: 'Desktop Image Editor',
    description: 'Professional desktop application for advanced image editing and manipulation',
    status: 'analyzing',
    type: 'desktop',
    tags: ['desktop', 'image-editing', 'graphics', 'professional'],
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-05-29'),
    progress: 55,
    files: [],
    notes: [],
    metrics: {
      complexity: 8,
      estimatedHours: 480,
      riskLevel: 'medium',
      successProbability: 72,
      resourcesNeeded: ['Desktop Developer', 'Graphics Programmer', 'UX Designer']
    }
  }
];

export const generateMockAnalysis = (projectId: string, type: 'initial' | 'deep'): Analysis => {
  const keywords = [
    'scalability', 'performance', 'security', 'user experience', 'maintainability',
    'architecture', 'testing', 'deployment', 'documentation', 'integration'
  ];
  
  const recommendations = [
    'Implement comprehensive unit testing strategy',
    'Set up continuous integration and deployment pipeline',
    'Consider implementing caching mechanisms for better performance',
    'Plan for proper error handling and logging',
    'Design with mobile-first responsive approach',
    'Implement proper security measures and authentication',
    'Create detailed API documentation',
    'Plan for database optimization and indexing',
    'Consider implementing monitoring and analytics',
    'Design for accessibility and internationalization'
  ];
  
  const sentiments: Array<'positive' | 'neutral' | 'negative'> = ['positive', 'neutral', 'negative'];
  const complexityLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  
  const shuffled = (arr: any[]) => arr.sort(() => 0.5 - Math.random());
  
  return {
    id: Date.now().toString(),
    projectId,
    type,
    keywords: shuffled(keywords).slice(0, 5),
    summary: type === 'deep' 
      ? 'Comprehensive analysis reveals strong architectural foundation with modern technology choices. The project demonstrates good planning and realistic scope definition. Key areas for attention include performance optimization and security implementation.'
      : 'Initial analysis shows promising project structure with appropriate technology selection. Recommended to proceed with detailed planning phase.',
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    recommendations: shuffled(recommendations).slice(0, 4),
    completedAt: new Date(),
    confidence: Math.floor(Math.random() * 20) + 75, // 75-95%
    technicalScore: Math.floor(Math.random() * 25) + 70, // 70-95
    complexityLevel: complexityLevels[Math.floor(Math.random() * complexityLevels.length)]
  };
};

export const getAllTags = (): string[] => {
  const allTags = mockProjects.reduce((tags, project) => {
    return [...tags, ...project.tags];
  }, [] as string[]);
  
  return [...new Set(allTags)].sort();
};

export const getProjectStats = () => {
  const total = mockProjects.length;
  const completed = mockProjects.filter(p => p.status === 'complete').length;
  const active = mockProjects.filter(p => p.status === 'analyzing' || p.status === 'draft').length;
  const error = mockProjects.filter(p => p.status === 'error').length;
  
  return { total, completed, active, error };
};
