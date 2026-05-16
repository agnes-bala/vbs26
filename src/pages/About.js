import { Box, Typography } from "@mui/material";
import React from "react";
import tvbackgound from "../assets/tvbackground.svg";
import HeaderSection from "src/components/headersection";

import VBSimage from "../assets/VBS.gif";

import enternow from "../assets/enternow.png";

export default function About() {
  return (
    <>
      <HeaderSection />

      <Box
        sx={{
          backgroundImage: `url(${tvbackgound})`,
          backgroundSize: "cover",
          marginTop: { md: "-2vh", xs: "-2vh" },
          height: "100vh",
          backgroundPosition: {
            xs: "top", // mobile
            sm: "center", // tablet
            md: "top", // desktop
          },
        }}
      >
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={VBSimage}
            alt="Sun"
            sx={{
              width: {
                xs: "300px", // small screens
                sm: "400px", // tablets
                md: "500px", // desktops
              },
              height: "auto",
              marginTop: "30px",
            }}
          />
          <Typography
            variant="h1"
            style={{ color: "white", textAlign: "center" }}
          >
            About us
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "white", width: { xs: "80%", sm: "60%", md: "50%" } }}
          >
            VBS is an acronym of Virtual Bible School, started with the vision
            of sharing the good news to the kids through visual media. First VBS
            program aired during the Corona Lockdown during the year of 2020.
            Every year new programs were introduced to actively engage the kids.
            Online activities, craft time, series, message time, worship time,
            memory verse time, vlog are among the programs. Kids across the
            globe has been blessed by the program.
            <br></br>
            Stay connected with us to know this year VBS Theme! See you soon!
          </Typography>
          <a href="/auth/login">
            <img src={enternow} alt="Enter Now" style={{ marginTop: "28px" }} />
          </a>
          {/* <NavLink
            to="/auth/login"
            style={{
              textDecoration: "none",
              backgroundColor: "orange",
              borderRadius: "4px",
              padding: "4px 16px 4px 16px",
              color: "white",
              fontWeight: "bold",
              marginTop: "32px",
            }}
          >
            Enter Now
          </NavLink> */}
        </Box>
      </Box>
    </>
  );
}
