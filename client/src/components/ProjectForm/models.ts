import { Dispatch, SetStateAction } from "react";

import { ProjectFormModel } from "../../models";

interface ProjectFormProps {
  form: ProjectFormModel;
  onDialogClose: () => void;
  onSubmit: () => void;
  setForm: Dispatch<SetStateAction<ProjectFormModel>>;
}

export type { ProjectFormProps };
