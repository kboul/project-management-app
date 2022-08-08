import { useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import { LoadingOrError, ProjectCard } from "../components";
import { GET_PROJECT } from "../queries";

export default function Project() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_PROJECT, { variables: { id } });

  if (!data) return <LoadingOrError error={error} loading={loading} />;

  if (!loading && !error && data)
    return (
      <Container sx={{ mt: 4 }} maxWidth="md">
        <ProjectCard mode="single" project={data.project} />
      </Container>
    );

  return null;
}
