
import React, { useEffect, useState } from 'react';
import { useProjectStore } from '../stores/projectStore';
import { generateProjectSuggestions, AISuggestion } from '../services/aiSuggestionsService';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { AISuggestionsSection } from '../components/dashboard/AISuggestionsSection';
import { QuickActionsSection } from '../components/dashboard/QuickActionsSection';

interface DashboardSuggestion extends AISuggestion {
  projectName: string;
}

export const Dashboard: React.FC = () => {
  const { projects, initializeProjects } = useProjectStore();
  const [suggestions, setSuggestions] = useState<DashboardSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

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
      <DashboardHeader />
      
      <DashboardStats suggestionsCount={suggestions.length} />

      <AISuggestionsSection
        suggestions={suggestions}
        isLoading={isLoadingSuggestions}
        onRefresh={loadDashboardSuggestions}
        onSuggestionAction={handleSuggestionAction}
      />

      <QuickActionsSection />
    </div>
  );
};
