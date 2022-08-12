import { Box, Stack } from "@mui/material";

import {
  AddClientModal,
  AddProjectModal,
  ClientsTable,
  Projects
} from "../components";

export default function Home() {
  return (
    <>
      <Box display="flex">
        <AddClientModal />
        <AddProjectModal />
      </Box>
      <Stack spacing={2}>
        <Projects />
        <ClientsTable />
      </Stack>
    </>
  );
}
