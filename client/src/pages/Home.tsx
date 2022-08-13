import { Box, Stack } from "@mui/material";

import {
  AddClientButton,
  NewProjectButton,
  ClientsTable,
  Projects
} from "../components";

export default function Home() {
  return (
    <>
      <Box display="flex">
        <AddClientButton />
        <NewProjectButton />
      </Box>
      <Stack spacing={2}>
        <Projects />
        <ClientsTable />
      </Stack>
    </>
  );
}
