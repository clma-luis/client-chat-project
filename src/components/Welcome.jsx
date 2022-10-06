import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:" center", alignItems: "center"}}>
      <Box sx={{width: "100%"}}>
    <img src={Robot} alt="" />
      </Box>
  
      <Typography color="primary.main" variant="h3">
        Welcome, <span>{userName}!</span>
      </Typography>
      <Typography color="primary.main" variant="h5">Please select a chat to Start messaging.</Typography>
    </Box>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
