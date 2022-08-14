import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";

import AppDialog from "../AppDialog";
import AppSnackbar from "../AppSnackbar/AppSnackbar";
import ProjectForm from "../ProjectForm/ProjectForm";
import { GET_PROJECTS } from "../../queries";
import { Project, ProjectFormModel } from "../../models";
import { ADD_PROJECT } from "../../mutations/project";

interface NewProjectDialogProps {
  onClose: () => void;
  open: boolean;
}

const initialState = { name: "", description: "", clientId: "", status: "new" };

export default function NewProjectDialog({
  onClose,
  open
}: NewProjectDialogProps) {
  const [form, setForm] = useState<ProjectFormModel>(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { name, description, clientId, status } = form;

  const handleDialogClose = useCallback(() => onClose(), []);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    // eslint-disable-next-line no-shadow
    update(cache, { data: { addProject } }) {
      const cachedProjects: { projects: Project[] } | null = cache.readQuery({
        query: GET_PROJECTS
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: cachedProjects?.projects.concat([addProject]) } // spread operator alternative
      });
    }
  });

  // eslint-disable-next-line consistent-return
  const handleSubmit = () => {
    if (name === "" || description === "" || clientId === "" || status === "")
      return setSnackbarOpen(true);

    addProject();
    setForm(initialState);
    onClose();
  };

  const handleSnackbarClose = useCallback(() => setSnackbarOpen(false), []);

  return (
    <>
      <AppDialog
        fullWidth
        maxWidth="sm"
        onClose={handleDialogClose}
        open={open}
        title="New project">
        <ProjectForm
          form={form}
          onDialogClose={handleDialogClose}
          onSubmit={handleSubmit}
          setForm={setForm}
        />
      </AppDialog>
      <AppSnackbar onClose={handleSnackbarClose} open={snackbarOpen} />
    </>
  );
}
