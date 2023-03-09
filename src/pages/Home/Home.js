import { ListItem, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { height } from "@mui/system";
import { Box } from "@mui/system";
import { extendSxProp } from "@mui/system";
import React from "react";
import { Navigate } from "react-router-dom";
import store from "../../store";

class Home extends React.Component {
  render() {
    if (store.getState().loginUser.userId) {
      // 있으면 리다이렉트
      return <Navigate to="/Raid" />;
    }
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "30px",
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <h1 style={{ display: "flex", justifyContent: "center" }}>asd</h1>
          <ListItem sx={{ justifyContent: "center" }}>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              sx={{ width: "200px" }}
            />
          </ListItem>
          <h1>asd</h1>
        </Box>
      </Container>
    );
  }
}
export default Home;
