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
import { Box } from "@mui/system";
export default function CharacterInfo(props) {
  var ItemTextSecondary = props.className + " (" + props.characterLevel + ")";

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
      }}
    >
      {/* <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar> */}
      <ListItemText
        primary={props.characterName}
        secondary={ItemTextSecondary}
        sx={{ userSelect: "none" }}
      />
      {store.getState().loginUser.userId == props.userId ? (
        <Button
          size="small"
          variant="contained"
          sx={{
            height: "30px",
            width: "60px",
          }}
          onClick={() => {
            quitRaid();
          }}
        >
          삭제
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
}
