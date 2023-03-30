import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Button, TextField } from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import { Box, fontSize } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
export default function CharacterInfo(props) {
  var ItemTextSecondary = props.className + " (" + props.characterLevel + ")";
  const supportClass = ["HolyNight", "Artist", "Bard"];
  function quitRaid() {
    if (window.confirm("삭제하시겠습니까?")) {
      apiAxiosPromise("POST", "/api/raid-calendar/quit", {
        attackId: props.attackId,
        userId: props.userId,
      })
        .then((res) => {
          alert("삭제되었습니다.");
          props.onClickHandler();
        })
        .catch((err) => {
          alert("오류발생 : ", err);
        });
    } else {
      return false;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderBottom: 1,
        borderColor: "grey",
        paddingBottom: 1,
        height: "65px",
      }}
    >
      {/* <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar> */}
      <Box
        component="span"
        sx={{
          border: "1px solid #1565c0",
          marginRight: "5px",
          padding: "0px 10px 0px 10px",
          borderRadius: "5px",
        }}
      >
        {/* "#1565c0" */}
        <ListItemText
          sx={{ color: "#1565c0", userSelect: "none", width: "10px" }}
          primary={props.proficiency}
          primaryTypographyProps={{ fontSize: "12px", fontWeight: "bold" }}
        ></ListItemText>
      </Box>
      {props.image != undefined && props.image != "" && (
        <img
          src={process.env.PUBLIC_URL + "images/loginUserImages/" + props.image}
          style={{
            width: "32px",
            height: "32px",
            objectFit: "cover",
            userSelect: "none",
          }}
          alt="Logo"
        />
      )}
      <ListItemText
        primary={props.characterName}
        secondary={ItemTextSecondary}
        secondaryTypographyProps={{
          //"none",
          backgroundColor:
            supportClass.findIndex((el) => {
              return el === props.classCode;
            }) < 0
              ? "none"
              : "#00D8FF",
          borderRadius: "5px",
          marginRight: "10px",
          // paddingLeft: "3px",
        }}
        sx={{ userSelect: "none", maxWidth: "200px" }}
      />

      <ListItemText primary={props.remark} sx={{ userSelect: "none" }} />
      {store.getState().loginUser.userId == props.userId ? (
        // <Button
        //   size="small"
        //   variant="contained"
        //   sx={{
        //     height: "30px",
        //     width: "60px",
        //   }}
        //   onClick={() => {
        //     quitRaid();
        //   }}
        // >
        //   삭제
        // </Button>
        <DeleteForeverIcon
          size="small"
          variant="contained"
          onClick={() => {
            quitRaid();
          }}
          color="error"
        ></DeleteForeverIcon>
      ) : (
        ""
      )}
    </Box>
  );
}
