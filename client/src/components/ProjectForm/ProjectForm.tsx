import {
  Stack,
  TextField,
  SelectChangeEvent,
  DialogActions,
  Button
} from "@mui/material";
import { useId, ChangeEvent } from "react";

import AppSelect from "../AppSelect";
import { Form, ProjectFormProps } from "./models";
import { statusItems } from "../../constants";
import { textFields } from "./constants";

export default function ProjectForm({
  clientItems,
  form,
  onDialogClose,
  onSubmit,
  setForm
}: ProjectFormProps) {
  const id = useId();

  const handleFormChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

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
                data={
                  // eslint-disable-next-line no-nested-ternary
                  isStatus
                    ? statusItems
                    : isClient && clientItems
                    ? clientItems
                    : []
                }
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
