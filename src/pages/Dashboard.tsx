
import React, { useEffect, useState } from 'react';
import { useProjectStore } from '../stores/projectStore';
import { generateProjectSuggestions, AISuggestion } from '../services/aiSuggestionsService';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { AISuggestionsSection } from '../components/dashboard/AISuggestionsSection';
import { QuickActionsSection } from '../components/dashboard/QuickActionsSection';

type DashboardSuggestion = AISuggestion & {
  projectName: string;
};

export const Dashboard: React.FC = () => {
  const { projects, initializeProjects, error } = useProjectStore();
  const [suggestions, setSuggestions] = useState<DashboardSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Dashboard: Initializing...');
    try {
      initializeProjects();
      loadDashboardSuggestions();
    } catch (error) {
      console.error('Dashboard initialization error:', error);
    }
  }, [initializeProjects]);

  const loadDashboardSuggestions = async () => {
    console.log('Dashboard: Loading suggestions...');
    setIsLoadingSuggestions(true);
    setSuggestionError(null);
    
    try {
      const allSuggestions: DashboardSuggestion[] = [];
      
      const availableProjects = Array.isArray(projects) ? projects : [];
      const projectsToProcess = availableProjects.slice(0, 3);
      console.log('Processing projects for suggestions:', projectsToProcess.length);
      
      for (const project of projectsToProcess) {
        try {
          if (!project?.id || !project?.name) {
            console.warn('Skipping invalid project:', project);
            continue;
          }

          const projectSuggestions = await generateProjectSuggestions(project);
          const dashboardSuggestions: DashboardSuggestion[] = projectSuggestions
            .slice(0, 2)
            .map(suggestion => ({
              ...suggestion,
              projectName: project.name
            }));
          
          allSuggestions.push(...dashboardSuggestions);
        } catch (projectError) {
          console.warn(`Error generating suggestions for project ${project?.name}:`, projectError);
        }
      }
      
      console.log('Generated suggestions:', allSuggestions.length);
      setSuggestions(allSuggestions);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error loading dashboard suggestions:', errorMessage);
      setSuggestionError(errorMessage);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSuggestionAction = async (suggestion: DashboardSuggestion) => {
    console.log('Dashboard: Processing suggestion:', suggestion);
    try {
      console.log('Suggestion action triggered:', {
        id: suggestion.id,
        type: suggestion.type,
        projectName: suggestion.projectName,
        priority: suggestion.priority
      });
      
      // Here you could implement actual suggestion processing
      // For now, just show success feedback
    } catch (error) {
      console.error('Error processing suggestion:', error);
    }
  };

  if (error) {
    console.error('Dashboard error state:', error);
    return (
      <div className="p-6 space-y-6">
        <DashboardHeader />
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error Loading Dashboard</h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <button 
            onClick={() => {
              console.log('Retrying dashboard initialization...');
              initializeProjects();
              loadDashboardSuggestions();
            }}
            className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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

      {suggestionError && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-yellow-800 font-medium">Suggestion Loading Error</h4>
          <p className="text-yellow-700 text-sm mt-1">{suggestionError}</p>
        </div>
      )}

      <QuickActionsSection />
    </div>
  );
};
