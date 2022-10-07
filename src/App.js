import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ColorModeContext from "./shared/hooks/ColorModeContext";
import { getDesignTokens } from "./theme/getDesignTokens";

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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/register"  element={<Register />} />
            <Route path="/login" element={<Login socket={socket} />} />
            <Route path="/setAvatar"  element={<SetAvatar />} />

            <Route path="/" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
