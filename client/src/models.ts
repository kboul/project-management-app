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
  client: Client;
}

interface ProjectFormModel {
  name: string;
  description: string;
  clientId: string | undefined;
  status: string;
}

export type { Client, Project, ProjectFormModel };
