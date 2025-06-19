import React from 'react';
import { TaskCard as ModularTaskCard } from './TaskCard/TaskCard';
import { TaskCardProps } from '../types';

// Componente principal que usa la versión modular
export function TaskCard(props: TaskCardProps) {
  return <ModularTaskCard {...props} />;
}