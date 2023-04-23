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
import { Button, Divider } from "@mui/material";
import BtnUpdateSchedule from "./BtnUpdateSchedule";
import Dday from "../../DateComp/Dday";
import css from "./css/titleBox.css";
export default function RaidCardV2Temp(props) {
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
    if (today.weekday() == 0) today.add(-1, "day"); // 일요일일 경우 하루 빼서 한주 지나지 않도록 적용
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
        borderColor:
          props.RaidSchedule.limitMember <= partyData.length
            ? "red"
            : isWeek
            ? "#007fff"
            : "#D3D3D3",

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
          // style={{
          //   fontSize: 20,
          //   display: "flex",
          //   paddingLeft: "10px",
          //   flexDirection: "column",
          //   width: "calc(100%-80px)",
          // }}
          className="titlebox"
          key={attackId}
        >
          <div
            style={{
              fontSize: 20,
              display: "flex",
              flexDirection: "row",
            }}
            key={attackId}
          >
            <ListItemText
              primary={
                <span>
                  <span
                    style={{
                      background:
                        props.RaidSchedule.difficultyCode == "Rehearsal"
                          ? "lightblue"
                          : props.RaidSchedule.difficultyCode == "Normal"
                          ? "yellow"
                          : props.RaidSchedule.difficultyCode == "Hard"
                          ? "orange"
                          : props.RaidSchedule.difficultyCode == "Hell"
                          ? "red"
                          : "grey",
                      fontSize: "12px",
                      color:
                        props.RaidSchedule.difficultyCode == "Hell" ||
                        props.RaidSchedule.difficultyCode == "None"
                          ? "white"
                          : "black",
                      alignItems: "center",
                      padding: "2px 4px 2px 4px",
                    }}
                  >
                    {props.RaidSchedule.difficultyName}
                  </span>
                  {/* 왼쪽 공백 */ " "} {props.RaidSchedule.contentsName}
                  <span
                    style={{
                      paddingLeft: "5px",
                      fontWeight: "normal",
                      fontSize: "14px",
                    }}
                  >
                    ({partyData.length}/{props.RaidSchedule.limitMember})
                  </span>
                </span>
              }
              primaryTypographyProps={{ fontWeight: "", fontWeight: "bold" }}
              secondary={
                props.RaidSchedule.isUnknown
                  ? "[미정]" + props.RaidSchedule.unknownRemark
                  : DateFormatter(props.RaidSchedule.attackDateOrigin)
              }
              sx={{ userSelect: "none" }}
            ></ListItemText>

            <KeyboardArrowDown
              sx={{
                mr: -1,
                opacity: 1,
                transform: open ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.3s",
                position: "absolute",
                right: "10px",
                top: "30px",
              }}
            />
          </div>
          {/* 파티제목 */}
          <ListItemText
            primary={props.RaidSchedule.remark}
            primaryTypographyProps={{
              fontSize: "14px",
              fontWeight: "bold",
            }}
            sx={{ userSelect: "none" }}
          ></ListItemText>
        </div>
        <Box
          sx={{
            flexDirection: "column",
            marginRight: "10px",
            marginLeft: "auto",
          }}
        ></Box>{" "}
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
          <Divider />
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
