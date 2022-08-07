import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";

import { Project } from "../models";

interface ProjectProps {
  mode?: "all" | "single";
  project: Project;
}

export default function ProjectCard({ mode = "all", project }: ProjectProps) {
  const isModeAll = mode === "all";
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{ flex: 1 }}
              color="text.secondary"
              gutterBottom={!isModeAll}
              variant="h5">
              {project.name}
            </Typography>

            <Box>
              {isModeAll && <Link to={`projects/${project.id}`}>View</Link>}
              {!isModeAll && <Link to="/">Back</Link>}
            </Box>
          </Box>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            {project?.description}
          </Typography>
          <Typography variant="body2">
            Status: <b>{project.status}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
