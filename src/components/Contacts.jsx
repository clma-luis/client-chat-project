/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";
import AccountMenu from "../components/AccountMenu";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#06D6A0",
    color: "#06D6A0",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      //animation: "ripple 1.2s infinite ease-in-out",
      //border: "1px solid currentColor",
      content: '""',
    },
  },
  
}));

const StyledBadgeInactive = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "red",
    color: "red",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      //animation: "ripple 1.2s infinite ease-in-out",
     // border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Contacts({
  ActiveUsers,
  contacts,
  changeChat,
  contactView,
  setContactView,
}) {
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
                  pl: 2,
                }}
              >
                <Avatar alt={currentUserName} src={currentUserImage} />
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
              '&-thumb:hover': {
                background: '#3B4147'
              },
              " &-thumb ":{
                "backgroundColor": 'transparent',
                width: "8px",
                borderRadius: "16px",
             
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "neutral.800",
                borderRadius: "16px",
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
                    setContactView(!contactView);
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
                          {ActiveUsers.some(
                            (element) => element.userId === contact._id
                          ) ? (
                            <StyledBadge
                              overlap="circular"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              variant="dot"
                            >
                              <Avatar src={contact.avatarImage} />
                            </StyledBadge>
                          ) : (
                            <StyledBadgeInactive
                              overlap="circular"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              variant="dot"
                            >
                              <Avatar src={contact.avatarImage} />
                            </StyledBadgeInactive>
                          )}
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
        </Box>

    </>
  );

  return (
    <Drawer
      anchor="left"
      open={false}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: matches ? (contactView ? "0px" : "100vw") : "25vw",
        },
      }}
      variant="permanent"
    >
      {content}
    </Drawer>
  );
}
