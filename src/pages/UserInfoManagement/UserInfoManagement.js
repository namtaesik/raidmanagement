import { Button, Divider, List, ListItem, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import store from "../../store";
import { encryptAES256 } from "../../utils/crypto";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import { SET_CHARACTER, SET_USER } from "../../constants/action-types";
import { useNavigate } from "react-router-dom";
export default function UserInfoManagement() {
  const loginUserId = store.getState().loginUser.userId;
  const navigator = useNavigate();
  const handleSaveClick = () => {
    var nowPw = document.getElementById("pw").value;
    let encryptNowPw = encryptAES256(nowPw);
    var newPw = document.getElementById("newPw").value;
    let encryptNewPw = encryptAES256(newPw);
    var newPwCheck = document.getElementById("newPwCheck").value;
    let encryptNewPwCheck = encryptAES256(newPwCheck);
    // 현재 비밀번호 확인
    let userModel = {
      userId: loginUserId,
      password: encryptNowPw,
    };
    apiAxiosPromise("POST", "/api/login", userModel).then(async (res) => {
      if (res.length > 0 && res[0].userId != undefined) {
        // 변경 비밀번호 같은지 검증
        if (encryptNewPw != encryptNewPwCheck) {
          alert("입력하신 새 비밀번호 2개의 값이 서로 다릅니다. 다시 확인하세요.");
        } else {
          // 같으면 비밀번호 변경 진행
          let editUserModel ={
            userId: loginUserId,
            password: encryptNewPw,
                }
          apiAxiosPromise("POST", "http://localhost:3001/user/update", editUserModel).then(async (res) => {
                if(res[0].cnt ==1){
                    alert('비밀번호가 변경되었습니다.\r\n다시 로그인해주세요!');
                    store.dispatch({
                        type: SET_CHARACTER,
                        payload: [{}],
                      });
                      store.dispatch({
                        type: SET_USER,
                        payload: [{}],
                      });
                      //setIsLogin(false);
                      navigator("/");
                      
                }
                else if(res[0].cnt ==0){
                    alert('비밀번호가 정상적으로 변경되지 않았습니다. 관리자에게 문의해주세요.');
                }
                else{
                    alert('다른사람 비밀번호까지 바뀐거같아요 태신 호출좀해주세요 제발요');
                }
          }).catch((err)=>{
            alert('비밀번호를 변경하는 동안 오류가 발생했습니다.' + err)
          });
        }
        // 페이지 이동
      } else {
        alert(res[0].message);
      }
    });
  };
  return (
    <Container maxWidth="sm" sx={{ maxWidth: "800px", justifyContent: "center", marginBottom: "100px", paddingLeft: "2px", paddingRight: "2px" }}>
      <List>
        <ListItem>
          <Typography variant="subtitle" color="text.secondary">
            비밀번호 변경
          </Typography>
        </ListItem>
        <ListItem key="idText">
          <TextField disabled id="title" label="아이디" variant="outlined" sx={{ width: "100%" }} value={store.getState().loginUser.userId} />
        </ListItem>
        <ListItem key="pwText">
          <TextField id="pw" label="현재 비밀번호" variant="outlined" sx={{ width: "100%" }} type="password" />
        </ListItem>
        <ListItem key="newPwText">
          <TextField id="newPw" label="새 비밀번호" variant="outlined" sx={{ width: "100%" }} type="password" />
        </ListItem>
        <ListItem key="newPwCheckText">
          <TextField id="newPwCheck" label="새 비밀번호 확인" variant="outlined" sx={{ width: "100%" }} type="password" />
        </ListItem>
        <ListItem key="btnSave">
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            저장
          </Button>
        </ListItem>
      </List>
      <Divider />
    </Container>
  );
}
