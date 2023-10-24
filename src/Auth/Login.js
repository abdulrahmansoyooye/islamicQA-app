import { FacebookOutlined, Google } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useTheme } from "@emotion/react";
import { useCookies } from "react-cookie";
import image from "../images-removebg-preview.png";

import axios from "axios";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",

    password: "",
  });
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { username, password } = userData;
  const { user, setUser } = useContext(UserContext);

  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const background = theme.palette.background.default;
  const text = theme.palette.primary.dark;
  const text1 = theme.palette.neutral.text;
  const mobileScreens = useMediaQuery("(max-width:800px)");
  const [cookies, setCookie] = useCookies(["access_token"]);

  const submitForm = async (e) => {
    e.preventDefault();
    setResponse("");
    setUserData({ username: "", password: "" });
    setLoading(true);
    try {
      const res = await axios.post(
        "https://islamicqa-server.onrender.com/users/login",
        userData
      );
      if (res.status === 200) {
        setCookie("access_token", res.data);
        navigate("/");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setResponse({
        message: error.message,
        Code: error?.response.data.message,
      });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        width: mobileScreens ? "80%" : "40%",
        m: "3rem  auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
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
        <Typography
          fontSize={"28px"}
          fontWeight={"400"}
          textAlign={"center"}
          color={text}
        >
          Islamic Q&A
        </Typography>
      </Box>
      {/* Form */}

      <form
        onSubmit={submitForm}
        style={{
          backgroundColor: alt,
          padding: "1.5rem",
          height: "100%",
          borderRadius: "0.5rem",
        }}
      >
        {/*  */}
        <Typography
          variant="h4"
          fontWeight={"450"}
          textAlign={"left"}
          mb="1rem"
        >
          Login
        </Typography>
        {response && (
          <Alert
            severity="error"
            sx={{
              mb: "1rem",
              backgroundColor: background,
            }}
          >
            <AlertTitle>{response.Code}</AlertTitle>
            <Typography> {response.message}</Typography>
          </Alert>
        )}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            mb: "1rem",
          }}
        >
          <Box
            sx={{
              gridColumn: !mobileScreens ? "1fr" : "span 2",

              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Typography fontWeight={"400"}>Your Name</Typography>
            <TextField
              placeholder="your name"
              fullWidth
              required
              value={username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </Box>

          <Box
            sx={{
              gridColumn: !mobileScreens ? "1fr" : "span 2",

              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Typography fontWeight={"400"}>Password</Typography>
            <TextField
              placeholder="password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Box>
        </Box>

        {/*  Submit*/}
        <Box>
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              display: "flex",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              m: "2rem auto",
              borderRadius: "1rem",
              width: "100%",
            }}
          >
            {loading ? <CircularProgress color="inherit" size={24} /> : "login"}
          </Button>
          <Typography
            textAlign={"center"}
            sx={{ m: "1rem", textDecoration: "underline" }}
            onClick={() => navigate("/auth/register")}
          >
            Don't Have an account?Sign Up here
          </Typography>
        </Box>
        <Divider />
        {/* Google And Facebook Auth */}
        <Typography textAlign={"center"} fontWeight={"500"} mt="1rem">
          OR SIGN IN WITH
        </Typography>
        <Box
          sx={{
            m: "1rem 0",
            display: "flex",
            gap: "1rem",
            flexDirection: mobileScreens && "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: background,
              p: " 1rem 2rem",
              borderRadius: "0.5rem",
              display: "flex",
              minWidth: "150px",
              gap: "0.5rem",
              cursor: "pointer",

              "&:hover": {
                backgroundColor: alt,
              },
            }}
          >
            <Google /> <Typography>Google</Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: background,
              p: "1rem 2rem",
              borderRadius: "0.5rem",
              display: "flex",
              minWidth: "150px",
              gap: "0.5rem",
              cursor: "pointer",

              "&:hover": {
                backgroundColor: alt,
              },
            }}
          >
            <FacebookOutlined /> <Typography>Facebook</Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
