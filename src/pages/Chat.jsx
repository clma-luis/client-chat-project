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
import jwt_decode from "jwt-decode";

export default function Chat({socket}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const socketChat = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contactView, setContactView] = useState(false);
  const [ActiveUsers, setActiveUsers] = useState([]);

  useEffect( () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if(params.publicKey) {
      const decoded = jwt_decode(params.publicKey);
      localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(decoded))
      localStorage.setItem("X_AUTH_KEY",params.publicKey);
      console.log(decoded)
      setCurrentUser(decoded);
      socket.emit("newUser", {
        userId: decoded.sub,
        email: decoded.email,
        avatarImage: decoded.avatarImage,
        username: decoded.username,
        socketID: socket.id,
      });
    }else{
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      }
      setCurrentUser(
        JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }

    
  }, []);

  useEffect(() => {
    if (currentUser) {
      socketChat.current = io(host);
      socketChat.current.emit("add-user", currentUser.sub);
      socketChat.current.on("newUserResponse", (data) => {
        setActiveUsers(data.filter((user) => user.userId !== currentUser.sub));
      });
    }
  }, [currentUser]);

  useEffect( () => {
    const handleAllUser = async() => {   
       
    if(currentUser?.sub){
      const data = await axios.get(`http://localhost:5000/api/auth/allusers/${currentUser.sub}`);
    setContacts(data?.data.filter(item => item.role !== currentUser.role))
    }
    

    }
    handleAllUser()
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
            socket={socketChat}
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
              <Welcome userName={currentUser?.username}/>
            ) : (
              <ChatContainer
                currentChat={currentChat}
                socket={socketChat}
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
