export interface TaskCreate {
  title: string;
  description: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  date?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  date?: string;
}

export interface TaskOut extends TaskCreate {
  id: number;
  column_id: number;
  position: number;
}
