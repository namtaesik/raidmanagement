import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import BtnSignUp from "./BtnSignUp";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import { useState, useEffect } from "react";
import { SET_CONTENTS_NAME } from "../../../constants/action-types";
import CharacterInfo from "./CharacterInfo";
import moment from "moment/moment";
import weekOfDay from "../../../services/dateFormat/weekOfDay";
import BtnDelSchedule from "../../page-component/Raid/BtnDelSchedule";
import { Button } from "@mui/material";
import BtnUpdateSchedule from "./BtnUpdateSchedule";
import Dday from "../../DateComp/Dday";
export default function RaidCard(props) {
  const [open, setOpen] = React.useState(false);
  const [resize, setResize] = useState();
  const handleResize = () => {
    //console.log(window.innerWidth);
    setResize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function onContentsClick() {
    store.dispatch({
      type: SET_CONTENTS_NAME,
      payload: [props.Contents.codeName],
    });
    props.onContentsClick(props.Contents.code);
  }
  const card = (
    <Card
      sx={{
        width: resize > 1014 ? "auto" : "auto",
        minWidth: 264,
        margin: "7px 7px 7px 7px",
        background: "#f0f7ff",
        borderColor: "#007fff",
        borderRadius: "10px",
        borderWidth: "1px",
        borderStyle: "solid",
        color: "black",
        position: "relative",
      }}
      key={props.Contents.code}
    >
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        onClick={async () => {
          onContentsClick(); // 클릭이벤트 발생기켜 클릭한 코드 전달
        }}
      >
        <div
          style={{
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
          }}
          key={props.Contents.code}
        >
          <ListItemText
            primary={props.Contents.codeName}
            primaryTypographyProps={{ fontWeight: "", fontWeight: "bold" }}
            sx={{ userSelect: "none" }}
          ></ListItemText>
        </div>
      </Box>
    </Card>
  );
  return card;
}
