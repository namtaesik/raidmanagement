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
import store from "../../store";
export default function CharacterInfo(props) {
  var ItemTextSecondary = props.className + " (" + props.characterLevel + ")";
  console.log(store.getState().loginUser);
  console.log(props.userId);
  return (
    <ListItem divider="1px">
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.characterName}
        secondary={ItemTextSecondary}
      />
      {store.getState().loginUser.userId == props.userId ? (
        <Button size="small" variant="contained">
          삭제하기
        </Button>
      ) : (
        ""
      )}
    </ListItem>
  );
}
