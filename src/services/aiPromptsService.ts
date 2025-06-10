
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
    prompt: 'Analyzuj architektúru tohto projektu a navrhni zlepšenia',
    category: 'analysis',
    icon: '🔍',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    popularity: 95
  },
  {
    id: '2',
    title: 'Optimalizácia výkonu',
    prompt: 'Aké sú najlepšie spôsoby optimalizácie výkonu pre tento typ projektu?',
    category: 'optimization',
    icon: '⚡',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    popularity: 87
  },
  {
    id: '3',
    title: 'Security audit',
    prompt: 'Vykonaj bezpečnostný audit a identifikuj potenciálne zraniteľnosti',
    category: 'technical',
    icon: '🔒',
    color: 'bg-red-50 border-red-200 text-red-800',
    popularity: 92
  },
  {
    id: '4',
    title: 'Testovacia stratégia',
    prompt: 'Navrhni kompletnú testovaciu stratégiu pre tento projekt',
    category: 'testing',
    icon: '🧪',
    color: 'bg-green-50 border-green-200 text-green-800',
    popularity: 78
  },
  {
    id: '5',
    title: 'UI/UX zlepšenia',
    prompt: 'Aké sú možnosti zlepšenia používateľského rozhrania a skúsenosti?',
    category: 'creative',
    icon: '🎨',
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    popularity: 85
  }
];

export const generateContextualPrompts = (projectType: string, projectName: string): AIPrompt[] => {
  const contextualPrompts: AIPrompt[] = [];
  
  // Generate project-specific prompts
  if (projectType === 'web') {
    contextualPrompts.push(
      {
        id: `web-${Date.now()}-1`,
        title: 'SEO optimalizácia',
        prompt: `Ako môžem optimalizovať SEO pre ${projectName} web aplikáciu?`,
        category: 'optimization',
        icon: '📈',
        color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
        projectContext: projectName,
        popularity: 75
      },
      {
        id: `web-${Date.now()}-2`,
        title: 'Progressive Web App',
        prompt: `Navrhni implementáciu PWA funkcionalít pre ${projectName}`,
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
        id: `mobile-${Date.now()}-1`,
        title: 'Performance na mobiloch',
        prompt: `Optimalizuj ${projectName} pre lepší výkon na mobilných zariadeniach`,
        category: 'optimization',
        icon: '📱',
        color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        projectContext: projectName,
        popularity: 82
      }
    );
  }
  
  // Add time-based prompts
  const timeBasedPrompts: AIPrompt[] = [
    {
      id: `time-${Date.now()}-1`,
      title: 'Deployment stratégia',
      prompt: `Navrhni deployment stratégiu pre ${projectName} projekt`,
      category: 'planning',
      icon: '🚀',
      color: 'bg-orange-50 border-orange-200 text-orange-800',
      projectContext: projectName,
      popularity: 71
    },
    {
      id: `time-${Date.now()}-2`,
      title: 'Monitoring setup',
      prompt: `Aké monitoring nástroje odporúčaš pre ${projectName}?`,
      category: 'technical',
      icon: '📊',
      color: 'bg-pink-50 border-pink-200 text-pink-800',
      projectContext: projectName,
      popularity: 66
    }
  ];
  
  return [...contextualPrompts, ...timeBasedPrompts];
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
};

export const getPromptsByCategory = (category: AIPrompt['category']): AIPrompt[] => {
  return basePrompts.filter(prompt => prompt.category === category);
};
