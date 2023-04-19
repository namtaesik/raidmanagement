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
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import store from "../../../store";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import { Stack } from "@mui/system";
import DatePickerPopup from "../../Popup/RaidV2/DatePickerPopup";
export default function BtnUpdateSchedule(props) {
  const [open, setOpen] = React.useState(false);
  const userInfo = store.getState().loginUser;
  function btnClick(obj, e) {
    if (userInfo.userId != props.regUser && userInfo.userGrant != "admin") {
      alert(
        "등록한 사람만 수정이 가능합니다. \n등록자는 " +
          props.regUser +
          " 입니다."
      );
      return false;
    }
    setOpen(true);
  }
  return (
    <div key={userInfo.userId}>
      <Button variant="contained" size="small" onClick={btnClick}>
        {props.title}
      </Button>

      <DatePickerPopup
        open={open}
        attackId={props.attackId}
        isUnknown={props.isUnknown}
        unknownRemark={props.unknownRemark}
        attackDate={props.attackDate}
        remark={props.remark}
        contentsCode={props.contentsCode}
        difficultyCode={props.difficultyCode}
        limitMember={props.limitMember}
        handleClose={() => {
          setOpen(false);
        }}
      ></DatePickerPopup>
    </div>
  );
}
