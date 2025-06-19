import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Brain, 
  Lightbulb, 
  AlertTriangle, 
  TrendingUp,
  Target,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { Project } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { EmptyState } from '../ui/EmptyState';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { generateProjectIntelligence, ProjectIntelligence, AISuggestion } from '../../services/aiSuggestionsService';
import { cn } from '../../lib/utils';

interface ProjectIntelligenceProps {
  project: Project;
}

const priorityColors = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-blue-100 text-blue-800 border-blue-200'
};

const typeIcons = {
  task: Target,
  improvement: TrendingUp,
  technology: Brain,
  workflow: RefreshCw,
  optimization: Star,
  risk: AlertTriangle,
  feature: Lightbulb
};

export const ProjectIntelligenceComponent: React.FC<ProjectIntelligenceProps> = ({ project }) => {
  const { t } = useTranslation();
  const [intelligence, setIntelligence] = useState<ProjectIntelligence | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'suggestions' | 'risks' | 'optimization' | 'next-steps'>('suggestions');

  useEffect(() => {
    loadIntelligence();
  }, [project.id]);

  const loadIntelligence = async () => {
    setIsLoading(true);
    try {
      const result = await generateProjectIntelligence(project);
      setIntelligence(result);
    } catch (error) {
      console.error('Error loading intelligence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionAction = (suggestion: AISuggestion) => {
    console.log('Executing suggestion:', suggestion);
    // TODO: Implement suggestion execution
  };

  const getImpactValue = (impact: string): number => {
    switch (impact) {
      case 'high': return 8;
      case 'medium': return 5;
      case 'low': return 2;
      default: return 0;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <LoadingSpinner />
            <span className="text-muted-foreground">Generujem inteligentné odporúčania...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!intelligence) {
    return (
      <EmptyState
        icon={Brain}
        title="Inteligentná analýza"
        description="Spustite AI analýzu pre získanie personalizovaných odporúčaní."
        action={{
          label: "Spustiť analýzu",
          onClick: loadIntelligence
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Inteligencia projektu
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Personalizované odporúčania a insights pre váš projekt
              </p>
            </div>
            <Button variant="outline" onClick={loadIntelligence} disabled={isLoading}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Obnoviť
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Odporúčania</p>
              <p className="text-2xl font-bold text-primary">{intelligence.suggestions.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Úroveň rizika</p>
              <Badge variant={
                intelligence.riskAssessment.level === 'low' ? 'default' : 
                intelligence.riskAssessment.level === 'medium' ? 'secondary' : 'destructive'
              }>
                {intelligence.riskAssessment.level}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kritické úlohy</p>
              <p className="text-2xl font-bold text-red-600">
                {intelligence.suggestions.filter(s => s.priority === 'critical').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Implementovateľné</p>
              <p className="text-2xl font-bold text-green-600">
                {intelligence.suggestions.filter(s => s.actionable).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {[
              { key: 'suggestions', label: 'Odporúčania', icon: Lightbulb },
              { key: 'risks', label: 'Riziká', icon: AlertTriangle },
              { key: 'optimization', label: 'Optimalizácia', icon: TrendingUp },
              { key: 'next-steps', label: 'Ďalšie kroky', icon: ArrowRight }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    selectedTab === tab.key 
                      ? "bg-background text-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent>
          {selectedTab === 'suggestions' && (
            <div className="space-y-4">
              {intelligence.suggestions.map((suggestion) => {
                const Icon = typeIcons[suggestion.type];
                const impactValue = getImpactValue(suggestion.estimatedImpact);
                return (
                  <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            suggestion.priority === 'critical' ? 'bg-red-100' :
                            suggestion.priority === 'high' ? 'bg-orange-100' :
                            suggestion.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                          )}>
                            <Icon className={cn(
                              "w-5 h-5",
                              suggestion.priority === 'critical' ? 'text-red-600' :
                              suggestion.priority === 'high' ? 'text-orange-600' :
                              suggestion.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                            )} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground">{suggestion.title}</h4>
                              <Badge className={priorityColors[suggestion.priority]} variant="outline">
                                {suggestion.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {suggestion.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Impact: {suggestion.estimatedImpact}</span>
                              <span>Complexity: {suggestion.complexity}</span>
                              {suggestion.timeEstimate && <span>Čas: {suggestion.timeEstimate}</span>}
                            </div>
                          </div>
                        </div>
                        {suggestion.actionable && (
                          <Button 
                            size="sm" 
                            onClick={() => handleSuggestionAction(suggestion)}
                            className="gap-2"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Vykonať
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {suggestion.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={impactValue * 10} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground">
                            {suggestion.estimatedImpact}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {selectedTab === 'risks' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className={cn(
                  "w-5 h-5",
                  intelligence.riskAssessment.level === 'high' ? 'text-red-500' :
                  intelligence.riskAssessment.level === 'medium' ? 'text-yellow-500' : 'text-green-500'
                )} />
                <h3 className="font-semibold">
                  Úroveň rizika: {intelligence.riskAssessment.level}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Identifikované riziká</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {intelligence.riskAssessment.factors.map((factor, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                          <span className="text-sm">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mitigačné opatrenia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {intelligence.riskAssessment.mitigation.map((mitigation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{mitigation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {selectedTab === 'optimization' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {intelligence.optimization.performance.map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Kód
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {intelligence.optimization.code.map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Architektúra
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {intelligence.optimization.architecture.map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === 'next-steps' && (
            <div className="space-y-4">
              {intelligence.nextSteps.map((step, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
