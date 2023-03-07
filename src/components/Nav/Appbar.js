import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { store } from "../../store/index";
import Drawer from "./Drawer";
import axios from "axios";
import { SET_USER } from "../../constants/action-types";
export default function ButtonAppBar() {
  var menuState = store.getState().navMenu;
  //  const [Opener, setOpener] = useState(false);
  const [Title, setTitle] = useState("");
  const [IsLogin, setIsLogin] = useState(false);

  function funcLogin(id, pw) {
    if (!IsLogin) {
      axios
        .get("/api/user?userName=기상군당장", {
          headers: {
            //Authorization: "AIzaSyAp7b4zwx3v_22j0xuX3qrmkvB0mst9gfI",
            AccessControlAllowOrigin: false,
          },
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.length > 0) {
            store.dispatch({
              type: SET_USER,
              payload: result.data,
            });
            setIsLogin(true);
          }
        });
    } else {
      store.dispatch({
        type: SET_USER,
        payload: [{}],
      });
      setIsLogin(false);
    }
  }
  const party = [
    {
      RaidId: 1,
      AttackDate: "2023-03-03 13:30",
      RaidCode: "Cucu",
      RaidName: "타이틀",
    },
  ];

  function test() {
    console.log("로그인아이디 : ", store.getState().loginUser.userId);
  }
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
          <Button
            color="inherit"
            type="hidden"
            onClick={() => {
              test();
            }}
          >
            Test
          </Button>
          <Button
            color="inherit"
            type="hidden"
            onClick={() => {
              funcLogin("1", "2");
            }}
          >
            {IsLogin ? "LogOut" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
