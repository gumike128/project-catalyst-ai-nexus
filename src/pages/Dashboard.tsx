import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, FolderOpen, TrendingUp, AlertCircle, CheckCircle, Brain, Lightbulb, Target, Clock, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { EmptyState } from '../components/ui/EmptyState';
import { StatsCard } from '../components/features/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useProjectStore } from '../stores/projectStore';
import { getProjectStats } from '../services/mockData';
import { generateProjectSuggestions, AISuggestion } from '../services/aiSuggestionsService';
import { getSuggestionColor } from '../utils/uiUtils';
import { ProjectService } from '../services/projectService';

interface DashboardSuggestion extends AISuggestion {
  projectName: string;
}

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { projects, initializeProjects } = useProjectStore();
  const [suggestions, setSuggestions] = useState<DashboardSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  
  const stats = getProjectStats();

  useEffect(() => {
    initializeProjects();
    loadDashboardSuggestions();
  }, [initializeProjects]);

  const loadDashboardSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      const allSuggestions: DashboardSuggestion[] = [];
      
      // Generate suggestions from all projects
      for (const project of projects.slice(0, 3)) { // Limit to first 3 projects
        const projectSuggestions = await generateProjectSuggestions(project);
        const dashboardSuggestions = projectSuggestions
          .slice(0, 2) // 2 suggestions per project
          .map(suggestion => ({
            ...suggestion,
            projectName: project.name
          }));
        allSuggestions.push(...dashboardSuggestions);
      }
      
      setSuggestions(allSuggestions);
    } catch (error) {
      console.error('Error loading dashboard suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSuggestionAction = async (suggestion: DashboardSuggestion) => {
    console.log('Processing suggestion:', suggestion);
    // TODO: Implement AI processing of suggestion
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('dashboard.title')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/project/new">
            <Plus className="w-4 h-4" />
            {t('dashboard.newProject')}
          </Link>
        </Button>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title={t('dashboard.totalProjects')}
          value={stats.total}
          icon={FolderOpen}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={t('dashboard.activeProjects')}
          value={stats.active}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title={t('dashboard.completedProjects')}
          value={stats.completed}
          icon={CheckCircle}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="AI Suggestions"
          value={suggestions.length}
          icon={Brain}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Issues"
          value={stats.error}
          icon={AlertCircle}
          trend={{ value: -5, isPositive: false }}
        />
      </div>

      {/* AI Suggestions Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Odporúčania
            </CardTitle>
            <Button variant="outline" onClick={loadDashboardSuggestions} disabled={isLoadingSuggestions}>
              {isLoadingSuggestions ? 'Načítavam...' : 'Obnoviť'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {suggestions.length === 0 ? (
            <EmptyState
              icon={Lightbulb}
              title="Žiadne odporúčania"
              description="Vytvorte projekty a spustite analýzy pre získanie AI odporúčaní."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((suggestion) => (
                <Card 
                  key={suggestion.id} 
                  className={`hover:shadow-md transition-shadow cursor-pointer ${getSuggestionColor(suggestion.type, suggestion.priority)}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {suggestion.projectName}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {suggestion.priority}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{suggestion.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {suggestion.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Impact: {suggestion.estimatedImpact}/10</span>
                          {suggestion.timeEstimate && <span>• {suggestion.timeEstimate}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-1">
                        {suggestion.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleSuggestionAction(suggestion)}
                        className="gap-1 h-7 px-2"
                      >
                        <Send className="w-3 h-3" />
                        AI
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/projects" className="group">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group-hover:border-primary/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Nový projekt</h3>
                  <p className="text-sm text-muted-foreground">Vytvorte nový AI projekt</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/assistant" className="group">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group-hover:border-green-500/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Brain className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Asistent</h3>
                  <p className="text-sm text-muted-foreground">Chatujte s AI pomocníkom</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/creative-studio" className="group">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group-hover:border-purple-500/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Creative Studio</h3>
                  <p className="text-sm text-muted-foreground">AI nástroje pre tvorbu</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};
