// @mui

import { Box, Typography } from "@mui/material";
// _mock
// components
import Page from "../components/Page";

import tvbackgound from "../assets/tvbackground.svg";
import HeaderSection from "src/components/headersection";

import VBSimage from "../assets/VBS.gif";
// ----------------------------------------------------------------------

// const RootStyle = styled("div")(({ theme }) => ({
//   overflow: "hidden",
//   position: "relative",
//   backgroundColor: theme.palette.background.default,
// }));

// ----------------------------------------------------------------------

export default function Contact() {
  return (
    <Page title="Contact Us">
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
            Contact Us
          </Typography>
          <br></br>
          <Typography sx={{ color: "white", fontWeight: "bold" }}>
            Jesus Redeems Kids Ministry
          </Typography>
          <Typography sx={{ color: "white", }}>
            Jesus Redeems Ministries
          </Typography>
          <Typography sx={{ color: "white",  }}>
            Vineyard of God
          </Typography>
          <Typography sx={{ color: "white" }}>
            Nalumavadi, Tuticorin District,
          </Typography>
          <Typography sx={{ color: "white" }}>
            Tamil Nadu - 628 211, India
          </Typography>
          <Typography sx={{ color: "white" }}>Email : kids@jesusredeems.org</Typography>
          <Typography sx={{ color: "white" }}>Whatsapp : 9488375315</Typography>
          <Typography sx={{ color: "white" }}>Telephone : 04639 353535</Typography>
        </Box>
      </Box>
    </Page>
  );
}
