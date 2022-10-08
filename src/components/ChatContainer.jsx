/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
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

export default function ChatContainer({
  currentChat,
  socket,
  contactView,
  setContactView,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
      socketID: socket.id,
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
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

  return (
    <>
      <Container>
        <Box
          sx={{
            width: "100%",
            height: "78px",
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
              "&-thumb:hover": {
                background: "#3B4147",
              },
              " &-thumb ": {
                backgroundColor: "transparent",
                width: "8px",
                borderRadius: "16px",
              },
            },
          }}
          className="chat-messages"
        >
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div className="content ">
                    <Typography
                      color={message.fromSelf ? "primary" : "primary.contrast"}
                      variant="h5"
                    >
                      {message.message}
                    </Typography>
                  </div>
                </div>
              </div>
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
        max-width: 40%;
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
        background-color: #303841;
        font-size: 24px;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #7269ef;
        font-size: 24px;
      }
    }
  }
`;
