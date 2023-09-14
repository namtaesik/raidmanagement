import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ContentsCard from "../../components/page-component/RaidV2/ContentsCardV2";
import { apiAxiosPromise } from "../../services/apiAxios/apiAxios";
import store from "../../store";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container, Stack } from "@mui/system";
// 컴포넌트
import JobOfferItem from "../../components/page-component/JobOffer/JobOfferItem";
import { Fab, SpeedDialIcon } from "@mui/material";
import AddJobOffer from "../../components/page-component/JobOffer/AddJobOffer";

export default function JobOffer() {
  // const classes = useStyles();
  const [isRendered, setIsRendered] = useState(false);
  const [jobOfferList, setJobOfferList] = useState([]);

  React.useEffect(() => {
    var tempJobOfferList=[];
    // 데이터 조회
    apiAxiosPromise("GET", "http://localhost:3001/job-offer/list", {})
      .then((res) => {
        res.map(item=>{
          // 댓글조회
          apiAxiosPromise("GET", "http://localhost:3001/job-offer/comment/get", {jobOfferId:item.JobOfferId})
          .then((res2) => {
            tempJobOfferList = [{...item,comments:res2}, ...tempJobOfferList];
            setJobOfferList(tempJobOfferList);
          })
          .catch((err) => {
            alert("오류발생 : ", err);
            console.log(err);
          });
        });
        
      })
      .catch((err) => {
        alert("오류발생 : ", err);
        console.log(err);
      });
      
    setIsRendered(true);
  }, []);
  if (!store.getState().loginUser.userId) {
    // 없으면 리다이렉트
    return <Navigate to="/" />;
  }

  if (!isRendered) {
    return <div>Loading</div>;
  } else {
    return (
      <Container maxWidth="md" sx={{ justifyContent: "center" , marginBottom:'100px'}}>
        <Stack sx={{ alignItems: "center" }}>
          {jobOfferList?.sort((a,b)=>{
        if(a.RegDate > b.RegDate) return -1;
        if(a.RegDate < b.RegDate) return 1;
        return 0;
      }).map((jobOffer) => {
            
            return (
              <JobOfferItem
                key={jobOffer.JobOfferId}
                jobOfferId={jobOffer.JobOfferId}
                userId={jobOffer.UserId}
                image={jobOffer.image}
                characterName={jobOffer.CharacterName}
                mainCharacterName={jobOffer.MainCharacterName}
                className={jobOffer.ClassName}
                level={jobOffer.characterLevel}
                title={jobOffer.Title}
                content={jobOffer.Contents}
                hashTag={jobOffer.HashTagName}
                comments={jobOffer.comments}
              />
            );
          })}
        </Stack>

        <AddJobOffer />
      </Container>
    );
  }
}
