
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Sparkles, Bot, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { useChatStore } from '../../stores/chatStore';
import { generateAIResponse, getSuggestedQuestions } from '../../services/aiService';

interface EnhancedChatInterfaceProps {
  projectId?: string;
  context?: string;
}

export const EnhancedChatInterface: React.FC<EnhancedChatInterfaceProps> = ({ 
  projectId, 
  context = 'general' 
}) => {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions] = useState(getSuggestedQuestions(projectId));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const filteredMessages = projectId 
    ? messages.filter(m => m.projectId === projectId)
    : messages;

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Vitajte v AI asistentovi</h3>
            <p className="text-muted-foreground mb-4">
              Opýtajte sa na čokoľvek o vašom projekte
            </p>
            <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
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
              placeholder="Napíšte správu..."
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
