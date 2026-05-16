// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import * as React from "react";

// import { PATH_DASHBOARD } from "../../../../routes/paths";
// // @mui
// import { useTheme,  } from "@mui/material/styles";
// import { Box, Button, Typography, Stack, Grid, Card } from "@mui/material";
// // hooks
// import { toast } from "react-toastify";
// import { getScore, startGame } from "../../../../services/JRMFeedService";
// import moment from "moment-timezone";

// import Iconify from "../../../../components/Iconify";

// // utils

// // ----------------------------------------------------------------------

// // const HEIGHT = 410;

// // const RootStyle = styled("div")(({ theme }) => ({
// //   position: "relative",
// //   height: HEIGHT,
// //   "& .slick-list": {
// //     borderRadius: Number(theme.shape.borderRadius) * 2,
// //   },
// // }));

// // const CardItemStyle = styled("div")(({ theme }) => ({
// //   position: "relative",
// //   height: HEIGHT,
// //   backgroundSize: "cover",
// //   padding: theme.spacing(3),
// //   backgroundRepeat: "no-repeat",
// //   color: theme.palette.common.black,
// //   backgroundImage: 'url("/assets/bg_gradient1blur.jpg")',
// //   display: "flex",
// //   flexDirection: "column",
// //   justifyContent: "space-between",
// //   borderRadius: Number(theme.shape.borderRadius) * 3,
// // }));

// // const IconWrapperStyle = styled("div")(({ theme }) => ({
// //   width: 24,
// //   height: 24,
// //   display: "flex",
// //   borderRadius: "50%",
// //   alignItems: "center",
// //   justifyContent: "center",
// //   color: theme.palette.success.main,
// //   backgroundColor: alpha(theme.palette.success.main, 0.16),
// // }));

// // ----------------------------------------------------------------------

// const days = [
//   {
//     title: "Day 1",
//     day: "2025-05-27",
//     month: "04",
//   },
//   {
//     title: "Day 2",
//     day: "2025-04-28",
//     month: "04",
//   },
//   {
//     title: "Day 3",
//     day: "2025-04-29",
//     month: "05",
//   },
//   {
//     title: "Day 4",
//     day: "2025-04-30",
//     month: "05",
//   },
//   {
//     title: "Day 5",
//     day: "2025-05-01",
//     month: "05",
//   },
// ];

// QuizRadio.propTypes = {
//   list: PropTypes.shape({
//     childId: PropTypes.string,
//     fullName: PropTypes.string,
//     dateOfBirth: PropTypes.string,
//     gender: PropTypes.string,
//   }),
//   sx: PropTypes.object,
// };

// export default function QuizRadio({ sx }) {
//   const navigate = useNavigate();
//   const pId = localStorage.getItem("partnerId");
//   const token = localStorage.getItem("jwt");
//   const gameName = localStorage.getItem("path");
//   const childId = localStorage.getItem("currentChildId");
//   const theme = useTheme();
//   let day = new Date();
//   const date = moment(day).tz("Asia/Kolkata").format("YYYY-MM-DD");
//   // const month = moment(day).tz("Asia/Kolkata").format("MM");
//   // const month = moment(day).toLocaleString("fr-FR", { month: "long" });
//   const time = moment(day).tz("Asia/Kolkata").format("HH:mm:ss");
//   const timer = moment(day).tz("Asia/Kolkata").format("HHmmss");
//   const refresh = () => window.location.reload(true);
//   localStorage.setItem("date", date);
//   console.log("date", date);
//   console.log("time", time);

//   // console.log("month", month);

//   // let month = new Date(Y);
//   // console.log("month", month);

//   const handleGame = async (pId, childId, day, token, i) => {
//     localStorage.setItem("qdate", day);
//     // localStorage.setItem("month", month);

//     const response = await startGame(pId, childId, day, token, gameName);
//     console.log("fn resp", response);

//     if (!response) {
//       toast.error("Error: Unable to communicate");
//       console.log("Error: Unable to communicate");
//       return;
//     }

//     const result = await getScore(pId, childId, token, gameName);
//     console.log("individual score", result.data);
//     console.log(
//       "datascore",
//       result.data.gameScoreList.filter((d) => d.game === gameName)
//     );

//     const filter = result.data.gameScoreList.filter((d) => d.game === gameName);
//     console.log("filter", filter);
//     const sortfilter = filter.sort(function (a, b) {
//       return a.day - b.day;
//     });

//     console.log("sorted filter", sortfilter);
//     console.log("sorted filter length", sortfilter.length);
//     console.log("i", i);

