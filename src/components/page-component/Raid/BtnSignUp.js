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
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import { Stack } from "@mui/system";
export default function BtnSignUp(props) {
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
  // 토글버튼
  const [selected, setSelected] = React.useState("트라이");
  const handleSelected = (event, newSelected) => {
    if (newSelected !== null) {
      setSelected(newSelected);
    }
  };
  // 캐릭터선택
  const [selectedCharacter, setSelectedCharacter] = React.useState(-1);
  const characterList = store.getState().loginUserDetail;
  const [remark, setRemark] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  var addJoinRaidParams = {};

  const userInfo = store.getState().loginUser;
  function btnClick(obj, e) {
    setOpen(true);
  }
  return (
    <div key={userInfo.userId}>
      <Button variant="contained" size="small" onClick={btnClick}>
        {props.title}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth={false}>
        <DialogTitle sx={{ userSelect: "none" }}>
          {" "}
          {userInfo.userId}님
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ userSelect: "none" }}>
            캐릭터를 선택하세요.
          </DialogContentText>

          {characterList.map((item, index) => {
            if (item.characterId != undefined) {
              var ItemTextSecondary =
                item.className + " (" + item.characterLevel + ")";
              return (
                <ListItem
                  key={item.characterId}
                  disableGutters
                  secondaryAction={
                    <Button
                      variant={
                        item.characterId == selectedCharacter
                          ? "contained"
                          : "outlined"
                      }
                      size="small"
                      onClick={() => {
                        addJoinRaidParams = {
                          ...addJoinRaidParams,
                          userId: item.userId,
                          characterId: item.characterId,
                          attackId: props.attackId,
                          remark: remark,
                        };
                        setSelectedCharacter(item.characterId);
                        console.log(addJoinRaidParams);
                      }}
                    >
                      선택
                    </Button>
                  }
                >
                  <Box>
                    <ListItemText
                      primary={item.characterName}
                      secondary={ItemTextSecondary}
                      sx={{ userSelect: "none" }}
                    ></ListItemText>
                  </Box>
                </ListItem>
              );
            }
          })}
        </DialogContent>
        <DialogContent>
          <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
              value={selected}
              exclusive
              onChange={handleSelected}
              aria-label="text alignment"
              color="info"
            >
              <ToggleButton value="트라이">
                <Box>트라이</Box>
              </ToggleButton>
              <ToggleButton value="클경">
                <Box>클경</Box>
              </ToggleButton>
              <ToggleButton value="반숙">
                <Box>반숙</Box>
              </ToggleButton>
              <ToggleButton value="숙련">
                <Box>숙련</Box>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </DialogContent>
        <DialogContent>
          <Stack sx={{ marginTop: "10px" }}>
            <TextField
              required
              id="outlined-required"
              label="비고"
              inputProps={{ maxLength: 10 }}
              onChange={(evt) => {
                if (evt.target.value.length > 10) {
                  alert("10글자 까지만 입력 가능합니다.");
                  return false;
                }
                setRemark(evt.target.value);
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              if (selectedCharacter < 0) {
                alert("신청할 캐릭터를 선택해주세요.");
                return false;
              }
              addJoinRaidParams = {
                userId: userInfo.userId,
                characterId: selectedCharacter,
                attackId: props.attackId,
                remark: remark,
                proficiency: selected,
              };
              console.log(addJoinRaidParams);
              apiAxiosPromise(
                "POST",
                "/api/raid-calendar/join",
                addJoinRaidParams
              )
                .then((res) => {
                  alert(res[0].codeName);
                  setSelectedCharacter(-1);
                  setSelected("트라이");
                  setRemark("");
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
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
