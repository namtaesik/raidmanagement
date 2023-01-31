import React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
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
} from "@mui/material";
export default function BtnSignUp(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const param = {
    page: props.page,
    btnTitle: props.title,
  };
  const user = useSelector((state) => state.loginUser);
  function btnClick(obj, e) {
    setOpen(true);
  }
  console.log(user);
  return (
    <>
      <Button size="small" onClick={btnClick}>
        {param.btnTitle}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>원정대명 {user.expedition_name}님</DialogTitle>
        <DialogContent>
          <DialogContentText>캐릭터를 선택하세요.</DialogContentText>

          {user.characters.map((item, index) => {
            return (
              <ListItem
                key={item.name}
                disableGutters
                secondaryAction={
                  <Button
                    size="small"
                    onClick={() => {
                      alert(item.name);
                    }}
                  >
                    신청
                  </Button>
                }
              >
                <Box>
                  <ListItemText primary={item.name}></ListItemText>
                </Box>
              </ListItem>
            );
          })}

          <Divider />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
