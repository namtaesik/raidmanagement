import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Fab, MenuItem, Select, SpeedDialIcon, TextField } from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddJobOffer() {
  const [open, setOpen] = React.useState(false);
  const [hashTag, setHashTag] = React.useState("");
  const [characterList, setCharacterList] = React.useState([]);
  const [selectedCharId, setSelectedCharId] = React.useState(1);
  var userId = store.getState().loginUser.userId;
  React.useEffect(() => {
    // 캐릭터 정보 조회하기
    apiAxiosPromise("GET", "/api/character", {
      userId: userId,
    })
      .then((res) => {
        //console.log(res);
        setCharacterList(res);
        setSelectedCharId(res[0]?.characterId);
      })
      .catch((err) => {
        alert("오류발생 : ", err);
        console.log(err);
      });
  }, []);
  // 캐릭터 선택 이벤트
  const handleChange = (event) => {
    setSelectedCharId(event.target.value);
  };
  // 해시태그 입력시 #구분 및 스페이스제거 등 작업
  const onInputHash = (evt) => {
    if (evt.target.value[0] != "#" && evt.target.value.length > 1) {
      evt.target.value = "#" + evt.target.value;
    }
    evt.target.value = evt.target.value.replaceAll(" ", "");
    setHashTag(evt.target.value);
  };
  // 저장 버튼 클릭 시
  const handleSaveClick = () => {
    // 유효성 검증
    if(document.getElementById("title").value==''){
        alert('제목을 입력하세요.');
        return false;
    }
    if(document.getElementById("content").value==''){
        alert('내용을 입력하세요.');
        return false;
    }
    if(document.getElementById("hashTag").value==''){
        alert('해시태그를 입력하세요.');
        return false;
    }
    var hashArrCheck = document.getElementById("hashTag").value.substring(1).split("#");
    var checkFlag = true;
    hashArrCheck.map(item=>{
        if(item == ''){
            alert('해시태그에 빈값이 있습니다.(ex - ##해시');
        }
    })
    var saveObj = {
      userId: userId,
      characterId: selectedCharId,
      title: document.getElementById("title").value,
      contents: document.getElementById("content").value,
      hashTagArr: document.getElementById("hashTag").value.substring(1).split("#"),
    };
    //console.log(saveObj);
    var offerId;
    apiAxiosPromise("POST", "/api/job-offer/add", saveObj)
      .then((res) => {
        //console.log(res);
        offerId = res.offerId;
        apiAxiosPromise("POST", "/api/job-offer/add-hash-tag", {offerId:offerId ,...saveObj})
          .then((res) => {
            console.log(res);
            offerId = res.offerId;
            alert('저장되었습니다.');
            setOpen(false);
            // 부모컴포넌트에 이벤트 전달하여 내용 재조회
            window.location.reload();
          })
          .catch((err) => {
            alert("오류발생 : ", err);
            console.log(err);
          });
      })
      .catch((err) => {
        alert("오류발생 : ", err);
        console.log(err);
      });
    //setOpen(false);
  };
  // 닫기버튼 클릭시
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
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
          width: "64px",
          height: "64px",

          zIndex: 9999,
        }}
      >
        {<SpeedDialIcon />}
      </Fab>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              구인공고 작성
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSaveClick}>
              저장
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem key='typoTitle'>
            <Typography variant="body2" color="text.secondary">
              제목
            </Typography>
          </ListItem>
          <ListItem key='inputTitle'>
            <TextField id="title" label="제목" variant="outlined" />
          </ListItem>
          <Divider />
          <ListItem key='typoCharacter'>
            <Typography variant="body2" color="text.secondary">
              캐릭터선택
            </Typography>
          </ListItem>
          <ListItem key='selectCharacter'>
            <Select sx={{ width: "100%" }} labelId="demo-simple-select-label" id="demo-simple-select" value={selectedCharId} label="Age" onChange={handleChange}>
              {characterList?.map((item) => {
                if (item.characterId != undefined) {
                  return (
                    <MenuItem key={item.characterId} value={item.characterId}>
                      {item.characterName}
                      <Typography variant="body2" color="text.secondary">
                        {"(Lv." + item.characterLevel + ")"}
                      </Typography>
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </ListItem>
          <Divider />
          <ListItem key='typoContent'>
            <Typography variant="body2" color="text.secondary">
              구인공고 내용
            </Typography>
          </ListItem>
          <ListItem key='inputContent'>
            <textarea
              onChange={(e) => {
                //setContent(e.target.value)
              }}
              style={{ width: "100%", height: "40vh", font: "inherit" }}
              placeholder="내용을 입력하세요"
              id="content"
              //value={content}
            />
          </ListItem>
          <ListItem key='inputHashTag'>
            <TextField id="hashTag" label="해시태그입력(#으로 구분 띄어쓰기 불가)" variant="outlined" sx={{ width: "100%" }} onInput={onInputHash} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
