import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import externalLogin from "./pages/externalLogin";
import Register from "./pages/Register";
import ColorModeContext from "./shared/hooks/ColorModeContext";
import { getDesignTokens } from "./theme/getDesignTokens";
import axios from "axios";

import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:5000")

export default function App() {
  const [mode, setMode] = React.useState("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  //Add authentyication header to axios queries
  axios.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem("X_AUTH_KEY")}`
    return config;
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/register"  element={<Register />} />
            <Route path="/external" element={<externalLogin  socket={socket}/>}/>
            <Route path="/login" element={<Login socket={socket} />} />
            <Route path="/setAvatar"  element={<SetAvatar />} />
            <Route path="/" element={<Chat socket={socket}/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
