/* eslint-disable no-shadow */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  TableRow,
  TableCell,
  Button
} from "@mui/material";
import { FaTrash } from "react-icons/fa";

import { DELETE_CLIENT } from "../../mutations/client";
import { Client } from "../../models";
import { GET_CLIENTS } from "../../queries";
import AppDialog from "../AppDialog";
import TransitionBottomCenter from "../TransitionBottomCenter";

interface ClientRowProps {
  client: Client;
}

export default function ClientRow({ client }: ClientRowProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }], // refetches all data after deletion
    update(cache, { data: { deleteClient } }) {
      const cachedClients: { clients: Client[] } | null = cache.readQuery({
        query: GET_CLIENTS
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: cachedClients?.clients.filter(
            ({ id }) => id !== deleteClient.id
          )
        }
      });
    }
  });

  const handleOk = () => deleteClient();
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <>
      <TableRow key={client.id}>
        <TableCell>{client.name}</TableCell>
        <TableCell>{client.email}</TableCell>
        <TableCell>{client.phone}</TableCell>
        <TableCell>
          <IconButton onClick={handleDialogOpen}>
            <FaTrash color="black" size="0.5em" />
          </IconButton>
        </TableCell>
      </TableRow>
      <AppDialog
        keepMounted
        onClose={handleDialogClose}
        open={dialogOpen}
        title=""
        TransitionComponent={TransitionBottomCenter}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this client?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>Ok</Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </AppDialog>
    </>
  );
}
