import { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";
import { FaList } from "react-icons/fa";

import NewProjectDialog from "./NewProjectDialog";

export default function NewProjectButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = useCallback(() => setDialogOpen(false), []);

  return (
    <Box m={2}>
      <Button
        color="secondary"
        onClick={handleDialogOpen}
        size="small"
        startIcon={<FaList />}
        variant="contained">
        New project
      </Button>
      <NewProjectDialog onClose={handleDialogClose} open={dialogOpen} />
    </Box>
  );
}
