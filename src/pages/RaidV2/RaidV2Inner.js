import { Dialog, Fab, SpeedDialIcon, Typography } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // useNavigate를 이용하여 받은 state 인자값을 취득하기.
import RaidScheduleCardV2 from "../../components/page-component/RaidV2/RaidScheduleCardV2";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import DatePickerPopup from "../../components/Popup/RaidV2/DatePickerPopup";
import store from "../../store";
import Box from "@mui/material/Box";
import DatePickerPopupV2 from "../../components/Popup/RaidV2/DatePickerPopupV2";
import { Container } from "@mui/system";
import moment from "moment";
import "dayjs/locale/ko";
export default function Raid(props) {
  const location = useLocation(); // 1. useLocation 훅 취득
  const [schedule, setSchedule] = React.useState([{}]);
  const [isRendered, setIsRendered] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editScheduleInfo, setEditScheduleInfo] = React.useState({}); // "일정수정" 클릭 시 클릭한 스케줄의 정보를 담음
  const [evtOpen, setEvtOpen] = React.useState(false);
  React.useEffect(() => {
    getRaidCalendar();
    setIsRendered(true);
    const nowDt = moment();
    if (
      moment("2024-01-28 19:00") > nowDt &&
      moment("2023-12-31 22:00") <= nowDt
    ) {
      setEvtOpen(true);
    }
  }, []);

  if (!store.getState().loginUser.userId) {
    // 없으면 리다이렉트
    return <Navigate to="/" />;
  }
  async function getRaidCalendar() {
    // await apiAxiosPromise("GET", "/api/raid-calendar-v2", {
    await apiAxiosPromise("GET", "/api/raid-calendar-v2", {
      contentsCode: location?.state?.contentsCode ?? "",
    })
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
      <Container
        maxWidth="md"
        sx={{
          justifyContent: "center",
          marginBottom: "100px",
          paddingLeft: "2px",
          paddingRight: "2px",
        }}
      >
        <Dialog
          open={evtOpen}
          onClose={() => {
            setEvtOpen(false);
          }}
          fullWidth
        >
          <Typography variant="h5" align="center">
            ★이벤트 공지★
          </Typography>
          <Typography variant="caption">
            이벤트기간 : 2024/1/1 ~ 2024/1/31
          </Typography>
          <img src={"/images/event.png"} />
          <Typography
            variant="caption"
            sx={{ color: "red", fontWeight: "bold" }}
            align={"center"}
          >
            * 닫으려면 팝업 외부를 클릭하세요 ㅎㅅㅎ
          </Typography>
        </Dialog>
        {schedule?.map((item) => {
          if (item?.attackId != undefined) {
            return (
              <RaidScheduleCardV2
                key={item.attackId}
                RaidSchedule={item}
                open={editOpen}
                handleClose={() => {
                  setEditOpen(false);
                }}
                handleOpen={(RaidSchedule) => {
                  setEditScheduleInfo(RaidSchedule);
                  setEditOpen(true);
                }}
              />
            );
          }
        })}
        {/* 수정팝업 */}
        <DatePickerPopupV2
          open={editOpen}
          editScheduleInfo={editScheduleInfo}
          handleClose={() => {
            //props.handleClose();
            setEditOpen(false);
          }}
        ></DatePickerPopupV2>
        {!editOpen && !open && (
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
              width: "64px",
              height: "64px",

              zIndex: 9999,
            }}
          >
            {<SpeedDialIcon />}
          </Fab>
        )}
        <DatePickerPopupV2
          contentsCode={location?.state?.contentsCode ?? ""}
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
      </Container>
    );
  }
  // 230117 | 작업필요 | 카드들넣어야함.
}
