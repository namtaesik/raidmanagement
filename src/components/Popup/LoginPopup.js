import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import store from "../../store";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ListItem,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SET_USER, SET_CHARACTER } from "../../constants/action-types";
import { encryptAES256 } from "../../utils/crypto";
export default function LoginPopup(props) {
  const navigator = useNavigate();
  var loginModel = {
    userId: "",
    password: "",
  };
  async function handleLogin() {
    var result = await apiAxiosPromise("POST", "/api/login", loginModel)
      .then(async (res) => {
        if (res.length > 0 && res[0].userId != undefined) {
          // 캐릭터 정보 가져오기
          await apiAxiosPromise("GET", "/api/character", res[0]).then(
            (characterList) => {
              if (characterList.length > 0) {
                store.dispatch({ type: SET_CHARACTER, payload: characterList });
              }
              store.dispatch({ type: SET_USER, payload: res });
              alert("로그인성공");
              navigator("/Raid");
              props.handleClose();
            }
          );
          // 페이지 이동
        } else {
          alert(res[0].message);
        }
      })
      .catch((err) => {
        alert("에러가 발생했습니다.");
      });
  }
  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth={false}>
        <DialogTitle> 로그인</DialogTitle>

        <DialogContent>
          <ListItem>
            <TextField
              required
              id="outlined-required"
              label="아이디"
              onChange={(evt) => {
                loginModel.userId = evt.target.value;
              }}
              sx={{ width: "200px" }}
            />
          </ListItem>
          <ListItem>
            <TextField
              required
              id="outlined-required"
              label="암호"
              type="password"
              onChange={(evt) => {
                loginModel.password = encryptAES256(evt.target.value);
              }}
              sx={{ width: "200px" }}
            />
          </ListItem>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} variant="contained">
            확인
          </Button>
          <Button onClick={props.handleClose} variant="outlined">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
