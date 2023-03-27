import { MenuItem, Select } from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment/moment";
import { useEffect, useState } from "react";

export default function CustomDatePicker() {
  const now = moment(); // 현재 날짜
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [yearList, setyearList] = useState([]);
  const [monthList, setmonthList] = useState([]);
  const [dayList, setDayList] = useState([]);

  useEffect(() => {
    for (let i = -1; i <= 1; i++) {
      const year = now.clone().add(i, "month").format("YYYY"); // 앞뒤 1월의 연도를 구함
      const month = now.clone().add(i, "month").format("M"); // 앞뒤 1월의 연도를 구함
      var yList = [];
      var mList = [];
      console.log(month);
      if (!yList.includes(year)) {
        yList.push(year); // 중복되지 않는 연도만 리스트에 추가
      }
      if (!mList.includes(month)) {
        mList.push(month); // 중복되지 않는 연도만 리스트에 추가
      }
    }
    setyearList(yList);
    setmonthList(mList);
  }, []);
  useEffect(() => {
    const day = 1;
    var dList = [];

    var trueMonth = month - 1;
    console.log("month", trueMonth);
    console.log(moment({ year, month: trueMonth, day }).endOf("month").date());
    for (
      let i = 1;
      i <= moment({ year, month: trueMonth, day }).endOf("month").date();
      i++
    ) {
      dList.push(i);
    }
    setDayList(dList);
  }, [month]);
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="년"
        onChange={(evt) => {
          console.log(evt.target.value);
          setYear(evt.target.value);
        }}
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
        }}
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
          console.log(evt.target.value);
          setDay(evt.target.value);
        }}
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
  );
}
