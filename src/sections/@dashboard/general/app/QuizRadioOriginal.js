import PropTypes, { array } from "prop-types";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { PATH_DASHBOARD } from "../../../../routes/paths";
// @mui
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  Stack,
  Grid,
  FormControl,
} from "@mui/material";
// hooks
import { toast } from "react-toastify";
import { getScore, startGame } from "../../../../services/JRMFeedService";
import moment from "moment";

import useResponsive from "../../../../hooks/useResponsive";

// utils

// ----------------------------------------------------------------------

const HEIGHT = 410;

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  height: HEIGHT,
  "& .slick-list": {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const CardItemStyle = styled("div")(({ theme }) => ({
  position: "relative",
  height: HEIGHT,
  backgroundSize: "cover",
  padding: theme.spacing(3),
  backgroundRepeat: "no-repeat",
  color: theme.palette.common.black,
  backgroundImage: 'url("/assets/bg_gradient1blur.jpg")',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: Number(theme.shape.borderRadius) * 3,
}));
const date = moment().date();
localStorage.setItem("date", date);
const shadowStyle = {
  mx: "auto",
  width: "calc(100% - 2px)",
  borderRadius: 3,
  position: "absolute",
  height: HEIGHT,
  zIndex: 8,
  top: 8,
  left: 0,
  right: 0,
  bgcolor: "grey.500",
  opacity: 0.38,
};

// ----------------------------------------------------------------------

const days = [
  {
    title: "Play Day 1 Quiz",
    date: "12",
  },
  {
    title: "Play Day 2 Quiz",
    date: "13",
  },
  {
    title: "Play Day 3 Quiz",
    date: "14",
  },
  {
    title: "Play Day 4 Quiz",
    date: "15",
  },
  {
    title: "Play Day 5 Quiz",
    date: "16",
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

export default function QuizRadio({ list, sx }) {
  const navigate = useNavigate();
  const pId = localStorage.getItem("partnerId");
  const token = localStorage.getItem("jwt");
  console.log("jwt in quiz", token);
  const { childId, fullName, dateOfBirth, gender } = list;
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  var today = moment();
  console.log("date", date);

  return (
    <Box>
      {list.map((quiz) => (
        <Grid item xs={12} md={12} key={quiz.childId}>
          <>
            <RootStyle sx={sx}>
              <Box sx={{ position: "relative", zIndex: 9, mb: 5 }}>
                <CardItemStyle>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    justifyContent={isDesktop ? "flex-start" : "flex-center"}
                    spacing={1}
                  >
                    <FormControl>
                      {/* <Typography sx={{ typography: 'subtitle2',opacity: 0.80,textAlign: 'center' }}>ID:{quiz.childId} </Typography> */}
                      <Typography sx={{ typography: "h2", fontFamily: "Lato" }}>
                        {quiz.fullName}
                      </Typography>
                    </FormControl>
                  </Stack>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    justifyContent={isDesktop ? "flex-center" : "flex-center"}
                    spacing={1}
                  >
                    <FormControl>
                      <Typography
                        sx={{
                          typography: "h4",
                          opacity: 0.8,
                          textAlign: "center",
                          fontFamily: "Lato",
                        }}
                      >
                        DOB:{quiz.dateOfBirth}{" "}
                      </Typography>
                      <Typography sx={{ typography: "h4", fontFamily: "Lato" }}>
                        {quiz.gender === 1 ? "Male" : "Female"}
                      </Typography>
                    </FormControl>
                  </Stack>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    justifyContent={isDesktop ? "flex-end" : "flex-center"}
                    spacing={1}
                  >
                    {days
                      .filter((cd) => cd.date <= moment().date())
                      .map((d, i) => (
                        <Button
                          key={d.days}
                          variant="contained"
                          onClick={async () => {
                            var dob = moment(quiz.dateOfBirth, "YYYY-MM-DD");
                            localStorage.setItem(
                              "currentChildId",
                              quiz.childId
                            );
                            localStorage.setItem("qdate", d.date);
                            localStorage.setItem("childId", quiz.childId);

                            if (today.diff(dob, "years") <= 5) {
                              console.log("age", today.diff(dob, "years"));
                              localStorage.setItem("category", "beginner");
                            } else if (
                              today.diff(dob, "years") > 5 &&
                              today.diff(dob, "years") < 11
                            ) {
                              console.log("age", today.diff(dob, "years"));
                              localStorage.setItem("category", "junior");
                            } else if (today.diff(dob, "years") > 10) {
                              console.log("age", today.diff(dob, "years"));
                              localStorage.setItem("category", "senior");
                            }
                            const response = await startGame(
                              pId,
                              quiz.childId,
                              d.date,
                              token
                            );
                            console.log("fn resp", response);
                            if (!response) {
                              toast.error("Error: Unable to communicate");
                              console.log("Error: Unable to communicate");
                              return;
                            }

                            const result = await getScore(
                              pId,
                              quiz.childId,
                              token
                            );
                            console.log("individual score", result);
                            console.log(
                              "datascore",
                              result.data.gameScoreList[i].endDateTime
                            );
                            console.log(
                              "i",
                              result.data.gameScoreList[i].endDateTime
                            );
                            if (
                              result.data.gameScoreList[i].endDateTime === null
                            ) {
                              if (!response.ok) {
                                console.log(
                                  "Personal ContactInfo FAILED",
                                  response.status
                                );
                                if (response.status === 400) {
                                  alert(
                                    "Game started earlier, you are allowed to continue "
                                  );
                                  console.log(
                                    "Game started earlier, you are allowed to continue "
                                  );
                                } else {
                                  toast.error(response.message);
                                }
                              }
                              navigate(
                                PATH_DASHBOARD.general.quizpage(quiz.childId)
                              );
                            } else {
                              alert(
                                "You have already played for this day quiz. Your Score is: " +
                                  result.data.gameScoreList[i].score
                              );
                              return;
                            }
                          }}
                        >
                          {d.title}
                        </Button>
                      ))}
                  </Stack>
                  <br />
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    justifyContent={isDesktop ? "flex-end" : "flex-center"}
                    spacing={1}
                  >
                    <Button
                      size="large"
                      variant="outlined"
                      style={{ color: "#fffffa" }}
                      onClick={async () => {
                        const originalImage = `../assets/kidsmas/${quiz.childId}.jpg`;
                        const image = await fetch(originalImage);
                        console.log("image", image);
                        const nameSplit = originalImage.split("/");
                        const duplicateName = nameSplit.pop();

                        const imageBlog = await image.blob();
                        const imageURL = URL.createObjectURL(imageBlog);
                        const link = document.createElement("a");
                        link.href = imageURL;
                        link.download = "" + duplicateName + "";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        //   fetch('http://revival.jesusredeems.com/wp-content/uploads/sites/4/2022/11/aaron-burden-25846-unsplash.jpg').then(response => {
                        //     response.blob().then(blob => {
                        //         // Creating new object of PDF file
                        //         const fileURL = window.URL.createObjectURL(blob);
                        //         // Setting various property values
                        //         let alink = document.createElement('a');
                        //         alink.href = fileURL;
                        //         alink.download = 'aaron-burden-25846-unsplash.jpg';
                        //         alink.click();
                        //     })
                        // })
                        console.log(quiz.childId);
                      }}
                    >
                      Download Certificate
                    </Button>
                  </Stack>
                </CardItemStyle>
              </Box>

              <Box
                sx={{
                  ...shadowStyle,

                  bottom: 10,
                  left: 5,
                  zIndex: 7,
                  bgcolor: "grey.500",
                  width: "calc(100% - 2px)",
                }}
              />
            </RootStyle>
            <br />
            <br />
          </>
        </Grid>
      ))}
    </Box>
  );
}
