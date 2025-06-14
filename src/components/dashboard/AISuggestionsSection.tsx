
import React from 'react';
import { Brain, Lightbulb, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { EmptyState } from '../ui/EmptyState';
import { getSuggestionColor } from '../../utils/uiUtils';
import { AISuggestion } from '../../services/aiSuggestionsService';

interface DashboardSuggestion extends AISuggestion {
  projectName: string;
}

interface AISuggestionsSectionProps {
  suggestions: DashboardSuggestion[];
  isLoading: boolean;
  onRefresh: () => void;
  onSuggestionAction: (suggestion: DashboardSuggestion) => void;
}

export const AISuggestionsSection: React.FC<AISuggestionsSectionProps> = ({
  suggestions,
  isLoading,
  onRefresh,
  onSuggestionAction
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Odporúčania
          </CardTitle>
          <Button variant="outline" onClick={onRefresh} disabled={isLoading}>
            {isLoading ? 'Načítavam...' : 'Obnoviť'}
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
                      onClick={() => onSuggestionAction(suggestion)}
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
  );
};
