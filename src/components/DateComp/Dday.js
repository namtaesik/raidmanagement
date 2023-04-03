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
export default function Dday(props) {
  var diffText = "";
  var diffDay = getDaysUntilEvent(props.eventDate);
  if (diffDay == 0) {
    diffDay = gethoursUntilEvent(props.eventDate);
    diffText = diffDay + "시간 전";
  } else {
    diffText = diffDay > 0 ? "D-" + diffDay : "D+" + diffDay;
  }

  return (
    <p
      style={{
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
