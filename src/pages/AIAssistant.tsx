
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Trash2, 
  Download,
  Sparkles,
  Settings,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useChatStore } from '../stores/chatStore';
import { EnhancedChatInterface } from '../components/features/EnhancedChatInterface';
import { getSuggestedQuestions } from '../services/aiService';

export const AIAssistant: React.FC = () => {
  const { t } = useTranslation();
  const { clearMessages } = useChatStore();
  const [context, setContext] = useState('general');
  const [suggestions] = useState(getSuggestedQuestions());

  const handleExportChat = () => {
    // TODO: Implement chat export functionality
    console.log('Exporting chat history...');
  };

  const contextOptions = [
    { value: 'general', label: 'Všeobecné', color: 'bg-blue-100 text-blue-800' },
    { value: 'project', label: 'Projekt', color: 'bg-green-100 text-green-800' },
    { value: 'technical', label: 'Technické', color: 'bg-purple-100 text-purple-800' },
    { value: 'planning', label: 'Plánovanie', color: 'bg-orange-100 text-orange-800' }
  ];

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            {t('aiAssistant.title')}
          </h1>
          <p className="text-muted-foreground mt-1">
            Inteligentný AI asistent s kontextovými návrhmi a analýzou
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearMessages}>
            <Trash2 className="w-4 h-4 mr-2" />
            Vymazať históriu
          </Button>
          <Button variant="outline" onClick={handleExportChat}>
            <Download className="w-4 h-4 mr-2" />
            Exportovať chat
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Context & Settings Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-4 sticky top-6">
            {/* Context Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Kontext
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {contextOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setContext(option.value)}
                    className={`w-full text-left p-2 rounded-lg border transition-colors ${
                      context === option.value 
                        ? 'bg-primary/10 border-primary' 
                        : 'border-border hover:bg-accent'
                    }`}
                  >
                    <Badge className={option.color} variant="outline">
                      {option.label}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Štatistiky
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Dnešné správy</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">AI odpovede</p>
                  <p className="text-2xl font-bold text-green-600">8</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priemerný čas odpovede</p>
                  <p className="text-lg font-semibold">2.1s</p>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Populárne témy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <div key={index} className="p-2 bg-muted rounded-lg">
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-200px)]">
            <CardContent className="p-0 h-full">
              <EnhancedChatInterface context={context} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
