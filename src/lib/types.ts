
export type Status = 'pending' | 'in-progress' | 'completed' | 'delayed' | 'live';

export interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  start_date: string;
  end_date: string | null;
  client_id: string | null;
  project_manager_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: Status;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  project_id: string;
  sender_id: string | null;
  content: string;
  created_at: string;
  is_read: boolean | null;
}
