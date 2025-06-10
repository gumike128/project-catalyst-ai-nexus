
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, User, Calendar, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

export const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'Na spracovanie',
      color: 'bg-blue-100',
      tasks: [
        {
          id: '1',
          title: 'Navrhnúť databázovú schému',
          description: 'Vytvoriť ER diagram pre novú funkcionalitu',
          assignee: 'Peter Novák',
          priority: 'high',
          dueDate: '2024-01-15',
          tags: ['backend', 'databáza']
        },
        {
          id: '2',
          title: 'UI/UX review',
          description: 'Posúdiť návrhy používateľského rozhrania',
          assignee: 'Jana Kozlová',
          priority: 'medium',
          dueDate: '2024-01-12',
          tags: ['design', 'frontend']
        }
      ]
    },
    {
      id: 'inprogress',
      title: 'V procese',
      color: 'bg-yellow-100',
      tasks: [
        {
          id: '3',
          title: 'Implementácia API endpointov',
          description: 'CRUD operácie pre používateľské účty',
          assignee: 'Michal Horváth',
          priority: 'high',
          dueDate: '2024-01-20',
          tags: ['backend', 'api']
        }
      ]
    },
    {
      id: 'review',
      title: 'Na kontrolu',
      color: 'bg-purple-100',
      tasks: [
        {
          id: '4',
          title: 'Unit testy pre autentifikáciu',
          description: 'Pokrytie testami pre auth modul',
          assignee: 'Eva Svobodová',
          priority: 'medium',
          dueDate: '2024-01-18',
          tags: ['testing', 'backend']
        }
      ]
    },
    {
      id: 'done',
      title: 'Hotovo',
      color: 'bg-green-100',
      tasks: [
        {
          id: '5',
          title: 'Nastavenie CI/CD pipeline',
          description: 'Automatizácia buildov a deploymentov',
          assignee: 'Tomáš Kraus',
          priority: 'low',
          dueDate: '2024-01-10',
          tags: ['devops', 'automation']
        }
      ]
    }
  ]);

  const [newTaskColumn, setNewTaskColumn] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const priorityIcons = {
    low: '●',
    medium: '●●',
    high: '●●●',
    urgent: '🔥'
  };

  const addTask = (columnId: string) => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: '',
      assignee: 'Nepriradené',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      tags: []
    };

    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));

    setNewTaskTitle('');
    setNewTaskColumn(null);
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
        : col
    ));
  };

  const moveTask = (taskId: string, fromColumnId: string, toColumnId: string) => {
    const task = columns.find(col => col.id === fromColumnId)?.tasks.find(t => t.id === taskId);
    if (!task) return;

    setColumns(prev => prev.map(col => {
      if (col.id === fromColumnId) {
        return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
      }
      if (col.id === toColumnId) {
        return { ...col, tasks: [...col.tasks, task] };
      }
      return col;
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sk-SK', { month: 'short', day: 'numeric' });
  };

  const TaskCard: React.FC<{ task: Task; columnId: string }> = ({ task, columnId }) => (
    <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-sm line-clamp-2">{task.title}</h4>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-6 w-6 p-0"
            onClick={() => deleteTask(columnId, task.id)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
        
        {task.description && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {task.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-1 mb-2">
          {task.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Badge className={priorityColors[task.priority]} variant="outline">
              {priorityIcons[task.priority]} {task.priority}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{task.assignee.split(' ')[0]}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          </div>
        </div>
        
        {/* Move buttons */}
        <div className="flex gap-1 mt-2">
          {columns.map((col) => {
            if (col.id === columnId) return null;
            return (
              <Button
                key={col.id}
                size="sm"
                variant="outline"
                className="text-xs h-6"
                onClick={() => moveTask(task.id, columnId, col.id)}
              >
                → {col.title}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Kanban Board</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Pridať člena
              </Button>
              <Button variant="outline" size="sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Upraviť stĺpce
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <Card key={column.id} className="h-fit">
            <CardHeader className={`${column.color} rounded-t-lg`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">
                  {column.title} ({column.tasks.length})
                </CardTitle>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => setNewTaskColumn(column.id)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 min-h-[300px]">
              {/* Add new task */}
              {newTaskColumn === column.id && (
                <div className="mb-3 p-2 border rounded-lg">
                  <Input
                    placeholder="Názov úlohy..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTask(column.id);
                      }
                    }}
                    className="mb-2"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => addTask(column.id)}
                      disabled={!newTaskTitle.trim()}
                    >
                      Pridať
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setNewTaskColumn(null);
                        setNewTaskTitle('');
                      }}
                    >
                      Zrušiť
                    </Button>
                  </div>
                </div>
              )}

              {/* Tasks */}
              {column.tasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  columnId={column.id}
                />
              ))}

              {column.tasks.length === 0 && newTaskColumn !== column.id && (
                <div className="text-center py-8">
                  <div className="text-muted-foreground text-sm">
                    Žiadne úlohy
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="mt-2"
                    onClick={() => setNewTaskColumn(column.id)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Pridať úlohu
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {columns.find(c => c.id === 'todo')?.tasks.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Na spracovanie</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {columns.find(c => c.id === 'inprogress')?.tasks.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">V procese</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {columns.find(c => c.id === 'review')?.tasks.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Na kontrolu</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {columns.find(c => c.id === 'done')?.tasks.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Hotovo</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
