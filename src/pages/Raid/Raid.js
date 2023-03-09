import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import RaidScheduleCard from "../../components/page-component/Raid/RaidScheduleCard";
import axios from "axios";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import { Grid } from "@mui/material";
import store from "../../store";
import { useNavigate } from "react-router-dom";
export default function Raid() {
  const [schedule, setSchedule] = React.useState([{}]);
  const [isRendered, setIsRendered] = useState(false);
  const navigator = useNavigate();
  React.useEffect(() => {
    getRaidCalendar();
    setIsRendered(true);
  }, []);

  if (!store.getState().loginUser.userId) {
    // 없으면 리다이렉트
    return <Navigate to="/" />;
  }
  async function getRaidCalendar() {
    var result = await apiAxiosPromise("GET", "/api/raid-calendar", {});
    // console.log("resuilt", result);
    setSchedule(result);
    return result;
  }

  return (
    <Grid container spacing={1} padding={"20px 0px 0px 5px"}>
      {isRendered &&
        schedule.map((item, index) => {
          return (
            <Grid>
              <RaidScheduleCard key={item.attackId} RaidSchedule={item} />
            </Grid>
          );
        })}
    </Grid>
  );

  // 230117 | 작업필요 | 카드들넣어야함.
}
