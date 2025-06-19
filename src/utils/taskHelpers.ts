import { Task, Progress } from '../types';

export function getTaskStatus(task: Task, progress?: Progress[string]): 'blocked' | 'active' | 'completed' {
  return progress?.status || task.status;
}

export function isTaskCompleted(task: Task, progress?: Progress[string]): boolean {
  return getTaskStatus(task, progress) === 'completed';
}

export function isTaskActive(task: Task, progress?: Progress[string]): boolean {
  return getTaskStatus(task, progress) === 'active';
}

export function isTaskBlocked(task: Task, progress?: Progress[string]): boolean {
  return getTaskStatus(task, progress) === 'blocked';
}

export function getTaskPriorityColor(priority?: string): string {
  switch (priority) {
    case 'critical':
      return 'bg-red-500 text-white';
    case 'high':
      return 'bg-orange-500 text-white';
    case 'medium':
      return 'bg-yellow-500 text-white';
    case 'low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

export function shouldShowPriorityBadge(task: Task, status: string): boolean {
  return !!(task.priority && ['critical', 'high'].includes(task.priority) && 
           status !== 'completed' && !task.isOptional);
}

export function shouldShowTip(task: Task, status: string, compact: boolean): boolean {
  return !!(task.tip && !compact && status === 'active');
}

export function shouldShowOptionalReason(task: Task, status: string, compact: boolean): boolean {
  return !!(task.isOptional && task.optionalReason && status === 'active' && !compact);
}