import { Button, ListItem, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { height } from "@mui/system";
import { Box } from "@mui/system";
import { extendSxProp } from "@mui/system";
import React from "react";
import { Navigate } from "react-router-dom";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import store from "../../store";

class Home extends React.Component {
  render() {
    if (store.getState().loginUser.userId) {
      // 있으면 리다이렉트
      return <Navigate to="/Raid" />;
    }
    function refresh() {
      return <Navigate to="/" />;
    }
    var userModel = { userId: "", password: "" };
    function AddNewUser() {
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
          console.log(res[0]);
          if (res[0].code > 0) {
            alert("완료되었습니다.");
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
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "30px",
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <Typography style={{ display: "flex", justifyContent: "center" }}>
            우측 상단의 LOGIN 버튼을 눌러 로그인하거나, 아래 정보를 입력 후
            회원가입하세요.
          </Typography>
          <ListItem sx={{ justifyContent: "center" }}>
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
          <ListItem sx={{ justifyContent: "center" }}>
            <TextField
              required
              id="outlined-required"
              label="암호"
              type="password"
              onChange={(evt) => {
                userModel.password = evt.target.value;
              }}
              sx={{ width: "200px" }}
            />
          </ListItem>
          <Button
            variant="contained"
            size="medium"
            sx={{ width: "100px" }}
            onClick={() => {
              AddNewUser();
            }}
          >
            회원가입
          </Button>
        </Box>
      </Container>
    );
  }
}
export default Home;
