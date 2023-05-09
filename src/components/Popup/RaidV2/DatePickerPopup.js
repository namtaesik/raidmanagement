import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import store from "../../../store";
import moment from "moment";
import { useState } from "react";
import { FormControlLabel, MenuItem, Select, Switch } from "@mui/material";
import { Stack } from "@mui/system";

import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  ListItem,
  Box,
  Typography,
  ListItemText,
  Divider,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SET_USER, SET_CHARACTER } from "../../../constants/action-types";
import CustomDatePicker from "../../DatePicker/customDatePicker";
export default function DatePickerPopup(props) {
  const navigator = useNavigate();
  const now = moment(); // 현재 날짜
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [remark, setRemark] = useState("");
  const [yearList, setyearList] = useState([]);
  const [monthList, setmonthList] = useState([]);
  const [dayList, setDayList] = useState([]);
  const hourList = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  const [hour, setHour] = useState(17);
  const minuteList = [0, 10, 20, 30, 40, 50];
  const [minute, setMinute] = useState(30);
  // 날짜 미정관련 state
  const [isUnknown, setIsUnknown] = useState(false);
  const [unknownRemark, setUnknownRemark] = useState("미정");
  // 22.04.18 | 추가 | 컨텐츠 코드, 난이도
  const [contentsCodeList, setContentsCodeList] = useState([{}]);
  const [difficultyCodeList, setDifficultyCodeList] = useState([{}]);
  const [contentsCode, setContentsCode] = useState("Other");
  const [difficultyCode, setDifficultyCode] = useState("");
  // 22.04.19 | 추가 | 유저 수 제한
  const [limitMember, setLimitMember] = useState(0);
  // 유저정보
  const userId = store.getState().loginUser.userId;
  function changeMonth(pMonth) {
    const day = 1;
    var dList = [];

    var trueMonth = pMonth - 1;

    const forDay = trueMonth == moment().month() ? moment().date() : 1;
    for (
      let i = forDay;
      i <= moment({ year, month: trueMonth, day }).endOf("month").date();
      i++
    ) {
      dList.push(i.toString().padStart(2, "0"));
    }
    setDayList(dList);
    setDay(dList[0]);
  }
  // 연/월 날짜 세팅
  useEffect(() => {
    var yList = [];
    var mList = [];
    for (let i = 0; i <= 1; i++) {
      const year = now.clone().add(i, "month").format("YYYY"); // 앞뒤 1월의 연도를 구함
      const month = now.clone().add(i, "month").format("MM"); // 앞뒤 1월의 연도를 구함

      if (!yList.includes(year)) {
        yList.push(year); // 중복되지 않는 연도만 리스트에 추가
      }
      if (!mList.includes(month)) {
        mList.push(month); // 중복되지 않는 연도만 리스트에 추가
      }
    }
    setyearList(yList);
    setYear(yList[0]);
    setmonthList(mList);
    setMonth(mList[0]);
    changeMonth(mList[0]);
    // 수정일경우
    if (props.attackId != undefined) {
      setIsUnknown(props.isUnknown);
      setUnknownRemark(props.unknownRemark);
      setRemark(props.remark);
      // 날짜세팅
      setYear(props.attackDate.substring(0, 4));
      setMonth(props.attackDate.substring(5, 7));
      changeMonth(props.attackDate.substring(5, 7)); // 달바뀜이벤트
      setDay(props.attackDate.substring(8, 10));

      setHour(props.attackDate.substring(11, 13));
      setMinute(props.attackDate.substring(14, 16));
    }
  }, []);
  // 컨텐츠 및 난이도, 제한 인원 수 세팅
  useEffect(() => {
    getContentsCode();
    getDifficultyCode();
    setLimitMember(props.limitMember ?? 8);
  }, []);
  const createCustomDate = (year, month, day, hour, minute) => {
    // moment() 함수를 사용하여 특정 시간을 생성합니다.
    const date = moment()
      .year(year)
      .month(month)
      .date(day)
      .hour(hour)
      .minute(minute);
    return date;
  };
  function handleSubmit() {
    // 예외처리 추가
    if (remark == "") {
      alert("컨텐츠를 입력하세요!");
      return false;
    }
    const ment =
      props.attackId == undefined
        ? "레이드 일정을 등록하시겠습니까?"
        : "레이드 일정을 수정하시겠습니까?";
    if (window.confirm(ment)) {
      const param = {
        attackId: props.attackId,
        attackDate: createCustomDate(
          year,
          month - 1,
          day,

          hour,
          minute
        ).format("YYYY-MM-DD HH:mm"),
        remark: remark,
        isUnknown: isUnknown,
        unknownRemark: unknownRemark,
        userId: userId,
        contentsCode: contentsCode,
        difficultyCode: difficultyCode,
        limitMember: limitMember,
      };
      if (props.attackId == undefined) {
        apiAxiosPromise("POST", "/api/raid-calendar-v2", param)
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
        apiAxiosPromise("POST", "/api/raid-calendar-v2/update", param)
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
  }
  function handleClose() {
    // 값 초기화
    if (props.attackId != undefined) {
      setIsUnknown(props.isUnknown);
      setUnknownRemark(props.unknownRemark);
      setRemark(props.remark);
      // 날짜세팅
      setYear(props.attackDate.substring(0, 4));
      setMonth(props.attackDate.substring(5, 7));
      changeMonth(props.attackDate.substring(5, 7)); // 달바뀜이벤트
      setDay(props.attackDate.substring(8, 10));

      setHour(props.attackDate.substring(11, 13));
      setMinute(props.attackDate.substring(14, 16));
    }
    props.handleClose();
  }
  // 컨텐츠 가져오기
  async function getContentsCode() {
    await apiAxiosPromise("GET", "/api/code", {
      groupCode: "Contents",
    })
      .then((res) => {
        res = res.filter((item) => item.code != "");
        setContentsCodeList(res);
        setContentsCode(
          props.contentsCode == "" ? "Other" : props.contentsCode
        );
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
        setDifficultyCode(props.difficultyCode ?? res[0].code);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (monthList[0] == undefined) {
    return (
      <Dialog open={props.open} onClose={handleClose} fullWidth={false}>
        <DialogTitle> 날짜를 선택하세요.</DialogTitle>
      </Dialog>
    );
  } else {
    return (
      <>
        <Dialog open={props.open} onClose={handleClose} fullWidth={false}>
          <DialogTitle>
            {props.attackId == undefined ? "일정등록" : "일정수정"}
          </DialogTitle>
          <Divider />
          {/*  컨텐츠 선택  */}
          <DialogContent
            sx={{
              paddingLeft: "10px",
              paddingBottom: "0px",
              paddingTop: "0px",
            }}
          >
            <DialogTitle
              sx={{
                fontSize: "1rem",
                userSelect: "none",
                paddingBottom: "0px",
                padding: "16px 0px 0 0 ",
              }}
            >
              {"컨텐츠와 난이도를 선택하세요. "}
            </DialogTitle>{" "}
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="start"
              spacing={0}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="컨텐츠"
                onChange={(evt) => {
                  setContentsCode(evt.target.value);
                }}
                value={contentsCode}
              >
                {contentsCodeList.map((item, index) => {
                  return (
                    <MenuItem key={item.code} value={item.code}>
                      {item.codeName}
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
          </DialogContent>
          <DialogContent
            sx={{
              paddingLeft: "auto",
              paddingBottom: "0px",
              paddingTop: "0px",
            }}
          >
            {/* <FormControlLabel
              control={
                <Switch
                  checked={isUnknown}
                  onChange={(evt) => {
                    setIsUnknown(evt.target.checked);
                  }}
                />
              }
              label="날짜미정"
            /> */}
          </DialogContent>
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
          <DialogContent sx={{ padding: "10px" }}>
            {!isUnknown && (
              <Stack
                direction="column"
                justifyContent="start"
                alignItems="start"
                spacing={0}
                marginTop="0px"
              >
                <DialogTitle
                  sx={{
                    fontSize: "1rem",
                    userSelect: "none",

                    padding: "0px 24px 0 0 ",
                  }}
                >
                  {"날짜를 선택하세요. "}
                </DialogTitle>{" "}
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="년"
                    onChange={(evt) => {
                      setYear(evt.target.value);
                    }}
                    value={year}
                  >
                    {yearList.map((item, index) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="월"
                    onChange={(evt) => {
                      setMonth(evt.target.value);
                      changeMonth(evt.target.value);
                    }}
                    value={month}
                  >
                    {monthList.map((item, index) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="일"
                    onChange={(evt) => {
                      setDay(evt.target.value);
                    }}
                    value={day}
                  >
                    {dayList.map((item, index) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Stack>
                <DialogTitle
                  sx={{
                    fontSize: "1rem",
                    userSelect: "none",
                    padding: "16px 24px 0 0 ",
                  }}
                >
                  {"시간을 선택하세요. "}
                </DialogTitle>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="시간"
                    onChange={(evt) => {
                      setHour(evt.target.value);
                    }}
                    value={hour}
                  >
                    {hourList.map((item, index) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="분"
                    onChange={(evt) => {
                      setMinute(evt.target.value);
                    }}
                    value={minute}
                  >
                    {minuteList.map((item, index) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Stack>
              </Stack>
            )}
            {isUnknown && (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0}
              >
                <DialogTitle sx={{ fontSize: "1rem" }}>
                  {"일정비고를 입력하세요. "}
                </DialogTitle>
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
              </Stack>
            )}
          </DialogContent>
          <Divider />
          <DialogContent
            sx={{
              padding: "10px",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <Stack direction="column" spacing={0}>
              <DialogTitle sx={{ fontSize: "1rem", padding: "16px 24px 0 0 " }}>
                {"최대 인원을 입력하세요. "}
              </DialogTitle>
              <TextField
                id="outlined-required"
                label="ex)8"
                value={limitMember}
                inputProps={{ maxLength: 2 }}
                type="number"
                onChange={(evt) => {
                  if (evt.target.value > 99) {
                    alert("99 까지만 입력 가능합니다.");
                    return false;
                  }
                  setLimitMember(evt.target.value);
                }}
                sx={{ width: "200px", marginTop: "10px" }}
              />
            </Stack>
          </DialogContent>
          <DialogContent sx={{ padding: "10px" }}>
            <Stack direction="column" spacing={0}>
              <DialogTitle
                sx={{
                  fontSize: "1rem",
                  userSelect: "none",
                  padding: "0px 24px 0 0 ",
                }}
              >
                {"파티제목을 입력하세요"}
              </DialogTitle>
              <TextField
                required
                id="outlined-required"
                label="ex)하브14 숙련팟"
                defaultValue={remark}
                inputProps={{ maxLength: 40 }}
                onChange={(evt) => {
                  if (evt.target.value.length > 40) {
                    alert("40글자 까지만 입력 가능합니다.");
                    return false;
                  }
                  setRemark(evt.target.value);
                }}
                sx={{ width: "200px" }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant="contained">
              확인
            </Button>
            <Button onClick={handleClose} variant="outlined">
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
