import { Box, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import AppDialog from "./AppDialog";
import AppSnackbar from "./AppSnackbar/AppSnackbar";
import ProjectForm from "./ProjectForm/ProjectForm";
import { Project, ProjectFormModel } from "../models";
import { EDIT_PROJECT } from "../mutations/project";
import { GET_PROJECT } from "../queries";
import { statusItems } from "../constants";

interface EditProjectButtonProps {
  project: Project;
}

const mapStatusItemToValue = (project: Project) =>
  statusItems.find(({ item }) => item === project.status)?.value || "";

export default function EditProjectButton({ project }: EditProjectButtonProps) {
  const [form, setForm] = useState<ProjectFormModel>({
    name: project.name,
    description: project.description,
    clientId: String(project.client?.id) ?? "",
    status: mapStatusItemToValue(project)
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = useCallback(() => setDialogOpen(false), []);

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
    setDialogOpen(false);
  };

  const handleSnackbarClose = useCallback(() => setSnackbarOpen(false), []);

  return (
    <Box display="flex" flex={1} mt={2}>
      <Button
        component="span"
        onClick={handleDialogOpen}
        size="small"
        startIcon={<FaPencilAlt />}
        style={{ cursor: "pointer" }}
        variant="contained">
        Edit project
      </Button>
      <AppDialog
        fullWidth
        maxWidth="sm"
        onClose={handleDialogClose}
        open={dialogOpen}
        title="Edit project">
        <ProjectForm
          form={form}
          onDialogClose={handleDialogClose}
          onSubmit={handleSubmit}
          setForm={setForm}
        />
      </AppDialog>
      <AppSnackbar onClose={handleSnackbarClose} open={snackbarOpen} />
    </Box>
  );
}
