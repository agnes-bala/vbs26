// import { useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // @mui
// import { m } from "framer-motion";
// import { styled } from "@mui/material/styles";
// import { Button, Container, Typography, Stack } from "@mui/material";
// import moment from "moment-timezone";
// // utils
// // import cssStyles from "../../../../utils/cssStyles";
// // import cssStyles from "src/utils/cssStyles";

// import { MotionContainer } from "src/components/animate";

// // components
// // import Image from "../../../../components/Image";
// import { useState } from "react";
// import { getScore, startGame } from "src/services/JRMFeedService";
// // import { toast } from "react-toastify";
// // import { PATH_DASHBOARD } from "src/routes/paths";

// // ----------------------------------------------------------------------

// // const OverlayStyle = styled("div")(({ theme }) => ({
// //   ...cssStyles().bgBlur({ blur: 1, color: theme.palette.primary }),
// //   top: 0,
// //   zIndex: 8,
// //   content: "''",
// //   width: "100%",
// //   height: "100%",
// //   position: "absolute",
// // }));

// const RootStyle = styled(m.div)(({ theme }) => ({
//   position: "relative",
//   backgroundColor: theme.palette.grey[400],
//   backgroundSize: "cover",
//   backgroundPosition: "right",
//   // backgroundImage: "url(/assets/act-bg-1.jpg)",
//   backgroundImage: "url(/assets/act-bg-7.png)",

//   [theme.breakpoints.up("md")]: {
//     top: 0,
//     left: 0,
//     // width: "100%",
//     // height: "100%",
//     width: "100%",
//     height: "100%",
//     paddingTop: 20,
//     paddingBottom: 450,
//     display: "flex",
//     //position: 'fixed',
//     alignItems: "center",
//   },
// }));

// const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
//   ({ theme }) => ({
//     zIndex: 10,

//     margin: "auto",
//     textAlign: "center",
//     paddingTop: theme.spacing(15),
//     paddingBottom: theme.spacing(15),
//     [theme.breakpoints.up("md")]: {
//       margin: "unset",
//       textAlign: "center",
//     },
//   })
// );
// // ----------------------------------------------------------------------
// const days = [
//   {
//     title: "Day 1",
//     day: "2026-04-27",
//     month: "05",
//   },
// ];
// export default function Memory() {
//   const [score, setScore] = useState(0);
//   // const navigate = useNavigate();
//   const pId = localStorage.getItem("partnerId");
//   const token = localStorage.getItem("jwt");
//   const gameName = localStorage.getItem("path");
//   const childId = localStorage.getItem("currentChildId");
//   useEffect(() => {
//     const result = getScore(pId, childId, token, gameName);
//     result.data !== null ? setScore(1) : setScore(0);
//     console.log("score", result.data);
//   }, []);
//   const Game = async (pId, childId, day, token, gameName) => {
//     const response = await startGame(pId, childId, day, token, gameName);
//     console.log("fn resp", response);
//     // const result = await getScore(pId, childId, token, gameName);
//     // console.log("individual score", result.data);
//     // result.data.gameScoreList.length == 0
//     //   ? navigate(PATH_DASHBOARD.general.routegamepath(childId, gameName))
//     //   : alert(
//     //       "You have already played for this day quiz. Your Score is: " +
//     //         result.data.gameScoreList[0].score
//     //     );
//   };
//   // const handleGame = async (pId, childId, day, token, i) => {
//   //   localStorage.setItem("qdate", day);
//   //   // localStorage.setItem("month", month);

//   //   const response = await startGame(pId, childId, day, token, gameName);
//   //   console.log("fn resp", response);

//   //   if (!response) {
//   //     toast.error("Error: Unable to communicate");
//   //     console.log("Error: Unable to communicate");
//   //     return;
//   //   }

//   //   const result = await getScore(pId, childId, token, gameName);
//   //   console.log("individual score", result.data);

