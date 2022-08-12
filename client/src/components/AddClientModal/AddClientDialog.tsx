import { useState, ChangeEvent } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Snackbar
} from "@mui/material";
import { useMutation } from "@apollo/client";

import Alert from "../Alert";
import TransitionRightLeft from "../TransitionRightLeft";
import { ADD_CLIENT } from "../../mutations/client";
import { Client } from "../../models";
import { GET_CLIENTS } from "../../queries";
import { initialState, textFields } from "./constants";

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
    // eslint-disable-next-line no-shadow
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

  // eslint-disable-next-line consistent-return
  const handleSubmit = () => {
    if (name === "" || email === "" || phone === "")
      return setSnackbarOpen(true);

    addClient();
    setForm(initialState);
    handleModalClose();
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" onClose={handleModalClose} open={open}>
        <DialogTitle>Add Client</DialogTitle>
        <Stack sx={{ "& .MuiFormControl-root": { m: 1 } }}>
          {textFields.map(({ name: textFieldName, label }) => (
            <TextField
              key={textFieldName}
              label={label}
              name={textFieldName}
              onChange={handleFormChange}
              value={form[textFieldName as keyof Form]}
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
        TransitionComponent={TransitionRightLeft}>
        <Alert severity="warning" sx={{ width: "100%" }}>
          Please fill in all the fields
        </Alert>
      </Snackbar>
    </>
  );
}
