import React, { useState } from "react";
import store from "../../../store";
// 230913 | 게시글 컴포넌트
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DeleteForever,  ExpandMore, ModeEdit, RotateLeft, SendOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import ProfileImage from "../../UserInfo/ProfileImage";
import { Box } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import { apiAxiosPromise } from "../../../services/apiAxios/apiAxios";
import Popover from '@mui/material/Popover';
export default function JobOfferItem({ jobOfferId,userId,image, mainCharacterName, characterName, className, level, title, content, hashTag, comments }) {
  const [expanded, setExpanded] = useState(false);
  var currentUserId = store.getState().loginUser.userId;
  // 게시글 수정 popover 버튼 관련
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNoAuth, setAnchorElNoAuth] = React.useState(null);
  const openMain = Boolean(anchorEl);
  const opennMainNoAuth = Boolean(anchorElNoAuth);
  const id = openMain ? 'simple-popover' : undefined;
  const noAuthId = opennMainNoAuth ? 'no-auth-popover' : undefined;
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
  // 댓글수정 popover 버튼 관련
    const [anchorElComment, setAnchorElComment] = React.useState(null);
    const [anchorElCommentNoAuth, setAnchorElCommentNoAuth] = React.useState(null);
    const [clickedCommentId, setClickedCommentId] = React.useState(0);
    const openMainComment = Boolean(anchorElComment);
    const opennMainCommentNoAuth = Boolean(anchorElCommentNoAuth);
    const idComment = openMain ? 'comment-simple-popover' : undefined;
    const noAuthIdComment = opennMainCommentNoAuth ? 'comment-no-auth-popover' : undefined;
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
    const onClickCommentDelete = (id)=>{
        if(window.confirm('댓글을 삭제하시겠습니까?')){
            apiAxiosPromise("POST", "/api/job-offer/comment/delete", {jobOfferId:jobOfferId,commentId:clickedCommentId })
             .then((res) => {
               alert('삭제되었습니다.');
               window.location.reload();
             })
             .catch((err) => {
               alert("오류발생 : "+ err);
               console.log(err);
             });
        }
     }
  // 댓글보기 버튼
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const onClickSend=(evt)=>{
      
    var comment = document.getElementById("commentInput"+jobOfferId).value;
    if(comment =='')
    {
        alert('댓글 내용을 입력하세요.');
        return false;
    }
    apiAxiosPromise("POST", "/api/job-offer/comment/add", {jobOfferId:jobOfferId ,userId:currentUserId,comment:comment})
          .then((res) => {
            alert('저장되었습니다.');
            window.location.reload();
          })
          .catch((err) => {
            alert("오류발생 : ", err);
            console.log(err);
          });
  }
  // 게시글 삭제
  const onClickDeleteOffer = ()=>{
     if(window.confirm('구인공고를 삭제하시겠습니까?')){
         apiAxiosPromise("POST", "/api/job-offer/delete", {jobOfferId:jobOfferId })
          .then((res) => {
            
            alert('삭제되었습니다.');
            window.location.reload();
          })
          .catch((err) => {
            alert("오류발생 : "+ err);
            console.log(err);
          });
     }
  }
  console.log(image);
  return (
    <Card sx={{ width: "100%", maxWidth: 552, marginTop: "12px" }}>
      {/* 작성자 정보영역 시작 */}
      <CardHeader
        avatar={image != undefined && image != "" ? <ProfileImage imageName={image} size={"32px"} /> : <AccountCircleIcon sx={{ fontSize: "32px" }} />}
        action={
          // 햄버거 버튼
          (userId==currentUserId)?<IconButton aria-label="settings" aria-describedby={id} onClick={handleClickAuth}>
            <MoreVertIcon />
            
          </IconButton>:<IconButton aria-label="settings" aria-describedby={noAuthId} onClick={handleClickNoAuth}>
            <MoreVertIcon />
            
          </IconButton>
          
        }
        title={characterName}
        subheader={className + "(" + level + ")"}
      />
      {/* 게시글 수정 Popover 시작 */}
      <Popover
        id={id}
        open={openMain}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List sx={{width:'100%',bgcolor: 'background.paper' }}>
            {/* <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        
                        <ModeEdit/>
                    </ListItemIcon>
                    <ListItemText primary="수정"/>
                </ListItemButton>
            </ListItem> */}
            <ListItem>
                <ListItemButton onClick={onClickDeleteOffer}>
                    <ListItemIcon>
                        <DeleteForever/> 
                    </ListItemIcon>
                    <ListItemText primary="삭제"/>
                </ListItemButton>
            </ListItem>
        </List>
      </Popover>
      {/* 게시글 수정 Popover 끝 */}
      {/* 수정권한없는 Popover 시작 */}
      <Popover
        id={noAuthId}
        open={opennMainNoAuth}
        anchorEl={anchorElNoAuth}
        onClose={handleCloseNoAuth}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List sx={{width:'100%',bgcolor: 'background.paper' }}>
            <ListItem>
                    <ListItemText primary={'작성자의 대표캐릭터는 \''+mainCharacterName+'\' 입니다'}/>
            </ListItem>
        </List>
      </Popover>
      {/* 수정권한없는 Popover 끝 */}
      <CardContent>
        <Typography variant="body1" color="#1976d2" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {content}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {hashTag}
        </Typography>
      </CardContent>
      <CardActions onClick={handleExpandClick}>
        <Typography variant="body2" color="text.secondary">
          댓글보기
        </Typography>
        <ExpandMore expand={expanded} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* 코멘트 생성 */}
        {comments?.map((item) => {
          return (
            <CardContent key={item.jobOfferId + "-" + item.CommentId}>
              {/* 유저정보 및 댓글 시작 */}
              <CardHeader
                avatar={item.image != undefined && item.image != "" ? <ProfileImage imageName={item.image} size={"32px"} /> : <AccountCircleIcon sx={{ fontSize: "32px" }} />}
                action={
                  // 햄버거 버튼
                    (item.CommentUserId==currentUserId)?<IconButton aria-label="settings" aria-describedby={id} onClick={handleClickCommentAuth} value={item.CommentId}>
                    <MoreVertIcon />
                    
                    </IconButton>:<></>
                }
                title={item.CommentMainCharacterName}
                subheader={item.Comment}
              />
                {/* 댓글 수정 Popover 시작 */}
                <Popover
                    id={idComment}
                    open={openMainComment}
                    anchorEl={anchorElComment}
                    onClose={handleCommentClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                >
                    <List sx={{width:'100%',bgcolor: 'background.paper' }}>
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
                                    <DeleteForever/> 
                                </ListItemIcon>
                                <ListItemText primary="삭제"/>
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
        {/* 댓글입력영역 시작 */}
        <Divider/>
        <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        {image != undefined && image != "" ? <ProfileImage imageName={image} size={"32px"} /> : <AccountCircleIcon sx={{ fontSize: "32px" }}/>}
        <TextField id={"commentInput"+jobOfferId} label="내용을 입력하세요" variant="standard" sx={{width:'100%'}}></TextField>
        <SendIcon sx={{backgroundColor:'skyblue', borderRadius:'50%'}} onClick={onClickSend} />
        </Box>
        </CardContent>
        {/* 댓글입력영역 끝 */}
      </Collapse>
    </Card>
  );
}
