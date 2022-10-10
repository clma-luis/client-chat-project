/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountMenu from "../components/AccountMenu";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
export default function ChatContainer({
  currentChat,
  socket,
  contactView,
  setContactView,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const matchImage = useMediaQuery("(max-width:760px)");
  const matchImageMini = useMediaQuery("(max-width:350px)");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data.sub,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  const handleSendMsg = async (msg, image) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data.sub,
      msg,
      image,
      socketID: socket.id,
    });

    await axios.post(sendMessageRoute, {
      from: data.sub,
      to: currentChat._id,
      message: msg,
      image: image,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, image: image });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages);

  return (
    <>
      <Container>
        <Box
          sx={{
            width: "100%",
            height: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
            backgroundColor: "neutral.1000",
            borderBottom: "1px solid ",
            borderColor: "neutral.800",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {contactView && matches && (
              <IconButton onClick={() => setContactView(!contactView)}>
                <ArrowBackIcon color="primary" />
              </IconButton>
            )}
            &nbsp;
            <Avatar alt={currentChat.username} src={currentChat.avatarImage} />
            &nbsp;
            <Typography color="primary.main" variant="h5">
              {currentChat.username}
            </Typography>
          </Box>

          {contactView && matches && (
            <Box>
              <AccountMenu />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
              " &-thumb ": {
                background: "#3B4147",
                width: "8px",
                borderRadius: "16px",
              },
            },
          }}
          className="chat-messages"
        >
          {messages.map((message) => {
            return (
              <Box ref={scrollRef} key={uuidv4()}>
                <Box
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <Box
                  sx={{backgroundColor: message.fromSelf ?  "neutral.900" : "secondary.main"}}
                  className="content ">
                    {message?.image === "" ? "" : (
                      <Box
                        component="img"
                        sx={{
                          height: matchImage
                            ? matchImageMini
                              ? 80
                              : 150
                            : 233,
                            border: "1px solid ",
                        
                            borderRadius: "10px",
                          width: matchImage ? (matchImageMini ? 80 : 150) : 350,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="imagen-chat"
                        src={`${message.image}`}
                      />
                    )}

                    <Typography
                      color={message.fromSelf ? "primary" : "primary.contrast"}
                      variant="h6"
                    >
                      {message.message}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: message.fromSelf
                          ? "flex-start"
                          : "flex-end",
                        alignItems: "center",
                        pt: 2,
                      }}
                    >
                      <AccessTimeIcon
                        color={message.fromSelf ? "primary" : "primary.contrast"}
                        sx={{ fontSize: "16px" }}
                      />
                      &nbsp;
                      <Typography color={ message.fromSelf ? "primary.light" : "primary.contrast"}>
                        {moment(message.time).format("HH:MM")}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box sx={{ height: "80px", m: matches ? 0 : 1 }}>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Box>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.1rem;
  overflow: hidden;

  .chat-header {
    height: 78px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    width: 100%;
    height: auto;
    max-height: 82%;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: scroll;

    .message {
      position: relative;
      display: flex;
      align-items: center;
      .content {
        max-width: 100%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 10px;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;

      .content {
      
        font-size: 24px;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
    
        font-size: 24px;
      }
    }
  }
`;
