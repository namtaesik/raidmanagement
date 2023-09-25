import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import ProfileImage from "../../../components/UserInfo/ProfileImage";
import { AccountCircle, DeleteForever, ExpandMore, InfoOutlined, ModeEdit, MoreVert } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DatePickerPopupV2 from "./DatePickerPopupV2";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import store from "../../../store";
import { Stack } from "@mui/system";
export default function ScheduleItem({ ScheduleProps }) {
  //dayjs 한국어 설정
  dayjs.locale("ko");
  // 참여자 관련
  const [expanded, setExpanded] = React.useState(false); // 참여자정보 expand
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [partyData, setPartyData] = React.useState([{}]); // 참여자리스트
  var currentUserId = store.getState().loginUser.userId; //로그인자 아이디
  const [open, setOpen] = React.useState(false); // 일정 수정 팝업
  // 스케줄 수정 popover 버튼 관련
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNoAuth, setAnchorElNoAuth] = React.useState(null);
  const openMain = Boolean(anchorEl);
  const openMainNoAuth = Boolean(anchorElNoAuth);
  const id = openMain ? "simple-popover" : undefined;
  const noAuthId = openMainNoAuth ? "no-auth-popover" : undefined;
  // 스케줄 수정 팝업 변수
  const [editOpen, setEditOpen] = React.useState(false);
  const handleClickAuth = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickNoAuth = (event) => {
    setAnchorElNoAuth(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNoAuth = () => {
    setAnchorElNoAuth(null);
  };
  // 게시글 삭제
  const onClickDeleteOffer = () => {
    if (window.confirm("레이드 일정을 삭제하시겠습니까?")) {
      const param = { attackId: ScheduleProps.attackId };
      apiAxiosPromise("POST", "/api/raid-calendar-v2/remove", param)
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
  };
  // 댓글수정 popover 버튼 관련
  const [anchorElComment, setAnchorElComment] = React.useState(null);
  const [anchorElCommentNoAuth, setAnchorElCommentNoAuth] = React.useState(null);
  const [clickedCommentId, setClickedCommentId] = React.useState(0);
  const openMainComment = Boolean(anchorElComment);
  const opennMainCommentNoAuth = Boolean(anchorElCommentNoAuth);
  const idComment = openMain ? "comment-simple-popover" : undefined;
  const noAuthIdComment = opennMainCommentNoAuth ? "comment-no-auth-popover" : undefined;
  const handleClickCommentAuth = (event) => {
    setClickedCommentId(event.currentTarget.value);
    setAnchorElComment(event.currentTarget);
  };
  const handleClickCommentNoAuth = (event) => {
    setAnchorElCommentNoAuth(event.currentTarget);
  };
  const handleCommentClose = () => {
    setAnchorElComment(null);
  };
  const handleCloseCommentNoAuth = () => {
    setAnchorElCommentNoAuth(null);
  };
  const onClickCommentDelete = (id) => {
    //     if(window.confirm('댓글을 삭제하시겠습니까?')){
    //         apiAxiosPromise("POST", "/api/job-offer/comment/delete", {jobOfferId:jobOfferId,commentId:clickedCommentId })
    //          .then((res) => {
    //            alert('삭제되었습니다.');
    //            window.location.reload();
    //          })
    //          .catch((err) => {
    //            alert("오류발생 : "+ err);
    //            console.log(err);
    //          });
    //     }
  };

  // 최초실행들
  React.useEffect(() => {
    apiAxiosPromise("GET", "/api/raid-calendar-v2/detail", { attackId: ScheduleProps.attackId }).then((res) => {
      setPartyData(res);
      //console.log('참석자',partyData)
    });
    // 데이터 담기
  }, []);
  console.log(ScheduleProps);
  return (
    <Card sx={{ width: "100%", maxWidth: 552, marginTop: "12px" }} key={ScheduleProps.attackId}>
      {/* 작성자 정보영역 시작 */}
      <CardHeader
        sx={{ paddingBottom: "0px" }}
        action={
          // 햄버거 버튼
          ScheduleProps.regUser == currentUserId ? (
            <IconButton aria-label="settings" aria-describedby={id} onClick={handleClickAuth}>
              <MoreVert />
            </IconButton>
          ) : (
            ""
          )
        }
        title={ScheduleProps.contentsName + " " + ScheduleProps.difficultyName}
        subheader={ScheduleProps.isUnknown ? ScheduleProps.unknownRemark : dayjs(ScheduleProps.attackDate).format("M월D일 HH시mm분(ddd)")}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary" style={{ whiteSpace: "pre-wrap" }}>
          {ScheduleProps.isUnknown ? ScheduleProps.unknownRemark : ScheduleProps.remark}
        </Typography>
      </CardContent>
      <CardActions onClick={handleExpandClick}>
        <Typography variant="body2" color="text.secondary">
          참여자 보기
        </Typography>
        <ExpandMore expand={expanded} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {/* 수정 Popover 시작 */}
      <Popover
        id={id}
        open={openMain}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemButton
              onClick={() => {
                setOpen(true);
              }}
            >
              <ListItemIcon>
                <ModeEdit />
              </ListItemIcon>
              <ListItemText primary="수정" />
            </ListItemButton>
            <DatePickerPopupV2
              contentsCode={ScheduleProps.contentsCode}
              attackId={ScheduleProps.attackId}
              isUnknown={ScheduleProps.isUnknown}
              unknownRemark={ScheduleProps.unknownRemark}
              attackDate={ScheduleProps.attackDate}
              remark={ScheduleProps.remark}
              difficultyCode={ScheduleProps.difficultyCode}
              limitMember={ScheduleProps.limitMember}
              open={open}
              handleClose={() => {
                setOpen(false);
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemButton onClick={onClickDeleteOffer}>
              <ListItemIcon>
                <DeleteForever />
              </ListItemIcon>
              <ListItemText primary="삭제" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>

      {/* 수정 Popover 끝 */}
      {/* 참석자 리스트 시작 */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {partyData?.map((item) => {
          return (
            <CardContent key={item.attackId + "-" + item.userId}>
              {/* 유저정보 시작 */}
              <CardHeader
                avatar={item.image != undefined && item.image != "" ? <ProfileImage imageName={item.image} size={"32px"} /> : <AccountCircleIcon sx={{ fontSize: "32px" }} />}
                action={
                  // 햄버거 버튼
                  item.CommentUserId == currentUserId ? (
                    <IconButton aria-label="settings" aria-describedby={id} onClick={handleClickCommentAuth} value={item.CommentId}>
                      <MoreVertIcon />
                    </IconButton>
                  ) : (
                    <></>
                  )
                }
                title={item.characterName}
                subheader={
                  <Stack direction="row" spacing={1}>
                    <Chip label={item.className} variant="outlined" size="small" color="primary" />
                    <Chip label={item.characterLevel} variant="outlined" size="small" color="primary" />
                  </Stack>
                }
                sx={{ padding: "2px 0px 10px 2px" }}
              />
              <CardContent sx={{ padding: "3px" }}>
                <Typography variant="body2" color="text.primary" style={{ whiteSpace: "pre-wrap" }}>
                  {item.remarkDetail}
                </Typography>
              </CardContent>
              {/* 댓글 수정 Popover 시작 */}
              <Popover
                id={idComment}
                open={openMainComment}
                anchorEl={anchorElComment}
                onClose={handleCommentClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  {/* <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    
                                    <ModeEdit/>
                                </ListItemIcon>
                                <ListItemText primary="수정"/>
                            </ListItemButton>
                        </ListItem> */}
                  <ListItem>
                    <ListItemButton onClick={onClickCommentDelete}>
                      <ListItemIcon>
                        <DeleteForever />
                      </ListItemIcon>
                      <ListItemText primary="삭제" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
              {/* 댓글 수정 Popover 끝 */}
              {/* 댓글 수정권한없는 Popover 시작 */}
              <></>
              {/* 댓글 수정권한없는 Popover 끝 */}
              {/* 유저정보 및 댓글 끝 */}
              {/* 대댓글 시작 */}
              {item.CommentDetails?.map((detail) => {
                return (
                  <CardContent key={item.jobOfferId + "-" + item.CommentId + "-" + detail.CommentDetailId}>
                    <CardHeader
                      avatar={detail.image != undefined && detail.image != "" ? <ProfileImage imageName={detail.image} size={"32px"} /> : <AccountCircleIcon sx={{ fontSize: "32px" }} />}
                      title={detail.CommentDetailMainCharacterName}
                      subheader={detail.CommentDetail}
                    />
                  </CardContent>
                );
              })}
              {/* 대댓글 끝 */}
              <Divider />
            </CardContent>
          );
        })}
      </Collapse>
      {/* 참석자 리스트 끝 */}
    </Card>
  );
}
