// import MenuIcon from "@mui/icons-material/Menu";
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   Divider,
//   Drawer,
//   IconButton,
//   Link,
//   Toolbar,
//   Typography,
//   useMediaQuery,
//   useTheme
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import { Link as RouterLink, useLocation } from "react-router-dom";
// // import GenGoForm from "src/sections/auth2/login/GenGoForm";
// import { CloseIcon } from "src/theme/overrides/CustomIcons";
// import about from "../assets/about.png";
// import activity from "../assets/activity.png";
// import contact from "../assets/contact.png";
// import homeicon from "../assets/home.png";
// import media from "../assets/media.png";
// import tv from "../assets/tv.png";
// import download from "../assets/download.png";
// import Logo from "./Logo";
// import { LoginForm } from "src/sections/auth/login";

// const navItems = [
//   { label: "Home", img: homeicon, path: "/" },
//   { label: "About", img: about, path: "/about" },
//   { label: "Live Now", img: tv, path: "/live" },
//   { label: "Media", img: media, path: "/media" },
//   { label: "Activity", img: activity, path: "/auth/login" },
//   { label: "Contact", img: contact, path: "/contact" },
//   { label: "Downloads", img: download, path: "https://kids.jesusredeems.com/mag-download/",external: true  },
// ];

// export default function Headersection() {
//   const location = useLocation();
//   const user = localStorage.getItem("jwt");
//   console.log("user", user);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [popup, setPopup] = useState(false);
//   const [isSticky, setIsSticky] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   // Add scroll event listener for sticky effect
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       if (scrollPosition > 10) {
//         setIsSticky(true);
//       } else {
//         setIsSticky(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <Box sx={{ width: 250, p: 2 }}>
//       <Logo />
//       <Divider />
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
//         {navItems.map((item, index) => (
//           <RouterLink
//             to={item.path}
//             key={index}
//             style={{ textDecoration: "none" }}
//             onClick={() => setMobileOpen(false)}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <img src={item.img} alt={item.label} width="30" />
//               <Typography sx={{ color: "black", fontWeight: "bold" }}>
//                 {item.label}
//               </Typography>
//             </Box>
//           </RouterLink>
//         ))}
//         {user === "" || user === null ? (
//           <Button
//             onClick={() => {
//               setPopup(true);
//               setMobileOpen(false);
//             }}
//             variant="contained"
//             sx={{
//               backgroundColor: "primary.main",
//               color: "#4145b1",
//               fontWeight: "bold",
//             }}
//           >
//             Login
//           </Button>
//         ) : (
//           <Button
//             onClick={() => {
//               setMobileOpen(false);
//             }}
//             component={RouterLink}
//             to="/dashboard/myapp"
//             variant="contained"
//             sx={{
//               backgroundColor: "primary.main",
//               color: "#4145b1",
//               fontWeight: "bold",
//             }}
//           >
//             Dashboard
//           </Button>
//         )}
//       </Box>
//     </Box>
//   );

//   return (
//     <>
//       {/* Main Navigation Bar - Sticky for all screen sizes */}
//       <AppBar
//         position="sticky"
//         sx={{
//           backgroundColor: "#4145b1",
//           top: 0,
//           zIndex: 1100,
//           boxShadow: isSticky ? 3 : 1,
//           transition: "box-shadow 0.3s ease-in-out",
//           width: "100%",
//           // REMOVED the clipPath that was causing the cut-off issue
//         }}
//       >
//         <Toolbar
//           sx={{
//             justifyContent: "space-between",
//             minHeight: { xs: "64px", sm: "70px" },
//             px: { xs: 2, sm: 3, md: 4 },
//             width: "100%",
//             maxWidth: "1400px", // Optional: max width for very large screens
//             mx: "auto", // Center the toolbar content
//           }}
//         >
//           <Logo />

//           {isMobile ? (
//             <IconButton
//               color="inherit"
//               edge="end"
//               onClick={handleDrawerToggle}
//               sx={{
//                 color: "white",
//                 "&:hover": {
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                 },
//               }}
//             >
//               <MenuIcon
//                 fontSize="large"
//                 sx={{
//                   animation: "pulse 1s ease-in-out infinite",
//                   "@keyframes pulse": {
//                     "0%": {
//                       transform: "scale(1)",
//                     },
//                     "50%": {
//                       transform: "scale(1.3)",
//                     },
//                     "100%": {
//                       transform: "scale(1)",
//                     },
//                   },
//                 }}
//               />
//             </IconButton>
//           ) : (
//             <Box sx={{ display: "flex", gap: { md: 2, lg: 4 }, alignItems: "center", flexWrap: "wrap" }}>
//               {navItems.map((item, index) => (
//                 <RouterLink
//                   to={item.path}
//                   key={index}
//                   style={{ textDecoration: "none" }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       color:
//                         location.pathname === item.path
//                           ? "primary.main"
//                           : "white",
//                       ":hover": {
//                         transform: "scale(1.1)",
//                         transition: "transform 0.3s ease-in-out",
//                       },
//                     }}
//                   >
//                     <img src={item.img} alt={item.label} width="35" /> {/* Slightly smaller on desktop */}
//                     <Typography
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: { md: "0.8rem", lg: "0.9rem" },
//                         ":hover": {
//                           color: "primary.main",
//                         },
//                       }}
//                     >
//                       {item.label}
//                     </Typography>
//                   </Box>
//                 </RouterLink>
//               ))}

