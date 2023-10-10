import { useState } from "react";
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
import {
  Fab,
  FormControlLabel,
  MenuItem,
  Select,
  SpeedDialIcon,
  Switch,
  TextField,
} from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
// 캘린더
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko"; // 한글설정
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Container, Stack } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddJobOffer(props) {
  // 제목 state
  const [title, setTitle] = useState("");
  // 날짜 미정관련 state
  const [isUnknown, setIsUnknown] = useState(false);
  const [unknownRemark, setUnknownRemark] = useState("미정");
  //  컨텐츠 코드, 난이도
  const [contentsCodeList, setContentsCodeList] = useState([{}]);
  const [difficultyCodeList, setDifficultyCodeList] = useState([{}]);
  const [contentsCode, setContentsCode] = useState("Other");
  const [difficultyCode, setDifficultyCode] = useState("");
  // 유저 수 제한
  const [limitMember, setLimitMember] = useState(0);
  // 로그인 한 유저 ID 조회
  var userId = store.getState().loginUser.userId;
  // 날짜선택 값
  const [datePickerValue, setDatePickerValue] = useState(
    dayjs().format("YYYY/MM/DD 19:00")
  );
  React.useEffect(() => {
   
    // 컨텐츠 및 난이도, 제한 인원 수 세팅
    getContentsCode();
    getDifficultyCode();
    setLimitMember(props.editScheduleInfo?.limitMember ?? 8);

    
  }, []);
  // 'props.editScheduleInfo' state를 전달받아 수정 감지 -> 데이터 교체
 React.useEffect(()=>{ 
  // 수정일경우 인자세팅
  if (props.editScheduleInfo?.attackId != undefined) {
  setIsUnknown(props.editScheduleInfo?.isUnknown);
  setUnknownRemark(props.editScheduleInfo?.unknownRemark);
  setTitle(props.editScheduleInfo?.remark);
  // 날짜세팅
  setContentsCode(props.editScheduleInfo?.contentsCode);
  setDatePickerValue(props.editScheduleInfo?.attackDate);
  // 컨텐츠코드 세팅
  setContentsCode(
    (props.editScheduleInfo?.contentsCode??"") == "" ? "Other" : props.editScheduleInfo?.contentsCode
  );
  // 제한인원 세팅
  setLimitMember(props.editScheduleInfo?.limitMember ?? 8);
  // 난이도 세팅
  setDifficultyCode(props.editScheduleInfo?.difficultyCode);

}},[props.editScheduleInfo])
// 컨텐츠 가져오기
  async function getContentsCode() {
    await apiAxiosPromise("GET", "/api/code", {
      groupCode: "Contents",
    })
      .then((res) => {
        res = res.filter((item) => item.code != "");
        setContentsCodeList(res);
        
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 난이도 가져오기
  async function getDifficultyCode() {
    await apiAxiosPromise("GET", "/api/code", {
      groupCode: "Difficulty",
    })
      .then((res) => {
        setDifficultyCodeList(res);
        setDifficultyCode(props.editScheduleInfo?.difficultyCode ?? res[0].code);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 저장 버튼 클릭 시
  const handleSaveClick = () => {
    // 유효성 검증
    if (document.getElementById("title").value == "") {
      alert("제목을 입력하세요.");
      return false;
    }

    if (datePickerValue == "") {
      alert("날짜 및 시간을 선택하세요.");
      return false;
    }
    if (limitMember < 1) {
      alert("최대인원을 1명 이상으로 설정해주세요.");
      return false;
    }
    const ment =
      props.editScheduleInfo?.attackId == undefined
        ? "레이드 일정을 등록하시겠습니까?"
        : "레이드 일정을 수정하시겠습니까?";
    if (window.confirm(ment)) {
      var saveObj = {
        attackId: props.editScheduleInfo?.attackId,
        isUnknown: isUnknown,
        unknownRemark: unknownRemark,
        userId: userId,
        remark: document.getElementById("title").value,
        contentsCode: contentsCode,
        difficultyCode: difficultyCode,
        attackDate: datePickerValue,
        limitMember: limitMember,
      };
      if (props.editScheduleInfo?.attackId == undefined) {
        apiAxiosPromise("POST", "/api/raid-calendar-v2", saveObj)
          .then((res) => {
            if (res[0]?.code < 0) {
              alert(res[0]?.codeName);
            } else {
              alert(res[0]?.codeName);
            }
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        apiAxiosPromise("POST", "/api/raid-calendar-v2/update", saveObj)
          .then((res) => {
            if (res[0]?.code < 0) {
              alert(res[0]?.codeName);
            } else {
              alert(res[0]?.codeName);
            }
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  // 닫기버튼 클릭시
  const handleClose = () => {
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open??false}
        
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.editScheduleInfo?.attackId == undefined
                ? "레이드 일정 추가"
                : "레이드 일정 수정"}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="sm"
          sx={{
            justifyContent: "center",
            marginBottom: "100px",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          <List>
            <ListItem key="typoTitle">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ width: "100%", maxWidth: "800px" }}
              >
                파티제목
              </Typography>
            </ListItem>
            <ListItem key="inputTitle">
              <TextField
                id="title"
                label="제목"
                variant="outlined"
                value={title}
                autoFocus
                onChange={(evt) => {
                  if (evt.target.value.length > 39) {
                    alert("40자까지만 입력하세요.");
                  }
                  setTitle(evt.target.value);
                }}
              />
            </ListItem>
            <Divider />
            <ListItem key="typoContentAndDifficulty">
              <Typography variant="body2" color="text.secondary">
                컨텐츠 및 난이도 선택
              </Typography>
            </ListItem>
            <ListItem key="selectContentAndDifficulty">
              <Stack
                direction="row"
                justifyContent="start"
                alignItems="start"
                spacing={0}
                sx={{ width: "100%" }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="컨텐츠"
                  onChange={(evt) => {
                    setContentsCode(evt.target.value);
                  }}
                  value={contentsCode}
                  sx={{ width: "50%" }}
                >
                  {contentsCodeList.map((item, index) => {
                    return (
                      <MenuItem key={item.code} value={item.code}>
                        <Typography variant="body2" color="text.primary">
                          {item.codeName}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="난이도"
                  onChange={(evt) => {
                    setDifficultyCode(evt.target.value);
                  }}
                  value={difficultyCode}
                  sx={{ width: "50%" }}
                >
                  {difficultyCodeList.map((item, index) => {
                    return (
                      <MenuItem key={item.code} value={item.code}>
                        {item.codeName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Stack>
            </ListItem>
            <Divider />
            {/* 날짜 및 시간 선택 시작 */}
            <ListItem>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ width: "100%" }}
              >
                {!isUnknown
                  ? "날짜 및 시간 선택"
                  : "날짜미정의 경우 비고를 입력하세요."}
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={isUnknown}
                    onChange={(evt) => {
                      setIsUnknown(evt.target.checked);
                    }}
                  />
                }
                label="날짜미정"
                sx={{ alignSelf: "flex-start", margin: "10px 0px 0px 0px" }}
              />
            </ListItem>
            {/* 날짜미정 false일 경우 일정 선택 */}
            {!isUnknown && (
              <ListItem>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ko"
                >
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Tip! 오전/오후를 알맞게 선택하세요"
                      ampm={true}
                      id="dateTimePicker"
                      value={dayjs(datePickerValue)}
                      onError={() => {
                        console.log("error!");
                      }}
                      slotProps={{ textField: { readOnly: true } }}
                      minutesStep={5}
                      onChange={(val) => {
                        console.log("val : ", val);
                        setDatePickerValue(
                          dayjs(val).format(`YYYY-MM-DD HH:mm`)
                        );
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </ListItem>
            )}
            {/* 날짜미정 true 경우 비고란 입력 */}
            {isUnknown && (
              <ListItem>
                <TextField
                  id="outlined-required"
                  label="ex)이번주말, 태신과 협의"
                  value={unknownRemark}
                  inputProps={{ maxLength: 25 }}
                  onChange={(evt) => {
                    if (evt.target.value.length > 25) {
                      alert("25글자 까지만 입력 가능합니다.");
                      return false;
                    }
                    setUnknownRemark(evt.target.value);
                  }}
                  sx={{ width: "200px", marginTop: "10px" }}
                />
              </ListItem>
            )}
            {/* 날짜 및 시간 선택 끝 */}
            <Divider />
            {/* 최대인원 시작 */}
            <ListItem key="typoLimitMember">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ width: "100%" }}
              >
                최대인원
              </Typography>
            </ListItem>
            <ListItem key="inputLimitMember">
              <TextField
                id="title"
                label="최대인원"
                variant="outlined"
                type="number"
                value={limitMember}
                onChange={(evt) => {
                  if (evt.target.value > 99) {
                    alert("99 까지만 입력 가능합니다.");
                    return false;
                  }
                  setLimitMember(evt.target.value);
                }}
              />
            </ListItem>
            {/* 최대인원 종료 */}
            <Divider />
            <ListItem key="saveBtn" sx={{ justifyContent: "end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
              >
                저장
              </Button>
            </ListItem>
          </List>
        </Container>
      </Dialog>
    </div>
  );
}
