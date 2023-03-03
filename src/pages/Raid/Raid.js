import React, { useEffect, useState } from "react";
import RaidScheduleCard from "../../components/Raid/RaidScheduleCard";
import axios from "axios";
export default function Raid() {
  //   axios
  //     .get("http://127.0.0.1:64602/api/RaidCardSelectList", {
  //       headers: {
  //         Authorization: "AIzaSyAp7b4zwx3v_22j0xuX3qrmkvB0mst9gfI",
  //         AccessControlAllowOrigin: false,
  //       },
  //     })
  //     .then((result) => {
  //       console.log(result.data);
  //     });
  const party = [
    {
      RaidId: 1,
      AttackDate: "2023-03-03 13:30",
      RaidCode: "Cucu",
      RaidName: "타이틀",
    },
  ];
  return party.map((item, index) => {
    return <RaidScheduleCard key={item.RaidId} RaidSchedule={item} />;
  });
  // 230117 | 작업필요 | 카드들넣어야함.
}
