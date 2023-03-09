import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import store from "../../store";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
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
import { useNavigate } from "react-router-dom";
import { SET_USER, SET_CHARACTER } from "../../constants/action-types";
export default function LoginPopup(props) {
  const navigator = useNavigate();
  var loginModel = {
    userId: "",
    pw: "",
  };
  async function handleLogin() {
    var result = await apiAxiosPromise("POST", "/api/login", loginModel);
    if (result.length > 0) {
      // 캐릭터 정보 가져오기
      var characterList = await apiAxiosPromise(
        "GET",
        "/api/character",
        loginModel
      );
      if (characterList.length > 0) {
        //console.log(characterList);
        store.dispatch({ type: SET_CHARACTER, payload: characterList });
      }
      alert("로그인성공");
      store.dispatch({ type: SET_USER, payload: result });
      navigator("/Raid");
      // 페이지 이동
    } else {
      alert("로그인실패");
    }
    props.handleClose();
  }
  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth={true}>
        <DialogTitle> 로그인하기</DialogTitle>
        <DialogContent>
          <DialogContentText>ID를 입력하세요.</DialogContentText>
          <ListItem>
            <input
              onChange={(evt) => {
                loginModel.userId = evt.target.value;
                console.log("loginModel", loginModel);
              }}
            ></input>
          </ListItem>

          <Divider />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin}>확인</Button>
          <Button onClick={props.handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
