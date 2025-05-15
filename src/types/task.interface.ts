export interface Task {
  id: number;
  name: string;
  status?: "todo" | "in_progress" | "done";
  description?: string;
  assignee: number;
}