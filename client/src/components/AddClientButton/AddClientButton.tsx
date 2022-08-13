import { useState } from "react";
import { Box, Button } from "@mui/material";
import { FaUser } from "react-icons/fa";

import AddClientDialog from "./AddClientDialog";

export default function AddClientButton() {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <Box m={2} mr={0}>
      <Button
        onClick={handleModalOpen}
        size="small"
        startIcon={<FaUser />}
        variant="contained">
        Add client
      </Button>
      <AddClientDialog onClose={handleModalClose} open={open} />
    </Box>
  );
}