//               {user === null || user === "" ? (
//                 <Button
//                   onClick={() => setPopup(true)}
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "primary.main",
//                     color: "#4145b1",
//                     fontWeight: "bold",
//                     fontSize: { md: "0.8rem", lg: "0.9rem" },
//                     px: { md: 1.5, lg: 2 },
//                     py: { md: 0.5, lg: 0.75 },
//                     ":hover": {
//                       backgroundColor: "primary.main",
//                       color: "#4145b1",
//                     },
//                     animation: "pulse 1.5s ease-in-out infinite",
//                     "@keyframes pulse": {
//                       "0%": {
//                         transform: "scale(1)",
//                       },
//                       "50%": {
//                         transform: "scale(1.1)",
//                       },
//                       "100%": {
//                         transform: "scale(1)",
//                       },
//                     },
//                   }}
//                 >
//                   Login
//                 </Button>
//               ) : (
//                 <Button
//                   component={RouterLink}
//                   to="/dashboard/myapp"
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "primary.main",
//                     color: "#4145b1",
//                     fontWeight: "bold",
//                     fontSize: { md: "0.8rem", lg: "0.9rem" },
//                     px: { md: 1.5, lg: 2 },
//                     py: { md: 0.5, lg: 0.75 },
//                     ":hover": {
//                       backgroundColor: "primary.main",
//                       color: "#4145b1",
//                     },
//                     animation: "pulse 1.5s ease-in-out infinite",
//                     "@keyframes pulse": {
//                       "0%": {
//                         transform: "scale(1)",
//                       },
//                       "50%": {
//                         transform: "scale(1.1)",
//                       },
//                       "100%": {
//                         transform: "scale(1)",
//                       },
//                     },
//                   }}
//                 >
//                   Dashboard
//                 </Button>
//               )}
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer
//         anchor="right"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: 280,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         {drawer}
//       </Drawer>

//       {/* Login Popup */}
//       {popup && (
//         <Card
//           sx={{
//             width: { xs: "300px", md: "400px" },
//             padding: 4,
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1300,
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <LoginForm />
//           <CloseIcon
//             onClick={() => setPopup(false)}
//             sx={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               cursor: "pointer",
//               color: "grey.600",
//               "&:hover": {
//                 color: "grey.900",
//               }
//             }}
//           />
//         </Card>
//       )}
//     </>
//   );
// }

import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Stack
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// import GenGoForm from "src/sections/auth2/login/GenGoForm";
import { CloseIcon } from "src/theme/overrides/CustomIcons";
import about from "../assets/about.png";
import activity from "../assets/activity.png";
import contact from "../assets/contact.png";
import homeicon from "../assets/home.png";
import media from "../assets/media.png";
// import tv from "../assets/tv.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import download from "../assets/download.png";
import Logo from "./Logo";
import { LoginForm } from "src/sections/auth/login";

const navItems = [
  { label: "Home", img: homeicon, path: "/" },
  { label: "About", img: about, path: "/about" },
  // { label: "Live Now", img: tv, path: "/live" },
  { label: "Media", img: media, path: "/media" },
  { label: "Activity", img: activity, path: "/auth/login" },
  { label: "Downloads", img: download, path: "https://kids.jesusredeems.com/mag-download/", external: true },
  { label: "Contact", img: contact, path: "/contact" },
];

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  margin: '0 4px',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
    transition: 'all 0.2s ease',
  },
  '& svg': {
    fontSize: '1.2rem',
  },
}));

// Social Media Links
const socialLinks = [
  {
    icon: YouTubeIcon,
    href: "https://www.youtube.com/@JollyKidsprograms",
    label: "YouTube"
  },
  {
    icon: FacebookOutlinedIcon,
    href: "https://www.facebook.com/JesusRedeemsMinistries/",
    label: "Facebook"
  },
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/jesusredeems_ministries/",
    label: "Instagram"
  }
];



