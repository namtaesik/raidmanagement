import { Fab, SpeedDialIcon } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ContentsCard from "../../components/page-component/RaidV2/ContentsCardV2";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import store from "../../store";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
export default function Raid() {
  // const classes = useStyles();
  const [isRendered, setIsRendered] = useState(false);
  const [contentsCode, setContentsCode] = React.useState([{}]);
  const navigate = useNavigate();
  React.useEffect(() => {
    getContentsCode();
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
      <Grid2 container flexDirection="row" justifyContent="center" alignItems="center" spacing={2} sx={{width:'100vw',maxWidth:'400px',  paddingLeft:'10px',paddingRight:'10px'}} >
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
    );
  }
  // 230117 | 작업필요 | 카드들넣어야함.
}
