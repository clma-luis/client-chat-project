import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, IconButton, TextField } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { borderRadius } from "@mui/system";

export default function ChatInput({ handleSendMsg }) {
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
              backgroundColor: "neutral.900",
              height: "100%" ,
           
          
            }}
            className="button-container"
          >
            <div className="emoji">
              <IconButton>
                 <EmojiEmotionsIcon
                color="primary"
                onClick={handleEmojiPickerhideShow}
              />
              </IconButton>
             
              {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
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
              borderLeft: "1px solid",
              borderColor: "neutral.800",
              width: "90%",
              pl: 1,
            }}
            InputProps={{
              disableUnderline: true,
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
            <Button type="submit">
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </form>
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
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
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
          background-color: #080420;
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
    background-color: "secondary";
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
    button {
      padding: 0.3rem 2rem;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
