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
import { encryptAES256 } from "../../utils/crypto";
export default function LoginPopup(props) {
  const navigator = useNavigate();
  var userModel = {
    userId: "",
    password: "",
  };
  async function handleSignin() {
    if (userModel.userId == "") {
      alert("아이디를 입력하세요.");
      return false;
    }
    if (userModel.password == "") {
      alert("비밀번호를 입력하세요.");
      return false;
    }
    apiAxiosPromise("POST", "/api/user", userModel)
      .then((res) => {
        if (res[0].code > 0) {
          alert(res[0].codeName);
          window.location.reload();
        } else {
          alert(res[0].codeName);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("오류가 발생했습니다.");
      });
  }
  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth={false}>
        <DialogTitle>회원가입</DialogTitle>

        <DialogContent>
          <ListItem>
            <TextField
              required
              id="outlined-required"
              label="아이디"
              onChange={(evt) => {
                userModel.userId = evt.target.value;
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
                userModel.password = encryptAES256(evt.target.value);
              }}
              sx={{ width: "200px" }}
            />
          </ListItem>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignin} variant="contained">
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
