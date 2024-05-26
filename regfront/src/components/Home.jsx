import React from "react";
import { useNavigate } from "react-router";
import { Container, Typography, Button, Box } from "@mui/material";

const Home = () => {
  const navigateTo = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" marginTop={5}>
        <Typography variant="h4" gutterBottom>
          Project Tracker
        </Typography>
        <Typography variant="h6" gutterBottom>
          Login or register to continue
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigateTo("/login")}
          style={{ marginRight: "10px" }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigateTo("/register")}
        >
          Register
        </Button>

      </Box>
    </Container>
  );
}

export default Home;
