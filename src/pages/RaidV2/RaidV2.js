import { Fab, SpeedDialIcon } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ContentsCard from "../../components/page-component/RaidV2/ContentsCardV2";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import store from "../../store";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/system";
import moment from "moment";
export default function Raid() {
  // const classes = useStyles();
  const [isRendered, setIsRendered] = useState(false);
  const [contentsCode, setContentsCode] = React.useState([{}]);
  const navigate = useNavigate();
  React.useEffect(() => {
    getContentsCode();
    if(moment() < moment('2023-09-25')){
    alert('[2023.09.19]안내\r\n비밀번호가 \'1\'로 모두 초기화되었습니다.\r\n\'회원정보관리\'메뉴에 들어가서 비밀번호를 변경해주세요.\r\n불편을 드려 죄송합니다.\r\n\r\n해당 메세지는 일요일(2023.09.24)까지 유지하겠습니다.');
    }
  }, []);
  async function getContentsCode() {
    await apiAxiosPromise("GET", "/api/code", { groupCode: "Contents" })
      .then((res) => {
        setContentsCode(res);
        setIsRendered(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (!store.getState().loginUser.userId) {
    // 없으면 리다이렉트
    return <Navigate to="/" />;
  }
  function onClickContents(code) {
    navigate("/RaidV2Inner", { state: { contentsCode: code } });
  }
  if (!isRendered) {
    return <div>Loading</div>;
  } else {
    return (
      <Container fixed maxWidth="sm" sx={{justifyContent:'center'} }>
      <Grid2 container  alignItems="center" spacing={2} sx={{  paddingLeft:'10px',paddingRight:'10px'}} >
        {contentsCode?.map((item) => {
          if (item?.code != undefined) {
            return (
              <ContentsCard
                key={item.code}
                Contents={item}
                onContentsClick={onClickContents}
              />
            );
          }
        })}
      </Grid2>
      </Container>
    );
  }
  // 230117 | 작업필요 | 카드들넣어야함.
}
