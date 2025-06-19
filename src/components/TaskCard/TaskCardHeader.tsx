import React from 'react';
import { Task } from '../../types';

interface TaskCardHeaderProps {
  task: Task;
  status: string;
  compact: boolean;
}

export function TaskCardHeader({ task, status, compact }: TaskCardHeaderProps) {
  // Ya no mostramos badges de texto, todo se maneja en el TaskStatusIcon
  return null;
}