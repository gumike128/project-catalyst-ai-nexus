
interface AIPrompt {
  id: string;
  title: string;
  prompt: string;
  category: 'analysis' | 'optimization' | 'creative' | 'technical' | 'planning' | 'testing';
  icon: string;
  color: string;
  projectContext?: string;
  popularity: number;
  lastUsed?: Date;
}

const basePrompts: AIPrompt[] = [
  {
    id: '1',
    title: 'Analyzovať kód',
    prompt: 'Analyzuj architektúru tohto projektu a navrhni zlepšenia pre lepšiu škálovateľnosť, maintainability a performance. Zameriaj sa na: 1) Identifikáciu code smells a anti-patterns, 2) Návrhy refaktoringu, 3) Optimalizácie pre performance, 4) Bezpečnostné úvahy, 5) Best practices pre daný tech stack.',
    category: 'analysis',
    icon: '🔍',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    popularity: 95
  },
  {
    id: '2',
    title: 'Performance Optimization',
    prompt: 'Vykonaj hlbokú analýzu performance tohto projektu. Identifikuj bottlenecks v: 1) Frontend rendering (React/Vue optimalizácie), 2) Database queries a indexy, 3) Network requests a caching, 4) Bundle size a lazy loading, 5) Memory usage a garbage collection. Navrhni konkrétne kroky na optimalizáciu.',
    category: 'optimization',
    icon: '⚡',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    popularity: 87
  },
  {
    id: '3',
    title: 'Security Deep Dive',
    prompt: 'Vykonaj komplexný security audit tohto projektu. Skontroluj: 1) Input validation a sanitization, 2) Authentication a authorization flows, 3) OWASP Top 10 vulnerabilities, 4) API security (rate limiting, CORS, JWT), 5) Data encryption a storage, 6) Dependency vulnerabilities. Poskytni actionable remediation steps.',
    category: 'technical',
    icon: '🔒',
    color: 'bg-red-50 border-red-200 text-red-800',
    popularity: 92
  },
  {
    id: '4',
    title: 'Testing Strategy 360°',
    prompt: 'Navrhni kompletnú testovaciu stratégiu pre tento projekt: 1) Unit tests (coverage goals, mock strategies), 2) Integration tests (API endpoints, database), 3) E2E tests (critical user journeys), 4) Performance tests (load, stress testing), 5) Security tests (penetration testing), 6) CI/CD integration a test automation.',
    category: 'testing',
    icon: '🧪',
    color: 'bg-green-50 border-green-200 text-green-800',
    popularity: 78
  },
  {
    id: '5',
    title: 'UX/UI Innovation',
    prompt: 'Analyzuj používateľskú skúsenosť a navrhni inovatívne vylepšenia: 1) User journey mapping a pain points, 2) Accessibility (WCAG compliance), 3) Mobile-first responsive design, 4) Micro-interactions a animations, 5) Information architecture, 6) A/B testing opportunities pre conversion optimization.',
    category: 'creative',
    icon: '🎨',
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    popularity: 85
  },
  {
    id: '6',
    title: 'Architecture Blueprint',
    prompt: 'Navrhni modernú, škálovateľnú architektúru: 1) Microservices vs Monolith analysis, 2) Database design (relational vs NoSQL), 3) Caching strategies (Redis, CDN), 4) Message queues a event-driven architecture, 5) Cloud infrastructure (AWS/GCP/Azure), 6) DevOps a deployment patterns.',
    category: 'technical',
    icon: '🏗️',
    color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    popularity: 83
  },
  {
    id: '7',
    title: 'AI Integration Strategy',
    prompt: 'Identifikuj príležitosti pre AI integráciu: 1) Machine Learning use cases (recommendation engines, predictive analytics), 2) Natural Language Processing (chatbots, sentiment analysis), 3) Computer Vision (image recognition, OCR), 4) AI-powered automation, 5) Ethical AI considerations a bias mitigation.',
    category: 'planning',
    icon: '🤖',
    color: 'bg-cyan-50 border-cyan-200 text-cyan-800',
    popularity: 76
  }
];

