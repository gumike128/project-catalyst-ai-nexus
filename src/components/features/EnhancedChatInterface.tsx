
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Send, 
  Sparkles, 
  Lightbulb, 
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useChatStore } from '../../stores/chatStore';
import { generateContextualSuggestions } from '../../services/aiSuggestionsService';

interface EnhancedChatInterfaceProps {
  projectId?: string;
  context?: string;
}

interface SmartSuggestion {
  id: string;
  text: string;
  category: 'quick' | 'deep' | 'action' | 'analysis';
  icon: React.ComponentType<any>;
}

export const EnhancedChatInterface: React.FC<EnhancedChatInterfaceProps> = ({ 
  projectId, 
  context = 'project' 
}) => {
  const { t } = useTranslation();
  const { messages, isTyping, sendMessage } = useChatStore();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    updateSuggestions();
  }, [inputValue, context]);

  const updateSuggestions = () => {
    const contextualSuggestions = generateContextualSuggestions(context, inputValue);
    
    const smartSuggestions: SmartSuggestion[] = [
      {
        id: '1',
        text: 'Analyzuj aktuálny pokrok projektu',
        category: 'analysis',
        icon: TrendingUp
      },
      {
        id: '2',
        text: 'Navrhni optimalizáciu performance',
        category: 'action',
        icon: Zap
      },
      {
        id: '3',
        text: 'Identifikuj potenciálne riziká',
        category: 'analysis',
        icon: Target
      },
      {
        id: '4',
        text: 'Vytvor implementačný plán',
        category: 'deep',
        icon: MessageSquare
      }
    ];

    // Combine contextual and smart suggestions
    const combinedSuggestions = [
      ...smartSuggestions,
      ...contextualSuggestions.map((text, index) => ({
        id: `contextual-${index}`,
        text,
        category: 'quick' as const,
        icon: Lightbulb
      }))
    ];

    setSuggestions(combinedSuggestions.slice(0, 6));
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      await sendMessage(inputValue, projectId);
      setInputValue('');
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0) {
        handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
      } else {
        handleSendMessage();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(Math.max(-1, selectedSuggestionIndex - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(Math.min(suggestions.length - 1, selectedSuggestionIndex + 1));
    } else if (e.key === 'Escape') {
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleSuggestionSelect = (suggestion: SmartSuggestion) => {
    setInputValue(suggestion.text);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleMessageFeedback = (messageId: string, isPositive: boolean) => {
    console.log(`Feedback for message ${messageId}: ${isPositive ? 'positive' : 'negative'}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'quick': return 'bg-blue-100 text-blue-800';
      case 'deep': return 'bg-purple-100 text-purple-800';
      case 'action': return 'bg-green-100 text-green-800';
      case 'analysis': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('sk-SK', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.type === 'ai' && (
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
            )}
            
            <div className={`max-w-[80%] ${
              message.type === 'user' ? 'order-first' : ''
            }`}>
              <div className={`rounded-lg p-4 ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-muted'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
              
              <div className={`flex items-center gap-2 mt-2 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}>
                <span className="text-xs text-muted-foreground">
                  {formatTime(message.timestamp)}
                </span>
                
                {message.type === 'ai' && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyMessage(message.content)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMessageFeedback(message.id, true)}
                      className="h-6 w-6 p-0"
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMessageFeedback(message.id, false)}
                      className="h-6 w-6 p-0"
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">You</span>
              </div>
            )}
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <LoadingSpinner size="sm" />
                <span className="text-sm">AI premýšľa...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Smart Suggestions */}
      {suggestions.length > 0 && inputValue.length < 3 && (
        <div className="px-4 pb-2">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Smart návrhy</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {suggestions.map((suggestion, index) => {
                  const Icon = suggestion.icon;
                  return (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className={`text-left p-2 rounded-lg border transition-colors hover:bg-accent ${
                        selectedSuggestionIndex === index ? 'bg-accent border-primary' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-3 h-3" />
                        <Badge className={getCategoryColor(suggestion.category)} variant="outline">
                          {suggestion.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{suggestion.text}</p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Opýtajte sa AI asistenta..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Tip: Použite šípky ↑↓ na navigáciu medzi návrhmi, Enter na odoslanie
        </p>
      </div>
    </div>
  );
};
