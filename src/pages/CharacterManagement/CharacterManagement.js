import React, { useEffect, useState } from "react";
import store from "../../store";
import {
  ListItem,
  Button,
  TextField,
  List,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import CharacterInfo from "../../components/page-component/CharacterManagement/CharacterInfo";
import { SET_ROOT_CLASS, SET_CLASS } from "../../constants/action-types";
import { Box } from "@mui/system";
export default function CharacterManagement() {
  // 캐릭터 불러오기
  const [characters, setCharacters] = useState([{}]);
  const [rootClass, setRootClass] = useState([{}]);
  const [classDetail, setClassDetail] = useState([{}]);
  const [rootClassCode, setRootClassCode] = useState("");
  const [classDetailCode, setClassDetailCode] = useState("");
  const userId = store.getState().loginUser.userId;
  const [inputCharacterInfo, setInputCharacterInfo] = useState({
    userId: userId,
    characterName: "",
    characterLevel: 0.0,
    class: "",
  });

  useEffect(() => {
    apiAxiosPromise("GET", "/api/character", store.getState().loginUser).then(
      (res) => {
        setCharacters(res);
      }
    );
    apiAxiosPromise("GET", "/api/code", {
      groupCode: "RootClass",
    }).then((res) => {
      store.dispatch({ type: SET_ROOT_CLASS, payload: res });
      setRootClass(res);
    });
  }, []);

  function AddCharacter() {
    console.log(inputCharacterInfo);
    apiAxiosPromise("POST", "/api/character/add", inputCharacterInfo)
      .then((res) => {
        alert("정상처리되었습니다.");
      })
      .catch((err) => {
        alert("오류발생 : ", err);
      })
      .finally(() => {
        apiAxiosPromise(
          "GET",
          "/api/character",
          store.getState().loginUser
        ).then((res) => {
          setCharacters(res);
        });
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
    <List>
      {characters.map((item, index) => {
        return (
          <ListItem key={item.characterId} sx={{ justifyContent: "center" }}>
            <CharacterInfo info={item}></CharacterInfo>
          </ListItem>
        );
      })}

      <ListItem sx={{ justifyContent: "center" }}>
        <TextField
          required
          id="outlined-required"
          label="캐릭터명"
          defaultValue=""
          sx={{ width: "200px" }}
          onChange={(evt) => {
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
          defaultValue=""
          sx={{ width: "200px" }}
          onChange={(evt) => {
            setInputCharacterInfo({
              ...inputCharacterInfo,
              characterLevel: evt.target.value,
            });
          }}
        />

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">뿌리클래스</InputLabel>
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
        <Box sx={{ minWidth: 120 }}>
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
        <Button
          onClick={() => {
            if (window.confirm("추가하시겠습니까?")) {
              AddCharacter();
            }
          }}
        >
          추가
        </Button>
      </ListItem>
    </List>
  );
}
