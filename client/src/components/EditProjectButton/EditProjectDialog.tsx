import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";

import { AppDialog, AppSnackbar, ProjectForm } from "..";
import { Project, ProjectFormModel } from "../../models";
import { EDIT_PROJECT } from "../../mutations/project";
import { GET_PROJECT } from "../../queries";
import { statusItems } from "../../constants";

const mapStatusItemToValue = (project: Project) =>
  statusItems.find(({ item }) => item === project.status)?.value || "";

interface EditProjectDialogProps {
  onClose: () => void;
  open: boolean;
  project: Project;
}

export default function EditProjectDialog({
  onClose,
  open,
  project
}: EditProjectDialogProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [form, setForm] = useState<ProjectFormModel>({
    name: project.name,
    description: project.description,
    clientId: String(project.client?.id) ?? "",
    status: mapStatusItemToValue(project)
  });

  const handleSnackbarClose = useCallback(() => setSnackbarOpen(false), []);

  const { name, description, clientId, status } = form;

  const [editProject] = useMutation(EDIT_PROJECT, {
    variables: { id: project.id, name, description, clientId, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
  });

  // eslint-disable-next-line consistent-return
  const handleSubmit = () => {
    if (name === "" || description === "" || clientId === "" || status === "")
      return setSnackbarOpen(true);

    editProject();
    onClose();
  };

  return (
    <>
      <AppDialog
        fullWidth
        maxWidth="sm"
        onClose={onClose}
        open={open}
        title="Edit project">
        <ProjectForm
          form={form}
          onDialogClose={onClose}
          onSubmit={handleSubmit}
          setForm={setForm}
        />
      </AppDialog>
      <AppSnackbar onClose={handleSnackbarClose} open={snackbarOpen} />
    </>
  );
}
