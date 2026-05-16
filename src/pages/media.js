// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Grid,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import Headersection from "src/components/headersection";
// import tvbackgound from "../assets/tvbackground.svg";
// import YouTube from "react-youtube";

// const video = [
//   {
//     day: 1,
//     url: "YtgOeVTANGE",
//   },
//   {
//     day: 2,
//     url: "svL-N1WpqbY",
//   },
//   {
//     day: 3,

//     url: "nR1Ecd0S5iM",
//   },
//   {
//     day: 4,
//     url: "Wd3255jQHYQ",
//   },
//   {
//     day: 5,
//     url: "vu_or9n9p10",
//   },
// ];


// // const video = [
// //   {
// //     day: 1,
// //     url: "hAm7irypor8",
// //   },
// //   {
// //     day: 2,
// //     url: "TFD26HoT2S8",
// //   },
// //   {
// //     day: 3,
// //     url: "E8acWTMtAr8",
// //   },
// //   {
// //     day: 4,
// //     url: "8wYKdualvYg",
// //   },
// //   {
// //     day: 5,
// //     url: "nJjG789kOOQ",
// //   },
// // ];
// export default function Media() {
//   // const youtubeOnReady = (event) => {
//   //   // access to player in all event handlers via event.target
//   //   event.target.pauseVideo();
//   // };
//   return (
//     <>
//       <Headersection />
//       <Box
//         sx={{
//           backgroundImage: `url(${tvbackgound})`,
//           backgroundSize: "cover",
//           marginTop: "-2vh",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundPosition: {
//             xs: "top",
//             sm: "center",
//             md: "top",
//           },
//         }}
//       >
//         <Typography
//           sx={{
//             color: "white",
//             fontSize: "3rem",
//             textAlign: "center",
//             marginTop: "4%",
//             fontWeight: "bold",
//           }}
//         >
//           Jolly Kids Youtube Channel
//         </Typography>
//         <Grid container spacing={2} sx={{ padding: "5%" }}>


//           {video.map((item, index) => (


//             <Grid item xs="12" md="6" sx={{ alignItems: "center" }}>
//               <Card xs={{ maxWidth: "auto", pr: 15, pl: 15 }}>
//                 <CardActionArea>
//                   <CardContent className="video-container">
//                     <Typography align="center" className="video-container">
//                       <YouTube videoId={item.url} />

//                     </Typography>
//                     {/* <Typography align="center" sx={{ mb: 1, fontWeight: "bold" }}>
//                       Day {item.day}
//                     </Typography>
//                     <YouTube videoId={item.url} /> */}
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* <Grid item xs={12} md={6}>
//             <Card>
//               <iframe
//                 width="100%"
//                 height="100%"
//                 src="https://www.youtube.com/embed/Zf9wIR9dVqg"
//                 title="YouTube video player"
//                 frameborder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowfullscreen
//                 style={{ width: "100%", height: "100%" }}
//               ></iframe>
//             </Card>
//           </Grid> */}
//       </Box>
//     </>
//   );
// }

// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Grid,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import Headersection from "src/components/headersection";
// import tvbackgound from "../assets/tvbackground.svg";
// import YouTube from "react-youtube";

// const video = [
//   {
//     day: 1,
//     url: "YtgOeVTANGE",
//   },
//   {
//     day: 2,
//     url: "svL-N1WpqbY",
//   },
//   {
//     day: 3,
//     url: "nR1Ecd0S5iM",
//   },
//   {
//     day: 4,
//     url: "Wd3255jQHYQ",
//   },
//   {
//     day: 5,
//     url: "vu_or9n9p10",
//   },
// ];

// export default function Media() {
//   const opts = {
//     height: '100%',
//     width: '100%',
//     playerVars: {
//       autoplay: 0,
//     },
//   };

//   return (
//     <>
//       <Headersection />
//       <Box
//         sx={{
//           backgroundImage: `url(${tvbackgound})`,
//           backgroundSize: "cover",
//           marginTop: "-2vh",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundPosition: {
//             xs: "top",
//             sm: "center",
//             md: "top",
//           },
//           minHeight: "100vh",
//           py: { xs: 2, sm: 4, md: 6 },
//         }}
//       >
//         <Typography
//           sx={{
//             color: "white",
//             fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
//             textAlign: "center",
//             marginTop: { xs: "10%", sm: "6%", md: "0%" },
//             fontWeight: "bold",
//             px: { xs: 2, sm: 3, md: 0 },
//           }}
//         >
//           Jolly Kids Youtube Channel
//         </Typography>