//     if (i >= sortfilter.length) {
//       // alert("You have to finish previous day games");
//       navigate(PATH_DASHBOARD.general.routegamepath(childId, gameName));
//     } else if (sortfilter[i].endDateTime === null) {
//       if (!response.ok) {
//         console.log("Personal ContactInfo FAILED", response.status);
//         if (response.status === 400) {
//           alert("Game started earlier, you are allowed to continue");
//           console.log("Game started earlier, you are allowed to continue ");
//         } else {
//           toast.error(response.message);
//         }
//       }
//       console.log(
//         "game final route",
//         PATH_DASHBOARD.general.routegamepath(childId, gameName)
//       );
//       navigate(PATH_DASHBOARD.general.routegamepath(childId, gameName));
//     } else {
//       alert(
//         "You have already played for this day game. Your Score for this game : " +
//           sortfilter[i].score
//       );
//       return;
//     }
//   };

//   return (
//     <>
//       <Typography
//         variant="h5"
//         component="div"
//         textAlign="center"
//         color={theme.palette.primary.light}
//       >
//         Select the day to play
//       </Typography>
//       <br />
//       <br />
//       <Grid
//         container
//         rowSpacing={1}
//         columnSpacing={{ xs: 1, sm: 2, md: 8 }}
//         justifyContent="center"
//         alignItems="center"
//       >
//         {days.map((d, i) => (
//           <Grid item xs={12} md={4}>
//             <Card sx={{ display: "flex", alignItems: "center", p: 3, ...sx }}>
//               <Box sx={{ flexGrow: 1 }}>
//                 <>
//                   <Stack direction="column" alignItems="center" spacing={1}>
//                     <Iconify
//                       width={50}
//                       height={50}
//                       icon={
//                         new Date(`${d.day}T12:00:00`).getTime() <=
//                         new Date(`${date}T${time}`).getTime()
//                           ? "material-symbols:play-circle-outline"
//                           : "fxemoji:lock"
//                       }
//                     />
//                     <Button
//                       sx={{ zIndex: 10 }}
//                       variant="contained"
//                       key={d.day}
//                       disabled={
//                         new Date(`${d.day}T12:00:00`).getTime() <=
//                         new Date(`${date}T${time}`).getTime()
//                           ? false
//                           : true
//                       }
//                       onClick={() => handleGame(pId, childId, d.day, token, i)}
//                     >
//                       {" "}
//                       {d.title} {gameName}{" "}
//                     </Button>

//                     <Typography>
//                       {new Date(d.day).getDay() === new Date(date).getDay() &&
//                       timer < 120000 ? (
//                         <>
//                           <Stack>
//                             <Button variant="outlined" onClick={refresh}>
//                               Reload
//                             </Button>
//                             Start @ 12:00 PM IST
//                           </Stack>
//                         </>
//                       ) : (
//                         ""
//                       )}
//                     </Typography>
//                   </Stack>
//                   <br />
//                   {/* <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent={isDesktop ? "flex-end" :"flex-center"} spacing={1}>
//   <Button size='large' variant='outlined' style={{ color:"#fffffa" }} onClick={async() => {
//     const originalImage = `../assets/kidsmas/${child.childId}.jpg`;
//     const image = await fetch(originalImage);
//     console.log('image',image);
//     const nameSplit=originalImage.split("/");
//     const  duplicateName=nameSplit.pop();

//     const imageBlog = await image.blob();
//     const imageURL = URL.createObjectURL(imageBlog);
//     const link = document.createElement('a');
//     link.href = imageURL;
//     link.download = ""+duplicateName+"";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//   //   fetch('http://revival.jesusredeems.com/wp-content/uploads/sites/4/2022/11/aaron-burden-25846-unsplash.jpg').then(response => {
//   //     response.blob().then(blob => {
//   //         // Creating new object of PDF file
//   //         const fileURL = window.URL.createObjectURL(blob);
//   //         // Setting various property values
//   //         let alink = document.createElement('a');
//   //         alink.href = fileURL;
//   //         alink.download = 'aaron-burden-25846-unsplash.jpg';
//   //         alink.click();
//   //     })
//   // })
//     console.log(child.childId)

//     }}>Download Certificate</Button>
//       </Stack> */}
//                 </>
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// }

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as React from "react";

import { PATH_DASHBOARD } from "../../../../routes/paths";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography, Stack, Grid, Card } from "@mui/material";
// hooks
import { toast } from "react-toastify";
import { getScore, startGame } from "../../../../services/JRMFeedService";
import moment from "moment-timezone";

import Iconify from "../../../../components/Iconify";

// utils

// ----------------------------------------------------------------------

const days = [
  {
    title: "Day 1",
    day: "2026-05-11",
    month: "05",
  },
  {
    title: "Day 2",
    day: "2026-05-12",
    month: "05",
  },
  {
    title: "Day 3",
    day: "2026-05-13",
    month: "05",
  },
  {
    title: "Day 4",
    day: "2026-05-14",
    month: "05",
  },
  {
    title: "Day 5",
    day: "2026-05-15",
    month: "05",
  },
];

