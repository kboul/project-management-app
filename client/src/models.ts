interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface Project {
  id: number;
  description: string;
  name: string;
  status: string;
  client?: {
    name: string;
    email: string;
  };
}

export type { Client, Project };
