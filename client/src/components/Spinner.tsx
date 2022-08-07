import { Box, CircularProgress } from "@mui/material";

import { appHeight } from "../constants";

export default function Spinner() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={appHeight}>
      <CircularProgress />
    </Box>
  );
}
