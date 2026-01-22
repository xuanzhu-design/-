
export interface Task {
  id: string;
  name: string;
  status: 'pending' | 'completed' | 'ongoing';
  time: string;
}

export interface Feedback {
  id: number;
  title: string;
  content: string;
  tags: { text: string; colorClass: string }[];
  user: string;
  avatar: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
}

export type UIMode = 'overlay' | 'internal' | 'global';
