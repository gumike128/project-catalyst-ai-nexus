
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Sparkles, Bot, User, RefreshCw, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useChatStore } from '../../stores/chatStore';
import { generateAIResponse, getSuggestedQuestions } from '../../services/aiService';
import { getAllPrompts, markPromptAsUsed } from '../../services/aiPromptsService';
import { cn } from '../../lib/utils';

interface EnhancedChatInterfaceProps {
  projectId?: string;
  context?: string;
  projectType?: string;
  projectName?: string;
}

export const EnhancedChatInterface: React.FC<EnhancedChatInterfaceProps> = ({ 
  projectId, 
  context = 'general',
  projectType,
  projectName
}) => {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions] = useState(getSuggestedQuestions(projectId));
  const [aiPrompts, setAiPrompts] = useState(getAllPrompts(projectType, projectName, 10));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Refresh prompts when project changes
    if (projectType && projectName) {
      setAiPrompts(getAllPrompts(projectType, projectName, 10));
    }
  }, [projectType, projectName]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    addMessage({
      content: userMessage,
      type: 'user',
      projectId
    });

    setIsLoading(true);
    
    try {
      // Generate AI response
      const response = await generateAIResponse(userMessage, projectId);
      
      addMessage({
        content: response,
        type: 'ai',
        projectId
      });
    } catch (error) {
      console.error('Error generating response:', error);
      addMessage({
        content: 'Prepáčte, vyskytla sa chyba pri generovaní odpovede.',
        type: 'ai',
        projectId
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: any) => {
    setInput(prompt.prompt);
    markPromptAsUsed(prompt.id);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const refreshPrompts = () => {
    setAiPrompts(getAllPrompts(projectType, projectName, 10));
  };

  const filteredMessages = projectId 
    ? messages.filter(m => m.projectId === projectId)
    : messages;

  const filteredPrompts = selectedCategory === 'all' 
    ? aiPrompts 
    : aiPrompts.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'Všetky', icon: '📋' },
    { id: 'analysis', label: 'Analýza', icon: '🔍' },
    { id: 'optimization', label: 'Optimalizácia', icon: '⚡' },
    { id: 'creative', label: 'Kreatívne', icon: '🎨' },
    { id: 'technical', label: 'Technické', icon: '🔧' },
    { id: 'planning', label: 'Plánovanie', icon: '📅' },
    { id: 'testing', label: 'Testovanie', icon: '🧪' }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.length === 0 && (
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="text-center py-4">
              <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Vitajte v AI asistentovi</h3>
              <p className="text-muted-foreground mb-4">
                Opýtajte sa na čokoľvek o vašom projekte alebo použite pripravené prompty
              </p>
            </div>

            {/* AI Prompts Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Prompty
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={refreshPrompts}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="gap-1"
                    >
                      <span>{category.icon}</span>
                      {category.label}
                    </Button>
                  ))}
                </div>

                {/* Prompts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredPrompts.map((prompt) => (
                    <Card 
                      key={prompt.id}
                      className={cn(
                        "cursor-pointer hover:shadow-md transition-all border-2",
                        prompt.color
                      )}
                      onClick={() => handlePromptClick(prompt)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{prompt.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{prompt.title}</h4>
                            <p className="text-xs opacity-80 line-clamp-2">
                              {prompt.prompt}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {prompt.category}
                              </Badge>
                              {prompt.projectContext && (
                                <Badge variant="outline" className="text-xs">
                                  {prompt.projectContext}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Legacy Suggestions */}
            {suggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Rýchle otázky</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left justify-start"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'ai' && (
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            
            <Card className={`max-w-[80%] ${message.type === 'user' ? 'bg-primary text-primary-foreground' : ''}`}>
              <CardContent className="p-3">
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {message.projectId && (
                    <Badge variant="outline" className="text-xs">
                      Project
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {message.type === 'user' && (
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <Card>
              <CardContent className="p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Mic className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Napíšte správu alebo použite prompt vyššie..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <Button
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Context indicator */}
        {context && (
          <div className="flex items-center gap-2 mt-2">
            <Sparkles className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Kontext: {context}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
