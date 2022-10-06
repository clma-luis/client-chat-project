import {
  Avatar,
  Box,
  createMuiTheme,
  Divider,
  Drawer,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountMenu from "../components/AccountMenu";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [background, setBackground] = useState(0);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const content = (
    <>
      {currentUserImage && currentUserImage && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "neutral.900",
        
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "74px",
              display: "flex",
              p: 2,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pl: 2
                }}
              >
                <Avatar>S</Avatar>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AccountMenu />
              </Box>
            </Box>
          </Box>

          <Divider
            sx={{
              borderColor: "neutral.800",
              my: 0.5,
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "neutral.800",
                borderRadius: "16px"
              },
            }}
          >
            {contacts.map((contact, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                    setBackground(index);
                  }}
                  sx={{
                    width: "100%",
                    height: "74px",
                    display: "flex",
                    borderRadius: "8px",
                    cursor: "pointer",
                    mb: 1,
                    p: 1,
                    backgroundColor: background === index && "neutral.700",
                    "&:hover": {
                      backgroundColor: "neutral.700",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Avatar>H</Avatar>
                        </Box>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography color="primary.main" variant="h5">
                          {contact.username}
                        </Typography>
                        <Box sx={{ color: "primary.light" }}>
                          <p>Okay está bien 😊😊</p>
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box sx={{ pt: 1.4, color: "primary.light" }}>
                          <p>2:50</p>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Divider sx={{ borderColor: "#2D3748" }} />
        </Box>
      )}

      {/*  {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )} */}
    </>
  );

  return (
    <Drawer
      anchor="left"
      open
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: matches ? "100vw" : "25vw",
        },
      }}
      variant="permanent"
    >
      {content}
    </Drawer>
  );
}

