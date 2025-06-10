
import React, { useState } from 'react';
import { Monitor, Database, Cloud, Shield, Zap, GitBranch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ArchitectureComponent {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'database' | 'service' | 'external';
  x: number;
  y: number;
  icon: React.ReactNode;
  color: string;
  connections: string[];
}

export const ArchitectureDiagram: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('webapp');
  const [components, setComponents] = useState<ArchitectureComponent[]>([]);

  const templates = {
    webapp: {
      name: 'Web aplikácia',
      components: [
        {
          id: 'frontend',
          name: 'React Frontend',
          type: 'frontend' as const,
          x: 100,
          y: 100,
          icon: <Monitor className="w-6 h-6" />,
          color: '#3B82F6',
          connections: ['api']
        },
        {
          id: 'api',
          name: 'REST API',
          type: 'backend' as const,
          x: 400,
          y: 100,
          icon: <Zap className="w-6 h-6" />,
          color: '#10B981',
          connections: ['database', 'auth']
        },
        {
          id: 'database',
          name: 'PostgreSQL',
          type: 'database' as const,
          x: 400,
          y: 300,
          icon: <Database className="w-6 h-6" />,
          color: '#8B5CF6',
          connections: []
        },
        {
          id: 'auth',
          name: 'Auth Service',
          type: 'service' as const,
          x: 700,
          y: 100,
          icon: <Shield className="w-6 h-6" />,
          color: '#F59E0B',
          connections: ['external-auth']
        },
        {
          id: 'external-auth',
          name: 'OAuth Provider',
          type: 'external' as const,
          x: 700,
          y: 300,
          icon: <Cloud className="w-6 h-6" />,
          color: '#EF4444',
          connections: []
        }
      ]
    },
    microservices: {
      name: 'Mikroslužby',
      components: [
        {
          id: 'gateway',
          name: 'API Gateway',
          type: 'backend' as const,
          x: 400,
          y: 50,
          icon: <GitBranch className="w-6 h-6" />,
          color: '#3B82F6',
          connections: ['user-service', 'order-service', 'payment-service']
        },
        {
          id: 'user-service',
          name: 'User Service',
          type: 'service' as const,
          x: 150,
          y: 200,
          icon: <Shield className="w-6 h-6" />,
          color: '#10B981',
          connections: ['user-db']
        },
        {
          id: 'order-service',
          name: 'Order Service',
          type: 'service' as const,
          x: 400,
          y: 200,
          icon: <Zap className="w-6 h-6" />,
          color: '#F59E0B',
          connections: ['order-db']
        },
        {
          id: 'payment-service',
          name: 'Payment Service',
          type: 'service' as const,
          x: 650,
          y: 200,
          icon: <Monitor className="w-6 h-6" />,
          color: '#EF4444',
          connections: ['payment-db']
        },
        {
          id: 'user-db',
          name: 'User DB',
          type: 'database' as const,
          x: 150,
          y: 350,
          icon: <Database className="w-6 h-6" />,
          color: '#8B5CF6',
          connections: []
        },
        {
          id: 'order-db',
          name: 'Order DB',
          type: 'database' as const,
          x: 400,
          y: 350,
          icon: <Database className="w-6 h-6" />,
          color: '#8B5CF6',
          connections: []
        },
        {
          id: 'payment-db',
          name: 'Payment DB',
          type: 'database' as const,
          x: 650,
          y: 350,
          icon: <Database className="w-6 h-6" />,
          color: '#8B5CF6',
          connections: []
        }
      ]
    },
    serverless: {
      name: 'Serverless',
      components: [
        {
          id: 'cdn',
          name: 'CDN',
          type: 'external' as const,
          x: 100,
          y: 100,
          icon: <Cloud className="w-6 h-6" />,
          color: '#3B82F6',
          connections: ['frontend']
        },
        {
          id: 'frontend',
          name: 'Static Site',
          type: 'frontend' as const,
          x: 300,
          y: 100,
          icon: <Monitor className="w-6 h-6" />,
          color: '#10B981',
          connections: ['lambda']
        },
        {
          id: 'lambda',
          name: 'Lambda Functions',
          type: 'service' as const,
          x: 500,
          y: 100,
          icon: <Zap className="w-6 h-6" />,
          color: '#F59E0B',
          connections: ['dynamodb', 's3']
        },
        {
          id: 'dynamodb',
          name: 'DynamoDB',
          type: 'database' as const,
          x: 400,
          y: 300,
          icon: <Database className="w-6 h-6" />,
          color: '#8B5CF6',
          connections: []
        },
        {
          id: 's3',
          name: 'S3 Storage',
          type: 'external' as const,
          x: 600,
          y: 300,
          icon: <Cloud className="w-6 h-6" />,
          color: '#EF4444',
          connections: []
        }
      ]
    }
  };

  React.useEffect(() => {
    if (selectedTemplate && templates[selectedTemplate as keyof typeof templates]) {
      setComponents(templates[selectedTemplate as keyof typeof templates].components);
    }
  }, [selectedTemplate]);

  const renderConnections = () => {
    return components.flatMap(component => 
      component.connections.map(targetId => {
        const target = components.find(c => c.id === targetId);
        if (!target) return null;

        return (
          <line
            key={`${component.id}-${targetId}`}
            x1={component.x + 60}
            y1={component.y + 40}
            x2={target.x + 60}
            y2={target.y + 40}
            stroke="#94A3B8"
            strokeWidth="2"
            strokeDasharray="5,5"
            markerEnd="url(#arrowhead)"
          />
        );
      })
    ).filter(Boolean);
  };

  const renderComponents = () => {
    return components.map(component => (
      <g key={component.id}>
        <rect
          x={component.x}
          y={component.y}
          width="120"
          height="80"
          rx="8"
          fill={component.color}
          fillOpacity="0.1"
          stroke={component.color}
          strokeWidth="2"
          className="cursor-pointer hover:fill-opacity-20 transition-all"
        />
        <foreignObject
          x={component.x + 10}
          y={component.y + 10}
          width="100"
          height="60"
        >
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div style={{ color: component.color }} className="mb-1">
              {component.icon}
            </div>
            <div className="text-xs font-semibold text-gray-700">
              {component.name}
            </div>
          </div>
        </foreignObject>
      </g>
    ));
  };

  const exportDiagram = () => {
    // Tu by bola implementácia exportu do SVG/PNG
    console.log('Exporting diagram...');
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Architektúrny diagram</CardTitle>
            <div className="flex gap-2">
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Vyberte template" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(templates).map(([key, template]) => (
                    <SelectItem key={key} value={key}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportDiagram}>
                Export SVG
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Diagram */}
      <Card className="h-[600px]">
        <CardContent className="p-0 h-full">
          <svg width="100%" height="100%" viewBox="0 0 800 500" className="border rounded-lg">
            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#94A3B8"
                />
              </marker>
            </defs>
            
            {/* Grid pattern */}
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Connections */}
            {renderConnections()}
            
            {/* Components */}
            {renderComponents()}
          </svg>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Legenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm">Databáza</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">Služba</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Externe</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Info */}
      {selectedTemplate && templates[selectedTemplate as keyof typeof templates] && (
        <Card>
          <CardHeader>
            <CardTitle>
              {templates[selectedTemplate as keyof typeof templates].name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Komponenty: {components.length}</p>
              <p>Spojenia: {components.reduce((acc, comp) => acc + comp.connections.length, 0)}</p>
              <p>
                Typy: {[...new Set(components.map(c => c.type))].join(', ')}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
