import { useQuery } from "@apollo/client";
import {
  Paper,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import ClientRow from "./ClientRow";
import LoadingOrError from "../LoadingOrError";
import { Client } from "../../models";
import { GET_CLIENTS } from "../../queries";

export default function ClientsTable() {
  const { data, error, loading } = useQuery(GET_CLIENTS);

  if (!data) return <LoadingOrError error={error} loading={loading} />;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.clients.map((client: Client) => (
            <ClientRow client={client} key={client.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
