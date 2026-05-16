// import PropTypes from "prop-types";
// import moment from "moment-timezone";
// import { useNavigate } from "react-router-dom";
// import { alpha, useTheme, styled } from "@mui/material/styles";
// import { useState, useEffect } from "react";

// import {
//   Box,
//   Card,
//   Grid,
//   Radio,
//   RadioGroup,
//   FormControl,
//   FormControlLabel,
//   Typography,
//   Stack,
//   Button,
// } from "@mui/material";
// // utils
// import { getScore } from "../../../../services/JRMFeedService";
// // components
// import Iconify from "../../../../components/Iconify";
// import { PATH_DASHBOARD } from "../../../../routes/paths";

// import { toast } from "react-toastify";
// // import {HandlePlay} from '../../../../services/Game';

// // ----------------------------------------------------------------------

// const IconWrapperStyle = styled("div")(({ theme }) => ({
//   width: 24,
//   height: 24,
//   display: "flex",
//   borderRadius: "50%",
//   alignItems: "center",
//   justifyContent: "center",
//   color: theme.palette.success.main,
//   backgroundColor: alpha(theme.palette.success.main, 0.16),
// }));

// // ----------------------------------------------------------------------

// AppWidgetSummary.propTypes = {
//   dob: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   gender: PropTypes.number.isRequired,
//   sx: PropTypes.object,
// };

// const online = [
//   { day: 15, link: "https://online.jesusredeems.com/games/connection/sblue/" },
//   { day: 16, link: "https://online.jesusredeems.com/games/snake/" },
//   { day: 17, link: "https://online.jesusredeems.com/games/fishing/" },
//   { day: 18, link: "https://online.jesusredeems.com/games/happyfarm/" },
//   { day: 19, link: "https://online.jesusredeems.com/games/ropestar/" },
// ];

// export default function AppWidgetSummary({
//   id,
//   name,
//   dob,
//   gender,
//   sx,
//   ...other
// }) {
//   const theme = useTheme();

//   const navigate = useNavigate();
//   const [viewscore, setScore] = useState(false);
//   const [popup, setPopup] = useState(false);
//   const [voteOption, setVoteOption] = useState("");
//   const [isVisible, setIsVisible] = useState(false);
//   const [showCard, setShowCard] = useState(false);


//   useEffect(() => {
//     const currentTime = moment().tz("Asia/Kolkata");
//     const startTime = moment().tz("Asia/Kolkata").hour(10).minute(0);
//     const endTime = moment().tz("Asia/Kolkata").hour(23).minute(59);

//     if (currentTime.isBetween(startTime, endTime)) {
//       setShowCard(true);
//     } else {
//       setShowCard(false);
//     }
//   }, []);

//   let day = new Date();
//   const date = moment(day).tz("Asia/Kolkata").format("DD");
//   console.log("First date", date);
//   const score = async (id) => {
//     const pId = localStorage.getItem("partnerId");
//     const token = localStorage.getItem("jwt");  
//     const result = await getScore(pId, id, token, "gameName");
//     console.log("score - ", result.data);
//     console.log(
//       "sum score ",
//       result.data.gameScoreList.reduce((a, v) => (a = a + v.score), 0)
//     );
//     setScore(true);
//     localStorage.setItem(
//       `${id}-score`,
//       result.data.gameScoreList.reduce((a, v) => (a = a + v.score), 0)
//     );
//   };

//   const handlePlay = (id, dateOfBirth, path) => {
//     localStorage.setItem("path", path);
//     localStorage.setItem("date", date);
//     var today = moment();
//     var dob = moment(dateOfBirth, "YYYY-MM-DD");
//     localStorage.setItem("currentChildId", id);
//     localStorage.setItem("childId", id);

//     if (today.diff(dob, "years") <= 5) {
//       console.log(`age-${id}`, today.diff(dob, "years"));
//       localStorage.setItem("category", "beginner");
//     } else if (today.diff(dob, "years") > 5 && today.diff(dob, "years") < 11) {
//       console.log(`age-${id}`, today.diff(dob, "years"));
//       localStorage.setItem("category", "junior");
//     } else if (today.diff(dob, "years") > 10) {
//       console.log(`age-${id}`, today.diff(dob, "years"));
//       localStorage.setItem("category", "senior");
//     }

//     console.log("routing path", PATH_DASHBOARD.general.playgame(id));
//     console.log("local stored path", path);
//     navigate(PATH_DASHBOARD.general.playgame(id));
//   };

//   const handleGame = (id, dateOfBirth, path) => {
//     localStorage.setItem("path", path);
//     localStorage.setItem("date", date);
//     var today = moment();
//     var dob = moment(dateOfBirth, "YYYY-MM-DD");
//     localStorage.setItem("currentChildId", id);
//     localStorage.setItem("childId", id);

