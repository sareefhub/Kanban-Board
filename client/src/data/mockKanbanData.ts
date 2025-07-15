// data/mockKanbanData.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  date?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 't1',
        title: 'Design user interface',
        description: 'Create wireframes and mockups for the new feature',
        tags: ['Design', 'UI/UX'],
        priority: 'high',
        assignee: 'John Doe',
        date: '2024-01-15',
      },
      {
        id: 't2',
        title: 'Set up database schema',
        description: 'Define tables and relationships for the application',
        tags: ['Backend', 'Database'],
        priority: 'medium',
        assignee: 'Jane Smith',
        date: '2024-01-12',
      },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      {
        id: 't3',
        title: 'Implement authentication',
        description: 'Add login and registration functionality',
        tags: ['Backend', 'Security'],
        priority: 'high',
        assignee: 'Mike Johnson',
        date: '2024-01-18',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      {
        id: 't4',
        title: 'Code review for API endpoints',
        description: 'Review and test all REST API endpoints',
        tags: ['Backend', 'Testing'],
        priority: 'medium',
        assignee: 'Sarah Wilson',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: 't5',
        title: 'Project setup',
        description: 'Initialize project structure and dependencies',
        tags: ['Setup'],
        priority: 'low',
        assignee: 'John Doe',
      },
    ],
  },
];
