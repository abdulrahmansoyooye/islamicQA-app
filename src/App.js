import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { themeSetting } from "./theme";
import ChatPage from "./Chat/ChatPage";
import { UserContext } from "./context/userContext";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { useCookies } from "react-cookie";
import AnimatedCursor from "react-animated-cursor";
function App() {
  const [cookies] = useCookies(["access_token"]);
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnimatedCursor
          innerSize={8}
          color="148, 0, 255"
          outerSize={8}
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
        />
        <Routes>
          <Route index element={<Home mode={mode} setMode={setMode} />} />
          <Route
            path="/user/:id"
            element={cookies.access_token ? <ChatPage /> : <Login />}
          />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