//     console.log("routing path", PATH_DASHBOARD.general.games(id));
//     console.log("local stored path", path);
//     navigate(PATH_DASHBOARD.general.games(id));
//   };
//   const handleNavigate = () => {
//     navigate(PATH_DASHBOARD.general.vote(id), {
//       state: {
//         childId: id,
//         fullName: name,
//         dateOfBirth: dob,
//         gender: gender,
//       },
//     });
//   };

//   return (
//     <Card
//       key={id}
//       sx={{ display: "flex", alignItems: "center", p: 3, ...sx }}
//       {...other}
//     >
//       <Box sx={{ flexGrow: 1 }}>
//         <Typography variant="h3">{name}</Typography>
//         <Typography variant="subtitle">{dob}</Typography>

//         <Stack
//           direction="row"
//           alignItems="center"
//           spacing={1}
//           sx={{ mt: 2, mb: 1 }}
//         >
//           <IconWrapperStyle
//             sx={{
//               ...(gender === 2 && {
//                 color: "error.main",
//                 bgcolor: alpha(theme.palette.error.main, 0.16),
//               }),
//             }}
//           >
//             <Iconify
//               width={16}
//               height={16}
//               icon={
//                 gender === 1
//                   ? "icon-park-solid:boy-one"
//                   : "icon-park-solid:girl-one"
//               }
//             />
//           </IconWrapperStyle>
//           <Typography variant="subtitle">
//             {gender === 1 ? "Male" : "Female"}
//           </Typography>
//         </Stack>

//       </Box>

//       <Stack direction="column" spacing={2}>
//         {/* <Button
//           variant="contained"
//           endIcon={<Iconify icon={"ic:round-quiz"} />}
//           onClick={() => handlePlay(id, dob, "quiz")}
//         >
//           Play Quiz
//         </Button> */}

//         <Button
//           variant="contained"
//           endIcon={<Iconify icon={"ph:game-controller-duotone"} />}
//           onClick={() => handleGame(id, dob, "quiz")}
//         >
//          Activity
//         </Button>



// {showCard && (

//           <Button
//             variant="contained"
//             size="medium"
//             sx={{ mt: 2 }}
//             onClick={handleNavigate}
//             endIcon={<Iconify icon="mdi:vote-outline" />}
//           >
//             Vote
//           </Button>

//         )}

//         {/* {!viewscore && <Button variant='text' color='secondary' onClick={()=>score(id)}>View Score</Button>}

//       <Typography textAlign={'center'}>{viewscore  ?  `Your Score : ${localStorage.getItem(`${id}-score`)}` : ''}</Typography> */}
//       </Stack>
//     </Card>
//   );
// }

import PropTypes from "prop-types";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { alpha, useTheme, styled } from "@mui/material/styles";
import { useState, useEffect } from "react";

import {
  Box,
  Card,
  Typography,
  Stack,
  Button,
} from "@mui/material";
// utils
// import { getScore } from "../../../../services/JRMFeedService";
// components
import Iconify from "../../../../components/Iconify";
import { PATH_DASHBOARD } from "../../../../routes/paths";


// import {HandlePlay} from '../../../../services/Game';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  dob: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

// const online = [
//   { day: 15, link: "https://online.jesusredeems.com/games/connection/sblue/" },
//   { day: 16, link: "https://online.jesusredeems.com/games/snake/" },
//   { day: 17, link: "https://online.jesusredeems.com/games/fishing/" },
//   { day: 18, link: "https://online.jesusredeems.com/games/happyfarm/" },
//   { day: 19, link: "https://online.jesusredeems.com/games/ropestar/" },
// ];

