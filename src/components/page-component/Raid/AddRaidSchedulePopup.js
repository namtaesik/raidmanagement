import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import store from "../../store";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  ListItem,
  Box,
  Typography,
  ListItemText,
  Divider,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SET_USER, SET_CHARACTER } from "../../constants/action-types";
export default function LoginPopup(props) {
  const [raidScheduleInfo, setraidScheduleInfo] = useState({
    attackDate: "",
    bossCode: "",
  });

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth={false}>
        <DialogTitle>일정 추가</DialogTitle>
        <DialogContent>
          <ListItem key="attackDate">
            <TextField
              required
              id="outlined-required"
              label="날짜"
              onChange={(evt) => {
                loginModel.userId = evt.target.value;
                console.log("loginModel", loginModel);
              }}
              sx={{ width: "200px" }}
            />
          </ListItem>
          <ListItem>
            <InputLabel id="demo-simple-select-label">클래스</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rootClassCode}
              label="뿌리클래스"
              onChange={handleRootClassChange}
            >
              {rootClass.map((item, index) => {
                return (
                  <MenuItem key={item.code} value={item.code}>
                    {item.codeName}
                  </MenuItem>
                );
              })}
            </Select>
          </ListItem>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} variant="contained">
            확인
          </Button>
          <Button onClick={props.handleClose} variant="outlined">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
