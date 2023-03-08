import React, { useEffect, useState } from "react";
import RaidScheduleCard from "../../components/Raid/RaidScheduleCard";
import axios from "axios";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
export default function Raid() {
  const [schedule, setSchedule] = React.useState([{}]);
  async function getRaidCalendar() {
    var result = await apiAxiosPromise("GET", "/api/raid-calendar", {});
    // console.log("resuilt", result);
    setSchedule(result);
    return result;
  }
  React.useEffect(() => {
    getRaidCalendar();
  }, []);

  const party = [
    {
      RaidId: 1,
      AttackDate: "2023-03-03 13:30",
      RaidCode: "Cucu",
      RaidName: "타이틀",
    },
  ];
  return schedule.map((item, index) => {
    return <RaidScheduleCard key={item.attackId} RaidSchedule={item} />;
  });
  // 230117 | 작업필요 | 카드들넣어야함.
}
