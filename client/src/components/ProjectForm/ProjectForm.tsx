import {
  Stack,
  TextField,
  SelectChangeEvent,
  DialogActions,
  Button
} from "@mui/material";
import { useId, ChangeEvent, useMemo } from "react";
import { useQuery } from "@apollo/client";

import AppSelect from "../AppSelect";
import LoadingOrError from "../LoadingOrError";
import { ProjectFormProps } from "./models";
import { Client, ProjectFormModel } from "../../models";
import { GET_CLIENTS } from "../../queries";
import { statusItems } from "../../constants";
import { textFields } from "./constants";

export default function ProjectForm({
  form,
  onDialogClose,
  onSubmit,
  setForm
}: ProjectFormProps) {
  const id = useId();

  const { data, error, loading } = useQuery(GET_CLIENTS);

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
                value={form[textFieldName as keyof ProjectFormModel]}
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
              value={form[textFieldName as keyof ProjectFormModel]}
              variant="outlined"
            />
          );
        })}
      </Stack>
      <DialogActions>
        <Button onClick={onSubmit} color="primary" variant="contained">
          Submit
        </Button>
        <Button onClick={onDialogClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </>
  );
}
