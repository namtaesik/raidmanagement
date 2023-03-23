import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import BtnSignUp from "./BtnSignUp";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import { useState, useEffect } from "react";
import CharacterInfo from "./CharacterInfo";
import moment from "moment/moment";
import weekOfDay from "../../../services/dateFormat/weekOfDay";
export default function RaidCard(props) {
  const [open, setOpen] = React.useState(false);
  const [partyData, setPartyData] = React.useState([{}]);
  var isJoined = false; // 해당 스케줄에 참가하였는지여부(userId 기준)
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
  const attackId = props.RaidSchedule.attackId; // 스케줄 ID
  function ClickDelBtn(userId, characterId) {
    // 삭제요청
    //console.log(attackId, userId, characterId);
  }
  // function ClickBtn() {
  //   GetRaidDetail();
  // }
  function DateFormatter(date) {
    return moment(date).format("MM/DD HH:mm (") + weekOfDay(date) + ")";
  }
  async function GetRaidDetail() {
    // 데이터 불러오기 (axios)
    var PartyDetail = await apiAxiosPromise(
      "GET",
      "/api/raid-calendar/detail",
      { attackId: attackId }
    );

    // 데이터 담기
    setPartyData(PartyDetail);
    // 아이디 확인
    partyData.map((item) => {
      if (item.userId == store.getState().loginUser.userId) isJoined = true;
    });
  }
  const card = (
    <Card
      sx={{
        width: resize > 1000 ? 500 : "auto",
        minWidth: 264,
        margin: "7px 7px 7px 7px",
        background: "#D3D3D3",
      }}
      key={attackId}
    >
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        onClick={async () => {
          console.log("1");
          if (!open) {
            GetRaidDetail();
          } else {
            //데이터 삭제
            setPartyData([{}]);
          }
          setOpen(!open);
        }}
      >
        <div
          style={{ fontSize: 20, display: "flex", alignItems: "center" }}
          key={attackId}
        >
          <ListItemText
            primaryTypographyProps={{ fontWeight: "bold" }}
            secondary={props.RaidSchedule.bossName}
            sx={{ userSelect: "none" }}
          >
            {/* {props.RaidSchedule.attackDateOrigin} */}
            {DateFormatter(props.RaidSchedule.attackDateOrigin)}
          </ListItemText>
        </div>
        <KeyboardArrowDown
          sx={{
            mr: -1,
            opacity: 1,
            transform: open ? "rotate(-180deg)" : "rotate(0)",
            transition: "0.2s",
            marginLeft: "auto",
            marginRight: "10px",
          }}
        />
      </Box>
      {open && (
        <CardContent key={attackId}>
          {partyData?.map((item, index) => {
            if (item.userId != undefined) {
              return (
                <ListItem key={item.userId}>
                  <CharacterInfo
                    key={item.userId}
                    userId={item.userId}
                    characterName={item.characterName}
                    characterLevel={item.characterLevel}
                    className={item.className}
                    attackId={attackId}
                    onClickHandler={() => {
                      GetRaidDetail();
                    }}
                  ></CharacterInfo>
                </ListItem>
              );
            }
          })}

          <ListItem
            key={attackId}
            // secondaryAction={
            //   <BtnSignUp title="신청하기" attackId={attackId}></BtnSignUp>
            // }
          >
            <BtnSignUp
              key={attackId}
              title="신청하기"
              attackId={attackId}
              onClickHandler={() => {
                GetRaidDetail();
              }}
            ></BtnSignUp>
          </ListItem>
        </CardContent>
      )}
    </Card>
  );
  return card;
}
