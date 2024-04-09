export type TaskType = {
  id: string;
  name: string;
  description: string;
  starting_date: Date;
  finishing_date: Date;
  progress_percentage: number;
  is_priority: 'low' | 'medium' | 'hard';
  project_id: string;
  kanban_state_id: number;
  agencyId: string;
  userId: string;
  task_state_id: string;
};
