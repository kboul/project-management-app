import { useState } from "react";
import { Box, Button } from "@mui/material";
import { FaUser } from "react-icons/fa";

import AddClientDialog from "./AddClientDialog";

export default function AddClientModal() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickOpen = () => setOpen(true);

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box m={2}>
      <Button
        onClick={handleClickOpen}
        size="small"
        startIcon={<FaUser />}
        variant="contained">
        Add client
      </Button>
      <AddClientDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}
