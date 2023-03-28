import React, { useEffect } from "react";
import store from "../../../store";
import moment from "moment";
import { useState } from "react";
import {
  ListItem,
  Button,
  TextField,
  List,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
  SpeedDialIcon,
  Dialog,
  DialogTitle,
  Box,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { Stack } from "@mui/system";

import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";

import { SET_ROOT_CLASS, SET_CLASS } from "../../../constants/action-types";
export default function AddCharacterPopup(props) {
  const userId = store.getState().loginUser.userId;
  const [inputCharacterInfo, setInputCharacterInfo] = useState({
    userId: userId,
    characterName: "",
    characterLevel: 1445.0,
    class: "",
  });
  const [rootClass, setRootClass] = useState([{}]);
  const [classDetail, setClassDetail] = useState([{}]);
  const [rootClassCode, setRootClassCode] = useState("");
  const [classDetailCode, setClassDetailCode] = useState("");
  useEffect(() => {
    apiAxiosPromise("GET", "/api/code", {
      groupCode: "RootClass",
    }).then((res) => {
      store.dispatch({ type: SET_ROOT_CLASS, payload: res });
      setRootClass(res);
    });
  }, []);
  function AddCharacter() {
    //예외처리
    if (inputCharacterInfo.characterName == "") {
      alert("캐릭터명을 입력하세요.");
      return false;
    }
    if (inputCharacterInfo.characterLevel == "") {
      alert("레벨을 입력하세요.");
      return false;
    }
    if (inputCharacterInfo.class == "") {
      alert("클래스를 선택하세요.");
      return false;
    }
    apiAxiosPromise("POST", "/api/character/add", inputCharacterInfo)
      .then((res) => {
        alert("정상처리되었습니다.");
        // 캐릭터이름, 레벨 초기화
        setInputCharacterInfo({
          ...inputCharacterInfo,
          characterName: "",
          characterLevel: 0.0,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("오류발생 : ", err.response.data);
      })
      .finally(() => {
        window.location.reload();
      });
  }

  const handleRootClassChange = (event) => {
    if (event.target.value) {
      setRootClassCode(event.target.value);
      // 자식 클래스 조회
      apiAxiosPromise("GET", "/api/code", {
        groupCode: event.target.value,
      }).then((res) => {
        store.dispatch({ type: SET_CLASS, payload: res });
        setClassDetail(res);
      });
    }
  };
  const handleClassDetailChange = (event) => {
    if (event.target.value) {
      setClassDetailCode(event.target.value);
      setInputCharacterInfo({
        ...inputCharacterInfo,
        class: event.target.value,
      });
    }
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth={false}>
        <DialogTitle sx={{ fontSize: "1rem" }}>
          {"캐릭터 정보를 입력하세요."}
        </DialogTitle>

        <DialogContent sx={{ padding: "7px" }}>
          <ListItem
            sx={{
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="캐릭터명"
              inputProps={{ maxLength: 10 }}
              value={inputCharacterInfo.characterName}
              sx={{ width: "190px", marginTop: "8px" }}
              onChange={(evt) => {
                if (evt.target.value.length > 10) {
                  alert("캐릭터명은 10글자 까지만 입력해주세요(UI 깨짐 방지)");
                  return false;
                }
                setInputCharacterInfo({
                  ...inputCharacterInfo,
                  characterName: evt.target.value,
                });
              }}
            />
            <TextField
              required
              type="number"
              id="outlined-required"
              label="레벨"
              value={inputCharacterInfo.characterLevel}
              sx={{ width: "190px", marginTop: "8px" }}
              onChange={(evt) => {
                setInputCharacterInfo({
                  ...inputCharacterInfo,
                  characterLevel: evt.target.value,
                });
              }}
            />

            <Box sx={{ width: "190px", minWidth: 120, marginTop: "8px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  뿌리클래스
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rootClassCode}
                  label="뿌리클래스"
                  onChange={handleRootClassChange}
                >
                  {rootClass.map((item, index) => {
                    return (
                      <MenuItem key={item.code} value={item.code}>
                        {item.codeName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: "190px", minWidth: 120, marginTop: "8px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">클래스</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={classDetailCode}
                  label="클래스"
                  onChange={handleClassDetailChange}
                >
                  {classDetail.map((item, index) => {
                    return (
                      <MenuItem key={item.code} value={item.code}>
                        {item.codeName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </ListItem>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ minWidth: 120, margin: "5px" }}
            onClick={() => {
              if (window.confirm("추가하시겠습니까?")) {
                AddCharacter();
              }
            }}
          >
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
