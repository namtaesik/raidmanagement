import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Button, ListItemIcon, TextField } from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import { Box, fontSize } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
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
        userSelect: "none",
      }}
    >
      {" "}
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
          userSelect: "none",
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
        // secondaryTypographyProps={{
        //   //"none",
        //   backgroundColor:
        //     supportClass.findIndex((el) => {
        //       return el === props.classCode;
        //     }) < 0
        //       ? "none"
        //       : "#00D8FF",
        //   borderRadius: "5px",
        //   marginRight: "10px",
        //   // paddingLeft: "3px",
        // }}
        sx={{ userSelect: "none", maxWidth: "200px" }}
        // 클릭시 대표캐릭터 표시
        onClick={() => {
          console.log("눌럿다");
          apiAxiosPromise("GET", "/api/user", { userId: props.userId })
            .then((res) => {
              //console.log(res[0]);
              const msg =
                props.characterName +
                "님의 대표 캐릭터는\n" +
                res[0].mainCharacterName +
                "(Lv." +
                res[0].mainCharacterLevel +
                ")" +
                " 입니다.";
              alert(msg);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      />
      <ListItemText primary={props.remark} sx={{ userSelect: "none" }} />
      {supportClass.findIndex((el) => {
        return el === props.classCode;
      }) >= 0 ? (
        <img
          src={process.env.PUBLIC_URL + "images/supporter.png"}
          style={{
            width: "24px",
            height: "24px",
            objectFit: "cover",
            userSelect: "none",
            // position: "absolute",
            // top: "0px",
            // left: "13px",
          }}
          alt="Logo"
        />
      ) : (
        ""
      )}
      {store.getState().loginUser.userId == props.userId ? (
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
