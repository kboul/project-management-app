import { Box, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

import AppDialog from "./AppDialog";
import ProjectForm from "./ProjectForm/ProjectForm";
import { Project } from "../models";
import { statusItems } from "../constants";

interface EditProjectButtonProps {
  project: Project;
}

const mapStatusItemToValue = (project: Project) =>
  statusItems.find(({ item }) => item === project.status)?.value || "";

export default function EditProjectButton({ project }: EditProjectButtonProps) {
  const [form, setForm] = useState({
    name: project.name,
    description: project.description,
    clientId: "",
    status: mapStatusItemToValue(project)
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = useCallback(() => setDialogOpen(false), []);

  const handleSubmit = () => {};

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
    </Box>
  );
}
