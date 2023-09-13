
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ContentsCard from "../../components/page-component/RaidV2/ContentsCardV2";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import store from "../../store";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// 230913 | 게시글 컴포넌트
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore } from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container, Stack } from "@mui/system";
import { Divider } from "@mui/material";

export default function JobOffer() {
  // const classes = useStyles();
  const [isRendered, setIsRendered] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  React.useEffect(() => {
    setIsRendered(true);
  }, []);
  if (!store.getState().loginUser.userId) {
    // 없으면 리다이렉트
    return <Navigate to="/" />;
  }
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  if (!isRendered) {
    return <div>Loading</div>;
  } else {
    return (
        <Container maxWidth="sm" sx={{justifyContent:'center'}}>
      <Stack sx={{alignItems:'center'}}>
         <Card sx={{ maxWidth: 552, }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="여기에 캐릭터명"
        subheader="기상 (1555.55)"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
         대충구인공고내용
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Typography variant="body2" paragraph>댓글아이디</Typography>
            <Typography variant="body1" paragraph>댓글작성으 ㄹ길게하여 사용자에게 표시합니다.</Typography>
            <CardContent>
                <Typography variant="body2" paragraph>ㄴ대댓글아이디</Typography>
                <Typography variant="body1" paragraph>대댓글</Typography>
            </CardContent>
        </CardContent>
        <Divider/>
        <CardContent>
        <Typography variant="body2" paragraph>작성자아이디</Typography>
        <Typography variant="body1" paragraph>댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴ댓ㅁㅇㄴㅁㄴㅇ글</Typography>
          
        </CardContent>
      </Collapse>
    </Card>
      </Stack>
      </Container>
    );
  }
}