//   //   console.log(
//   //     "datascore",
//   //     result.data.gameScoreList.filter((d) => d.game === gameName)
//   //   );

//   //   const filter = result.data.gameScoreList.filter((d) => d.game === gameName);
//   //   console.log("filter", filter);
//   //   const sortfilter = filter.sort(function (a, b) {
//   //     return a.day - b.day;
//   //   });

//   //   console.log("sorted filter", sortfilter);
//   //   console.log("sorted filter length", sortfilter.length);
//   //   console.log("i", i);

//   //   if (i >= sortfilter.length) {
//   //     // alert("You have to finish previous day games");
//   //     navigate(PATH_DASHBOARD.general.routegamepath(childId, gameName));
//   //   } else if (sortfilter[i].endDateTime === null) {
//   //     if (!response.ok) {
//   //       console.log("Personal ContactInfo FAILED", response.status);
//   //       if (response.status === 400) {
//   //         alert("Game started earlier, you are allowed to continue");
//   //         console.log("Game started earlier, you are allowed to continue ");
//   //       } else {
//   //         toast.error(response.message);
//   //       }
//   //     }
//   //     console.log(
//   //       "game final route",
//   //       PATH_DASHBOARD.general.routegamepath(childId, gameName)
//   //     );
//   //     navigate(PATH_DASHBOARD.general.routegamepath(childId, gameName));
//   //   } else {
//   //     alert(
//   //       "You have already played for this day game. Your Score for this game : " +
//   //       sortfilter[i].score
//   //     );
//   //     return;
//   //   }
//   // };
//   const ref = useRef(null);
//   const [state, setState] = useState("");
//   // const theme = useTheme();
//   // const smUp = useResponsive("up", "sm");
//   // const mdUp = useResponsive("up", "md");

//   let day = new Date();
//   const date = moment(day).tz("Asia/Kolkata").format("YYYY-MM-DD");
//   const time = moment(day).tz("Asia/Kolkata").format("HH:mm:ss");

//   console.log("date", date);
//   console.log("time", time);

//   return (
//     <MotionContainer>
//       <RootStyle>
//         <Container>
//           <ContentStyle>
//             <>
//               <>
//                 <Typography
//                   variant="h3"
//                   alignItems="center"
//                   justifyContent="center"
//                   sx={{
//                     color: "#FFFF",
//                   }}
//                 >
//                   <br></br>
//                   <br></br>
//                   <br></br>
//                   <br></br>
//                   Activities
//                 </Typography>

//                 <Stack
//                   direction="row"
//                   alignItems="center"
//                   justifyContent="center"
//                   spacing={1}
//                 >
//                   {days.map((d, i) => (
//                     <Button
//                       variant="contained"
//                       disabled={
//                         new Date(`2026-04-27T11:50:00`).getTime() <=
//                           new Date(`${date}T${time}`).getTime()
//                           ? false
//                           : true
//                       }
//                       onClick={() => {
//                         setState("enm");
//                         ref.current?.scrollIntoView({ behavior: "smooth" });
//                       }}

//                     // onClick={() => handleGame(pId, childId, d.day, token, i)}
//                     >
//                       Day 2
//                     </Button>
//                   ))}

//                   <Button
//                     variant="contained"
//                     disabled={
//                       new Date(`2026-04-28T11:50:00`).getTime() <=
//                         new Date(`${date}T${time}`).getTime()
//                         ? false
//                         : true
//                     }
//                     onClick={() => {
//                       Game(pId, childId, "2026-04-28", token, "Lava");
//                       setState("tam");
//                       ref.current?.scrollIntoView({ behavior: "smooth" });
//                     }}
//                   >
//                     Day 1
//                   </Button>

//                   <Button
//                     variant="contained"
//                     disabled={
//                       new Date(`2026-04-29T11:50:00`).getTime() <=
//                         new Date(`${date}T${time}`).getTime()
//                         ? false
//                         : true
//                     }
//                     onClick={() => {
//                       Game(pId, childId, "2026-04-29", token, "Mickey");
//                       setState("ano");
//                       ref.current?.scrollIntoView({ behavior: "smooth" });
//                     }}
//                   >
//                     Day 3
//                   </Button>

