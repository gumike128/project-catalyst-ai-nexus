
import { 
  Edit3, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  FolderOpen,
  Clock,
  BarChart3
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const PROJECT_STATUS = {
  DRAFT: 'draft',
  ANALYZING: 'analyzing',
  COMPLETE: 'complete',
  ERROR: 'error'
} as const;

export const PROJECT_TYPES = {
  WEB: 'web',
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  AI: 'ai',
  RESEARCH: 'research',
  OTHER: 'other'
} as const;

export const STATUS_CONFIG: Record<string, {
  icon: LucideIcon;
  color: string;
  bgColor: string;
  textColor: string;
}> = {
  [PROJECT_STATUS.DRAFT]: {
    icon: Edit3,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500'
  },
  [PROJECT_STATUS.ANALYZING]: {
    icon: Loader2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500'
  },
  [PROJECT_STATUS.COMPLETE]: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500'
  },
  [PROJECT_STATUS.ERROR]: {
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500'
  }
};

export const SUGGESTION_COLORS: Record<string, string> = {
  critical: 'bg-red-50 border-red-200',
  high: 'bg-orange-50 border-orange-200',
  task: 'bg-blue-50 border-blue-200',
  improvement: 'bg-green-50 border-green-200',
  technology: 'bg-purple-50 border-purple-200',
  workflow: 'bg-indigo-50 border-indigo-200',
  optimization: 'bg-yellow-50 border-yellow-200',
  risk: 'bg-red-50 border-red-200',
  feature: 'bg-emerald-50 border-emerald-200',
  default: 'bg-gray-50 border-gray-200'
};
