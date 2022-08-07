import { useQuery } from "@apollo/client";

import LoadingOrError from "./LoadingOrError";
import ProjectCard from "./ProjectCard";
import { GET_PROJECTS } from "../queries";
import { Project } from "../models";

export default function Projects() {
  const { data, error, loading } = useQuery(GET_PROJECTS);

  if (!data) return <LoadingOrError error={error} loading={loading} />;

  if (data?.projects.lenth === 0) return <p>No projects</p>;

  return data?.projects.map((project: Project) => (
    <ProjectCard key={project.id} project={project} />
  ));
}
