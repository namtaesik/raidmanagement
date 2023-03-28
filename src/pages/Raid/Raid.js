import { Fab, SpeedDialIcon } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import RaidScheduleCard from "../../components/page-component/Raid/RaidScheduleCard";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import DatePickerPopup from "../../components/Popup/Raid/DatePickerPopup";
import store from "../../store";
export default function Raid() {
  // const classes = useStyles();
  const [schedule, setSchedule] = React.useState([{}]);
  const [isRendered, setIsRendered] = useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getRaidCalendar();
    setIsRendered(true);
  }, []);

  if (!store.getState().loginUser.userId) {
    // 없으면 리다이렉트
    return <Navigate to="/" />;
  }
  async function getRaidCalendar() {
    console.log("여기호출");
    await apiAxiosPromise("GET", "/api/raid-calendar", {})
      .then((res) => {
        setSchedule(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (!isRendered) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        {schedule?.map((item) => {
          if (item?.attackId != undefined) {
            return <RaidScheduleCard key={item.attackId} RaidSchedule={item} />;
          }
        })}
        <Fab
          aria-label="SpeedDial controlled open example"
          size="small"
          direction="right"
          onClick={() => {
            setOpen(true);
          }}
          color="primary"
          sx={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 9999,
          }}
        >
          {<SpeedDialIcon />}
        </Fab>
        <DatePickerPopup
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        ></DatePickerPopup>
      </div>
    );
  }
  // 230117 | 작업필요 | 카드들넣어야함.
}
