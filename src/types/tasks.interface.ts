export interface ICreateTask {
  name: string;
  description?: string;
  status?: string;
  assigneeId: number;
}

export interface IUpdateTask {
  name?: string;
  description?: string;
  status?: string;
  assigneeId?: number;
}
