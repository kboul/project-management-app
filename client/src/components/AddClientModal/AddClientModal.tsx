import { useState } from "react";
import {
  Box,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField
} from "@mui/material";
import { FaUser } from "react-icons/fa";

import { ADD_CLIENT } from "../../mutations/client";
import { useMutation } from "@apollo/client";
import { Client } from "../../models";
import { GET_CLIENTS } from "../../queries";
import { initialState, textFieldProps } from "./constants";

interface Form {
  name: string;
  email: string;
  phone: string;
}

function AddClientDialog({
  onClose,
  open,
  selectedValue
}: {
  onClose: (value: string) => void;
  open: boolean;
  selectedValue: string;
}) {
  const [form, setForm] = useState(initialState);

  const { name, email, phone } = form;

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const cachedClients: { clients: Client[] } | null = cache.readQuery({
        query: GET_CLIENTS
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: cachedClients?.clients.concat([addClient]) }
      });
    }
  });

  const handleModalClose = () => onClose(selectedValue);

  const handleSubmit = () => {
    if (name === "" || email === "" || phone === "")
      return alert("Please fill in all the fields");

    addClient();
    setForm(initialState);
    handleModalClose();
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleModalClose} open={open}>
      <DialogTitle>Add Client</DialogTitle>
      <Stack sx={{ "& .MuiFormControl-root": { m: 1 } }}>
        {textFieldProps.map(({ name, label }) => (
          <TextField
            key={name}
            label={label}
            name={name}
            onChange={handleFormChange}
            value={form[name as keyof Form]}
            variant="outlined"
          />
        ))}
      </Stack>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
        <Button onClick={handleModalClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AddClientModal() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickOpen = () => setOpen(true);

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box m={1}>
      <Button
        size="small"
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<FaUser />}>
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