//         <Box sx={{
//           width: "100%",
//           overflowX: "auto",
//           py: { xs: 2, sm: 3, md: 4 },
//           px: { xs: 2, sm: 3, md: 4 },
//           '&::-webkit-scrollbar': {
//             height: '8px',
//           },
//           '&::-webkit-scrollbar-track': {
//             backgroundColor: 'rgba(255,255,255,0.1)',
//             borderRadius: '10px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: 'rgba(255,255,255,0.3)',
//             borderRadius: '10px',
//             '&:hover': {
//               backgroundColor: 'rgba(255,255,255,0.5)',
//             },
//           },
//         }}>
//           <Box sx={{
//             display: "flex",
//             flexDirection: "row",
//             gap: { xs: 2, sm: 3, md: 4 },
//             minWidth: "min-content",
//           }}>
//             {video.map((item, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   flex: "0 0 auto",
//                   width: { xs: "280px", sm: "320px", md: "360px", lg: "400px" },
//                 }}
//               >
//                 <Card sx={{
//                   height: "100%",
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                   backdropFilter: "blur(10px)",
//                   borderRadius: { xs: 2, sm: 3 },
//                   overflow: "hidden",
//                   transition: "transform 0.3s ease-in-out",
//                   '&:hover': {
//                     transform: { xs: "none", sm: "scale(1.02)" },
//                   },
//                 }}>
//                   <CardActionArea sx={{ height: "100%" }}>
//                     <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
//                       <Typography
//                         align="center"
//                         sx={{
//                           mb: { xs: 1, sm: 2 },
//                           fontWeight: "bold",
//                           color: "white",
//                           fontSize: { xs: "1rem", sm: "1.1rem", md: "1.5rem" },
//                         }}
//                       >
//                         Day {item.day}
//                       </Typography>
//                       <Box sx={{
//                         position: "relative",
//                         width: "100%",
//                         paddingTop: "96.25%", // 16:9 Aspect Ratio
//                         borderRadius: { xs: 1, sm: 2 },
//                         overflow: "hidden",
//                       }}>
//                         <Box sx={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           width: "100%",
//                           height: "100%",
//                         }}>
//                           <YouTube
//                             videoId={item.url}
//                             opts={opts}
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                             }}
//                           />
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </CardActionArea>
//                 </Card>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  // Grid,
  Typography,
} from "@mui/material";
import React from "react";
import Headersection from "src/components/headersection";
import tvbackgound from "../assets/tvbackground.svg";
import YouTube from "react-youtube";

const video = [
  {
    day: 1,
    url: "YtgOeVTANGE",
  },
  {
    day: 2,
    url: "svL-N1WpqbY",
  },
  {
    day: 3,
    url: "nR1Ecd0S5iM",
  },
  {
    day: 4,
    url: "Wd3255jQHYQ",
  },
  {
    day: 5,
    url: "vu_or9n9p10",
  },
];

