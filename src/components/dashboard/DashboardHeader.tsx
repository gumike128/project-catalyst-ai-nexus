
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export const DashboardHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
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
  );
};
