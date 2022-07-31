import { useQuery } from "@apollo/client";

import ProjectCard from "./ProjectCard";
import Spinner from "../Spinner";
import { GET_PROJECTS } from "../../queries";
import { Project } from "../../models";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something is wrong</p>;

  if (data.projects.lenth === 0) return <p>No projects</p>;
  return data.projects.map((project: Project) => (
    <ProjectCard key={project.id} project={project} />
  ));
}
