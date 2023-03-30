import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Button, ButtonGroup } from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import { Box } from "@mui/system";
import EditCharacterPopup from "../../Popup/CharacterManagement/EditCharacterPopup";
import { SET_USER } from "../../../constants/action-types";
export default function CharacterInfo(props) {
  // 캐릭터 수정 팝업
  const [editOpen, setEditOpen] = React.useState(false);
  var ItemTextSecondary =
    props.info.className + " (" + props.info.characterLevel + ")";

  function delCharacter() {
    if (window.confirm("삭제하시겠습니까?")) {
      apiAxiosPromise("POST", "/api/character/delete", {
        userId: props.info.userId,
        characterId: props.info.characterId,
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
  function setMainCharacter() {
    if (window.confirm("대표캐릭터로 등록하시겠습니까?")) {
      apiAxiosPromise("POST", "/api/character/set-main-character", {
        userId: props.info.userId,
        characterId: props.info.characterId,
      })
        .then((res) => {
          alert("지정되었습니다.");
          // 유저 다시조회
          apiAxiosPromise("GET", "/api/user", {
            userId: props.info.userId,
          })
            .then((res) => {
              console.log(res);
              store.dispatch({ type: SET_USER, payload: res });
            })
            .catch((err) => {
              alert("오류발생 : ", err);
            });
          props.onClickHandler();
        })
        .catch((err) => {
          alert("오류발생 : ", err);
        });
    } else {
      return false;
    }
  }
  if (props.info.characterId != undefined) {
    return (
      <Box
        key={props.info.characterId}
        divider="1px"
        sx={{
          background:
            props.info.characterId == store.getState().loginUser.mainCharacterId
              ? "#CAE3FF"
              : "#f0f7ff",
          borderColor: "#007fff",
          borderRadius: "10px",
          borderWidth: "1px",
          borderStyle: "solid",
          color: "black",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar> */}
        {props.info.characterId ==
        store.getState().loginUser.mainCharacterId ? (
          <img
            src={process.env.PUBLIC_URL + "images/crown.png"}
            style={{
              width: "18px",
              height: "18px",
              objectFit: "cover",
              userSelect: "none",
              position: "absolute",
            }}
            alt="Logo"
          />
        ) : (
          ""
        )}
        <ListItemText
          primary={props.info.characterName}
          secondary={ItemTextSecondary}
          sx={{ paddingLeft: "10px", userSelect: "none" }}
        />
        <ButtonGroup>
          {store.getState().loginUser.userId == props.info.userId ? (
            <Button
              size="small"
              onClick={() => {
                setMainCharacter();
              }}
              sx={{ width: "50px" }}
            >
              본캐<br></br>지정
            </Button>
          ) : (
            ""
          )}
          {store.getState().loginUser.userId == props.info.userId ? (
            <Button
              size="small"
              onClick={() => {
                setEditOpen(true);
              }}
            >
              수정
            </Button>
          ) : (
            ""
          )}{" "}
          {store.getState().loginUser.userId == props.info.userId ? (
            <Button
              size="small"
              onClick={() => {
                delCharacter();
              }}
            >
              삭제
            </Button>
          ) : (
            ""
          )}
        </ButtonGroup>
        <EditCharacterPopup
          open={editOpen}
          handleClose={() => {
            setEditOpen(false);
          }}
          characterInfo={props.info}
        ></EditCharacterPopup>
      </Box>
    );
  }
}
