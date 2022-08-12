import { useId, useState, ChangeEvent, useMemo } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Snackbar,
  SelectChangeEvent
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";

import Alert from "../Alert";
import AppSelect from "../AppSelect";
import LoadingOrError from "../LoadingOrError";
import TransitionLeft from "../TransitionLeft";
import { initialState, statusItems, textFields } from "./constants";
import { GET_CLIENTS, GET_PROJECTS } from "../../queries";
import { Client, Project } from "../../models";
import { ADD_PROJECT } from "../../mutations/project";

interface Form {
  name: string;
  description: string;
  clientId: string;
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
  const id = useId();

  const { data, error, loading } = useQuery(GET_CLIENTS);

  const [form, setForm] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { name, description, clientId, status } = form;

  const handleModalClose = () => onClose();

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    // eslint-disable-next-line no-shadow
    update(cache, { data: { addProject } }) {
      const cachedProjects: { projects: Project[] } | null = cache.readQuery({
        query: GET_PROJECTS
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: cachedProjects?.projects.concat([addProject]) } // spread operator alternative
      });
    }
  });

  // eslint-disable-next-line consistent-return
  const handleSubmit = () => {
    if (name === "" || description === "" || clientId === "" || status === "")
      return setSnackbarOpen(true);

    addProject();
    setForm(initialState);
    onClose();
  };

  const handleFormChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const clientItems = useMemo(
    () =>
      data?.clients.map((client: Client) => ({
        value: client.id,
        item: client.name
      })),
    [data?.clients]
  );

  if (!data) return <LoadingOrError error={error} loading={loading} />;

  return (
    <>
      <Dialog fullWidth maxWidth="sm" onClose={handleModalClose} open={open}>
        <DialogTitle>New project</DialogTitle>
        <Stack sx={{ "& .MuiFormControl-root": { m: 1 } }}>
          {textFields.map(({ name: textFieldName, label }) => {
            const isTextArea = textFieldName === textFields[1].name;
            const isClient =
              textFieldName === textFields[textFields.length - 2].name;
            const isStatus =
              textFieldName === textFields[textFields.length - 1].name;

            if (isStatus || isClient)
              return (
                <AppSelect
                  data={isStatus ? statusItems : clientItems}
                  id={textFieldName}
                  key={`${id}-${textFieldName}`}
                  label={label}
                  labelId={`${textFieldName}-label`}
                  name={textFieldName}
                  onChange={handleFormChange}
                  value={form[textFieldName as keyof Form]}
                />
              );

            return (
              <TextField
                key={`${id}-${textFieldName}`}
                label={label}
                rows={isTextArea ? 3 : 1}
                multiline={isTextArea}
                name={textFieldName}
                onChange={handleFormChange}
                value={form[textFieldName as keyof Form]}
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
