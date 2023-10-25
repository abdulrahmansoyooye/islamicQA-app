import { useTheme } from "@emotion/react";
import { Avatar, Box, IconButton } from "@mui/material";
import { DarkMode, LightMode, Login, Logout } from "@mui/icons-material";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import image from "../images-removebg-preview.png";
const Navbar = ({ mode, setMode }) => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const dark = theme.palette.neutral.dark;
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("access_token", { path: "/" });
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: alt,
        borderTop: "1px solid #dde6ed73",
        borderBottom: "1px solid #dde6ed73",
        width: "100%",
        // position: "fixed",
        // top: "0",
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          borderRight: "2px solid #dde6ed73",
          display: "flex",
          gap: "0.75rem",
        }}
      >
        <img
          src={image}
          alt="not"
          style={{
            width: "45px",
            height: "45px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          width: "60%",
        }}
      >
        {" "}
        <IconButton
          onClick={() => (mode === "dark" ? setMode("light") : setMode("dark"))}
        >
          {mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
        {cookies.access_token ? (
          <IconButton onClick={logout}>
            <Logout />
          </IconButton>
        ) : (
          <IconButton onClick={() => navigate("/auth/login")}>
            <Login />
          </IconButton>
        )}
        <Avatar
          sx={{
            width: "28px",
            height: "28px",
            fontSize: "14px",
            backgroundColor: dark,
          }}
        >
          {cookies.access_token
            ? cookies.access_token.username.toUpperCase().slice(0, 2)
            : "NA"}
        </Avatar>
      </Box>
    </Box>
  );
};

export default Navbar;
