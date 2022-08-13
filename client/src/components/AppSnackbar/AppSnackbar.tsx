import { Snackbar, SnackbarProps } from "@mui/material";

import Alert from "./Alert";
import TransitionRightLeft from "./TransitionRightLeft";

interface AppSnackbarProps extends SnackbarProps {
  onClose: () => void;
  open: boolean;
}

export default function AppSnackbar({ onClose, open }: AppSnackbarProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={5000}
      onClose={onClose}
      open={open}
      TransitionComponent={TransitionRightLeft}>
      <Alert severity="warning" sx={{ width: "100%" }}>
        Please fill in all the fields
      </Alert>
    </Snackbar>
  );
}
