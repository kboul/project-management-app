import { Box, Button, Stack, Typography } from "@mui/material";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Stack
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={`calc(100vh - 64px)`}>
      <FaExclamationTriangle size="5em" />
      <Typography variant="h1">404</Typography>
      <Box>Sorry, this page does not exist</Box>
      <Box mt={2}>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go back
        </Button>
      </Box>
    </Stack>
  );
}
