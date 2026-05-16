// // @mui
// import {
//   Box,
//   Container,
//   Grid,
//   Link,
//   Typography,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// // routes
// // import { PATH_PAGE } from "../../routes/paths";
// // components
// import Logo from "../../components/Logo";

// import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";


// // ----------------------------------------------------------------------


// const RootStyle = styled("div")(({ theme }) => ({
//   position: "relative",
//   backgroundColor: theme.palette.background.default,
// }));

// // ----------------------------------------------------------------------

// export default function MainFooter() {
//   return (
//     <RootStyle>

//       <Box
//         sx={{
//           py: 4,
//           px: 2,
//           backgroundColor: "#07075b",
//           display: "flex",
//           marginTop: -6,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Container maxWidth="md">
//           <Grid container spacing={4}>
//             <Grid item xs={12} sm={4} md={4}>
//               <Logo />

//             </Grid>
//             <Grid
//               item
//               xs={12}
//               sm={6}
//               md={4}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column", // Removed justifyContent: "center"
//               }}
//             >
//               <Typography sx={{ color: "white" }} variant="h6" gutterBottom>
//                 Quick Links
//               </Typography>
//               <Link
//                 sx={{
//                   color: "white",
//                   "&:hover": {
//                     color: "primary.main",
//                     textDecoration: "none",
//                   },
//                 }}
//                 href="/about"
//                 color="inherit"
//                 underline="none"
//                 display="block"

//               >
//                 About Us
//               </Link>

//               <Link
//                 sx={{
//                   color: "white",
//                   "&:hover": {
//                     color: "primary.main",
//                     textDecoration: "none",
//                   },
//                 }}
//                 href="/contact"
//                 color="inherit"
//                 underline="none"
//                 // hoverColor="primary.main"
//                 display="block"
//               >
//                 Contact
//               </Link>
//               <br></br>
//             </Grid>

//             <Grid
//               item
//               xs={12}
//               sm={6}
//               md={4}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column", // Removed justifyContent: "center"
//               }}
//             >
//               <Typography sx={{ color: "white" }} variant="h6" gutterBottom>
//                 Social Links
//               </Typography>
//               <Link
//                 sx={{
//                   color: "white",
//                   "&:hover": {
//                     color: "primary.main",
//                     textDecoration: "none",
//                   },
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   mb: 0.5,
//                 }}
//                 href="https://www.youtube.com/@JollyKidsprograms"
//                 underline="none"
//                 target="_blank"
//               >
//                 <YouTubeIcon />
//                 Youtube
//               </Link>
//               <Link
//                 sx={{
//                   color: "white",
//                   "&:hover": {
//                     color: "primary.main",
//                     textDecoration: "none",
//                   },
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   mb: 0.5,
//                 }}
//                 href="https://www.facebook.com/JesusRedeemsMinistries/"
//                 underline="none"
//                 target="_blank"
//               >
//                 <FacebookOutlinedIcon />
//                 Facebook
//               </Link>
//               <Link
//                 sx={{
//                   color: "white",
//                   "&:hover": {
//                     color: "primary.main",
//                     textDecoration: "none",
//                   },
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   mb: 0.5,
//                 }}
//                 href="https://www.instagram.com/jesusredeems_ministries/"
//                 underline="none"
//                 target="_blank"
//               >
//                 <InstagramIcon />
//                 Instagram
//               </Link>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       <Box textAlign="center">
//         <Typography sx={{ padding: 2 }} variant="body2" color="text.secondary">
//           {/* Copyright © All Rights Reserved {new Date().getFullYear()} Jesus
//           Redeems Ministries. | Powered by Jesus Redeems IT . */}

//           Copyright © Jesus Redeems Ministries. All Rights Reserved {new Date().getFullYear()} | Designed and Powered by Jesus Redeems IT.
//         </Typography>
//       </Box>
//     </RootStyle>
//   );
// }

// @mui
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Logo from "../../components/Logo";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Box
        sx={{
          py: 4,
          px: 2,
          backgroundColor: "#07075b",
          display: "flex",
          marginTop: -6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {/* Logo Section */}
            <Grid item xs={12} sm={4} md={4}>
              <Logo />
            </Grid>

            {/* Quick Links Section - Removed justifyContent: "center" */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ color: "white" }} variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Link
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none",
                  },
                }}
                href="/about"
                color="inherit"
                underline="none"
                display="block"
              >
                About Us
              </Link>
              <Link
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none",
                  },
                }}
                href="/contact"
                color="inherit"
                underline="none"
                display="block"
              >
                Contact
              </Link>
            </Grid>

            {/* Social Links Section - Removed justifyContent: "center" */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ color: "white" }} variant="h6" gutterBottom>
                Social Links
              </Typography>
              <Link
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none",
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 0.5,
                }}
                href="https://www.youtube.com/@JollyKidsprograms"
                underline="none"
                target="_blank"
              >
                <YouTubeIcon />
                Youtube
              </Link>
              <Link
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none",
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 0.5,
                }}
                href="https://www.facebook.com/JesusRedeemsMinistries/"
                underline="none"
                target="_blank"
              >
                <FacebookOutlinedIcon />
                Facebook
              </Link>
              <Link
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none",
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 0.5,
                }}
                href="https://www.instagram.com/jesusredeems_ministries/"
                underline="none"
                target="_blank"
              >
                <InstagramIcon />
                Instagram
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box textAlign="center">
        <Typography sx={{ padding: 2 }} variant="body2" color="text.secondary">
          Copyright © Jesus Redeems Ministries. All Rights Reserved {new Date().getFullYear()} | Designed and Powered by Jesus Redeems IT.
        </Typography>
      </Box>
    </RootStyle>
  );
}