
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  FolderOpen, 
  MessageSquare, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Wand2
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigationItems = [
  {
    name: 'dashboard',
    href: '/',
    icon: BarChart3
  },
  {
    name: 'projects', 
    href: '/projects',
    icon: FolderOpen
  },
  {
    name: 'aiAssistant',
    href: '/assistant',
    icon: MessageSquare
  },
  {
    name: 'creativeStudio',
    href: '/creative-studio',
    icon: Wand2
  },
  {
    name: 'settings',
    href: '/settings',
    icon: Settings
  }
];

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo and Brand */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-foreground">Katalyzátor</h2>
              <p className="text-xs text-muted-foreground">AI Project Manager</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || 
              (item.href === '/projects' && location.pathname.startsWith('/project')) ||
              (item.href === '/settings' && location.pathname.startsWith('/settings'));
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground"
                  )}
                  title={isCollapsed ? t(`navigation.${item.name}`) : undefined}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className="font-medium">{t(`navigation.${item.name}`)}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
