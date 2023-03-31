import React, { useState } from "react";
import Moment from "moment";
const getDaysUntilEvent = (eventDate) => {
  const today = Moment();
  const daysUntilEvent = Moment(eventDate).diff(today, "days");
  return daysUntilEvent;
};
export default function Dday(props) {
  const diffDay = getDaysUntilEvent(props.eventDate);
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
      {diffDay > 0 ? "D-" + diffDay : "D+" + diffDay}
    </p>
  );
}
