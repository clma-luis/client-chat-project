import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, IconButton, TextField, useTheme } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function ChatInput({ handleSendMsg }) {
  const theme = useTheme();

  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "neutral.900",
            height: "98%",
            width: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="button-container"
        >
          <div className="emoji">
            <IconButton onClick={handleEmojiPickerhideShow}>
              <EmojiEmotionsIcon color="primary" fontSize="medium" />
            </IconButton>

            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}

             <IconButton>
              <AttachFileIcon color="primary" fontSize="medium" />
            </IconButton>
          </div>
  
        </Box>
        <form className="input-container" onSubmit={(event) => sendChat(event)}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              height: "100%",
              backgroundColor: "neutral.900",
            }}
          >
            <TextField
              id="standard-multiline-static"
              placeholder="Escribe tu mensaje"
              multiline
              rows={3}
              defaultValue="Default Value"
              variant="standard"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              sx={{
                width: "100%",
                borderLeft: "1px solid",
                borderColor: "neutral.800",
                pl: 2,
                pr: 2,
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  color: theme.palette.mode === "dark" ? "white" : "black",
                },
              }}
            />

            <Box
              sx={{
                borderLeft: "1px solid",
                borderColor: "neutral.800",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  p: 1,
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                }}
                type="submit"
              >
                <SendIcon color="primary" />
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .button-container {


    gap: 1rem;
    .emoji {
      position: relative;

      svg {
  
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -360px;
        background-color: #262e35;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #262e35;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 2rem;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
  }
`;
