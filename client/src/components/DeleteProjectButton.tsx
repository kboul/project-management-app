import { useMutation } from "@apollo/client";
import { Box, Button } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { DELETE_PROJECT } from "../mutations/project";
import { GET_PROJECTS } from "../queries";

interface DeleteProjectButtonProps {
  id: number;
}

export default function DeleteProjectButton({ id }: DeleteProjectButtonProps) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }]
  });

  const handleClick = () => deleteProject();

  return (
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Button
        component="span"
        onClick={handleClick}
        size="small"
        startIcon={<FaTrash />}
        style={{ cursor: "pointer" }}
        variant="contained">
        Delete project
      </Button>
    </Box>
  );
}
