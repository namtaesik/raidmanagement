import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

export default function RaidCard() {
    return (
      <Card sx={{ minWidth: 300, padding:"3px 3px 3px 3px", margin:"7px 7px 7px 7px" }}  >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            2022-01-01(월) 17시 10분
          </Typography>
          <Typography variant="h5" component="div">
            여기가 제목이다
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            여기가 서브제목
          </Typography>
          <Typography variant="body2">
            내용이다
            <br />
            {'"이거도 내용이다"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">신청하기</Button>
        </CardActions>
      </Card>
    );
  }