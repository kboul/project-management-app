import { Stack } from "@mui/material";

import { AddClientModal, Clients, Projects } from "../components";

export default function Home() {
  return (
    <>
      <AddClientModal />
      <Stack spacing={2}>
        <Projects />
        <Clients />
      </Stack>
    </>
  );
}
