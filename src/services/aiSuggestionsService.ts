
import { Project } from '../types';

export interface AISuggestion {
  id: string;
  type: 'task' | 'improvement' | 'technology' | 'workflow' | 'optimization' | 'risk' | 'feature';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedImpact: number; // 1-10
  complexity: 'simple' | 'medium' | 'complex';
  tags: string[];
  context: string;
  actionable: boolean;
  dependencies?: string[];
  timeEstimate?: string;
}

export interface ProjectIntelligence {
  suggestions: AISuggestion[];
  nextSteps: string[];
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
    mitigation: string[];
  };
  optimization: {
    performance: string[];
    code: string[];
    architecture: string[];
  };
  technologyRecommendations: {
    current: string[];
    suggested: string[];
    reasoning: string;
  };
}

const suggestionTemplates = {
  task: [
    "Implementujte unit testy pre {context} komponenty",
    "Vytvorte dokumentáciu pre {context} funkcionalitu",
    "Optimalizujte performance {context} operácií",
    "Refaktorujte {context} kód pre lepšiu udržateľnosť",
    "Pridajte error handling pre {context} procesy"
  ],
  improvement: [
    "Vylepšite UX pre {context} používateľské rozhranie",
    "Implementujte caching pre {context} dáta",
    "Pridajte loading stavy pre {context} operácie",
    "Optimalizujte SEO pre {context} stránky",
    "Vylepšite accessibility pre {context} komponenty"
  ],
  technology: [
    "Zvážte použitie {tech} pre {context}",
    "Aktualizujte {current} na najnovšiu verziu",
    "Implementujte {pattern} pattern pre {context}",
    "Migrácia z {old} na {new} pre lepší výkon",
    "Integrácia {service} služby pre {context}"
  ],
  workflow: [
    "Automatizujte {context} proces pomocou CI/CD",
    "Implementujte code review workflow pre {context}",
    "Vytvorte monitoring pre {context} systém",
    "Nastavte alerting pre {context} chyby",
    "Optimalizujte deployment proces pre {context}"
  ]
};

