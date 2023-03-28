import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import { SET_USER, SET_CHARACTER } from "../../constants/action-types";
import { Container } from "@mui/system";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import store from "../../store";
import { encryptAES256 } from "../../utils/crypto";
import SigninPopup from "../../components/Popup/SigninPopup";
export default function Home() {
  // 회원가입 팝업 표시
  const [openSignin, setOpenSignin] = useState(false);
  if (store.getState().loginUser.userId) {
    // 있으면 리다이렉트
    return <Navigate to="/Raid" />;
  }

  var userModel = { userId: "", password: "" };
  // 암호임력 후 엔터 입력시
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // Enter 키 입력 감지
      Login();
    }
  };
  async function Login() {
    await apiAxiosPromise("POST", "/api/login", userModel)
      .then(async (res) => {
        if (res.length > 0 && res[0].userId != undefined) {
          // 캐릭터 정보 가져오기
          await apiAxiosPromise("GET", "/api/character", res[0]).then(
            (characterList) => {
              if (characterList.length > 0) {
                store.dispatch({
                  type: SET_CHARACTER,
                  payload: characterList,
                });
              }
              store.dispatch({ type: SET_USER, payload: res });
              alert("로그인성공");
              window.location.reload();
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
    <List
      sx={{
        bgcolor: "#cfe8fc",
        flexDirection: "column",
        justifyContent: "center",
        margin: "30px 20px 30px 20px",
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderColor: "#007fff",
        borderRadius: "10px",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <ListItem key="txtFirst">
        <Typography>로그인 정보를 입력하세요.</Typography>
      </ListItem>
      <ListItem key="txtSecond">
        <Typography>
          회원가입을 하시려면 우측 하단의 버튼을 눌러주세요.
        </Typography>
      </ListItem>
      <ListItem key="inputId" sx={{ justifyContent: "center" }}>
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
      <ListItem key="inputPw" sx={{ justifyContent: "center" }}>
        <TextField
          required
          id="outlined-required"
          label="암호"
          type="password"
          onChange={(evt) => {
            userModel.password = encryptAES256(evt.target.value);
          }}
          onKeyDown={handleKeyDown}
          sx={{ width: "200px" }}
        />
      </ListItem>
      <ListItem key="btnLogin" sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          size="medium"
          sx={{ width: "100px" }}
          onClick={() => {
            //AddNewUser();
            Login();
          }}
        >
          로그인
        </Button>
      </ListItem>
      <ListItem key="btnSignin" sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            width: "120px",
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 9999,
          }}
          onClick={() => {
            //AddNewUser();
            //Login();
            setOpenSignin(true);
          }}
        >
          회원가입
        </Button>
        <SigninPopup
          open={openSignin}
          handleClose={() => {
            setOpenSignin(false);
          }}
        ></SigninPopup>
      </ListItem>
    </List>
  );
}
