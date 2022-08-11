import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface AppSelectProps {
  data: any[];
  label: string;
  [key: string]: any;
}

export default function AppSelect({
  data,
  label,
  ...otherProps
}: AppSelectProps) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={otherProps.labelId}>{label}</InputLabel>
      <Select {...otherProps}>
        {data.map(({ value, item }) => (
          <MenuItem key={value} value={value}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
