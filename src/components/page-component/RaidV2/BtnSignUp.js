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
  Divider,
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

  if (characterList[0].characterId == undefined) {
    return (
      //"캐릭터가 없습니다. 캐릭터관리에서 캐릭터를 등록하세요."
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
              {"캐릭터가 없습니다."}
              <br />
              {"캐릭터관리에서 캐릭터를 등록하세요."}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return (
      <div key={userInfo.userId}>
        <Button variant="contained" size="small" onClick={btnClick}>
          {props.title}
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          sx={{ minWidth: "300px" }}
        >
          <DialogTitle sx={{ userSelect: "none" }}>
            {" "}
            {userInfo.userId}님
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ height: "30px", paddingBottom: "0px" }}>
            <DialogContentText sx={{ userSelect: "none" }}>
              {"캐릭터를 선택하세요."}
            </DialogContentText>
          </DialogContent>

          <DialogContent sx={{ height: "150px", paddingTop: "0px" }}>
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
                        }}
                      >
                        선택
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={item.characterName}
                      secondary={ItemTextSecondary}
                      sx={{ userSelect: "none", width: "220px" }}
                    ></ListItemText>
                  </ListItem>
                );
              }
            })}
          </DialogContent>
          <Divider />
          <DialogContent
            sx={{
              overflowX: "scroll",
              height: "50px",
              whiteSpace: "nowrap",
              padding: "15px 0px 15px 0px",
            }}
          >
            <Stack direction="row" spacing={4} justifyContent="center">
              <ToggleButtonGroup
                value={selected}
                exclusive
                onChange={handleSelected}
                color="info"
              >
                <ToggleButton value="트라이">트라이</ToggleButton>
                <ToggleButton value="클경">클경</ToggleButton>
                <ToggleButton value="반숙">반숙</ToggleButton>
                <ToggleButton value="숙련">숙련</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </DialogContent>
          <Divider />
          <DialogContent>
            <Stack sx={{ marginTop: "10px" }}>
              <TextField
                required
                id="outlined-required"
                label="비고"
                inputProps={{ maxLength: 15 }}
                onChange={(evt) => {
                  if (evt.target.value.length > 15) {
                    alert("15글자 까지만 입력 가능합니다.");
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
                apiAxiosPromise(
                  "POST",
                  "/api/raid-calendar-v2/join",
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
}
