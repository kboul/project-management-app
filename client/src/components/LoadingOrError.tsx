import { ApolloError } from "@apollo/client";
import { Alert } from "@mui/material";

import Spinner from "./Spinner";

interface LoadingOrErrorProps {
  error: ApolloError | undefined;
  loading: boolean;
}

export default function LoadingOrError({
  error,
  loading
}: LoadingOrErrorProps) {
  if (loading) return <Spinner />;
  if (error) return <Alert severity="error">Something is wrong</Alert>;

  return null;
}
