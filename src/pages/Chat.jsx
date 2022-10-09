/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";

export default function Chat() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contactView, setContactView] = useState(false);
  const [ActiveUsers, setActiveUsers] = useState([]);



  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
      socket.current.on("newUserResponse", (data) => {
        setActiveUsers(data.filter((user) => user.userId !== currentUser._id));
      });
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data.filter((item)=> item.role !== currentUser.role));

      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };



  return (
    <>
      <Grid container>
        <Grid
          item
          xs={contactView && matches ? 0 : 3}
          sx={{ backgroundColor: "neutral.1000" }}
        >
          <Contacts
            socket={socket}
            ActiveUsers={ActiveUsers}
            contacts={contacts}
            changeChat={handleChatChange}
            contactView={contactView}
            setContactView={setContactView}
          />
        </Grid>
        <Grid item xs={contactView && matches ? 12 : 9}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "neutral.1000",
            }}
          >
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                socket={socket}
                contactView={contactView}
                setContactView={setContactView}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
