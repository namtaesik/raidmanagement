import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { store } from "../../store/index";
import ProfileImage from "../UserInfo/ProfileImage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function TemporaryDrawer() {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  function PageMove(item, index, e) {
    pageList.selector = index;
    store.dispatch({
      type: "SET_SELECTOR",
      payload: pageList,
    });
    navigate(item.path);
  }
  // Drawer에 그려줄 리스트 목록을 Path와 Name으로 구분.
  const pageList = store.getState().navMenu;
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      {store.getState().loginUser.userId != undefined && (
        <ListItem key="useInfo">
          <ListItemIcon>
            {store.getState().loginUser.image != undefined &&
            store.getState().loginUser.image != "" ? (
              <ProfileImage
                imageName={store.getState().loginUser.image}
                size="48px"
              />
            ) : (
              <AccountCircleIcon sx={{ fontSize: "48px" }} />
            )}
          </ListItemIcon>
          <ListItemText>
            {store.getState().loginUser.userId}님 안녕하세요!
          </ListItemText>
        </ListItem>
      )}

      <Divider />
      <List>
        {pageList.menu.map(
          (item, index) =>
            item.useyn &&
            ((item.auth && store.getState().loginUser.userId) ||
              (item.loginHide && !store.getState().loginUser.userId)) && (
              <ListItem
                key={item.path}
                disablePadding
                onClick={(e) => {
                  PageMove(item, index, e);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon != undefined ? item.icon : <InboxIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
      <Divider />
      <List>
        {pageList.managementMenu.map(
          (item, index) =>
            item.useyn &&
            ((item.auth && store.getState().loginUser.userId) ||
              (item.loginHide && !store.getState().loginUser.userId)) && (
              <ListItem
                key={item.path}
                disablePadding
                onClick={(e) => {
                  PageMove(item, index, e);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon != undefined ? item.icon : <InboxIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon>{"left"}</MenuIcon>
        </IconButton>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
