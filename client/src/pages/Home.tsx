import { Box, Stack } from "@mui/material";

import {
  AddClientModal,
  NewProjectButton,
  ClientsTable,
  Projects
} from "../components";

export default function Home() {
  return (
    <>
      <Box display="flex">
        <AddClientModal />
        <NewProjectButton />
      </Box>
      <Stack spacing={2}>
        <Projects />
        <ClientsTable />
      </Stack>
    </>
  );
}
