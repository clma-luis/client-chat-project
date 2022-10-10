import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Fab,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function ChatInput({ handleSendMsg }) {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState("");
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
    if (msg !== "" ) {
      handleSendMsg(msg, image );
      setMsg("");
      setImage("")
    }

  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    setImage(  base64 );
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
            width: matches ? "4" : "4%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="button-container"
        >
          <div className="emoji">
            <IconButton onClick={handleEmojiPickerhideShow}>
              <EmojiEmotionsIcon
                color="primary"
                fontSize="medium"
    
              />
            </IconButton>

            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}

            {/*           <IconButton>
              <AttachFileIcon color="primary" fontSize="medium" />
            </IconButton> */}
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
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />

              <Box
                sx={{
                  width: matches ? "80%" :  "100%",
                  mr: 2,
                  height: "100%",
                  display: "flex",
                  justifyContent: matches ? "flex-end" : "center",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                
                <AddPhotoAlternateIcon color="primary" dontSize="medium" />
               
              </Box>
            </label>

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
                borderLeft: matches ? "" : "1px solid" ,
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
                width: matches ? "40px" : "100&%",
                borderLeft: matches ? "" : "1px solid",
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
