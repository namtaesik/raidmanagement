import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { SET_CHARACTER } from "../../../constants/action-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  ListItem,
  Box,
  Typography,
  ListItemText,
  DialogActions,
} from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
export default function BtnSignUp(props) {
  // const testCharacter = [
  //   {
  //     userId: 1,
  //     characterId: 1,
  //     characterName: "character1",
  //     characterLevel: 1472.25,
  //     classCode: "Reaper",
  //     className: "리퍼",
  //   },
  //   {
  //     userId: 1,
  //     characterId: 2,
  //     characterName: "character2",
  //     characterLevel: 1472.25,
  //     classCode: "Reaper2",
  //     className: "리퍼2",
  //   },
  // ];
  // 최초 캐릭터 조회
  useEffect(() => {
    apiAxiosPromise("GET", "/api/character", store.getState().loginUser).then(
      (characterList) => {
        if (characterList.length > 0) {
          store.dispatch({ type: SET_CHARACTER, payload: characterList });
        }
      }
    );
  }, []);

  const characterList = store.getState().loginUserDetail;

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const param = {
    page: props.page,
    btnTitle: props.title,
    characters: characterList, // 테스트 캐릭터셋. 추후 axios 조회로 변경
    attackId: props.attackId,
  };
  const userInfo = store.getState().loginUser;
  function btnClick(obj, e) {
    setOpen(true);
  }
  return (
    <div key={userInfo.userId}>
      <Button variant="contained" size="small" onClick={btnClick}>
        {param.btnTitle}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth={false}>
        <DialogTitle> {userInfo.userId}님</DialogTitle>
        <DialogContent>
          <DialogContentText>캐릭터를 선택하세요.</DialogContentText>

          {param.characters.map((item, index) => {
            if (item.characterId != undefined) {
              var ItemTextSecondary =
                item.className + " (" + item.characterLevel + ")";
              return (
                <ListItem
                  key={item.characterId}
                  disableGutters
                  secondaryAction={
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        var result = apiAxiosPromise(
                          "POST",
                          "/api/raid-calendar/join",
                          { ...item, attackId: param.attackId }
                        )
                          .then((res) => {
                            alert(res[0].codeName);
                            props.onClickHandler();
                            setOpen(false);
                          })
                          .catch((err) => {
                            alert("오류발생 : ", err);
                          });
                      }}
                    >
                      신청
                    </Button>
                  }
                  sx={{ width: "270px" }}
                >
                  <Box>
                    <ListItemText
                      primary={item.characterName}
                      secondary={ItemTextSecondary}
                    ></ListItemText>
                  </Box>
                </ListItem>
              );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
