
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Edit3, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  children: string[];
  parent?: string;
  color: string;
}

export const MindMapViewer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<MindMapNode[]>([
    {
      id: 'root',
      text: 'Hlavná myšlienka',
      x: 400,
      y: 300,
      children: ['child1', 'child2', 'child3'],
      color: '#3B82F6'
    },
    {
      id: 'child1',
      text: 'Vetva 1',
      x: 200,
      y: 200,
      children: ['grandchild1', 'grandchild2'],
      parent: 'root',
      color: '#10B981'
    },
    {
      id: 'child2',
      text: 'Vetva 2',
      x: 600,
      y: 200,
      children: [],
      parent: 'root',
      color: '#F59E0B'
    },
    {
      id: 'child3',
      text: 'Vetva 3',
      x: 400,
      y: 500,
      children: [],
      parent: 'root',
      color: '#EF4444'
    },
    {
      id: 'grandchild1',
      text: 'Detail 1',
      x: 100,
      y: 100,
      children: [],
      parent: 'child1',
      color: '#8B5CF6'
    },
    {
      id: 'grandchild2',
      text: 'Detail 2',
      x: 300,
      y: 100,
      children: [],
      parent: 'child1',
      color: '#06B6D4'
    }
  ]);
  
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const addNode = () => {
    if (!selectedNode) return;
    
    const parent = nodes.find(n => n.id === selectedNode);
    if (!parent) return;

    const newNode: MindMapNode = {
      id: `node_${Date.now()}`,
      text: 'Nová myšlienka',
      x: parent.x + Math.random() * 200 - 100,
      y: parent.y + Math.random() * 200 - 100,
      children: [],
      parent: parent.id,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };

    setNodes(prev => [
      ...prev,
      newNode
    ]);

    // Aktualizuj parent
    setNodes(prev => prev.map(node => 
      node.id === selectedNode 
        ? { ...node, children: [...node.children, newNode.id] }
        : node
    ));
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === 'root') return; // Nemôžeme zmazať root

    const nodeToDelete = nodes.find(n => n.id === nodeId);
    if (!nodeToDelete) return;

    // Zmaž node a všetky jeho deti
    const nodesToDelete = getAllChildren(nodeId);
    nodesToDelete.push(nodeId);

    setNodes(prev => prev.filter(node => !nodesToDelete.includes(node.id)));

    // Aktualizuj parent
    if (nodeToDelete.parent) {
      setNodes(prev => prev.map(node => 
        node.id === nodeToDelete.parent
          ? { ...node, children: node.children.filter(id => id !== nodeId) }
          : node
      ));
    }
  };

  const getAllChildren = (nodeId: string): string[] => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return [];

    let children: string[] = [];
    node.children.forEach(childId => {
      children.push(childId);
      children.push(...getAllChildren(childId));
    });

    return children;
  };

  const startEdit = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setEditingNode(nodeId);
      setEditText(node.text);
    }
  };

  const saveEdit = () => {
    if (!editingNode) return;

    setNodes(prev => prev.map(node => 
      node.id === editingNode 
        ? { ...node, text: editText }
        : node
    ));

    setEditingNode(null);
    setEditText('');
  };

  const renderConnections = () => {
    return nodes.map(node => {
      if (!node.parent) return null;
      
      const parent = nodes.find(n => n.id === node.parent);
      if (!parent) return null;

      return (
        <line
          key={`connection-${node.id}`}
          x1={parent.x}
          y1={parent.y}
          x2={node.x}
          y2={node.y}
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      );
    });
  };

  const renderNodes = () => {
    return nodes.map(node => (
      <g key={node.id}>
        <circle
          cx={node.x}
          cy={node.y}
          r={node.id === 'root' ? 60 : 40}
          fill={node.color}
          stroke={selectedNode === node.id ? '#000' : 'transparent'}
          strokeWidth="3"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setSelectedNode(node.id)}
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={node.id === 'root' ? '14' : '12'}
          className="cursor-pointer select-none"
          onClick={() => setSelectedNode(node.id)}
        >
          {node.text.length > 15 ? `${node.text.substring(0, 15)}...` : node.text}
        </text>
      </g>
    ));
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Mind Map Editor
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={addNode} 
                disabled={!selectedNode}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Pridať uzol
              </Button>
              <Button 
                onClick={() => selectedNode && startEdit(selectedNode)} 
                disabled={!selectedNode}
                variant="outline"
                size="sm"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Upraviť
              </Button>
              <Button 
                onClick={() => selectedNode && deleteNode(selectedNode)} 
                disabled={!selectedNode || selectedNode === 'root'}
                variant="outline"
                size="sm"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Zmazať
              </Button>
              <div className="flex gap-1">
                <Button 
                  onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
                  variant="outline"
                  size="sm"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
                  variant="outline"
                  size="sm"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Edit Modal */}
      {editingNode && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <CardContent className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Upraviť uzol</h3>
            <div className="space-y-4">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Text uzla"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <Button 
                  onClick={() => setEditingNode(null)}
                  variant="outline"
                >
                  Zrušiť
                </Button>
                <Button onClick={saveEdit}>
                  Uložiť
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mind Map Canvas */}
      <Card className="h-[600px]">
        <CardContent className="p-0 h-full">
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox={`${-offset.x} ${-offset.y} ${800/zoom} ${600/zoom}`}
            className="border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50"
          >
            {renderConnections()}
            {renderNodes()}
          </svg>
        </CardContent>
      </Card>

      {/* Info Panel */}
      {selectedNode && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">
                  {nodes.find(n => n.id === selectedNode)?.text}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedNode === 'root' ? 'Hlavný uzol' : 'Poduzol'}
                </p>
              </div>
              <div className="flex gap-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: nodes.find(n => n.id === selectedNode)?.color }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
