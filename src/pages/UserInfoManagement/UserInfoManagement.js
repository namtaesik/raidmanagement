import React from "react";
import {
  Button,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import store from "../../store";
import { encryptAES256 } from "../../utils/crypto";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import { SET_CHARACTER, SET_USER } from "../../constants/action-types";
import { useCallback, useRef, useState } from "react";
import ProfileImage from "../../components/UserInfo/ProfileImage";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router";
export default function UserInfoManagement() {
  const loginUserId = store.getState().loginUser.userId;
  const currentImage = store.getState().loginUser.image;
  const [pfImage, setPfImage] = useState("");
  const pfImageSize = "124px";
  const navigator = useNavigate();
  React.useEffect(() => {
    if (!store.getState().loginUser.userId) {
      // 없으면 리다이렉트
      console.log("navigate to '/'");
      navigator("/");
    }
  }, []);
  // 비밀번호 변경 저장
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
    console.log(userModel);
    apiAxiosPromise("POST", "/api/login", userModel).then(async (res) => {
      if (res.length > 0 && res[0].userId != undefined) {
        // 변경 비밀번호 같은지 검증
        if (encryptNewPw != encryptNewPwCheck) {
          alert(
            "입력하신 새 비밀번호 2개의 값이 서로 다릅니다. 다시 확인하세요."
          );
        } else {
          // 같으면 비밀번호 변경 진행

          let editUserModel = {
            userId: loginUserId,
            password: encryptNewPw,
          };
          apiAxiosPromise("POST", "/api/user/update", editUserModel)
            .then(async (res) => {
              if (res[0].cnt == 1) {
                alert("비밀번호가 변경되었습니다.\r\n다시 로그인해주세요!");
                store.dispatch({
                  type: SET_CHARACTER,
                  payload: [{}],
                });
                store.dispatch({
                  type: SET_USER,
                  payload: [{}],
                });
                //setIsLogin(false);
                window.location.reload();
              } else if (res[0].cnt == 0) {
                alert(
                  "비밀번호가 정상적으로 변경되지 않았습니다. 관리자에게 문의해주세요."
                );
              } else {
                alert(
                  "다른사람 비밀번호까지 바뀐거같아요 태신 호출좀해주세요 제발요"
                );
              }
            })
            .catch((err) => {
              alert("비밀번호를 변경하는 동안 오류가 발생했습니다." + err);
            });
        }
        // 페이지 이동
      } else {
        alert(res[0].message);
      }
    });
  };
  // 이미지 저장부분 시작
  const inputRef = useRef(null);

  const onUploadImage = useCallback((e) => {
    if (!e.target.files) {
      return;
    }
    if (e.target.files.length > 0) {
      // 사이즈제한
      if (e.target.files[0].size > 440000) {
        alert("약 427kb 크기의 파일까지만 저장할 수 있습니다.");
        return;
      }
      if (e.target.files[0].name != undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        new Promise((resolve) => {
          reader.onload = () => {
            setPfImage(reader.result || null); // 파일의 컨텐츠
            resolve();
          };
        });
      }
    }
  }, []);

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  // 이미지 서버에 저장(blob string)
  const onProfileImageSave = () => {
    //console.log("pfImage", pfImage);
    alert(
      "현재 서버의 용량이 적어 프로필 사진은 '태신'이 직접 등록해드리고 있습니다.\r\n오픈톡에서 '태신'을 호출해주세요."
    );
    // 23.09.19 | 주석 | 프로필 이미지는 프론트쪽에 직접 넣어주는것으로 유지.
    // 사유 : nodejs서버 용량 400mb로 너무 적음.
    //if (pfImage != undefined) {
    //     let editUserImageModel = {
    //         userId :loginUserId,
    //         image : pfImage
    //     }
    //   console.log("잇다");
    //   apiAxiosPromise("POST", "/api/user/update-image", editUserImageModel)
    //     .then(async (res) => {
    //       if (res[0].cnt == 1) {
    //         alert("프로필 이미지가 변경되었습니다.");

    //         window.location.reload();
    //       }
    //       else if (res[0].cnt == 0) {
    //         alert("프로필 이미지가 정상적으로 변경되지 않았습니다. 관리자에게 문의해주세요.");
    //       } else {
    //         alert("다른사람 프로필 이미지까지 바뀐거같아요 태신 호출좀해주세요 제발요");
    //       }
    //     })
    //     .catch((err) => {
    //       alert("프로필 이미지를 변경하는 동안 오류가 발생했습니다." + err);
    //     });
    //}
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        maxWidth: "800px",
        justifyContent: "center",
        marginBottom: "100px",
        paddingLeft: "2px",
        paddingRight: "2px",
      }}
    >
      <List>
        <ListItem>
          <Typography variant="subtitle" color="text.secondary">
            프로필 이미지 등록
          </Typography>
        </ListItem>
        <ListItem sx={{ justifyContent: "center" }}>
          {(pfImage != undefined && pfImage != "") || currentImage ? (
            // 이미지 선택 했을경우
            pfImage != undefined && pfImage != "" ? (
              <img
                src={pfImage}
                style={{
                  width: pfImageSize,
                  height: pfImageSize,
                  objectFit: "cover",
                  userSelect: "none",
                  borderRadius: "50%",
                }}
                alt="썸네일"
              />
            ) : (
              // 기본적으로 유저 이미지 보여줌.
              <ProfileImage imageName={currentImage} size={pfImageSize} />
            )
          ) : (
            //미등록일 경우 기본 아이콘. 사이즈 작아도 어쩔수없음.
            <AccountCircle fontSize="large" />
          )}
        </ListItem>
        <ListItem>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onUploadImage}
            style={{ display: "none" }}
          />
          <Button onClick={onUploadImageButtonClick} variant="contained">
            이미지 선택
          </Button>
          <Button
            sx={{ marginLeft: "auto" }}
            onClick={onProfileImageSave}
            variant="contained"
          >
            저장
          </Button>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Typography variant="subtitle" color="text.secondary">
            비밀번호 변경
          </Typography>
        </ListItem>
        <ListItem key="idText">
          <TextField
            disabled
            id="title"
            label="아이디"
            variant="outlined"
            sx={{ width: "100%" }}
            value={store.getState().loginUser.userId}
          />
        </ListItem>
        <ListItem key="pwText">
          <TextField
            id="pw"
            label="현재 비밀번호"
            variant="outlined"
            sx={{ width: "100%" }}
            type="password"
          />
        </ListItem>
        <ListItem key="newPwText">
          <TextField
            id="newPw"
            label="새 비밀번호"
            variant="outlined"
            sx={{ width: "100%" }}
            type="password"
          />
        </ListItem>
        <ListItem key="newPwCheckText">
          <TextField
            id="newPwCheck"
            label="새 비밀번호 확인"
            variant="outlined"
            sx={{ width: "100%" }}
            type="password"
          />
        </ListItem>
        <ListItem key="btnSave">
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            비밀번호 변경
          </Button>
        </ListItem>
      </List>
      <Divider />
    </Container>
  );
}