export const generateContextualPrompts = (projectType: string, projectName: string): AIPrompt[] => {
  const contextualPrompts: AIPrompt[] = [];
  const timestamp = Date.now();
  
  // Generate project-specific prompts based on type
  if (projectType === 'web') {
    contextualPrompts.push(
      {
        id: `web-${timestamp}-1`,
        title: 'SEO & Core Web Vitals',
        prompt: `Optimalizuj ${projectName} pre vyhľadávače a Core Web Vitals: 1) Technical SEO audit (meta tags, structured data, sitemap), 2) Page speed optimization (LCP, FID, CLS), 3) Content optimization strategies, 4) Local SEO ak je relevantné, 5) Mobile-first indexing compliance.`,
        category: 'optimization',
        icon: '📈',
        color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
        projectContext: projectName,
        popularity: 75
      },
      {
        id: `web-${timestamp}-2`,
        title: 'PWA Implementation',
        prompt: `Navrhni Progressive Web App implementáciu pre ${projectName}: 1) Service Worker stratégia (caching, offline functionality), 2) Web App Manifest optimization, 3) Push notifications setup, 4) App shell architecture, 5) Performance benefits a user engagement metrics.`,
        category: 'technical',
        icon: '📱',
        color: 'bg-cyan-50 border-cyan-200 text-cyan-800',
        projectContext: projectName,
        popularity: 68
      }
    );
  }
  
  if (projectType === 'mobile') {
    contextualPrompts.push(
      {
        id: `mobile-${timestamp}-1`,
        title: 'Cross-Platform Strategy',
        prompt: `Optimalizuj ${projectName} pre cross-platform development: 1) React Native vs Flutter analysis, 2) Code sharing strategies, 3) Platform-specific optimizations (iOS vs Android), 4) Native module integration, 5) App store optimization (ASO).`,
        category: 'optimization',
        icon: '📱',
        color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        projectContext: projectName,
        popularity: 82
      },
      {
        id: `mobile-${timestamp}-2`,
        title: 'Mobile Security Hardening',
        prompt: `Zabezpeč ${projectName} mobile app: 1) Code obfuscation a anti-reverse engineering, 2) Certificate pinning, 3) Biometric authentication, 4) Secure storage (Keychain/Keystore), 5) Runtime Application Self-Protection (RASP).`,
        category: 'technical',
        icon: '🛡️',
        color: 'bg-red-50 border-red-200 text-red-800',
        projectContext: projectName,
        popularity: 79
      }
    );
  }

  if (projectType === 'api') {
    contextualPrompts.push(
      {
        id: `api-${timestamp}-1`,
        title: 'API Design Excellence',
        prompt: `Vylepši ${projectName} API design: 1) RESTful vs GraphQL analysis, 2) API versioning strategy, 3) Rate limiting a throttling, 4) Comprehensive documentation (OpenAPI/Swagger), 5) Error handling a status codes, 6) Caching strategies (ETag, Last-Modified).`,
        category: 'technical',
        icon: '🔌',
        color: 'bg-blue-50 border-blue-200 text-blue-800',
        projectContext: projectName,
        popularity: 84
      }
    );
  }
  
  // Universal contextual prompts
  const universalPrompts = [
    {
      id: `universal-${timestamp}-1`,
      title: 'DevOps Pipeline',
      prompt: `Navrhni CI/CD pipeline pre ${projectName}: 1) Git workflow (GitFlow vs GitHub Flow), 2) Automated testing integration, 3) Docker containerization, 4) Infrastructure as Code (Terraform/CloudFormation), 5) Monitoring a alerting (Prometheus, Grafana), 6) Blue-green deployment strategy.`,
      category: 'planning',
      icon: '🚀',
      color: 'bg-orange-50 border-orange-200 text-orange-800',
      projectContext: projectName,
      popularity: 71
    },
    {
      id: `universal-${timestamp}-2`,
      title: 'Monitoring & Analytics',
      prompt: `Implementuj comprehensive monitoring pre ${projectName}: 1) Application Performance Monitoring (APM), 2) Real User Monitoring (RUM), 3) Error tracking a logging aggregation, 4) Business intelligence a user analytics, 5) Infrastructure monitoring, 6) Alerting a incident response procedures.`,
      category: 'technical',
      icon: '📊',
      color: 'bg-pink-50 border-pink-200 text-pink-800',
      projectContext: projectName,
      popularity: 66
    },
    {
      id: `universal-${timestamp}-3`,
      title: 'Scaling Strategy',
      prompt: `Priprav ${projectName} na škálovanie: 1) Horizontal vs vertical scaling analysis, 2) Database sharding a read replicas, 3) Load balancing strategies, 4) Caching layers (Redis, Memcached), 5) CDN implementation, 6) Auto-scaling policies a cost optimization.`,
      category: 'planning',
      icon: '📈',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      projectContext: projectName,
      popularity: 73
    }
  ];
  
  return [...contextualPrompts, ...universalPrompts];
};

export const getAllPrompts = (projectType?: string, projectName?: string, maxCount: number = 10): AIPrompt[] => {
  let allPrompts = [...basePrompts];
  
  if (projectType && projectName) {
    const contextual = generateContextualPrompts(projectType, projectName);
    allPrompts = [...allPrompts, ...contextual];
  }
  
  // Sort by popularity and recency
  allPrompts.sort((a, b) => {
    if (a.lastUsed && b.lastUsed) {
      return b.lastUsed.getTime() - a.lastUsed.getTime();
    }
    if (a.lastUsed && !b.lastUsed) return -1;
    if (!a.lastUsed && b.lastUsed) return 1;
    return b.popularity - a.popularity;
  });
  
  return allPrompts.slice(0, maxCount);
};

export const markPromptAsUsed = (promptId: string) => {
  // In real app, this would update the database
  console.log('Marking prompt as used:', promptId);
  
  // Update localStorage for persistence
  const usedPrompts = JSON.parse(localStorage.getItem('usedPrompts') || '{}');
  usedPrompts[promptId] = new Date().toISOString();
  localStorage.setItem('usedPrompts', JSON.stringify(usedPrompts));
};

export const getPromptsByCategory = (category: AIPrompt['category']): AIPrompt[] => {
  return basePrompts.filter(prompt => prompt.category === category);
};

export const getPromptHistory = (): AIPrompt[] => {
  const usedPrompts = JSON.parse(localStorage.getItem('usedPrompts') || '{}');
  const allPrompts = getAllPrompts(undefined, undefined, 100);
  
  return allPrompts
    .filter(prompt => usedPrompts[prompt.id])
    .map(prompt => ({
      ...prompt,
      lastUsed: new Date(usedPrompts[prompt.id])
    }))
    .sort((a, b) => (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0));
};

export const searchPrompts = (query: string): AIPrompt[] => {
  const allPrompts = getAllPrompts(undefined, undefined, 100);
  const lowerQuery = query.toLowerCase();
  
  return allPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(lowerQuery) ||
    prompt.prompt.toLowerCase().includes(lowerQuery) ||
    prompt.category.toLowerCase().includes(lowerQuery)
  );
};