QuizRadio.propTypes = {
  list: PropTypes.shape({
    childId: PropTypes.string,
    fullName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
  }),
  sx: PropTypes.object,
};

export default function QuizRadio({ sx }) {
  const navigate = useNavigate();
  const pId = localStorage.getItem("partnerId");
  const token = localStorage.getItem("jwt");
  const gameName = localStorage.getItem("path");
  const childId = localStorage.getItem("currentChildId");
  const theme = useTheme();
  let day = new Date();
  const date = moment(day).tz("Asia/Kolkata").format("YYYY-MM-DD");
  // const month = moment(day).tz("Asia/Kolkata").format("MM");
  // const month = moment(day).toLocaleString("fr-FR", { month: "long" });
  const time = moment(day).tz("Asia/Kolkata").format("HH:mm:ss");
  const timer = moment(day).tz("Asia/Kolkata").format("HHmmss");
  const refresh = () => window.location.reload(true);
  localStorage.setItem("date", date);
  console.log("date", date);
  console.log("time", time);

  // console.log("month", month);

  // let month = new Date(Y);
  // console.log("month", month);

  const handleGame = async (pId, childId, day, token, i) => {
    localStorage.setItem("qdate", day);
    // localStorage.setItem("month", month);

    const response = await startGame(pId, childId, day, token, gameName);
    console.log("fn resp", response);

    if (!response) {
      toast.error("Error: Unable to communicate");
      console.log("Error: Unable to communicate");
      return;
    }

    const result = await getScore(pId, childId, token, gameName);
    console.log("individual score", result.data);
    console.log(
      "datascore",
      result.data.gameScoreList.filter((d) => d.game === gameName),
    );

    const filter = result.data.gameScoreList.filter((d) => d.game === gameName);
    console.log("filter", filter);
    const sortfilter = filter.sort(function (a, b) {
      return a.day - b.day;
    });

    console.log("sorted filter", sortfilter);
    console.log("sorted filter length", sortfilter.length);
    console.log("i", i);

    if (i >= sortfilter.length) {
      // alert("You have to finish previous day games");
      navigate(PATH_DASHBOARD.general.routegamepath(childId, gameName));
    } else if (sortfilter[i].endDateTime === null) {
      if (!response.ok) {
        console.log("Personal ContactInfo FAILED", response.status);
        if (response.status === 400) {
          alert("Game started earlier, you are allowed to continue");
          console.log("Game started earlier, you are allowed to continue ");
        } else {
          toast.error(response.message);
        }
      }
      console.log(
        "game final route",
        PATH_DASHBOARD.general.routegamepath(childId, gameName),
      );
      navigate(PATH_DASHBOARD.general.routegamepath(childId, gameName));
    } else {
      alert(
        "You have already played for this day game. Your Score for this game : " +
          sortfilter[i].score,
      );
      return;
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        component="div"
        textAlign="center"
        color={theme.palette.primary.light}
      >
        Select the day to play
      </Typography>
      <br />
      <br />
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 8 }}
        justifyContent="center"
        alignItems="center"
      >
        {days.map((d, i) => (
          <Grid item xs={12} md={4}>
            <Card sx={{ display: "flex", alignItems: "center", p: 3, ...sx }}>
              <Box sx={{ flexGrow: 1 }}>
                <>
                  <Stack direction="column" alignItems="center" spacing={1}>
                    <Iconify
                      width={50}
                      height={50}
                      icon={
                        new Date(`${d.day}T12:00:00`).getTime() <=
                        new Date(`${date}T${time}`).getTime()
                          ? "material-symbols:play-circle-outline"
                          : "fxemoji:lock"
                      }
                    />
                    <Button
                      sx={{ zIndex: 10 }}
                      variant="contained"
                      key={d.day}
                      disabled={
                        new Date(`${d.day}T12:00:00`).getTime() <=
                        new Date(`${date}T${time}`).getTime()
                          ? false
                          : true
                      }
                      onClick={() => handleGame(pId, childId, d.day, token, i)}
                    >
                      {" "}
                      {d.title} {gameName}{" "}
                    </Button>

                    <Typography>
                      {new Date(d.day).getDay() === new Date(date).getDay() &&
                      timer < 120000 ? (
                        <>
                          <Stack>
                            <Button variant="outlined" onClick={refresh}>
                              Reload
                            </Button>
                            Start @ 12:00 PM IST
                          </Stack>
                        </>
                      ) : (
                        ""
                      )}
                    </Typography>
                  </Stack>
                  <br />
             
                </>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}