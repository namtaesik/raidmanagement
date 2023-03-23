import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import RaidScheduleCard from "../../components/page-component/Raid/RaidScheduleCard";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import store from "../../store";
export default function Raid() {
  const [schedule, setSchedule] = React.useState([{}]);
  const [isRendered, setIsRendered] = useState(false);
  React.useEffect(() => {
    getRaidCalendar();
    setIsRendered(true);
  }, []);

  if (!store.getState().loginUser.userId) {
    // 없으면 리다이렉트
    return <Navigate to="/" />;
  }
  async function getRaidCalendar() {
    await apiAxiosPromise("GET", "/api/raid-calendar", {})
      .then((res) => {
        console.log(res);
        setSchedule(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div padding={"20px 0px 0px 5px"}>
      {isRendered &&
        schedule?.map((item) => {
          if (item?.attackId != undefined) {
            return (
              // <Grid key={item.atta}>
              <RaidScheduleCard key={item.attackId} RaidSchedule={item} />
              // </Grid>
            );
          }
        })}
    </div>
  );

  // 230117 | 작업필요 | 카드들넣어야함.
}
