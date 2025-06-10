
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  Download
} from 'lucide-react';
import { Project } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { EmptyState } from '../ui/EmptyState';
import { Progress } from '../ui/progress';

interface ProjectAnalysisProps {
  project: Project;
}

export const ProjectAnalysis: React.FC<ProjectAnalysisProps> = ({ project }) => {
  const { t } = useTranslation();

  if (!project.analysis) {
    return (
      <EmptyState
        icon={Brain}
        title="No analysis available"
        description="Run an AI analysis to get insights about your project."
        action={{
          label: "Start Analysis",
          onClick: () => {
            // Trigger analysis
          }
        }}
      />
    );
  }

  const { analysis } = project;

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                {t('analysis.title')}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {analysis.type === 'deep' ? t('analysis.deepAnalysis') : t('analysis.initialAnalysis')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={analysis.sentiment === 'positive' ? 'default' : 
                            analysis.sentiment === 'neutral' ? 'secondary' : 'destructive'}>
                {analysis.sentiment}
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {t('project.downloadReport')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('project.confidence')}</p>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={analysis.confidence} className="flex-1" />
                <span className="text-sm font-medium">{analysis.confidence}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('project.technicalScore')}</p>
              <p className="text-lg font-semibold">{analysis.technicalScore}/100</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('project.complexityLevel')}</p>
              <Badge variant={
                analysis.complexityLevel === 'low' ? 'default' : 
                analysis.complexityLevel === 'medium' ? 'secondary' : 'destructive'
              }>
                {analysis.complexityLevel}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t('analysis.summary')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {analysis.summary}
            </p>
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t('project.keywords')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword) => (
                <Badge key={keyword} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {t('project.recommendations')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Metadata */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Analysis completed on {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }).format(analysis.completedAt)}</span>
            <span>Analysis ID: {analysis.id}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
