
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Upload, 
  File, 
  FileText, 
  Image, 
  Archive,
  Download,
  Trash2,
  Calendar
} from 'lucide-react';
import { Project } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { EmptyState } from '../ui/EmptyState';

interface ProjectFilesProps {
  project: Project;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image;
  if (type.includes('pdf')) return FileText;
  if (type.includes('zip') || type.includes('rar')) return Archive;
  return File;
};

const formatFileSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export const ProjectFiles: React.FC<ProjectFilesProps> = ({ project }) => {
  const { t } = useTranslation();

  const handleFileUpload = () => {
    // Simulate file upload
    console.log('File upload triggered');
  };

  const handleFileDownload = (fileId: string) => {
    // Simulate file download
    console.log('Download file:', fileId);
  };

  const handleFileDelete = (fileId: string) => {
    // Simulate file deletion
    console.log('Delete file:', fileId);
  };

  if (project.files.length === 0) {
    return (
      <EmptyState
        icon={Upload}
        title="No files uploaded"
        description="Upload files to analyze and manage your project documents."
        action={{
          label: "Upload Files",
          onClick: handleFileUpload
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              {t('project.files')}
            </CardTitle>
            <Button onClick={handleFileUpload} className="gap-2">
              <Upload className="w-4 h-4" />
              {t('common.upload')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports PDF, DOC, TXT, and image files up to 10MB
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {project.files.map((file) => {
          const FileIcon = getFileIcon(file.type);
          
          return (
            <Card key={file.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{file.name}</h4>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Badge variant={file.processed ? 'default' : 'secondary'} className="text-xs">
                    {file.processed ? 'Processed' : 'Processing'}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(file.uploadedAt)}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleFileDownload(file.id)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileDelete(file.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
