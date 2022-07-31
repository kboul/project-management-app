import { AppBar, Container, Toolbar, Typography } from "@mui/material";

import logo from "./logo.png";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logo}
            width="40"
            height="40"
            alt="logo"
            style={{ marginRight: 10 }}
          />
          <Typography variant="h6" noWrap component="a">
            Project Management App
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
