import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@mui/material";

import { Project } from "../../models";

interface ProjectProps {
  project: Project;
}

// View to="/projects/${projects.id}"
export default function ProjectCard({ project }: ProjectProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold", flex: 1 }}
              color="text.secondary"
              gutterBottom>
              {project.name}
            </Typography>

            <Box>View</Box>
          </Box>
          <Box>
            Status: <b>{project.status}</b>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
