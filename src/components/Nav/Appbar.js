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
import { SET_USER, SET_CHARACTER } from "../../constants/action-types";
import LoginPopup from "../Popup/LoginPopup";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../UserInfo/ProfileImage";
export default function ButtonAppBar() {
  const navigator = useNavigate();
  var menuState = store.getState().navMenu;
  //  const [Opener, setOpener] = useState(false);
  const [Title, setTitle] = useState("");
  const [IsLogin, setIsLogin] = useState(false);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  useEffect(() => {
    console.log("rendered");
    setTitle(menuState.menu.find((c) => c.path === location.pathname).name);
    if (store.getState().loginUser.userId ?? "" != "") setIsLogin(true);
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark={true}>
        <Toolbar sx={{ paddingRight: "5px", userSelect: "none" }}>
          <Drawer />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, userSelect: "none" }}
          >
            {/* 230117 | 작업필요 | Redux를 이용하여 띄우는 페이지의 제목을 띄워주기. 
            아니면 Drawer를 여기에 편입시키면 좀 편할거같은데.*/}
            {Title}
          </Typography>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {store.getState().loginUser.userName}
          </Typography>

          <Button
            color="inherit"
            type="hidden"
            onClick={() => {
              if (IsLogin) {
                if (window.confirm("로그아웃 하시겠습니까?")) {
                  alert("로그아웃 되었습니다.");
                  store.dispatch({
                    type: SET_CHARACTER,
                    payload: [{}],
                  });
                  store.dispatch({
                    type: SET_USER,
                    payload: [{}],
                  });
                  setIsLogin(false);
                  navigator("/");
                }
              } else {
                setOpen(true);
              }
              //funcLogin("1", "2");
            }}
          >
            {IsLogin ? "LogOut" : "Login"}
          </Button>
          {IsLogin &&
          store.getState().loginUser.image != undefined &&
          store.getState().loginUser.image != "" ? (
            <ProfileImage
              imageName={store.getState().loginUser.image}
              size="48px"
            />
          ) : (
            // <img
            //   src={
            //     process.env.PUBLIC_URL +
            //     "images/loginUserImages/" +
            //     store.getState().loginUser.image
            //   }
            //   style={{
            //     height: "48px",
            //     width: "48px",
            //     userSelect: "none",
            //     paddingRight: "0px",
            //     objectFit: "cover",
            //   }}
            // />
            ""
          )}
          <LoginPopup
            open={open}
            handleClose={() => {
              setOpen(false);
              var loginUserInfo = store.getState().loginUser;
              if (loginUserInfo && loginUserInfo.userId > 0) {
                setIsLogin(true);
              } else {
                setIsLogin(false);
              }
            }}
          ></LoginPopup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
