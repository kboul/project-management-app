import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";

import ClientInfo from "./ClientInfo";
import DeleteProjectButton from "./DeleteProjectButton";
import { Project } from "../models";

interface ProjectProps {
  // eslint-disable-next-line react/require-default-props
  mode?: "all" | "single";
  project: Project;
}

export default function ProjectCard({ mode = "all", project }: ProjectProps) {
  const isModeAll = mode === "all";
  return (
    <Card
      sx={{
        minWidth: 275,
        "& .MuiAccordionSummary-root:hover, .MuiButtonBase-root:hover": {
          cursor: "default"
        }
      }}>
      <CardActionArea disableRipple>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{ flex: 1 }}
              color="text.secondary"
              gutterBottom={!isModeAll}
              variant="h5">
              {project.name}
            </Typography>

            <Button
              color="primary"
              component={Link}
              size="small"
              style={{ cursor: "pointer" }}
              to={isModeAll ? `projects/${project.id}` : "/"}
              variant="text">
              {isModeAll ? "View" : "Back"}
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            {project?.description}
          </Typography>
          <Typography variant="body2">
            Status: <b>{project.status}</b>
          </Typography>

          {!isModeAll && project && <ClientInfo client={project.client} />}

          {!isModeAll && project && <DeleteProjectButton id={project.id} />}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
