
import React from 'react';
import { FolderOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { ProjectStats } from '../../types/enhanced';

interface ProjectsStatsProps {
  stats: ProjectStats;
}

export const ProjectsStats: React.FC<ProjectsStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Celkom projektov</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Aktívne</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Dokončené</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Chyby</p>
              <p className="text-2xl font-bold">{stats.errors}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
