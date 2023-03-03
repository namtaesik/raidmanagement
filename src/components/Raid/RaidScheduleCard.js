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
import { Divider } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import BtnSignUp from "./BtnSignUp";
import store from "../../store";
export default function RaidCard(props) {
  const [open, setOpen] = React.useState(false);
  const [partyData, setPartyData] = React.useState([{}]);
  var isJoined = false; // 해당 스케줄에 참가하였는지여부(userId 기준)
  const raidId = props.RaidSchedule.RaidId; // 스케줄 ID

  const testPartyData = [
    {
      userId: 2,
      characterId: 1,
      characterName: "character1",
      characterLevel: 1472.25,
      classCode: "Reaper",
      className: "리퍼",
    },
    {
      userId: 31,
      characterId: 1,
      characterName: "character2",
      characterLevel: 1472.25,
      classCode: "Reaper2",
      className: "리퍼2",
    },
  ];
  function ClickDelBtn(userId, characterId) {
    // 삭제요청

    console.log(raidId, userId, characterId);
  }
  function ClickAddBtn() {
    // 클릭시 참가 팝업 표출
    BtnSignUp(raidId);
  }
  var PartyData = [{}];
  const card = (
    <Card
      sx={{
        minWidth: 260,
        maxWidth: "calc(100% - 20px)",
        padding: "3px 3px 3px 3px",
        margin: "7px 7px 7px 7px",
        background: "#d08856",
      }}
      key={props.RaidSchedule.AttackDate}
    >
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          if (!open) {
            // 데이터 불러오기 (axios)

            // 데이터 담기
            setPartyData(testPartyData);
            // 아이디 확인
            partyData.map((item) => {
              console.log(item.userId, store.getState().testUser.useId);
              if (item.userId == store.getState().testUser.useId)
                isJoined = true;
            });
          } else {
            //데이터 삭제
            setPartyData([{}]);
          }
          setOpen(!open);
        }}
      >
        <div style={{ fontSize: 20, display: "flex", alignItems: "center" }}>
          <Typography color="text.secondary" gutterBottom>
            {props.RaidSchedule.AttackDate}
          </Typography>
          <Typography
            sx={{
              fontSize: 20,
              paddingLeft: "20px",
              color: "black",
              fontWeight: "bold",
            }}
            color="text.secondary"
            gutterBottom
          >
            {props.RaidSchedule.RaidName}
          </Typography>
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
        <CardContent>
          {partyData.map((item, index) => {
            //console.log(PartyData);
            if (item.userId == store.getState().testUser.userId) {
              isJoined = true;
              // 로그인자랑 같을 경우에만 삭제 가능
              return (
                <div key={item.userId}>
                  <h1>{item.characterName}</h1>
                  <h3>{item.characterLevel}</h3>
                  <Button
                    onClick={() => {
                      ClickDelBtn(item.userId, item.characterId);
                    }}
                  >
                    삭제하기
                  </Button>
                </div>
              );
            } else {
              return (
                <div key={item.userId}>
                  <h1>{item.characterName}</h1>
                  <h3>{item.characterLevel}</h3>
                </div>
              );
            }
          })}
          {!isJoined && (
            <ListItem
              secondaryAction={
                <BtnSignUp title="신청하기" raidId={raidId}></BtnSignUp>
              }
            ></ListItem>
          )}
        </CardContent>
      )}
    </Card>
  );
  return card;
}
