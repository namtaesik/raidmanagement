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
import CharacterInfo from "./CharacterInfo";
import moment from "moment/moment";
import weekOfDay from "../../../services/dateFormat/weekOfDay";
import BtnDelSchedule from "./BtnDelSchedule";
import { Button } from "@mui/material";
import BtnUpdateSchedule from "./BtnUpdateSchedule";
import Dday from "../../DateComp/Dday";
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
    GetRaidDetail();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const attackId = props.RaidSchedule.attackId; // 스케줄 ID
  //console.log((moment() - props.RaidSchedule.attackDateOrigin).getDay())

  function isThisWeek(date) {
    const today = moment();
    const startOfWeek = today.clone().startOf("week").add(1, "day"); // 한 주의 시작일을 월요일로 설정
    const endOfWeek = today.clone().endOf("week").add(1, "day"); // 한 주의 마지막일을 일요일로 설정
    if (props.RaidSchedule.isUnknown) {
      return true;
    }
    return moment(date).isBetween(startOfWeek, endOfWeek);
  }
  const isWeek = isThisWeek(props.RaidSchedule.attackDateOrigin);
  function DateFormatter(date) {
    return moment(date).format("M월D일 HH시mm분 (") + weekOfDay(date) + ")";
  }
  async function GetRaidDetail() {
    // 데이터 불러오기 (axios)
    var PartyDetail = await apiAxiosPromise(
      "GET",
      "/api/raid-calendar-v2/detail",
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
        width: resize > 1014 ? "auto" : "auto",
        minWidth: 264,
        margin: "7px 7px 7px 7px",
        background:
          props.RaidSchedule.limitMember <= partyData.length
            ? "#ff7777"
            : isWeek
            ? "#f0f7ff"
            : "#D3D3D3",
        borderColor: isWeek ? "#007fff" : "#D3D3D3",
        borderRadius: "10px",
        borderWidth: "1px",
        borderStyle: "solid",
        color: "black",
        position: "relative",
      }}
      key={attackId}
    >
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        onClick={async () => {
          if (!open) {
            GetRaidDetail();
          } else {
          }
          setOpen(!open);
        }}
      >
        <div
          style={{
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
          }}
          key={attackId}
        >
          <ListItemText
            primary={props.RaidSchedule.remark}
            primaryTypographyProps={{ fontWeight: "", fontWeight: "bold" }}
            secondary={
              props.RaidSchedule.isUnknown
                ? "[미정]" + props.RaidSchedule.unknownRemark
                : DateFormatter(props.RaidSchedule.attackDateOrigin)
            }
            sx={{ userSelect: "none" }}
          ></ListItemText>
        </div>
        <p
          style={{
            marginLeft: "auto",
            marginRight: "10px",
            minWidth: "70px",
            userSelect: "none",
          }}
        >
          인원:{partyData.length}명
        </p>
        <Box sx={{ flexDirection: "column" }}>
          <KeyboardArrowDown
            sx={{
              mr: -1,
              opacity: 1,
              transform: open ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.3s",
              marginRight: "10px",
            }}
          />
        </Box>{" "}
        {props.RaidSchedule.isUnknown ? (
          ""
        ) : (
          <Dday
            eventDate={props.RaidSchedule.attackDateOrigin}
            sx={{
              background: "#CAE3FF",
              position: "absolute",
              right: "5px",
              top: "-10px",
              fontWeight: "bold",
            }}
          />
        )}
      </Box>
      {open && (
        <CardContent key={attackId} sx={{ margin: "0px", padding: "0px" }}>
          {partyData?.map((item, index) => {
            if (item.userId != undefined) {
              return (
                <ListItem key={item.userId}>
                  <CharacterInfo
                    key={item.userId}
                    userId={item.userId}
                    characterId={item.characterId}
                    characterName={item.characterName}
                    characterLevel={item.characterLevel}
                    className={item.className}
                    classCode={item.classCode}
                    attackId={attackId}
                    remark={item.remarkDetail}
                    proficiency={item.proficiency}
                    image={item.image}
                    onClickHandler={() => {
                      GetRaidDetail();
                    }}
                  ></CharacterInfo>
                </ListItem>
              );
            }
          })}

          <ListItem
            key="btngrpRaidCard"
            sx={{ paddingLeft: "13px", justifyContent: "space-between" }}
          >
            {props.RaidSchedule.limitMember > partyData.length && (
              <BtnSignUp
                key="btnJoin"
                title="신청하기"
                attackId={attackId}
                limitMember={props.RaidSchedule.limitMember}
                memberCount={partyData.length}
                onClickHandler={() => {
                  GetRaidDetail();
                }}
              ></BtnSignUp>
            )}
            <BtnUpdateSchedule
              key="btnUpdateSchedule"
              title="일정수정"
              attackId={attackId}
              isUnknown={props.RaidSchedule.isUnknown}
              unknownRemark={props.RaidSchedule.unknownRemark}
              remark={props.RaidSchedule.remark}
              regUser={props.RaidSchedule.regUser}
              attackDate={props.RaidSchedule.attackDate}
              contentsCode={props.RaidSchedule.contentsCode}
              difficultyCode={props.RaidSchedule.difficultyCode}
              limitMember={props.RaidSchedule.limitMember}
              onClickHandler={() => {
                GetRaidDetail();
              }}
            ></BtnUpdateSchedule>
            <BtnDelSchedule
              key="btnDelSchedule"
              title="일정삭제"
              attackId={attackId}
              regUser={props.RaidSchedule.regUser}
              onClickHandler={() => {
                GetRaidDetail();
              }}
            ></BtnDelSchedule>
          </ListItem>
        </CardContent>
      )}
    </Card>
  );
  return card;
}
