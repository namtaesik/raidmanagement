import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

const CustomCard = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <Card key={item.characterId}>
          <Box sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              width="140"
              image={item.image}
              alt={item.characterName}
            />
            <Box sx={{ flexGrow: 1 }}>
              <CardContent align="left">
                <Typography variant="h5" component="div">
                  {item.characterName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.characterLevel}
                </Typography>
              </CardContent>
            </Box>
            <Button variant="contained">신청</Button>
          </Box>
        </Card>
      ))}
    </>
  );
};

export default CustomCard;
