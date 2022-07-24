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
import { FaTrash } from "react-icons/fa";

import Spinner from "./Spinner";
import { GET_CLIENTS } from "../queries";

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
}

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
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                <FaTrash />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