//                   <Button
//                     variant="contained"
//                     disabled={
//                       new Date(`2026-04-30T11:50:00`).getTime() <=
//                         new Date(`${date}T${time}`).getTime()
//                         ? false
//                         : true
//                     }
//                     onClick={() => {
//                       Game(pId, childId, "2026-04-30", token, "Rope");
//                       setState("kam");
//                       ref.current?.scrollIntoView({ behavior: "smooth" });
//                     }}
//                   >
//                     Day 4
//                   </Button>

//                   <Button
//                     variant="contained"
//                     disabled={
//                       new Date(`2026-05-01T11:50:00`).getTime() <=
//                         new Date(`${date}T${time}`).getTime()
//                         ? false
//                         : true
//                     }
//                     onClick={() => {
//                       Game(pId, childId, "2026-05-01", token, "Unscramble");
//                       setState("him");
//                       ref.current?.scrollIntoView({ behavior: "smooth" });
//                     }}
//                   >
//                     Day 5
//                   </Button>
//                 </Stack>
//               </>

//               <div ref={ref}>
//                 {/* tamil */}
//                 {state === "tam" && (
//                   <>
//                     <Stack alignItems="center" spacing={3}>
//                       <Typography
//                         variant="h4"
//                         sx={{
//                           color: "white",
//                           background: "black",
//                           opacity: "0.6",
//                           padding: 1,
//                           borderRadius: 2,
//                         }}
//                       >
//                       Day1                   </Typography>
//                       <iframe
//                         src="https://online.jesusredeems.com/games/2026/Day1/"
//                         width="100%"
//                         height={600}
//                         title="Day1"
//                       ></iframe>
//                     </Stack>
//                   </>
//                 )}
//                 {/* english */}
//                 {state === "enm" && (
//                   <>
//                     <Stack alignItems="center" spacing={3}>
//                       <iframe
//                         src="https://online.jesusredeems.com/games/2026/Day2/"
//                         width="100%"
//                         height={600}
//                         title="Day2"
//                       ></iframe>
//                     </Stack>
//                   </>
//                 )}
//                 {/* hindi*/}
//                 {state === "him" && (
//                   <>
//                     <Stack alignItems="center" spacing={2}>
//                       <Typography
//                         variant="h4"
//                         sx={{
//                           color: "white",
//                           background: "black",
//                           opacity: "0.6",
//                           padding: 1,
//                           borderRadius: 2,
//                         }}
//                       >
//                    Day3
//                       </Typography>
//                       <iframe
//                         src="https://online.jesusredeems.com/games/2026/Day3"
//                         width="100%"
//                         height={900}
//                         title="Day3"
//                       ></iframe>
//                     </Stack>
//                   </>
//                 )}

//                 {state === "kam" && (
//                   <>
//                     <Stack alignItems="center" spacing={3}>
//                       <Typography
//                         variant="h4"
//                         sx={{
//                           color: "white",
//                           background: "black",
//                           opacity: "0.6",
//                           padding: 1,
//                           borderRadius: 2,
//                         }}
//                       >
//                  Day4
//                       </Typography>
//                       <iframe
//                         src="https://online.jesusredeems.com/games/2026/Day4"
//                         width="100%"
//                         height={900}
//                         title="Day4"
//                       ></iframe>
//                     </Stack>
//                   </>
//                 )}

//                 {state === "ano" && (
//                   <>
//                     <Stack alignItems="center" spacing={3}>
//                       <Typography
//                         variant="h4"
//                         sx={{
//                           color: "white",
//                           background: "black",
//                           opacity: "0.6",
//                           padding: 1,
//                           borderRadius: 2,
//                         }}
//                       >
//                      Day3
//                       </Typography>