export default function Media() {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <Headersection />
      <Box
        sx={{
          backgroundImage: `url(${tvbackgound})`,
          backgroundSize: "cover",
          marginTop: "-2vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundPosition: {
            xs: "top",
            sm: "center",
            md: "top",
          },
          minHeight: "100vh",
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Enhanced Heading Section */}
        <Box sx={{ 
          position: "relative",
          mb: { xs: 4, sm: 5, md: 6 },
          textAlign: "center",
        }}>
          {/* Animated background elements */}
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "200px", sm: "300px", md: "400px" },
            height: { xs: "200px", sm: "300px", md: "400px" },
            background: "radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%)",
            borderRadius: "50%",
            animation: "pulse 3s ease-in-out infinite",
            zIndex: 1,
          }} />
          
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "150px", sm: "250px", md: "350px" },
            height: { xs: "150px", sm: "250px", md: "350px" },
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
            animation: "pulse 4s ease-in-out infinite reverse",
            zIndex: 1,
          }} />

          {/* Main Heading */}
          <Typography
            sx={{
              position: "relative",
              zIndex: 2,
              color: "white",
              fontSize: { xs: "2.2rem", sm: "3.5rem", md: "4.5rem" },
              textAlign: "center",
              fontWeight: "900",
              letterSpacing: { xs: "2px", sm: "3px", md: "4px" },
              textTransform: "uppercase",
              textShadow: "3px 3px 0 #FF1493, 6px 6px 0 #4B0082, 0 0 20px rgba(255,255,255,0.5)",
              mb: 1,
              fontFamily: "'Poppins', sans-serif",
              animation: "glow 2s ease-in-out infinite alternate",
              "@keyframes glow": {
                "0%": {
                  textShadow: "3px 3px 0 #FF1493, 6px 6px 0 #4B0082, 0 0 20px rgba(255,255,255,0.3)",
                },
                "100%": {
                  textShadow: "3px 3px 0 #FF1493, 6px 6px 0 #4B0082, 0 0 40px rgba(255,255,255,0.8), 0 0 60px rgba(255,215,0,0.5)",
                },
              },
              "@keyframes pulse": {
                "0%": {
                  transform: "translate(-50%, -50%) scale(1)",
                  opacity: 0.5,
                },
                "50%": {
                  transform: "translate(-50%, -50%) scale(1.2)",
                  opacity: 0.8,
                },
                "100%": {
                  transform: "translate(-50%, -50%) scale(1)",
                  opacity: 0.5,
                },
              },
            }}
          >
            Jolly Kids
          </Typography>
          
          <Typography
            sx={{
              position: "relative",
              zIndex: 2,
              color: "white",
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.2rem" },
              textAlign: "center",
              fontWeight: "700",
              letterSpacing: { xs: "4px", sm: "6px", md: "8px" },
              textTransform: "uppercase",
              background: "linear-gradient(45deg, #FFD700, #FFA500, #FF69B4, #9370DB)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient 4s ease infinite, float 3s ease-in-out infinite",
              mb: 2,
              fontFamily: "'Poppins', sans-serif",
              "@keyframes gradient": {
                "0%": {
                  backgroundPosition: "0% 50%",
                },
                "50%": {
                  backgroundPosition: "100% 50%",
                },
                "100%": {
                  backgroundPosition: "0% 50%",
                },
              },
              "@keyframes float": {
                "0%": {
                  transform: "translateY(0px)",
                },
                "50%": {
                  transform: "translateY(-10px)",
                },
                "100%": {
                  transform: "translateY(0px)",
                },
              },
            }}
          >
            Youtube Channel
          </Typography>

          {/* Decorative elements */}
          <Box sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            gap: { xs: 1, sm: 2 },
            mt: 2,
          }}>
            {['★', '●', '■', '●', '★'].map((symbol, index) => (
              <Typography
                key={index}
                sx={{
                  color: index % 2 === 0 ? '#FFD700' : '#FF69B4',
                  fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.2rem' },
                  animation: `bounce 2s ease-in-out ${index * 0.2}s infinite`,
                  "@keyframes bounce": {
                    "0%, 100%": {
                      transform: "translateY(0) rotate(0deg)",
                    },
                    "50%": {
                      transform: "translateY(-10px) rotate(10deg)",
                    },
                  },
                }}
              >
                {symbol}
              </Typography>
            ))}
          </Box>
        </Box>
        
        <Box sx={{ 
          width: "100%", 
          overflowX: "auto",
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.5)',
            },
          },
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: { xs: 2, sm: 3, md: 4 },
            minWidth: "min-content",
          }}>
            {video.map((item, index) => (
              <Box
                key={index}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "280px", sm: "320px", md: "360px", lg: "400px" },
                }}
              >
                <Card sx={{ 
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: { xs: 2, sm: 3 },
                  overflow: "hidden",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  '&:hover': {
                    transform: { xs: "none", sm: "scale(1.02)" },
                    boxShadow: { sm: "0 0 30px rgba(255,215,0,0.3)" },
                  },
                }}>
                  <CardActionArea sx={{ height: "100%" }}>
                    <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                      <Typography 
                        align="center" 
                        sx={{ 
                          mb: { xs: 1, sm: 2 }, 
                          fontWeight: "bold",
                          color: "white",
                          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                          background: "linear-gradient(45deg, #FFD700, #FFA500)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        Day {item.day}
                      </Typography>
                      <Box sx={{ 
                        position: "relative",
                        width: "100%",
                        paddingTop: "86.25%", // 16:9 Aspect Ratio
                        borderRadius: { xs: 1, sm: 2 },
                        overflow: "hidden",
                      }}>
                        <Box sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}>
                          <YouTube 
                            videoId={item.url} 
                            opts={opts}
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}