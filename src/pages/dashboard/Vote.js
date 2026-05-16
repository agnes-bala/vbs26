// @mui
import { styled, useTheme, alpha } from "@mui/material/styles";
import { m } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import { useLocation } from "react-router-dom";
import CathyImage from "src/assets/cathy.png";
import RabbyImage from "src/assets/rabby.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Grid,
  Typography,
  Card,
  Box,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import { getvote, vote } from "src/services/JRMFeedService";

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: "relative",
  borderRadius: 10,
  paddingTop: 0,
  paddingBottom: 10,
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: "url(/assets/vbsfullbg.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "bottom left",
    opacity: 0.2,
    zIndex: 0,
  },

  [theme.breakpoints.up("md")]: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  zIndex: 1,
}));

export default function Vote() {
  const currentDateTime = moment()
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");
  const token = localStorage.getItem("jwt");
  const partnerId = localStorage.getItem("partnerId");
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const [votedFor, setVotedFor] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const [isVotingAllowed, setIsVotingAllowed] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { childId, fullName } = location.state || {};

  //get vote details from api
  const fetchVoteDetails = useCallback(async () => {
    try {
      const response = await getvote(
        partnerId,
        childId,
        currentDateTime,
        token
      );
      console.log("get vote response", response.data.message);
      if (response.data.message === "Already voted for Cathy") {
        setIsVoted(true);
        alert(response.data.message);
      } else if (response.data.message === "Already voted for Brown Rabby") {
        setIsVoted(true);
        alert(response.data.message);
      } else setIsVoted(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [partnerId, childId, currentDateTime, token]);

  useEffect(() => {
    fetchVoteDetails();
    const checkTime = () => {
      const indiaTime = moment().tz("Asia/Kolkata");
      const indiaStartTime = indiaTime.clone().hour(10).minute(0).second(0);
      const indiaEndTime = indiaTime.clone().hour(23).minute(59).second(59);

      if (indiaTime.isBetween(indiaStartTime, indiaEndTime)) {
        setIsVotingAllowed(true);
      } else {
        setIsVotingAllowed(false);
      }
    };

    checkTime();

    const interval = setInterval(checkTime, 30000); // Every  30 seconds Check

    return () => clearInterval(interval);
  }, [fetchVoteDetails]);

  const handleBack = () => {
    navigate(PATH_DASHBOARD.general.myapp);
  };

  const handleVote = async (voteFor, childId) => {
    const response = await vote(
      partnerId,
      childId,
      currentDateTime,
      token,
      voteFor
    );
    console.log("Vote resp", response);
    if (!isVotingAllowed) {
      toast.error("Voting time is over.");
      return;
    }

    const payload = {
      childId: childId,
      vote: voteFor,
      partnerId: partnerId,
      dateTime: currentDateTime,
    };

    try {
      console.log("Vote submitted:", payload);
      setVotedFor(voteFor);
      setIsVoted(true);
      toast.success(`You voted for ${voteFor}!`);
    } catch (error) {
      console.error("Vote submission failed:", error);
      toast.error("Failed to submit your vote.");
    }
  };

  return (
    <Page title="Vote">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <IconButton
                onClick={handleBack}
                sx={{
                  color: "white",
                  backgroundColor: "primary.main",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                <ArrowBackIcon fontSize="large" />
              </IconButton>

              <Typography
                variant="h5"
                fontWeight={1000}
                color="black"
                gutterBottom
                sx={{
                  textAlign: "center",
                  mb: 3,
                  fontSize: "1rem",
                  fontFamily: "'Comic Sans MS', cursive",
                }}
              >
                Hi {fullName} !
              </Typography>
              {isVotingAllowed && (
                <Typography
                  variant="h5"
                  fontWeight={1000}
                  color="black"
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    mb: 3,
                    fontSize: "1rem",
                    fontFamily: "'Comic Sans MS', cursive",
                  }}
                >
                  Vote for your favourite team
                </Typography>
              )}

              {isVotingAllowed ? (
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    mt: 3,
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.light, 0.1),
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={4}
                    justifyContent="center"
                    mt={4}
                  >
                    <Box
                      textAlign="center"
                      mx={2}
                      onClick={() => !isVoted && handleVote("Cathy", childId)}
                      sx={{
                        cursor: isVoted ? "default" : "pointer",
                        borderRadius: 2,
                        borderColor:
                          votedFor === "Cathy" ? "green" : "transparent",
                        p: 1,
                        "&:hover": {
                          backgroundColor: !isVoted
                            ? alpha(theme.palette.primary.light, 0.1)
                            : "transparent",
                        },
                        opacity: isVoted && votedFor !== "Cathy" ? 0.5 : 1,
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        color="black"
                        sx={{ fontFamily: "'Comic Sans MS', cursive" }}
                      >
                        Team
                      </Typography>

                      <Typography
                        variant="h6"
                        fontWeight={800}
                        color="black"
                        mb={3}
                        sx={{ fontFamily: "'Comic Sans MS', cursive" }}
                      >
                        Cathy
                      </Typography>

                      <m.img
                        src={CathyImage}
                        alt="Cathy"
                        initial={{ scale: 1 }}
                        animate={
                          votedFor === "Cathy"
                            ? {
                                scale: [1, 1.05, 1],
                                boxShadow: "0 0 20px 4px rgba(0, 255, 0, 0.6)",
                              }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                        style={{
                          width: "100%",
                          maxWidth: "300px",
                          height: "auto",
                          borderRadius: 8,
                          display: "block",
                          margin: "0 auto",
                          border: "4px solid green",
                          // border:
                          //   votedFor === "Cathy" ? "4px solid green" : "none",
                        }}
                      />

                      {votedFor === "Cathy" && (
                        <Typography mt={1} color="green">
                          You voted for Cathy
                        </Typography>
                      )}
                    </Box>

                    <Box
                      textAlign="center"
                      mx={2}
                      onClick={() =>
                        !isVoted && handleVote("Brown Rabby", childId)
                      }
                      sx={{
                        cursor: isVoted ? "default" : "pointer",
                        borderRadius: 2,
                        borderColor:
                          votedFor === "Brown Rabby" ? "green" : "transparent",
                        p: 1,
                        "&:hover": {
                          backgroundColor: !isVoted
                            ? alpha(theme.palette.primary.light, 0.1)
                            : "transparent",
                        },
                        opacity:
                          isVoted &&
                          votedFor !== "Brown Rabby" &&
                          votedFor !== null
                            ? 0.6
                            : 1,
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        color="black"
                        sx={{ fontFamily: "'Comic Sans MS', cursive" }}
                      >
                        Team
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        color="black"
                        mb={3}
                        sx={{ fontFamily: "'Comic Sans MS', cursive" }}
                      >
                        Brown Rabby
                      </Typography>
                      <m.img
                        src={RabbyImage}
                        alt="Brown Rabby"
                        initial={{ scale: 1 }}
                        animate={
                          votedFor === "Brown Rabby"
                            ? {
                                scale: [1, 1.05, 1],
                                boxShadow: "0 0 20px 4px rgba(0, 255, 0, 0.6)",
                              }
                            : {}
                        }
                        transition={{ duration: 0.6 }}
                        style={{
                          width: "100%",
                          maxWidth: "300px",
                          height: "auto",
                          borderRadius: 8,
                          display: "block",
                          margin: "0 auto",
                          // border:
                          //   votedFor === "Brown Rabby"
                          //     ? "4px solid green"
                          //     : "none",
                          border: "4px solid red",
                        }}
                      />

                      {votedFor === "Brown Rabby" && (
                        <Typography mt={1} color="green">
                          You voted for Brown Rabby
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Card>
              ) : (
                <Paper
                  elevation={4}
                  sx={{
                    mt: 5,
                    p: 3,
                    backgroundColor: "#ffe6e6",
                    textAlign: "center",
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    color="error"
                    sx={{
                      fontFamily: "'Comic Sans MS', cursive",
                      fontWeight: 800,
                      mb: 2,
                    }}
                  >
                    Voting Time is Over ⏰
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Comic Sans MS', cursive",
                      fontSize: "1.1rem",
                    }}
                  >
                    You can only vote between <strong>10:00 AM</strong> and{" "}
                    <strong>11:59 PM IST</strong>.
                  </Typography>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
