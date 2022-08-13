import { Box, Button } from "@mui/material";
import { FaPencilAlt } from "react-icons/fa";

import { Project } from "../models";

interface EditProjectButtonProps {
  project: Project;
}

export default function EditProjectButton({ project }: EditProjectButtonProps) {
  console.log(project);
  return (
    <Box display="flex" flex={1} mt={2}>
      <Button
        component="span"
        // onClick={() => {}}
        size="small"
        startIcon={<FaPencilAlt />}
        style={{ cursor: "pointer" }}
        variant="contained">
        Edit project
      </Button>
    </Box>
  );
}