export const generateProjectSuggestions = async (project: Project): Promise<AISuggestion[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const suggestions: AISuggestion[] = [];
  const context = project.name.toLowerCase();
  
  // Analyze project type and generate relevant suggestions
  if (project.type === 'web') {
    suggestions.push(
      {
        id: '1',
        type: 'improvement',
        title: 'Implementujte Progressive Web App',
        description: `Preveďte ${project.name} na PWA pre lepšiu používateľskú skúsenosť a offline funkcionalitu.`,
        priority: 'medium',
        estimatedImpact: 7,
        complexity: 'medium',
        tags: ['pwa', 'offline', 'performance'],
        context: project.name,
        actionable: true,
        timeEstimate: '1-2 týždne'
      },
      {
        id: '2',
        type: 'optimization',
        title: 'Optimalizujte bundle size',
        description: `Analyzujte a redukujte veľkosť bundle pre ${project.name} použitím code splitting a tree shaking.`,
        priority: 'high',
        estimatedImpact: 8,
        complexity: 'medium',
        tags: ['performance', 'optimization', 'bundle'],
        context: project.name,
        actionable: true,
        timeEstimate: '3-5 dní'
      }
    );
  }
  
  if (project.type === 'mobile') {
    suggestions.push(
      {
        id: '3',
        type: 'feature',
        title: 'Pridajte push notifikácie',
        description: `Implementujte push notifikácie pre ${project.name} na zvýšenie user engagement.`,
        priority: 'medium',
        estimatedImpact: 6,
        complexity: 'medium',
        tags: ['notifications', 'engagement', 'mobile'],
        context: project.name,
        actionable: true,
        timeEstimate: '1 týždeň'
      }
    );
  }
  
  // Analysis-based suggestions
  if (project.analysis) {
    if (project.analysis.confidence < 70) {
      suggestions.push({
        id: '4',
        type: 'task',
        title: 'Spustite hlbšiu analýzu projektu',
        description: 'Nízka úroveň confidence v analýze naznačuje potrebu detailnejšieho preskúmania.',
        priority: 'high',
        estimatedImpact: 9,
        complexity: 'simple',
        tags: ['analysis', 'confidence', 'review'],
        context: project.name,
        actionable: true,
        timeEstimate: '2-3 hodiny'
      });
    }
    
    if (project.analysis.technicalScore < 60) {
      suggestions.push({
        id: '5',
        type: 'improvement',
        title: 'Vylepšite technické skóre',
        description: 'Technické skóre je nižšie ako optimálne. Zvážte refaktoring kľúčových komponentov.',
        priority: 'high',
        estimatedImpact: 8,
        complexity: 'complex',
        tags: ['technical-debt', 'refactoring', 'code-quality'],
        context: project.name,
        actionable: true,
        timeEstimate: '2-3 týždne'
      });
    }
  }
  
  // Progress-based suggestions
  if (project.progress < 30) {
    suggestions.push({
      id: '6',
      type: 'workflow',
      title: 'Nastavte milestone tracking',
      description: 'Projekt je v počiatočnej fáze. Definujte jasné milestones pre lepšie sledovanie pokroku.',
      priority: 'medium',
      estimatedImpact: 7,
      complexity: 'simple',
      tags: ['planning', 'milestones', 'tracking'],
      context: project.name,
      actionable: true,
      timeEstimate: '1 deň'
    });
  } else if (project.progress > 80) {
    suggestions.push({
      id: '7',
      type: 'task',
      title: 'Pripravte deployment stratégiu',
      description: 'Projekt je blízko dokončenia. Načasujte deployment a launch stratégiu.',
      priority: 'high',
      estimatedImpact: 9,
      complexity: 'medium',
      tags: ['deployment', 'launch', 'strategy'],
      context: project.name,
      actionable: true,
      timeEstimate: '3-5 dní'
    });
  }
  
  // Security suggestions
  suggestions.push({
    id: '8',
    type: 'risk',
    title: 'Implementujte security audit',
    description: 'Vykonajte security audit pre identifikáciu potenciálnych zraniteľností.',
    priority: 'high',
    estimatedImpact: 8,
    complexity: 'medium',
    tags: ['security', 'audit', 'vulnerability'],
    context: project.name,
    actionable: true,
    timeEstimate: '1 týždeň'
  });
  
  return suggestions.sort((a, b) => {
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const generateProjectIntelligence = async (project: Project): Promise<ProjectIntelligence> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const suggestions = await generateProjectSuggestions(project);
  
  return {
    suggestions,
    nextSteps: [
      `Dokončite ${project.progress < 50 ? 'core funkcionalitu' : 'posledné detaily'} pre ${project.name}`,
      `Otestujte ${project.type === 'web' ? 'cross-browser kompatibilitu' : 'na rôznych zariadeniach'}`,
      'Pripravte dokumentáciu pre používateľov',
      'Naplánujte deployment a monitoring',
      'Vytvorte feedback mechanizmus pre používateľov'
    ],
    riskAssessment: {
      level: project.progress > 70 ? 'low' : project.progress > 40 ? 'medium' : 'high',
      factors: [
        project.progress < 50 ? 'Nízky pokrok môže indikovať problémy s plánovaním' : null,
        project.analysis?.confidence && project.analysis.confidence < 70 ? 'Nízka confidence v analýze' : null,
        project.analysis?.technicalScore && project.analysis.technicalScore < 60 ? 'Nízke technické skóre' : null,
        project.tags.length < 3 ? 'Nedostatočné tagovanie môže znamenať nejasné požiadavky' : null
      ].filter(Boolean) as string[],
      mitigation: [
        'Pravidelné code reviews a testing',
        'Implementácia monitoring a alerting systémov',
        'Definovanie jasných acceptance criteria',
        'Vytvorenie backup a disaster recovery plánov'
      ]
    },
    optimization: {
      performance: [
        'Implementujte lazy loading pre komponenty',
        'Optimalizujte databázové queries',
        'Použite CDN pre statické assets',
        'Implementujte caching stratégiu'
      ],
      code: [
        'Refaktorujte duplicitný kód',
        'Implementujte design patterns pre lepšiu štruktúru',
        'Pridajte type safety a error handling',
        'Optimalizujte algoritmy a dátové štruktúry'
      ],
      architecture: [
        'Zvážte microservices architektúru pre škálovateľnosť',
        'Implementujte event-driven komunikáciu',
        'Použite containerization pre deployment',
        'Navrhnite API versioning stratégiu'
      ]
    },
    technologyRecommendations: {
      current: project.tags,
      suggested: project.type === 'web' 
        ? ['React Query', 'TypeScript', 'Tailwind CSS', 'Vite']
        : project.type === 'mobile'
        ? ['React Native', 'Expo', 'TypeScript', 'React Navigation']
        : ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
      reasoning: `Na základe typu projektu ${project.type} a aktuálneho pokroku odporúčame tieto technológie pre optimálny výkon a maintainability.`
    }
  };
};

export const generateContextualSuggestions = (context: string, userInput: string): string[] => {
  const suggestions = [
    `Ako môžem optimalizovať ${context} pre lepší výkon?`,
    `Aké sú best practices pre ${context}?`,
    `Môžete navrhnúť architektúru pre ${context}?`,
    `Aké riziká vidíte v ${context}?`,
    `Ako testovať ${context} funkcionalitu?`,
    `Aká je ideálna časová os pre ${context}?`,
    `Môžete navrhnúť UI/UX pre ${context}?`,
    `Aké technológie odporúčate pre ${context}?`,
    `Ako zabezpečiť ${context} proti security hrozbám?`,
    `Aké metriky sledovať pre ${context}?`
  ];
  
  return suggestions.filter(s => 
    !userInput || s.toLowerCase().includes(userInput.toLowerCase())
  ).slice(0, 5);
};
