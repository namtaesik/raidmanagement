import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { SET_CHARACTER } from "../../../constants/action-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  ListItem,
  Box,
  Typography,
  ListItemText,
  DialogActions,
} from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
export default function BtnDelSchedule(props) {
  const param = {
    page: props.page,
    btnTitle: props.title,
    attackId: props.attackId,
  };
  const userInfo = store.getState().loginUser;
  function btnClick(obj, e) {
    console.log(props.attackId);
    const param = { attackId: props.attackId };
    if (window.confirm("일정을 정말로 삭제하시겠습니까?")) {
      apiAxiosPromise("POST", "/api/raid-calendar/remove", param)
        .then((res) => {
          alert("삭제되었습니다.");
          window.location.reload();
        })
        .catch((err) => {
          alert("에러가 발생했습니다.");
          console.log(err);
        })
        .finally(() => {});
    }
  }
  return (
    <Button variant="contained" size="small" onClick={btnClick}>
      {param.btnTitle}
    </Button>
  );
}
