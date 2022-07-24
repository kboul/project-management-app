import { useMutation } from "@apollo/client";
import { TableRow, TableCell } from "@mui/material";
import { FaTrash } from "react-icons/fa";

import { DELETE_CLIENT } from "../../mutations/client";
import { Client } from "../../.d";
import { GET_CLIENTS } from "../../queries";

interface ClientRowProps {
  client: Client;
}

export default function ClientRow({ client }: ClientRowProps) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }], // refetches all data after deletion
    update(cache, { data: { deleteClient } }) {
      const cacheClients: { clients: Client[] } | null = cache.readQuery({
        query: GET_CLIENTS
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: cacheClients?.clients.filter(
            (client: Client) => client.id !== deleteClient.id
          )
        }
      });
    }
  });

  const handleClick = () => deleteClient();

  return (
    <TableRow key={client.id}>
      <TableCell>{client.name}</TableCell>
      <TableCell>{client.email}</TableCell>
      <TableCell>{client.phone}</TableCell>
      <TableCell>
        <FaTrash onClick={handleClick} style={{ cursor: "pointer" }} />
      </TableCell>
    </TableRow>
  );
}
