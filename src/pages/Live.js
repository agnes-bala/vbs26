// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Typography,
//   Button,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import standtable from "../assets/standandtable.svg";
// import tvbackgound from "../assets/tvbackground.svg";
// import HeaderSection from "src/components/headersection";
// import axios from "axios";
// import YouTube from "react-youtube";

// export default function Live() {
//   const [feed, setFeed] = useState([]);

//   const live = async () => {
//     try {
//       const response = await axios.get(
//         "https://partnerservice-stage.jesusredeems.com/jrms/v1/feed/home"
//       );
//       setFeed(response.data.feedList);
//       console.log("response", response.data.feedList);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     live();
//   }, []);
//   return (
//     <>
//       <HeaderSection />
//       <Box
//         sx={{
//           backgroundImage: `url(${tvbackgound})`,
//           backgroundSize: "cover",
//           marginTop: { md: "-5vh", xs: "-2vh" },
//           height: "100vh",
//         }}
//       >
//         <Typography
//           variant="h3"
//           sx={{
//             marginTop: { md: "7vh", xs: "2vh" },
//             textAlign: "center",
//             color: "red",
//             alignSelf: "center",
//           }}
//         >
//           <Button align="center" variant="h3">
//             <img
//               src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjVrZm5uOXp3ZjJ1bTdzYjlmZXJmM29yZzQ2aTFud2s3Ym50azR3ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VbV4Pd353kZPfjXtfq/giphy.gif"
//               width={"100px"}
//               height={"50px"}
//               alt="live button"
//             ></img>
//           </Button>
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             // position: "relative",
//           }}
//         >
//           <Box
//             sx={{
//               // border: "35px solid red",
//               //borderImage: "../assets/2.png 30 30 30 30",
//               width: "80vh",
//               display: "flex",
//               // height: "50vh",
//               borderRadius: "30px",
//               marginTop: "1vh",
//               // image:{
//               //   src:"../assets/2.png",
//               //   width:"500px",
//               //   height:"300px"
//               //}
//             }}
//           >
//             {/* #fa4c2e */}
//             {feed
//               .filter((item) => item.feedName === "VBS")
//               .map((data) => {
//                 return (
//                   <Card sx={{ backgroundColor: "#fa4c2e", width: "100%" }}>
//                     <CardActionArea>
//                       <CardContent className="video-container">
//                         <Typography align="center" className="video-container">
//                           <YouTube videoId={data.feedUrl} />
//                         </Typography>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                   // <iframe
//                   //   width="100%"
//                   //   height="100%"
//                   //   src= {`https://www.youtube.com/embed/${data.feedUrl}`}
//                   //   title="YouTube video player"
//                   //   frameborder="0"
//                   //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   //   allowfullscreen
//                   // ></iframe>
//                 );
//               })}
//           </Box>
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <img
//             src={standtable}
//             alt="standtable"
//             style={{ marginTop: "-1vh" }}
//           />
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
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import standtable from "../assets/standandtable.svg";
import tvbackgound from "../assets/tvbackground.svg";
import HeaderSection from "src/components/headersection";
import axios from "axios";
import YouTube from "react-youtube";

export default function Live() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const live = async () => {
    try {
      const response = await axios.get(
        "https://partnerservice-stage.jesusredeems.com/jrms/v1/feed/home"
      );
      setFeed(response.data.feedList);
      console.log("response", response.data.feedList);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    live();
  }, []);

  // Extract video ID from the YouTube link
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const defaultVideoId = getYouTubeVideoId("https://www.youtube.com/watch?v=gPGLpcMzoRI");

  // Filter VBS feed items
  const vbsFeed = feed.filter((item) => item.feedName === "VBS");
  const hasVBSFeed = vbsFeed.length > 0;

  return (
    <>
      <HeaderSection />
      <Box
        sx={{
          backgroundImage: `url(${tvbackgound})`,
          backgroundSize: "cover",
          marginTop: { md: "-5vh", xs: "-2vh" },
          height: "100vh",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            marginTop: { md: "7vh", xs: "2vh" },
            textAlign: "center",
            color: "red",
            alignSelf: "center",
          }}
        >
          <Button align="center" variant="h3">
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjVrZm5uOXp3ZjJ1bTdzYjlmZXJmM29yZzQ2aTFud2s3Ym50azR3ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VbV4Pd353kZPfjXtfq/giphy.gif"
              width={"100px"}
              height={"50px"}
              alt="live button"
            />
          </Button>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "80vh",
              display: "flex",
              borderRadius: "30px",
              marginTop: "1vh",
            }}
          >
            {/* Show default video if no VBS feed available or while loading */}
            {(!hasVBSFeed || loading) ? (
              <Card sx={{ backgroundColor: "#fa4c2e", width: "100%" }}>
                <CardActionArea>
                  <CardContent className="video-container">
                    <Typography align="center" className="video-container">
                      <YouTube videoId={defaultVideoId} />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ) : (
              vbsFeed.map((data) => (
                <Card key={data.id} sx={{ backgroundColor: "#fa4c2e", width: "100%" }}>
                  <CardActionArea>
                    <CardContent className="video-container">
                      <Typography align="center" className="video-container">
                        <YouTube videoId={data.feedUrl} />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={standtable}
            alt="standtable"
            style={{ marginTop: "-1vh" }}
          />
        </Box>
      </Box>
    </>
  );
}