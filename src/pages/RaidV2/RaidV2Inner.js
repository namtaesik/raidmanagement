import { Fab, SpeedDialIcon } from "@mui/material";
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
export default function Raid(props) {
  const location = useLocation(); // 1. useLocation 훅 취득
  const [schedule, setSchedule] = React.useState([{}]);
  const [isRendered, setIsRendered] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  React.useEffect(() => {
    getRaidCalendar();
    setIsRendered(true);
  }, []);

  if (!store.getState().loginUser.userId) {
    // 없으면 리다이렉트
    return <Navigate to="/" />;
  }
  async function getRaidCalendar() {
    // await apiAxiosPromise("GET", "/api/raid-calendar-v2", {
    await apiAxiosPromise("GET", "/api/raid-calendar-v2", {
      contentsCode: location?.state?.contentsCode??"",
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
      <Container maxWidth="md" sx={{ justifyContent: "center" , marginBottom:'100px', paddingLeft:'2px',paddingRight:'2px'}}>
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
              handleOpen = {()=>{
                setEditOpen(true);
              }}
              />
            );
          }
        })}
        <Box sx={{ height: "80px" }}></Box>
        {/* <Fab
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
        </Fab> */}
        {/* <DatePickerPopup
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
          contentsCode={location.state.contentsCode}
        ></DatePickerPopup> */}
        {!editOpen &&!open&&<Fab
        aria-label="SpeedDial controlled open example"
        size="small"
        direction="right"
        onClick={()=>{setOpen(true);}}
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
      </Fab>}
         <DatePickerPopupV2 contentsCode={location?.state?.contentsCode??""} open={open} handleClose={() => {
            setOpen(false);
          }}/> 
      </Container>
    );
  }
  // 230117 | 작업필요 | 카드들넣어야함.
}
