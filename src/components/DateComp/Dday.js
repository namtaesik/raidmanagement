import React, { useState } from "react";
import Moment from "moment";
const getDaysUntilEvent = (eventDate) => {
  const today = Moment().format("YYYY-MM-DD");
  const eventDay = Moment(eventDate).format("YYYY-MM-DD");
  const daysUntilEvent = Moment(eventDay).diff(today, "days");
  return daysUntilEvent;
};
const gethoursUntilEvent = (eventDate) => {
  const today = Moment();
  const daysUntilEvent = Moment(eventDate).diff(today, "hours");
  return daysUntilEvent;
};
const getMinuteUntilEvent = (eventDate) => {
  const today = Moment();
  const daysUntilEvent = Moment(eventDate).diff(today, "minute");
  return daysUntilEvent;
};

export default function Dday(props) {
  var backGroundColor = "#CAE3FF"; // 기본 푸른계열 색
  var fontColor = "black";
  var diffText = "";
  var diffDay = getDaysUntilEvent(props.eventDate);
  if (diffDay > 0) {
    //일자표시
    diffText = diffDay > 0 ? "D-" + diffDay : "D+" + diffDay;
  } else {
    // 시간표시
    var diffHour = gethoursUntilEvent(props.eventDate);
    if (diffHour > 0) {
      backGroundColor = "orange";
      diffText = diffHour + "시간 전";
    } else {
      var diffMinute = getMinuteUntilEvent(props.eventDate);
      // 분 표시
      if (diffMinute > 0) {
        backGroundColor = "red";
        fontColor = "white";
        diffText = diffMinute + "분 전";
      }
      //종료표시
      else {
        backGroundColor = "gray";
        fontColor = "white";
        diffText = "종료";
      }
    }
  }

  return (
    <p
      style={{
        background: backGroundColor,
        color: fontColor,
        borderRadius: "5px",
        fontSize: "12px",
        paddingLeft: "10px",
        paddingRight: "10px",
        userSelect: "none",
        ...props.sx,
      }}
    >
      {diffText}
    </p>
  );
}