export default function AppWidgetSummary({
  id,
  name,
  dob,
  gender,
  sx,
  ...other
}) {
  const theme = useTheme();

  const navigate = useNavigate();
  // const [viewscore, setScore] = useState(false);
  // const [popup, setPopup] = useState(false);
  // const [voteOption, setVoteOption] = useState("");
  // const [isVisible, setIsVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);


  useEffect(() => {

    const checkTime = () => {
      const localTime = moment();
      const indiaTime = moment().tz("Asia/Kolkata");
      console.log("Local Time:", localTime.format("YYYY-MM-DD HH:mm:ss"));
      console.log("India Time:", indiaTime);

      const indiaStartTime = indiaTime.clone().hour(10).minute(0).second(0);
      const indiaEndTime = indiaTime.clone().hour(23).minute(59).second(59);


      // console.log("indiaStartTime", indiaDay1StartTime);
      // if (indiaTime.isBetween(indiaDay1StartTime, indiaDay2EndTime)) {
      //   setShowCard(true);
      // } else {
      //   setShowCard(false);
      // }
      if (indiaTime.isBetween(indiaStartTime, indiaEndTime)) {
        setShowCard(true);
        console.log(showCard)
      } else {
        setShowCard(false);
      }
    };

    checkTime();

    const interval = setInterval(checkTime, 30000); // Every  30 seconds Check
    return () => clearInterval(interval);
  }, []);



  let day = new Date();
  const date = moment(day).tz("Asia/Kolkata").format("DD");
  console.log("First date", date);

  // const score = async (id) => {
  //   const pId = localStorage.getItem("partnerId");
  //   const token = localStorage.getItem("jwt");
  //   const result = await getScore(pId, id, token, "gameName");
  //   console.log("score - ", result.data);
  //   console.log(
  //     "sum score ",
  //     result.data.gameScoreList.reduce((a, v) => (a = a + v.score), 0)
  //   );
  //   setScore(true);
  //   localStorage.setItem(
  //     `${id}-score`,
  //     result.data.gameScoreList.reduce((a, v) => (a = a + v.score), 0)
  //   );
  // };

  const handlePlay = (id, dateOfBirth, path) => {
    localStorage.setItem("path", path);
    localStorage.setItem("date", date);
    var today = moment();
    var dob = moment(dateOfBirth, "YYYY-MM-DD");
    localStorage.setItem("currentChildId", id);
    localStorage.setItem("childId", id);

    if (today.diff(dob, "years") <= 7) {
      console.log(`age-${id}`, today.diff(dob, "years"));
      localStorage.setItem("category", "beginner");
    } else if (today.diff(dob, "years") > 7 && today.diff(dob, "years") <= 10) {
      console.log(`age-${id}`, today.diff(dob, "years"));
      localStorage.setItem("category", "primary");
    } else if (today.diff(dob, "years") >= 11 && today.diff(dob, "years") <= 13) {
      console.log(`age-${id}`, today.diff(dob, "years"));
      localStorage.setItem("category", "junior");
   
    }

    console.log("routing path", PATH_DASHBOARD.general.playgame(id));
    console.log("local stored path", path);
    navigate(PATH_DASHBOARD.general.playgame(id));
  };

  const handleGame = (id, dateOfBirth, path) => {
    localStorage.setItem("path", path);
    localStorage.setItem("date", date);
    // var today = moment();
    var dob = moment(dateOfBirth, "YYYY-MM-DD");

    if (dob.diff(moment("2026-02-26", "YYYY-MM-DD"), "days") === 0) {
      localStorage.setItem("category", "senior");
    } else if (dob.diff(moment("2026-02-27", "YYYY-MM-DD"), "days") === 0) {
      localStorage.setItem("category", "senior");
    } else if (dob.diff(moment("2026-02-28", "YYYY-MM-DD"), "days") === 0) {
      localStorage.setItem("category", "senior");
    } else {
      localStorage.setItem("category", "senior");
    }


    localStorage.setItem("currentChildId", id);
    localStorage.setItem("childId", id);





    console.log("routing path", PATH_DASHBOARD.general.games(id));
    console.log("local stored path", path);
    navigate(PATH_DASHBOARD.general.games(id));

  };


  // const handleNavigate = () => {
  //   navigate(PATH_DASHBOARD.general.vote(id), {
  //     state: {
  //       childId: id,
  //       fullName: name,
  //       dateOfBirth: dob,
  //       gender: gender,
  //     },
  //   });
  // };

  return (
    <Card
      key={id}
      sx={{ display: "flex", alignItems: "center", p: 3, ...sx }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="subtitle">{dob}</Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mt: 2, mb: 1 }}
        >
          <IconWrapperStyle
            sx={{
              ...(gender === 2 && {
                color: "error.main",
                bgcolor: alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Iconify
              width={16}
              height={16}
              icon={
                gender === 1
                  ? "icon-park-solid:boy-one"
                  : "icon-park-solid:girl-one"
              }
            />
          </IconWrapperStyle>
          <Typography variant="subtitle">
            {gender === 1 ? "Male" : "Female"}
          </Typography>
        </Stack>

      </Box>

      <Stack direction="column" spacing={2}>
        <Button
          variant="contained"
          endIcon={<Iconify icon={"ic:round-quiz"} />}
          onClick={() => handlePlay(id, dob, "quiz")}
          // disabled
        >
          Play Quiz
        </Button>

        <Button
          variant="contained"
          endIcon={<Iconify icon={"ph:game-controller-duotone"} />}
          onClick={() => handleGame(id, dob, "quiz")}
          // disabled
        >
          Activities
        </Button>



        {/* {showCard && (

          <Button
            variant="contained"
            size="medium"
            sx={{ mt: 2 }}
            onClick={handleNavigate}
            endIcon={<Iconify icon="mdi:vote-outline" />}
          >
            Vote
          </Button>

        )} */}


      </Stack>
    </Card>
  );
}