import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "@emotion/react";
import { ChatOutlined, Close, HomeRounded, Send } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const ChatPage = () => {
  const theme = useTheme();
  const light = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;
  const text = theme.palette.neutral.text;
  const mobileScreens = useMediaQuery("(max-width:800px)");
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [value, setValue] = useState("");
  const [qa, qaToggle] = useState(false);
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const setQA = () => {
    mobileScreens && qaToggle(!qa);
  };
  const GetAnswer = async () => {
    const options = {
      method: "GET",
      url: "https://islam-ai-api.p.rapidapi.com/api/bot",
      params: {
        question: value,
      },
      headers: {
        "X-RapidAPI-Key": "cfe7c39dc6mshc0bd6f5944fcaabp14cf7bjsn1f7a1add45c1",
        "X-RapidAPI-Host": "islam-ai-api.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.status === 200) {
        setLoading(false);
        setAnswer([...answer, response.data.response]);
      }
    } catch (error) {
      setResponse({ message: error.message, Code: error.code });
      console.log(error);
      setLoading(false);
    }
  };

  const submitQuestion = () => {
    setValue("");
    setResponse("");
    setLoading(true);
    setQuestion([...question, value]);
    GetAnswer();
  };
  useMemo(() => {
    scrollToBottom();
  }, [question]);
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {/* Chat Archive*/}
      <Box
        sx={{
          display: mobileScreens && qa && "none",
          backgroundColor: alt,
          width: mobileScreens ? "100%" : "30%",
          height: "100vh",
          borderRight: `3px solid ${alt}`,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "2rem",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h4" fontWeight={"500"} color={text}>
              Chat Archive
            </Typography>
            <Typography fontSize={"12px"}>200+ conversations</Typography>
          </Box>{" "}
          <IconButton onClick={() => navigate("/")}>
            <HomeRounded />
          </IconButton>{" "}
        </Box>

        {/* Chat */}
        <Box>
          <Chat setQA={setQA} />
          <Chat setQA={setQA} />
          <Chat setQA={setQA} />
        </Box>
      </Box>
      {/* Q & A */}
      <Box
        sx={{
          display: mobileScreens && !qa ? "none" : "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          gap: "2rem",
          width: "100%",
          height: "100vh",
        }}
      >
        {/* <Box> */}
        {mobileScreens ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: alt,
            }}
          >
            <IconButton
              sx={{
                width: "20%",
                m: "1rem 0",
              }}
              onClick={() => qaToggle(!qa)}
            >
              <Close />
            </IconButton>
            <Typography variant="h4" fontWeight={"500"} textAlign={"center"}>
              Islamic QA
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              backgroundColor: alt,
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                width: "20%",
                m: "1rem 0",
              }}
              onClick={() => qaToggle(!qa)}
            >
              <ChatOutlined />
            </IconButton>
            <Typography variant="h4" fontWeight={"500"} textAlign={"center"}>
              Islamic QA
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {/* Chat Box */}
          {question.map((value, index) => (
            <Box key={`box-${index}`}>
              {/* Question Area */}
              <Divider />
              <Box
                sx={{
                  backgroundColor: alt,
                  wordBreak: "break-word",
                  p: "2rem 4rem",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <Avatar
                  sx={{
                    width: "34px",
                    height: "34px",
                    fontSize: "14px",
                    backgroundColor: light,
                    color: text,
                  }}
                >
                  {cookies.access_token
                    ? cookies.access_token.username.toUpperCase().slice(0, 2)
                    : "NA"}
                </Avatar>
                <Typography fontSize="16px"> {value}</Typography>
              </Box>
              <Divider />

              {/* Answer Area */}

              <Box
                sx={{
                  borderRadius: "0.5rem",
                  display: "flex",
                  gap: "1rem",
                  p: "2rem 3rem",
                  height: "50vh",
                  lineHeight: "1.3",
                }}
              >
                {loading ? (
                  <LinearProgress
                    sx={{
                      color: alt,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      wordBreak: "break-word",
                      display: response ? "none" : "flex",
                      gap: "1rem",
                      width: "100%",
                    }}
                  >
                    <ChatOutlined />
                    <Typography>
                      <TypeAnimation
                        sequence={[answer[index], 1000]}
                        speed={60}
                        style={{ fontSize: "16px" }}
                        cursor="false"
                      />
                    </Typography>
                  </Box>
                )}
                {response && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: "1rem",
                      backgroundColor: alt,
                      width: "100%",
                      height: "50%",
                    }}
                  >
                    <AlertTitle>{response.Code}</AlertTitle>
                    <Typography> {response.message}</Typography>
                  </Alert>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        {/* Question */}
        <Box
          sx={{
            display: "flex",
            gap: "0",
            position: "relative",
            borderTop: "1px solid #9e9999cc",
          }}
        >
          <TextField
            sx={{
              width: "75%",
              m: "1rem auto",

              backgroundColor: alt,
              padding: "1.5rem",
              borderRadius: "0.5rem",
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant="standard"
            placeholder="Ask a question"
            InputProps={{
              disableUnderline: true,
            }}
          />
          {value !== "" && (
            <IconButton
              onClick={submitQuestion}
              sx={{
                position: "absolute",
                right: "4rem",
                top: "2rem",
              }}
            >
              <Send />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};
const Chat = ({ setQA }) => {
  const theme = useTheme();
  const light = theme.palette.neutral.light;

  return (
    <Box
      onClick={() => setQA()}
      sx={{
        width: "100%",
        p: "1rem",
        m: "0.5rem 0",
        gap: "1rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{
          backgroundColor: light,
        }}
      >
        <ChatOutlined />
      </IconButton>
      <Typography fontSize={"13px"}>200+ conversations</Typography>
    </Box>
  );
};
export default ChatPage;
