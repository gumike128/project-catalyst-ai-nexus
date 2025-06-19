
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Brain, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export const QuickActionsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link to="/project/new" className="group">
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
  );
};
