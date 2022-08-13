import { useState } from "react";
import { Box, Button } from "@mui/material";
import { FaList } from "react-icons/fa";

import NewProjectDialog from "./NewProjectDialog";

export default function NewProjectButton() {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <Box m={2}>
      <Button
        color="secondary"
        onClick={handleModalOpen}
        size="small"
        startIcon={<FaList />}
        variant="contained">
        New project
      </Button>
      <NewProjectDialog onClose={handleModalClose} open={open} />
    </Box>
  );
}
