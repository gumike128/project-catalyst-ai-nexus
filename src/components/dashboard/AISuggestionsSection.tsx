
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, RefreshCw, Lightbulb, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { EmptyState } from '../ui/EmptyState';
import { AISuggestion } from '../../services/aiSuggestionsService';

interface AISuggestionsSectionProps {
  suggestions: (AISuggestion & { projectName?: string })[];
  isLoading: boolean;
  onRefresh: () => void;
  onSuggestionAction: (suggestion: AISuggestion & { projectName?: string }) => void;
}

export const AISuggestionsSection: React.FC<AISuggestionsSectionProps> = ({
  suggestions,
  isLoading,
  onRefresh,
  onSuggestionAction
}) => {
  const { t } = useTranslation();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'optimization': return TrendingUp;
      case 'improvement': return Lightbulb;
      default: return Brain;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Suggestions
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Brain className="w-5 h-5 animate-pulse" />
              Loading AI suggestions...
            </div>
          </div>
        ) : suggestions.length === 0 ? (
          <EmptyState
            icon={Brain}
            title="No suggestions available"
            description="AI suggestions will appear here when available."
          />
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => {
              const IconComponent = getSuggestionIcon(suggestion.type);
              return (
                <div 
                  key={`suggestion-${suggestion.id}-${index}`}
                  className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-4 h-4 text-primary" />
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <Badge className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority}
                        </Badge>
                        {suggestion.projectName && (
                          <Badge variant="outline" className="text-xs">
                            {suggestion.projectName}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onSuggestionAction(suggestion)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
