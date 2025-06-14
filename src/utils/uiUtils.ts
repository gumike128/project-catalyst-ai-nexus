
import { STATUS_CONFIG, SUGGESTION_COLORS } from '../constants/projectConstants';

export const getStatusConfig = (status: string) => {
  return STATUS_CONFIG[status] || STATUS_CONFIG.draft;
};

export const getSuggestionColor = (type: string, priority: string): string => {
  if (priority === 'critical') return SUGGESTION_COLORS.critical;
  if (priority === 'high') return SUGGESTION_COLORS.high;
  
  return SUGGESTION_COLORS[type] || SUGGESTION_COLORS.default;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
