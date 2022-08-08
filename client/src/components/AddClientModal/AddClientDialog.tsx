import { useState } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Snackbar
} from "@mui/material";

import Alert from "../Alert";
import TransitionLeft from "../TransitionLeft";
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

interface AddClientDialogProps {
  onClose: () => void;
  open: boolean;
}

export default function AddClientDialog({
  onClose,
  open
}: AddClientDialogProps) {
  const [form, setForm] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleModalClose = () => onClose();

  const handleSubmit = () => {
    if (name === "" || email === "" || phone === "")
      return setSnackbarOpen(true);

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
    <>
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        open={snackbarOpen}
        TransitionComponent={TransitionLeft}>
        <Alert severity="warning" sx={{ width: "100%" }}>
          Please fill in all the fields
        </Alert>
      </Snackbar>
    </>
  );
}
