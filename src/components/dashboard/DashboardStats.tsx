
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FolderOpen, TrendingUp, AlertCircle, CheckCircle, Brain } from 'lucide-react';
import { StatsCard } from '../features/StatsCard';
import { getProjectStats } from '../../services/mockData';

interface DashboardStatsProps {
  suggestionsCount: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ suggestionsCount }) => {
  const { t } = useTranslation();
  const stats = getProjectStats();

  return (
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
        value={suggestionsCount}
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
  );
};