//                       <iframe
//                         width="100%"
//                         height="880"
//                         allowfullscreen=""
//                         title="Day5"
//                         src="https://online.jesusredeems.com/games/2026/Day4"
//                       ></iframe>

//                       {/* https://online.jesusredeems.com/games/2026/Day5/#/ */}
//                     </Stack>
//                   </>
//                 )}
//               </div>
//             </>
//           </ContentStyle>
//         </Container>
//       </RootStyle>
//     </MotionContainer>
//   );
// }

import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// @mui
import { m } from "framer-motion";
import { styled } from "@mui/material/styles";
import { Button, Container, Typography, Stack } from "@mui/material";
import moment from "moment-timezone";
// utils
// import cssStyles from "../../../../utils/cssStyles";
// import cssStyles from "src/utils/cssStyles";

import { MotionContainer } from "src/components/animate";

// components
// import Image from "../../../../components/Image";
import { useState } from "react";
import { getScore, startGame } from "src/services/JRMFeedService";
// import { toast } from "react-toastify";
// import { PATH_DASHBOARD } from "src/routes/paths";

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  backgroundSize: "cover",
  backgroundPosition: "right",
  backgroundImage: "url(/assets/act-bg-7.png)",

  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    paddingTop: 20,
    paddingBottom: 450,
    display: "flex",
    alignItems: "center",
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    margin: "auto",
    textAlign: "center",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up("md")]: {
      margin: "unset",
      textAlign: "center",
    },
  })
);

// ----------------------------------------------------------------------
// const days = [
//   {
//     title: "Day 1",
//     day: "2026-04-27",
//     month: "05",
//   },
// ];

