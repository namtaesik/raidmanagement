import React from "react";
export default function getWeekDayString(date) {
  var dt = new Date(date);
  switch (dt.getDay()) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
  }
}
