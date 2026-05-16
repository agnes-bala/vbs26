import { Box } from "@mui/material";
import React from "react";
import Headersection from "src/components/headersection";
import camp from "../assets/camp.jpg";
export default function Newsevents() {
  return (
    <>
      <Box>
        <Headersection />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <img src={camp} alt="" />
      </Box>
    </>
  );
}
