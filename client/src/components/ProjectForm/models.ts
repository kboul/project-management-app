import { Dispatch, SetStateAction } from "react";

import { Client } from "../../models";

interface Form {
  name: string;
  description: string;
  clientId: string;
  status: string;
}

interface ProjectFormProps {
  data: { clients: Client[] };
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
}

export type { Form, ProjectFormProps };
