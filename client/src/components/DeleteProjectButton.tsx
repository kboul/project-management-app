import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@mui/material";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import TransitionBottomCenter from "./TransitionBottomCenter";
import { DELETE_PROJECT } from "../mutations/project";
import { GET_PROJECTS } from "../queries";
import AppDialog from "./AppDialog";

interface DeleteProjectButtonProps {
  id: number;
}

export default function DeleteProjectButton({ id }: DeleteProjectButtonProps) {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }]
  });

  const handleOk = () => deleteProject();
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <Box display="flex" mt={2}>
      <Button
        component="span"
        onClick={handleDialogOpen}
        size="small"
        startIcon={<FaTrash />}
        style={{ cursor: "pointer" }}
        variant="contained">
        Delete project
      </Button>
      <AppDialog
        keepMounted
        onClose={handleDialogClose}
        open={dialogOpen}
        title=""
        TransitionComponent={TransitionBottomCenter}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>Ok</Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </AppDialog>
    </Box>
  );
}
