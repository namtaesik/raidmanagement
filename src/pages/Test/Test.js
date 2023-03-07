import { Button, List, ListItem } from "@mui/material";
import { extendSxProp } from "@mui/system";
import axios from "axios";
import React from "react";
import apiAxios from "../../services/apiAxios/apiAxios";
class Test extends React.Component {
  render() {
    var inputUserName = "";
    var AddCaracter = {
      UserId: -1,
      CharacterName: "",
      Class: "",
      CharacterLevel: 0,
    };
    var AddRaidCalendar = {
      attackDate: "",
      bossCode: "",
    };
    var AddJoinRaid = {
      attackId: -1,
      userId: -1,
      characterId: -1,
    };
    return (
      <div>
        <List>
          {/* -------------------------------------------------------------유저추가--------------------------------------------------------------- */}
          <ListItem>
            <p>[유저 추가하기]</p>
          </ListItem>
          <ListItem>
            <p>NAME:</p>

            <input
              onChange={(evt) => {
                inputUserName = evt.target.value;
              }}
            ></input>
          </ListItem>

          <ListItem>
            <Button
              onClick={() => {
                apiAxios("POST", "/api/user", {
                  body: { userName: inputUserName, userGrant: "User" },
                });
              }}
            >
              전송
            </Button>
          </ListItem>
          {/* -------------------------------------------------------------끝 - 유저추가--------------------------------------------------------------- */}
          {/* -------------------------------------------------------------캐릭터추가--------------------------------------------------------------- */}

          <ListItem>
            <p>[캐릭터 추가하기]</p>
          </ListItem>

          <ListItem>
            <p>userId:</p>
            <input
              onChange={(evt) => {
                AddCaracter.UserId = evt.target.value;
              }}
            ></input>
          </ListItem>
          <ListItem>
            <p>characterName:</p>
            <input
              onChange={(evt) => {
                AddCaracter.CharacterName = evt.target.value;
              }}
            ></input>
          </ListItem>
          <ListItem>
            <p>class:</p>
            <input
              onChange={(evt) => {
                AddCaracter.Class = evt.target.value;
              }}
            ></input>
          </ListItem>
          <ListItem>
            <p>characterLevel:</p>
            <input
              onChange={(evt) => {
                AddCaracter.CharacterLevel = evt.target.value;
              }}
            ></input>
          </ListItem>
          <ListItem>
            <Button
              onClick={() => {
                if (
                  AddCaracter.userId < 0 ||
                  AddCaracter.characterName == "" ||
                  AddCaracter.Class == "" ||
                  AddCaracter.CharacterLevel <= 0
                ) {
                  alert("데이터를 모두 입력하세요.");
                  return false;
                }
                apiAxios("POST", "/api/character", {
                  body: {
                    userId: AddCaracter.UserId,
                    characterName: AddCaracter.CharacterName,
                    class: AddCaracter.Class,
                    characterLevel: AddCaracter.CharacterLevel,
                  },
                });
              }}
            >
              전송
            </Button>
          </ListItem>
          {/* -------------------------------------------------------------레이드 일정추가--------------------------------------------------------------- */}
          <ListItem>
            <p>[레이드일정 추가하기]</p>
          </ListItem>
          <ListItem>
            <p>attackDate:</p>

            <input
              onChange={(evt) => {
                AddRaidCalendar.attackDate = evt.target.value;
              }}
            ></input>
          </ListItem>
          <ListItem>
            <p>bossCode:</p>

            <input
              onChange={(evt) => {
                AddRaidCalendar.bossCode = evt.target.value;
              }}
            ></input>
          </ListItem>

          <ListItem>
            <Button
              onClick={() => {
                apiAxios("POST", "/api/raid-calendar", {
                  body: {
                    attackDate: AddRaidCalendar.attackDate,
                    bossCode: AddRaidCalendar.bossCode,
                  },
                });
              }}
            >
              전송
            </Button>
          </ListItem>
          {/* -------------------------------------------------------------끝 - 레이드 일정추가--------------------------------------------------------------- */}
          {/* -------------------------------------------------------------레이드 참여하기--------------------------------------------------------------- */}
          <ListItem>
            <p>[레이드 참여하기]</p>
          </ListItem>
          <ListItem>
            <p>attackId:</p>

            <input
              onChange={(evt) => {
                AddJoinRaid.attackId = evt.target.value;
              }}
            ></input>
          </ListItem>
          <ListItem>
            <p>userId:</p>

            <input
              onChange={(evt) => {
                AddJoinRaid.userId = evt.target.value;
              }}
            ></input>
          </ListItem>
          <ListItem>
            <p>characterId:</p>

            <input
              onChange={(evt) => {
                AddJoinRaid.characterId = evt.target.value;
              }}
            ></input>
          </ListItem>
          <ListItem>
            <Button
              onClick={() => {
                apiAxios("POST", "/api/raid-calendar/join", {
                  body: {
                    attackId: AddJoinRaid.attackId,
                    userId: AddJoinRaid.userId,
                    characterId: AddJoinRaid.characterId,
                  },
                });
              }}
            >
              전송
            </Button>
          </ListItem>
          {/* -------------------------------------------------------------끝 - 레이드 참여하기--------------------------------------------------------------- */}
        </List>
      </div>
    );
  }
}
export default Test;
