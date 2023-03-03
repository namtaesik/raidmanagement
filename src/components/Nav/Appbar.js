import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { store } from "../../store/index";
import Drawer from "./Drawer";
export default function ButtonAppBar() {
  var menuState = store.getState().navMenu;
  //  const [Opener, setOpener] = useState(false);
  const [Title, setTitle] = useState("");

  const location = useLocation();
  useEffect(() => {
    setTitle(menuState.menu.find((c) => c.path === location.pathname).name);
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark={true}>
        <Toolbar>
          <Drawer />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* 230117 | 작업필요 | Redux를 이용하여 띄우는 페이지의 제목을 띄워주기. 
            아니면 Drawer를 여기에 편입시키면 좀 편할거같은데.*/}
            {Title}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {store.getState().testUser.userName}
          </Typography>{" "}
          <Button color="inherit" type="hidden">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
