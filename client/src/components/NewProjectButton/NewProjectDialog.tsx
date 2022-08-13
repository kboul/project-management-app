import { useCallback, useState } from "react";
import { Button, DialogActions } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";

import AppDialog from "../AppDialog";
import AppSnackbar from "../AppSnackbar/AppSnackbar";
import LoadingOrError from "../LoadingOrError";
import ProjectForm from "../ProjectForm/ProjectForm";
import { GET_CLIENTS, GET_PROJECTS } from "../../queries";
import { Project } from "../../models";
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
  const { data, error, loading } = useQuery(GET_CLIENTS);

  const [form, setForm] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { name, description, clientId, status } = form;

  const handleModalClose = () => onClose();

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

  const handleSnackBarClose = useCallback(() => setSnackbarOpen(false), []);

  if (!data) return <LoadingOrError error={error} loading={loading} />;

  return (
    <>
      <AppDialog
        fullWidth
        maxWidth="sm"
        onClose={handleModalClose}
        open={open}
        title="New project">
        <ProjectForm data={data} form={form} setForm={setForm} />
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
          <Button onClick={handleModalClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </AppDialog>
      <AppSnackbar onClose={handleSnackBarClose} open={snackbarOpen} />
    </>
  );
}
