import { useState } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Snackbar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";

import Alert from "../Alert";
import TransitionLeft from "../TransitionLeft";
import { initialState, statusItems, textFieldProps } from "./constants";

interface Form {
  name: string;
  description: string;
  // clientId: string;
  status: string;
}

interface AddProjectDialogProps {
  onClose: () => void;
  open: boolean;
}

export default function AddProjectDialog({
  onClose,
  open
}: AddProjectDialogProps) {
  const [form, setForm] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { name, description, status } = form;

  const handleModalClose = () => onClose();

  const handleSubmit = () => {
    if (name === "" || description === "" || status === "")
      return setSnackbarOpen(true);

    setForm(initialState);
  };

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" onClose={handleModalClose} open={open}>
        <DialogTitle>New project</DialogTitle>
        <Stack sx={{ "& .MuiFormControl-root": { m: 1 } }}>
          {textFieldProps.map(({ name, label }) => {
            const isTextArea = name === textFieldProps[1].name;

            if (name === textFieldProps[textFieldProps.length - 1].name)
              return (
                <FormControl
                  key={name}
                  sx={{ m: 1, minWidth: 120 }}
                  size="small">
                  <InputLabel id="description">{label}</InputLabel>
                  <Select
                    id="description"
                    labelId="description"
                    name={name}
                    value={status}
                    label={label}
                    onChange={handleFormChange}>
                    {statusItems.map(({ value, statusItem }) => (
                      <MenuItem key={value} value={value}>
                        {statusItem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            return (
              <TextField
                key={name}
                label={label}
                rows={isTextArea ? 3 : 1}
                multiline={isTextArea}
                name={name}
                onChange={handleFormChange}
                value={form[name as keyof Form]}
                variant="outlined"
              />
            );
          })}
        </Stack>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant="contained">
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
