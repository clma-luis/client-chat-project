/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cellPhone from "../assets/cellPhone.png";

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
     
     <Box
        component="img"
        sx={{
          height: 500,
          width: 500,
          maxHeight: { xs: 500, md: 500 },
          maxWidth: { xs: 500, md: 500 },
        }}
        alt="teléfono chat"
        src={cellPhone}
      />
    
  
      <Typography color="primary.main" variant="h3">
        Bienvenido, <span>{userName}!</span>
      </Typography>
      <Typography color="primary.main" variant="h5">Por favor selecciona un chat.</Typography>
    </Box>
  );
}


