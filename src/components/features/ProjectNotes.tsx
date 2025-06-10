
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  MessageSquare, 
  User, 
  Calendar,
  Tag,
  Edit3,
  Trash2
} from 'lucide-react';
import { Project, Note } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { EmptyState } from '../ui/EmptyState';

interface ProjectNotesProps {
  project: Project;
}

export const ProjectNotes: React.FC<ProjectNotesProps> = ({ project }) => {
  const { t } = useTranslation();
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Add note logic here
      console.log('Adding note:', newNote);
      setNewNote('');
      setIsAdding(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    // Delete note logic here
    console.log('Deleting note:', noteId);
  };

  if (project.notes.length === 0 && !isAdding) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No notes yet"
        description="Add notes to track important information and AI insights about your project."
        action={{
          label: "Add Note",
          onClick: () => setIsAdding(true)
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Note Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {t('project.notes')}
            </CardTitle>
            {!isAdding && (
              <Button onClick={() => setIsAdding(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Note
              </Button>
            )}
          </div>
        </CardHeader>
        {isAdding && (
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-24"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                  Save Note
                </Button>
                <Button variant="outline" onClick={() => {
                  setIsAdding(false);
                  setNewNote('');
                }}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        {project.notes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    note.type === 'ai' ? 'bg-primary/10' : 'bg-secondary/10'
                  }`}>
                    {note.type === 'ai' ? (
                      <MessageSquare className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-secondary-foreground" />
                    )}
                  </div>
                  <div>
                    <Badge variant={note.type === 'ai' ? 'default' : 'secondary'} className="text-xs">
                      {note.type === 'ai' ? 'AI Assistant' : 'User Note'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {note.type === 'user' && (
                    <>
                      <Button variant="ghost" size="sm">
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-foreground mb-3 leading-relaxed">
                {note.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {note.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-muted-foreground" />
                      <div className="flex gap-1">
                        {note.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(note.createdAt)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
