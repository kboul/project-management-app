import { Stack, TextField, SelectChangeEvent } from "@mui/material";
import { useId, ChangeEvent, useMemo } from "react";

import AppSelect from "../AppSelect";
import { Client } from "../../models";
import { statusItems, textFields } from "./constants";
import { Form, ProjectFormProps } from "./models";

export default function ProjectForm({ data, form, setForm }: ProjectFormProps) {
  const id = useId();

  const clientItems = useMemo(
    () =>
      data?.clients.map((client: Client) => ({
        value: client.id,
        item: client.name
      })),
    [data?.clients]
  );

  const handleFormChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
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
  );
}
