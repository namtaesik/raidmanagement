import React, { useEffect } from "react";
import { List, ListItem } from "@mui/material";
import { Container } from "@mui/system";
import { Navigate } from "react-router";
import store from "../../store";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";

export default function RaidV3() {
  const [value, setValue] = React.useState(0);
  // 컨텐츠 목록 및 최초 렌더링 여부
  const [isRendered, setIsRendered] = useState(false);
  const [contentsCode, setContentsCode] = useState([{}]);
  const [selectedCode, setSelectedCode] = useState("");
  // 스케쥴 리스트 - 작업필요 230920
  const [schList, setSchList] = useState({});
  const handleChange = (e, newValue) => {
    console.log(newValue);
    console.log(contentsCode[newValue].code);
    setSelectedCode(contentsCode[newValue].code);
    setValue(newValue);
  };
  // 데이터 가져오기
  useEffect(() => {
    if (!store.getState().loginUser.userId) {
      // 없으면 리다이렉트
      return <Navigate to="/" />;
    }
    apiAxiosPromise("GET", "/api/code", { groupCode: "Contents" })
      .then((res) => {
        setContentsCode(res);
        setIsRendered(true);
        setSelectedCode(res[0].code);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 탭 변경시 데이터 가져오기

  if (!isRendered) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {contentsCode?.map((item) => {
            if (item?.code != undefined) {
              return <Tab key={item.code} label={item.codeName} />;
            }
          })}
        </Tabs>
        <Container fixed maxWidth="sm" sx={{ justifyContent: "center" }}>
          {/* 이부분에 schList 뿌려줘야함. */}
        </Container>
      </div>
    );
  }
}