export default function Memory() {
  const pId = localStorage.getItem("partnerId");
  const token = localStorage.getItem("jwt");
  const gameName = localStorage.getItem("path");
  const childId = localStorage.getItem("currentChildId");

  useEffect(() => {
    const result = getScore(pId, childId, token, gameName);
    console.log("score", result.data);
  }, [pId, childId, token, gameName]);

  const Game = async (pId, childId, day, token, gameName) => {
    const response = await startGame(pId, childId, day, token, gameName);
    console.log("fn resp", response);
  };

  const ref = useRef(null);
  const [state, setState] = useState("");

  let day = new Date();
  const date = moment(day).tz("Asia/Kolkata").format("YYYY-MM-DD");
  const time = moment(day).tz("Asia/Kolkata").format("HH:mm:ss");

  console.log("date", date);
  console.log("time", time);

  return (
    <MotionContainer>
      <RootStyle>
        <Container>
          <ContentStyle>
            <>
              <>
                <Typography
                  variant="h3"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    color: "#FFFF",
                  }}
                >
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  Activities
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                >
                  {/* Day 1 Button - Modified */}
                  <Button
                    variant="contained"
                    disabled={
                      new Date(`2026-04-27T11:50:00`).getTime() <=
                        new Date(`${date}T${time}`).getTime()
                        ? false
                        : true
                    }
                    onClick={() => {
                      Game(pId, childId, "2026-04-27", token, "Day1");
                      setState("day1");
                      ref.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Day 1
                  </Button>

                  {/* Day 2 Button - Modified */}
                  <Button
                    variant="contained"
                    disabled={
                      new Date(`2026-04-28T11:50:00`).getTime() <=
                        new Date(`${date}T${time}`).getTime()
                        ? false
                        : true
                    }
                    onClick={() => {
                      Game(pId, childId, "2026-04-28", token, "Day2");
                      setState("day2");
                      ref.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Day 2
                  </Button>

                  {/* Day 3 Button - Modified */}
                  <Button
                    variant="contained"
                    disabled={
                      new Date(`2026-04-29T11:50:00`).getTime() <=
                        new Date(`${date}T${time}`).getTime()
                        ? false
                        : true
                    }
                    onClick={() => {
                      Game(pId, childId, "2026-04-29", token, "Day3");
                      setState("day3");
                      ref.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Day 3
                  </Button>

                  {/* Day 4 Button - Modified */}
                  <Button
                    variant="contained"
                    disabled={
                      new Date(`2026-04-30T11:50:00`).getTime() <=
                        new Date(`${date}T${time}`).getTime()
                        ? false
                        : true
                    }
                    onClick={() => {
                      Game(pId, childId, "2026-04-30", token, "Day4");
                      setState("day4");
                      ref.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Day 4
                  </Button>

                  {/* Day 5 Button - Modified */}
                  <Button
                    variant="contained"
                    disabled={
                      new Date(`2026-05-01T11:50:00`).getTime() <=
                        new Date(`${date}T${time}`).getTime()
                        ? false
                        : true
                    }
                    onClick={() => {
                      Game(pId, childId, "2026-05-01", token, "Day5");
                      setState("day5");
                      ref.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Day 5
                  </Button>
                </Stack>
              </>

              <div ref={ref}>
                {/* Day 1 */}
                {state === "day1" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      {/* <Typography
                        variant="h4"
                        sx={{
                          color: "white",
                          background: "black",
                          opacity: "0.6",
                          padding: 1,
                          borderRadius: 2,
                        }}
                      >
                        BE DISCIPLINED
                      </Typography> */}
                      <iframe
                        src="https://online.jesusredeems.com/games/2026/Day1/"
                        width="100%"
                        height={800}
                        style={{ marginTop: 80 }}
                        title="Day1"
                      ></iframe>
                    </Stack>
                  </>
                )}

                {/* Day 2 */}
                {state === "day2" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      {/* <Typography
                        variant="h4"
                        sx={{
                          color: "white",
                          background: "black",
                          opacity: "0.6",
                          padding: 1,
                          borderRadius: 2,
                        }}
                      >
                        BE INCOMPARABLE                      </Typography> */}
                      <iframe
                        src="https://online.jesusredeems.com/games/2026/Day2/"
                        width="100%"
                        height={800}
                        style={{ marginTop: 80 }}
                        title="Day2"
                      ></iframe>
                    </Stack>
                  </>
                )}

                {/* Day 3 */}
                {state === "day3" && (
                  <>
                    <Stack alignItems="center" spacing={2}>
                      {/* <Typography
                        variant="h4"
                        sx={{
                          color: "white",
                          background: "black",
                          opacity: "0.6",
                          padding: 1,
                          borderRadius: 2,
                        }}
                      >
                        Day 3
                      </Typography> */}
                      <iframe
                        src="https://online.jesusredeems.com/games/2026/Day3/"
                        width="100%"
                        style={{ marginTop: 180 }}
                        height={900}
                        title="Day3"
                      ></iframe>
                    </Stack>
                  </>
                )}

                {/* Day 4 */}
                {state === "day4" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      {/* <Typography
                        variant="h4"
                        sx={{
                          color: "white",
                          background: "black",
                          opacity: "0.6",
                          padding: 1,
                          borderRadius: 2,
                        }}
                      >
                        Day 4
                      </Typography> */}
                      <iframe
                        src="https://online.jesusredeems.com/games/2026/Day4/"
                        width="100%"
                        style={{ marginTop: 180 }}
                        height={900}
                        title="Day4"
                      ></iframe>
                    </Stack>
                  </>
                )}

                {/* Day 5 */}
                {state === "day5" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      {/* <Typography
                        variant="h4"
                        sx={{
                          color: "white",
                          background: "black",
                          opacity: "0.6",
                          padding: 1,
                          borderRadius: 2,
                        }}
                      >
                        Day 5
                      </Typography> */}
                      <iframe
                        src="https://online.jesusredeems.com/games/2026/Day5/"
                        width="100%"
                        height="700"
                        style={{ marginTop: 80 }}
                        // allowFullScreen=""
                        title="Day5"
                      ></iframe>
                    </Stack>
                  </>
                )}
              </div>
            </>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}