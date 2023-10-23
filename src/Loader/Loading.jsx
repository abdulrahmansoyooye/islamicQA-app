import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import image from "../images-removebg-preview.png";
import "./Loader.css";
const Loading = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;

  return (
    <Box
      sx={{
        position: "relative",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",

        backgroundColor: alt,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <img
        src={image}
        alt="not"
        className="image"
        style={{
          width: "70px",
          height: "70px",
        }}
      />
    </Box>
  );
};

export default Loading;
