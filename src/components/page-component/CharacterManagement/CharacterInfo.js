import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Button } from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
export default function CharacterInfo(props) {
  var ItemTextSecondary =
    props.info.className + " (" + props.info.characterLevel + ")";

  function quitRaid() {
    if (window.confirm("삭제하시겠습니까?")) {
      apiAxiosPromise("POST", "/api/character/delete", {
        userId: props.info.userId,
        characterId: props.info.characterId,
      })
        .then((res) => {
          alert("삭제되었습니다.");
        })
        .catch((err) => {
          alert("오류발생 : ", err);
        });
    } else {
      return false;
    }
  }
  return (
    <ListItem
      divider="1px"
      sx={{
        background: "#f0f7ff",
        borderColor: "#007fff",
        borderRadius: "10px",
        borderWidth: "1px",
        borderStyle: "solid",
        color: "black",
      }}
    >
      {/* <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar> */}
      <ListItemText
        primary={props.info.characterName}
        secondary={ItemTextSecondary}
      />
      {store.getState().loginUser.userId == props.info.userId ? (
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            quitRaid();
            props.info.onClickHandler();
          }}
        >
          삭제하기
        </Button>
      ) : (
        ""
      )}
    </ListItem>
  );
}
