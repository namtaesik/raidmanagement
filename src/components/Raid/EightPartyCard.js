import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Divider } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import BtnSignUp from "./BtnSignUp";
export default function RaidCard(props) {
  const [open, setOpen] = React.useState(false);

  const card = (
    <Card
      sx={{
        minWidth: 260,
        maxWidth: "calc(100% - 20px)",
        padding: "3px 3px 3px 3px",
        margin: "7px 7px 7px 7px",
        background: "#d08856",
      }}
    >
      <Box
        sx={{ display: "flex" }}
        onClick={() => {
          setOpen(!open);
          //console.log(open);
        }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          2022-01-01(월) 17시 10분
        </Typography>
        <KeyboardArrowDown
          sx={{
            mr: -1,
            opacity: 1,
            transform: open ? "rotate(-180deg)" : "rotate(0)",
            transition: "0.2s",
            marginLeft: "auto",
            marginRight: "10px",
          }}
        />
      </Box>
      {props.party[0] != undefined ? (
        <CardContent>
          {!open && (
            <Typography>자세히 보려면, 카드 상단을 눌러 펼치세요</Typography>
          )}
          {open && (
            <Typography variant="h6" component="div">
              1P
            </Typography>
          )}
          {open &&
            props.party[0].map((item, index) => {
              if (item.expedition_name != "") {
                return (
                  <div key={item.expedition_name}>
                    <ListItem
                      key={item.expedition_name}
                      disableGutters
                      secondaryAction={
                        <Button
                          size="small"
                          onClick={() => {
                            alert(item.name);
                          }}
                        >
                          삭제하기
                        </Button>
                      }
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {item.expedition_name}
                        </Typography>
                        <ListItemText primary={item.name}></ListItemText>
                      </Box>
                    </ListItem>
                    <Divider />
                  </div>
                );
              } else {
                return (
                  <div key={"first" + index}>
                    <ListItem
                      key={"first" + index}
                      disableGutters
                      secondaryAction={<BtnSignUp title="신청하기"></BtnSignUp>}
                    >
                      <Box>
                        <ListItemText primary="신청자가 없습니다. 신청하기를 눌러 참여하세요."></ListItemText>
                      </Box>
                    </ListItem>
                    <Divider />
                  </div>
                );
              }
            })}
        </CardContent>
      ) : (
        ""
      )}
      {props.party.second != undefined ? (
        <CardContent>
          {open && (
            <Typography variant="h6" component="div">
              2P
            </Typography>
          )}
          {open &&
            props.party.second?.map((item, index) => {
              if (item.expedition_name != "") {
                return (
                  <div key={item.expedition_name}>
                    <ListItem
                      key={item.expedition_name}
                      disableGutters
                      secondaryAction={
                        <Button
                          size="small"
                          onClick={() => {
                            alert(item.name);
                          }}
                        >
                          삭제하기
                        </Button>
                      }
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {item.expedition_name}
                        </Typography>
                        <ListItemText primary={item.name}></ListItemText>
                      </Box>
                    </ListItem>
                    <Divider />
                  </div>
                );
              } else {
                return (
                  <div key={"second" + index}>
                    <ListItem
                      key={"first" + index}
                      disableGutters
                      secondaryAction={
                        <Button
                          size="small"
                          onClick={() => {
                            alert(item.name);
                          }}
                        >
                          신청하기
                        </Button>
                      }
                    >
                      <Box>
                        <ListItemText primary="신청자가 없습니다. 신청하기를 눌러 참여하세요."></ListItemText>
                      </Box>
                    </ListItem>
                    <Divider />
                  </div>
                );
              }
            })}
        </CardContent>
      ) : (
        ""
      )}
      <CardActions></CardActions>
    </Card>
  );
  return card;
}
