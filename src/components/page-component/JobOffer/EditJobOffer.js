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
import { Fab, ListItemButton, ListItemIcon, MenuItem, Select, SpeedDialIcon, TextField } from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import { ModeEdit } from "@mui/icons-material";
import { Container } from "@mui/system";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditJobOffer({jobOfferId, characterId, p_title, contents, hashText,onEditPopupOpen}) {
  const [open, setOpen] = React.useState(false);
  const [characterList, setCharacterList] = React.useState([]);
  const [selectedCharId, setSelectedCharId] = React.useState(characterId);
  const [title, setTitle] = React.useState(p_title);
  const [content, setContent] = React.useState(contents);
  const [hashTag, setHashTag] = React.useState(hashText?.replaceAll(' ',''));// #사이 스페이스 제거
  var userId = store.getState().loginUser.userId;
  React.useEffect(() => {
    // 캐릭터 정보 조회하기
    apiAxiosPromise("GET", "/api/character", {
      userId: userId,
    })
      .then((res) => {
        setCharacterList(res);
        //setSelectedCharId(res[0]?.characterId);
      })
      .catch((err) => {
        alert("오류발생 : ", err);
        console.log(err);
      });
  }, []);
  // 팝업 오픈 이벤트 감시, EditJobOffer->JobOfferItem->JobOffer 로 상태 전달
  // JobOffer->AddJobOffer로 상태 전달한 뒤 AddJobOffer에서 EditJobOffer 열려있으면 Fab 가리기
  React.useEffect(()=>{
    onEditPopupOpen(open);
  },[open])
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
    if (title == "") {
      alert("제목을 입력하세요.");
      return false;
    }
    if (content == "") {
      alert("내용을 입력하세요.");
      return false;
    }
    if (hashTag == "") {
      alert("해시태그를 입력하세요.");
      return false;
    }
    var hashArrCheck = hashTag.substring(1).split("#");
    var checkFlag = true;
    hashArrCheck.map((item) => {
      if (item == "") {
        alert("해시태그에 빈값이 있습니다.(ex - ##해시");
      }
    });
    var saveObj = {
      offerId : jobOfferId,
      userId: userId,
      characterId: selectedCharId,
      title: title,
      contents: content,
      hashTagArr: hashTag.substring(1).split("#"),
    };
     apiAxiosPromise("POST", "/api/job-offer/update", saveObj)
       .then((res) => {
       
         // 삭제 후 재삽임
         apiAxiosPromise("POST", "/api/job-offer/delete-hash-tag", { offerId: jobOfferId, ...saveObj })
           .then((res) => {
             // 재삽입
             apiAxiosPromise("POST", "/api/job-offer/add-hash-tag", { offerId: jobOfferId, ...saveObj })
              .then((res) => {
                alert("저장되었습니다.");
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
      <ListItemButton onClick={()=>{
                  setOpen(true);
                }}
                
                >
                    <ListItemIcon>
                        
                        <ModeEdit/>
                    </ListItemIcon>
                    <ListItemText primary="수정"/>
                </ListItemButton>
      {open&&
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              구인공고 수정
            </Typography>
           
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ justifyContent: "center" , marginBottom:'100px', paddingLeft:'2px',paddingRight:'2px'}}>
        <List>
          <ListItem key="typoTitle">
            <Typography variant="body2" color="text.secondary" sx={{ width: "100%" }}>
              제목
            </Typography>
          </ListItem>
          <ListItem key="inputTitle">
            <TextField id="title" label="제목" variant="outlined" sx={{ width: "100%" }} value={title} onChange={(evt)=>{
              if(evt.target.value.length >49){
                alert("제목은 50자까지만 입력 가능합니다.");
                return false;
              }
              setTitle(evt.target.value)
              }}/>
          </ListItem>
          <Divider />
          <ListItem key="typoCharacter">
            <Typography variant="body2" color="text.secondary">
              캐릭터선택
            </Typography>
          </ListItem>
          <ListItem key="selectCharacter">
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
          <ListItem key="typoContent">
            <Typography variant="body2" color="text.secondary">
              구인공고 내용
            </Typography>
          </ListItem>
          <ListItem key="inputContent">
            <textarea
              onChange={(e) => {
                setContent(e.target.value)
              }}
              style={{ width: "100%", height: "40vh", font: "inherit" }}
              placeholder="내용을 입력하세요"
              id="content"
              value={content}
            >{content}</textarea>
          </ListItem>
          <ListItem key="inputHashTag">
            <TextField id="hashTag" label="해시태그입력(#으로 구분 띄어쓰기 불가)" variant="outlined" sx={{ width: "100%" }} onInput={onInputHash} value={hashTag}/>
          </ListItem>
          <Divider/>
          <ListItem key='saveBtn' sx={{justifyContent:'end'}}>
          <Button  variant="contained" color="primary" onClick={handleSaveClick}>
              저장
            </Button>
          </ListItem>
        </List>
        </Container>
      </Dialog>}
    </div>
  );
}
