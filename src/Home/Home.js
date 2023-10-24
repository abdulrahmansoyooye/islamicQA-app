import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";
import {
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  WhatsApp,
} from "@mui/icons-material";
import Loading from "../Loader/Loading";

const Home = ({ mode, setMode }) => {
  const theme = useTheme();
  const light = theme.palette.primary.dark;
  const alt = theme.palette.background.alt;
  const mobileScreens = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [cookies] = useCookies(["access_token"]);
  const id = cookies.access_token?.userId;
  setTimeout(() => {
    setLoading(false);
  }, 4000);
  return (
    <Box>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar mode={mode} setMode={setMode} />
          <Box
            sx={{
              width: mobileScreens ? "90%" : "70%",
              m: "2rem  auto",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                fontSize={"30px"}
                fontWeight="500"
                sx={{
                  m: "1rem",
                }}
              >
                Welcome to Islamic Q&A
              </Typography>
              <Typography variant="h5">
                Your AI-powered Islamic chatbot
              </Typography>
            </Box>

            {/* SECTION 2 */}

            <Box
              sx={{
                display: !mobileScreens && "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <SECTION2
                headText={"Try it"}
                content1={"Can you tell me how to perform Hajj ? "}
                content2={
                  "Can I take my ritual bath alongside with Firday bath ?"
                }
              />
              <SECTION2
                headText={"What can do?"}
                content1={"Simulate islamic answers with human users"}
                content2={"Can provide 10 answers per hour."}
              />
              <SECTION2
                headText={"What can't do?"}
                content1={"My knowledge and abilities are limited by internet."}
                content2={"My ability to communicate is limited to language."}
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                display: "flex",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                m: "2rem auto",
                borderRadius: "2rem",
                width: "50%",
                position: "relative",
                top: "0",
              }}
              onClick={() => navigate(`/user/${id}`)}
            >
              Start Asking
            </Button>
          </Box>
          <Box
            sx={{
              backgroundColor: alt,
              display: "flex",
              p: "1rem",
              alignItems: "center",
              textAlign: "left",
              justifyContent: "space-around",

              fontSize: "14px",
            }}
          >
            <Typography textAlign={"center"}>
              {" "}
              2023 © Soyooye. Crafted By{" "}
              <a
                href="https://www.linkedin.com/in/abdulrahman-soyooye-814435294/"
                style={{
                  color: light,
                }}
              >
                {" "}
                Abdulrahman
              </a>
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
              }}
            >
              <IconButton
                href="https://www.linkedin.com/in/abdulrahman-soyooye-814435294/"
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
              <IconButton href="https://github.com/abdulrahmansoyooye/islamicqa-app">
                <GitHub />
              </IconButton>
              <IconButton href="https://wa.link/3cugzs" target="_blank">
                <WhatsApp />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
const SECTION2 = ({ headText, content1, content2 }) => {
  const theme = useTheme();

  const alt = theme.palette.background.alt;
  const mobileScreens = useMediaQuery("(max-width:800px)");
  return (
    <>
      {mobileScreens && (
        <Typography
          variant="h4"
          fontWeight={"500"}
          textAlign={"center"}
          gridColumn="span 3"
          m="2rem"
        >
          {headText}
        </Typography>
      )}
      <Box
        sx={{
          textAlign: "center",
          m: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {!mobileScreens && (
          <Typography
            variant="h4"
            fontWeight={"500"}
            textAlign={"center"}
            gridColumn="span 3"
            m="2rem"
          >
            {headText}
          </Typography>
        )}
        <Typography
          sx={{
            gridColumn: mobileScreens && "span 3",
            borderRadius: "0.5rem",
            padding: "1rem",
            minHeight: "70px",
            backgroundColor: alt,
          }}
        >
          {content1}
        </Typography>
        <Typography
          sx={{
            gridColumn: mobileScreens && "span 3",
            borderRadius: "0.5rem",
            padding: "1rem",
            minHeight: "60px",

            backgroundColor: alt,
          }}
        >
          {content2}
        </Typography>
      </Box>
    </>
  );
};
export default Home;
