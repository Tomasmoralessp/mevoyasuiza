export interface TaskLink {
  title: string;
  url: string;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'blocked' | 'active' | 'completed';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime?: string;
  links?: TaskLink[];
  tip?: string;
  consequences?: string;
  fileRequired?: string;
  notes?: string;
  uploadedFile?: string;
  isOptional?: boolean;
  optionalReason?: string;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  color: string;
  icon: string;
  estimatedDuration?: string;
}

export interface Progress {
  [taskId: string]: {
    status: 'blocked' | 'active' | 'completed';
    notes?: string;
    uploadedFile?: string;
  };
}

export interface TaskCardProps {
  task: Task;
  progress?: Progress[string];
  onClick: () => void;
  compact?: boolean;
}

export interface PhaseProps {
  phase: Phase;
  progress: Progress;
  onTaskClick: (task: Task) => void;
  isActive: boolean;
  showAllPhases: boolean;
  isLastPhase: boolean;
  nextPhase?: Phase;
}