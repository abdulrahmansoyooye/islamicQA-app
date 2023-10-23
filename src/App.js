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
function App() {
  const [cookies] = useCookies(["access_token"]);
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

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
