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
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";

import CharacterInfo from "./CharacterInfo";
export default function RaidCard(props) {
  const [open, setOpen] = React.useState(false);
  const [partyData, setPartyData] = React.useState([{}]);
  var isJoined = false; // 해당 스케줄에 참가하였는지여부(userId 기준)

  const attackId = props.RaidSchedule.attackId; // 스케줄 ID
  function ClickDelBtn(userId, characterId) {
    // 삭제요청
    //console.log(attackId, userId, characterId);
  }
  function ClickAddBtn() {
    // 클릭시 참가 팝업 표출
    BtnSignUp(attackId);
  }
  const card = (
    <Card
      sx={{
        minWidth: 260,
        maxWidth: "calc(100% - 20px)",
        padding: "3px 3px 3px 3px",
        margin: "7px 7px 7px 7px",
        background: "#D3D3D3",
      }}
      key={props.RaidSchedule.attackDate}
    >
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        onClick={async () => {
          if (!open) {
            // 데이터 불러오기 (axios)
            var PartyDetail = await apiAxiosPromise(
              "GET",
              "/api/raid-calendar/detail",
              { query: { attackId: attackId } }
            );

            // 데이터 담기
            setPartyData(PartyDetail);
            // 아이디 확인
            partyData.map((item) => {
              if (item.userId == store.getState().loginUser.userId)
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
            {props.RaidSchedule.attackDate}
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
            {props.RaidSchedule.bossName}
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
            return (
              <ListItem>
                <CharacterInfo
                  key={item.userId}
                  userId={item.userId}
                  characterName={item.characterName}
                  characterLevel={item.characterLevel}
                  className={item.className}
                ></CharacterInfo>
              </ListItem>
            );
          })}
          <ListItem
          // secondaryAction={
          //   <BtnSignUp title="신청하기" attackId={attackId}></BtnSignUp>
          // }
          >
            <BtnSignUp title="신청하기" attackId={attackId}></BtnSignUp>
          </ListItem>
        </CardContent>
      )}
    </Card>
  );
  return card;
}
