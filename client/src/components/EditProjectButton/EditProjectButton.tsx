import { Box, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

import EditProjectDialog from "./EditProjectDialog";
import { Project } from "../../models";

interface EditProjectButtonProps {
  project: Project;
}

export default function EditProjectButton({ project }: EditProjectButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = useCallback(() => setDialogOpen(false), []);

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
      <EditProjectDialog
        onClose={handleDialogClose}
        open={dialogOpen}
        project={project}
      />
    </Box>
  );
}
