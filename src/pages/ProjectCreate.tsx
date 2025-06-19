
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { useProjectStore } from '../stores/projectStore';
import { ProjectService } from '../services/projectService';
import { toast } from '../hooks/use-toast';
import { Project } from '../types';

export const ProjectCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addProject } = useProjectStore();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '' as Project['type'] | '',
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type) {
      toast({
        title: "Chyba validácie",
        description: "Typ projektu je povinný",
        variant: "destructive"
      });
      return;
    }

    const validation = ProjectService.validateProject({
      name: formData.name,
      description: formData.description,
      type: formData.type,
      tags: formData.tags
    });
    
    if (!validation.isValid) {
      toast({
        title: "Chyba validácie",
        description: validation.errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      addProject({
        name: formData.name,
        description: formData.description,
        type: formData.type,
        tags: formData.tags,
        status: 'draft',
        progress: 0,
        files: [],
        notes: [],
        metrics: {
          complexity: 0,
          estimatedHours: 0,
          riskLevel: 'low',
          successProbability: 0,
          resourcesNeeded: []
        }
      });
      
      toast({
        title: "Projekt vytvorený",
        description: "Nový projekt bol úspešne vytvorený.",
      });
      
      navigate('/projects');
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodarilo sa vytvoriť projekt.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Späť
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Nový projekt</h1>
          <p className="text-muted-foreground">Vytvorte nový AI projekt</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detaily projektu</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Názov projektu *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Zadajte názov projektu"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Typ projektu *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vyberte typ projektu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web aplikácia</SelectItem>
                    <SelectItem value="mobile">Mobilná aplikácia</SelectItem>
                    <SelectItem value="desktop">Desktop aplikácia</SelectItem>
                    <SelectItem value="ai">AI/ML projekt</SelectItem>
                    <SelectItem value="research">Výskum</SelectItem>
                    <SelectItem value="other">Ostatné</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Popis projektu *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Popíšte váš projekt..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tagy</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Pridať tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 md:flex-none"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Vytvára sa...' : 'Vytvoriť projekt'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(-1)}
              >
                Zrušiť
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
