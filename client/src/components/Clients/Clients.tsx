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
import Spinner from "../Spinner";
import { Client } from "../../.d";
import { GET_CLIENTS } from "../../queries";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something is wrong</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.clients.map((client: Client) => (
            <ClientRow client={client} key={client.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
