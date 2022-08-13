import { Dispatch, SetStateAction } from "react";

import { Client } from "../../models";

interface Form {
  name: string;
  description: string;
  clientId: string;
  status: string;
}

interface ProjectFormProps {
  clientItems?: Client[];
  form: Form;
  onDialogClose: () => void;
  onSubmit: () => void;
  setForm: Dispatch<SetStateAction<Form>>;
}

export type { Form, ProjectFormProps };