export default function Headersection() {
  const location = useLocation();
  const user = localStorage.getItem("jwt");
  console.log("user", user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Add scroll event listener for sticky effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Logo />
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {navItems.map((item, index) => (
          item.external ? (
            <Link
              key={index}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              onClick={() => setMobileOpen(false)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img src={item.img} alt={item.label} width="30" />
                <Typography sx={{ color: "black", fontWeight: "bold" }}>
                  {item.label}
                </Typography>
              </Box>
            </Link>
          ) : (
            <RouterLink
              to={item.path}
              key={index}
              style={{ textDecoration: "none" }}
              onClick={() => setMobileOpen(false)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img src={item.img} alt={item.label} width="30" />
                <Typography sx={{ color: "black", fontWeight: "bold" }}>
                  {item.label}
                </Typography>
              </Box>
            </RouterLink>
          )
        ))}
        {user === "" || user === null ? (
          <Button
            onClick={() => {
              setPopup(true);
              setMobileOpen(false);
            }}
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              color: "#4145b1",
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={() => {
              setMobileOpen(false);
            }}
            component={RouterLink}
            to="/dashboard/myapp"
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              color: "#4145b1",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <Stack direction="row" spacing={0.5} sx={{
        display: "flex",
        gap: 2,
        backgroundColor: "#4145b1",
        padding: "10px",
        justifyContent: "right",
      }}>
        {socialLinks.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
          >
            <SocialIconButton size="small" aria-label={social.label}>
              <social.icon />
            </SocialIconButton>
          </Link>
        ))}
      </Stack>
      {/* Main Navigation Bar - Sticky for all screen sizeshttps://file+.vscode-resource.vscode-cdn.net/Users/it-01/Downloads/vbs_testing/src/assets/VBS%202026.jpg?version%3D1777633317360 */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#4145b1",
          top: 0,
          zIndex: 1100,
          boxShadow: isSticky ? 3 : 1,
          transition: "box-shadow 0.3s ease-in-out",
          width: "100%",
          // REMOVED the clipPath that was causing the cut-off issue
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: "64px", sm: "70px" },
            px: { xs: 2, sm: 3, md: 4 },
            width: "100%",
            maxWidth: "1400px", // Optional: max width for very large screens
            mx: "auto", // Center the toolbar content
          }}
        >
          <Logo />

          {isMobile ? (
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <MenuIcon
                fontSize="large"
                sx={{
                  animation: "pulse 1s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(1)",
                    },
                    "50%": {
                      transform: "scale(1.3)",
                    },
                    "100%": {
                      transform: "scale(1)",
                    },
                  },
                }}
              />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: { md: 2, lg: 4 }, alignItems: "center", flexWrap: "wrap" }}>
              {navItems.map((item, index) => (
                item.external ? (
                  <Link
                    key={index}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "white",
                        ":hover": {
                          transform: "scale(1.1)",
                          transition: "transform 0.3s ease-in-out",
                        },
                      }}
                    >
                      <img src={item.img} alt={item.label} width="35" />
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: { md: "0.8rem", lg: "0.9rem" },
                          color: "white",
                          ":hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </Link>
                ) : (
                  <RouterLink
                    to={item.path}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color:
                          location.pathname === item.path
                            ? "primary.main"
                            : "white",
                        ":hover": {
                          transform: "scale(1.1)",
                          transition: "transform 0.3s ease-in-out",
                        },
                      }}
                    >
                      <img src={item.img} alt={item.label} width="35" />
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: { md: "0.8rem", lg: "0.9rem" },
                          ":hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </RouterLink>
                )
              ))}

              {user === null || user === "" ? (
                <Button
                  onClick={() => setPopup(true)}
                  variant="contained"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "#4145b1",
                    fontWeight: "bold",
                    fontSize: { md: "0.8rem", lg: "0.9rem" },
                    px: { md: 1.5, lg: 2 },
                    py: { md: 0.5, lg: 0.75 },
                    ":hover": {
                      backgroundColor: "primary.main",
                      color: "#4145b1",
                    },
                    animation: "pulse 1.5s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%": {
                        transform: "scale(1)",
                      },
                      "50%": {
                        transform: "scale(1.1)",
                      },
                      "100%": {
                        transform: "scale(1)",
                      },
                    },
                  }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  component={RouterLink}
                  to="/dashboard/myapp"
                  variant="contained"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "#4145b1",
                    fontWeight: "bold",
                    fontSize: { md: "0.8rem", lg: "0.9rem" },
                    px: { md: 1.5, lg: 2 },
                    py: { md: 0.5, lg: 0.75 },
                    ":hover": {
                      backgroundColor: "primary.main",
                      color: "#4145b1",
                    },
                    animation: "pulse 1.5s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%": {
                        transform: "scale(1)",
                      },
                      "50%": {
                        transform: "scale(1.1)",
                      },
                      "100%": {
                        transform: "scale(1)",
                      },
                    },
                  }}
                >
                  Dashboard
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Login Popup */}
      {popup && (
        <Card
          sx={{
            width: { xs: "300px", md: "400px" },
            padding: 4,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1300,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <LoginForm />
          <CloseIcon
            onClick={() => setPopup(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              cursor: "pointer",
              color: "grey.600",
              "&:hover": {
                color: "grey.900",
              }
            }}
          />
        </Card>
      )}
    </>
  );
}