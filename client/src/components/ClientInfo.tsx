import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import { Fragment, useId } from "react";
import { FaEnvelope, FaIdBadge, FaPhone } from "react-icons/fa";

import { Client } from "../models";

interface ClientInfoProps {
  client: Client | undefined;
}

export default function ClientInfo({ client }: ClientInfoProps) {
  const key = useId();

  const listItems = [
    { id: `${key}-1`, text: client?.name, Icon: FaIdBadge },
    { id: `${key}-2`, text: client?.email, Icon: FaEnvelope },
    { id: `${key}-3`, text: client?.phone, Icon: FaPhone }
  ];

  return (
    <>
      <Typography sx={{ mt: 4 }} variant="h6" component="div">
        Client Information
      </Typography>
      <List dense>
        {listItems.map(({ id, text, Icon }) => (
          <Fragment key={id}>
            <ListItem>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </>
  );
}
