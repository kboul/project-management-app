import { ReactNode } from "react";
import { Dialog, DialogProps, DialogTitle } from "@mui/material";

interface AppDialogProps extends DialogProps {
  children: ReactNode;
  title: string;
  [key: string]: any;
}

export default function AppDialog({
  children,
  title,
  ...otherProps
}: AppDialogProps) {
  return (
    <Dialog {...otherProps}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}
