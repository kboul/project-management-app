import { useState, ChangeEvent, useCallback } from "react";
import { Stack, Button, DialogActions, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";

import AppDialog from "../AppDialog";
import { ADD_CLIENT } from "../../mutations/client";
import { Client } from "../../models";
import { GET_CLIENTS } from "../../queries";
import { ClientForm, AddClientDialogProps } from "./models";
import { initialState, textFields } from "./constants";
import AppSnackbar from "../AppSnackbar/AppSnackbar";

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

  const handleSnackBarClose = useCallback(() => setSnackbarOpen(false), []);

  return (
    <>
      <AppDialog
        fullWidth
        maxWidth="sm"
        onClose={handleModalClose}
        open={open}
        title="Add Client">
        <Stack sx={{ "& .MuiFormControl-root": { m: 1 } }}>
          {textFields.map(({ name: textFieldName, label }) => (
            <TextField
              key={textFieldName}
              label={label}
              name={textFieldName}
              onChange={handleFormChange}
              value={form[textFieldName as keyof ClientForm]}
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
      </AppDialog>
      <AppSnackbar onClose={handleSnackBarClose} open={snackbarOpen} />
    </>
  );
}
