import React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  ListItem,
  Box,
  Typography,
  ListItemText,
  Divider,
  DialogActions,
} from "@mui/material";
import store from "../../store";
export default function BtnSignUp(props) {
  console.log(props);
  const testCharacter = [
    {
      userId: 1,
      characterId: 1,
      characterName: "character1",
      characterLevel: 1472.25,
      classCode: "Reaper",
      className: "리퍼",
    },
    {
      userId: 1,
      characterId: 2,
      characterName: "character2",
      characterLevel: 1472.25,
      classCode: "Reaper2",
      className: "리퍼2",
    },
  ];
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
    characters: testCharacter, // 테스트 캐릭터셋. 추후 axios 조회로 변경
    raidId: props.raidId,
  };
  const userInfo = store.getState().testUser;
  function btnClick(obj, e) {
    setOpen(true);
  }
  console.log(userInfo);
  return (
    <>
      <Button size="small" onClick={btnClick}>
        {param.btnTitle}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle> {userInfo.userName}님</DialogTitle>
        <DialogContent>
          <DialogContentText>캐릭터를 선택하세요.</DialogContentText>

          {param.characters.map((item, index) => {
            return (
              <ListItem
                key={item.characterName}
                disableGutters
                secondaryAction={
                  <Button
                    size="small"
                    onClick={() => {
                      alert(item.characterName);
                    }}
                  >
                    신청
                  </Button>
                }
              >
                <Box>
                  <ListItemText primary={item.characterName}></ListItemText>
                </Box>
              </ListItem>
            );
          })}

          <Divider />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
