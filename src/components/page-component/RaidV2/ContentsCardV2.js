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
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function ContentsCardV2(props) {
  const [open, setOpen] = React.useState(false);
  const [resize, setResize] = useState();
  const [raidCount, serRaidCount] = useState(-1);
  const handleResize = () => {
    //console.log(window.innerWidth);
    setResize(window.innerWidth);
  };
  useEffect(() => {
    // 레이드 수 가져오기
    getRaidCount();
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
  //console.log("/images/RaidSymbol/".concat("Valtan.png"));
  // 코드에 맞는 레이드 파티 수 가져오기
  async function getRaidCount() {
    await apiAxiosPromise("GET", "/api/raid-calendar-v2", {
      contentsCode: props.Contents.code,
    })
      .then((res) => {
        serRaidCount(res.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const noImage = (obj) => {
    obj.target.src= "/images/RaidSymbol/All.png";  
    
 }
 const backColor = (obj)=>{
  var color = '';
  switch(obj.target.id){
    case 'Valtan':
      color='#00B8A6';
      break;
      case 'Biackiss':
        color='#D92789';
      break;
      case 'Kouku-Saton':
        color='#D90707';
      break;
      case 'Abrelshud':
        color='#440596';
      break;
      case 'Kayanggel':
        color='#B39A6B';
      break;
      case 'Illiakan':
        color='#2FB032';
      break;
      case 'IvoryToower':
        color='#769DAB';
      break;
      default:
        color='grey';
      break;
  }
  obj.target.style.backgroundColor = color;
 }
  //console.log(tryRequire("/images/RaidSymbol/".concat(props.Contents.code,".png")));
  const card = (
    <Grid2 item xs={6}  sx={{display:'flex',justifyContent:"center"}} >
      
      <img
        src={(`/images/RaidSymbol/${props.Contents.code}.png`)}
        onError={noImage}
        alt={props.Contents.codeName}
        style={{ width: "120px",height:'120px', borderRadius: "10%" }}
        onLoad={backColor}
        onClick={async () => {
          onContentsClick(); // 클릭이벤트 발생기켜 클릭한 코드 전달
        }}
        id={props.Contents.code}
      ></img>
      

      {/* {raidCount >= 0 && (
          <p
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              minWidth: "70px",
              userSelect: "none",
            }}
          >
            일정 수:{raidCount}개
          </p>
        )} */}
      {/* {raidCount < 0 && (
          <p
            style={{
              marginLeft: "auto",
              marginRight: "10px",
              minWidth: "70px",
              userSelect: "none",
            }}
          >
            {"일정 수 : "}
          </p>
        )} */}
    </Grid2>
  );
  return card;
}
