import React, { useEffect, useState } from "react";
import store from "../../store";
import { ListItem, List, Fab, SpeedDialIcon } from "@mui/material";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import CharacterInfo from "../../components/page-component/CharacterManagement/CharacterInfo";
import AddCharacterPopup from "../../components/Popup/CharacterManagement/AddCharacterPopup";
import { Box, Container } from "@mui/system";
import { SET_CHARACTER } from "../../constants/action-types";
export default function CharacterManagement() {
  // 캐릭터 불러오기
  const [characters, setCharacters] = useState([{}]);
  // 캐릭터 추가 팝업
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getCharacters();
  }, []);
  function getCharacters() {
    apiAxiosPromise("GET", "/api/character", store.getState().loginUser).then(
      (res) => {
        setCharacters(res);
        // 스토어 최신화
        if (res.length > 0) {
          store.dispatch({ type: SET_CHARACTER, payload: res });
        }
      }
    );
  }
  if (!characters[0]) {
    return (
      <Box key="load">
        <Fab
          aria-label="SpeedDial controlled open example"
          size="small"
          direction="right"
          onClick={() => {
            setOpen(true);
          }}
          color="primary"
          sx={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 9999,
          }}
        >
          {<SpeedDialIcon />}
        </Fab>
        <AddCharacterPopup
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        ></AddCharacterPopup>
      </Box>
    );
  } else {
    return (
      <Container maxWidth="sm" sx={{ justifyContent: "center" , marginBottom:'100px', paddingLeft:'2px',paddingRight:'2px'}}>
      <List>
        {characters.map((item, index) => {
          return (
            <ListItem key={item.characterId} sx={{ justifyContent: "center" , paddingLeft:'2px',paddingRight:'2px'}}>
              <CharacterInfo
                info={item}
                onClickHandler={() => {
                  getCharacters();
                }}
              ></CharacterInfo>
            </ListItem>
          );
        })}
        <Fab
          key="AddFab"
          aria-label="SpeedDial controlled open example"
          size="small"
          direction="right"
          onClick={() => {
            setOpen(true);
          }}
          color="primary"
          sx={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 9999,
          }}
        >
          {<SpeedDialIcon />}
        </Fab>
        <AddCharacterPopup
          key="AddCharacterPopup"
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        ></AddCharacterPopup>
      </List>
      </Container>
    );
  }
}
