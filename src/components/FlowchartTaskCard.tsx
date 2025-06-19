import React from 'react';
import { TaskCard } from './TaskCard';
import { Task, Progress } from '../types';

interface FlowchartTaskCardProps {
  task: Task;
  progress?: Progress[string];
  onClick: () => void;
  compact?: boolean;
}

// Alias para mantener compatibilidad - ahora usa el TaskCard modular
export function FlowchartTaskCard(props: FlowchartTaskCardProps) {
  return <TaskCard {...props} />;
}