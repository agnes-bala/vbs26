// @mui
import { m } from "framer-motion";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Stack,
  Button,
  Typography,
  CardContent,
  Card,
  CardActionArea,
  CardHeader,
  Link,
  CardMedia,
  alpha,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
// hooks
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from "../../_mock";
import YouTube from "react-youtube";
import useSettings from "../../hooks/useSettings";
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import useResponsive from "../../hooks/useResponsive";
import { getTop } from "../../services/JRMFeedService";
// sections
import { AppWelcome1 } from "../../sections/@dashboard/general/app";
import config from "../../partnerconfig.json";
import Iconify from "../../components/Iconify";
// assets
import moment from "moment";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

const gamelink = [
  {
    title: 12,
    description: "Kidsmas Kondattam Season 2",
    url: "http://online.jesusredeems.com/g/fire/",
  },
  {
    title: 13,
    description: "Kidsmas Kondattam Season 2",
    url: "http://online.jesusredeems.com/g/happyglass/",
  },
  {
    title: 14,
    description: "Kidsmas Kondattam Season 2",
    url: "http://online.jesusredeems.com/g/astro/",
  },
  {
    title: 15,
    description: "Kidsmas Kondattam Season 2",
    url: "http://online.jesusredeems.com/g/tower/",
  },
  {
    title: 16,
    description: "Kidsmas Kondattam Season 2",
    url: "http://online.jesusredeems.com/g/unjumble/",
  },
];

const winnersIndia = [
  {
    childName: "PETER PAUL",
    parentName: "Ebinesar",
    district: "Tiruvallur",
    state: "Tamil Nadu",
    score: "30",
  },
  {
    childName: "AKASH",
    parentName: "Rajammal",
    district: "Krishnagiri",
    state: "Tamil Nadu",
    score: "30",
  },
  {
    childName: "M JESWIN SAM MELVIN",
    parentName: "Daisy Priya",
    district: "Vellore",
    state: "Tamil Nadu",
    score: "29",
  },
];
const winnersOthers = [
  {
    childName: "Kerubin Minsta",
    parentName: "Soulwin asir jebakumar",
    state: "Baden-Württemberg",
    country: "Germany",
    score: "30",
  },
  {
    childName: "Kornelius Winstar",
    parentName: "Soulwin asir jebakumar",
    state: "Baden-Württemberg",
    country: "Germany",
    score: "30",
  },
  {
    childName: "Keren Jebamalar",
    parentName: "Hetzial Jebasingh",
    state: "North Brabant",
    country: "Netherlands",
    score: "28",
  },
];
const ItemBlockStyle = styled((props) => (
  <Stack direction="row" alignItems="center" {...props} />
))({
  minWidth: 72,
  flex: "1 1",
});
const IconWrapperStyle = styled("div")(({ theme }) => ({
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

const ItemIconStyle = styled(Iconify)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(0.5),
  color: theme.palette.text.disabled,
}));
const RootStyle = styled(m.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: "url(/assets/vbsbg.jpg)",
  borderRadius: 10,
  [theme.breakpoints.up("md")]: {
    width: "100%",
    display: "flex",
    position: "relative",
    alignItems: "center",
  },
  // paddingTop: 100,
  // paddingBottom: 200,
}));

const url = config.jrmClientUrl;

export default function GeneralApp1() {
  
  const navigate = useNavigate();
  const [feed, setFeed] = useState({ feedList: [] });
  const pId = localStorage.getItem("partnerId");
  const token = localStorage.getItem("jwt");
  const config = { Authorization: `Bearer ${token}` };
  const [status, setStatus] = useState(0);
  const date = moment().date();
  // const [nonindiaold, setNonindiaold] = useState({overallScores:[]});
  const [winners, setWinners] = useState({ overallScores: [] });
  const [nonindia, setNonindia] = useState({ overallScores: [] });
  const [india, setIndia] = useState({ overallScores: [] });

  useEffect(() => {
    axios
      .get(`${url}jrms/v1/feed/home`)
      .then((response) => {
        console.log(response);
        console.log("response", response.data);
        setFeed(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("Feed Response", feed);
  useEffect(() => {
    axios
      .get(`${url}jrms/v1/partners/${pId}/childreninfo`, { headers: config })
      .then((response) => {
        console.log(response);
        console.log("response", response.data);
        console.log("Childdata", response.data.children.length);
        setStatus(response.data.children.length);
        if (response.data.children.length === 0) {
          toast.error("Please update your profile");
          alert("Please update your profile");
          navigate(PATH_DASHBOARD.user.profile);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const theme = useTheme();
  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");
  const { themeStretch } = useSettings();
  const [isShown, setIsShown] = useState(false);
  const youtubeOnReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const youtubeOpts = {
    height: "100%",
    aspectRatio: "16/9",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <Page title="Dashboard">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Grid container>
            <Grid
              item
              xs="12"
              md="12"
              sx={{ alignItems: "center", flex: "middle" }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#ff0000"
              >
                <Button
                  size="large"
                  style={{
                    fontSize: "30px",
                    fontFamily: "BiteChocolate",
                    color: "#fffffa",
                  }}
                  variant="text"
                >
                  {" "}
                  December
                  <br />
                </Button>
                <Button
                  size="large"
                  style={{
                    fontSize: "30px",
                    fontFamily: "Lato",
                    color: "#fffffa",
                  }}
                  variant="text"
                >
                  12 - 16, 2022
                  <br />
                </Button>
              </Box>
              <br />
              <br />
              <br />
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container>
            <Grid
              item
              xs="12"
              md="12"
              sx={{ alignItems: "center", flex: "middle" }}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  size="large"
                  style={{ fontSize: "25px", color: "#fffffa" }}
                  variant="text"
                >
                  Everyday 6.30pm - 8.30pm
                  <br /> on our social media platforms
                  <br />
                </Button>
              </Box>
              <br />
              <br />
              <br />
            </Grid>
          </Grid>
          {status === 0 && (
            <Grid container>
              <Grid
                item
                xs="12"
                md="12"
                sx={{ alignItems: "center", flex: "middle" }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Link
                    underline="none"
                    color="inherit"
                    component={RouterLink}
                    to={PATH_DASHBOARD.user.profile}
                  >
                    <Button size="large" color="error" variant="contained">
                      Complete your Profile.
                      <br />
                      Children details are required.
                    </Button>
                  </Link>
                </Box>

                <br />
                <br />
              </Grid>
            </Grid>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {feed.feedList
                .filter((_id) => _id.id === 11)
                .map((data) => (
                  <AppWelcome1
                    key={data}
                    title={data.feedName}
                    description={data.feedInfo}
                  />
                ))}
            </Grid>
            <Grid item xs={12} md={4}>
              {feed.feedList
                .filter((_id) => _id.id === 12)
                .map((data) => (
                  <AppWelcome1
                    key={data}
                    title={data.feedName}
                    description={data.feedInfo}
                  />
                ))}
            </Grid>
          </Grid>
          <br /> <br />
          <Grid container spacing={3}>
            <Grid item sm="6" xs="12">
              <Card xs={{ maxWidth: "auto", pr: 5, pl: 5, pt: 0, pb: 0 }}>
                <br />
                {winnersIndia[0].childName !== "" && (
                  <CardHeader title="Overall Winners - India" />
                )}
                {winnersIndia
                  .filter((c) => c.childName !== "")
                  .map((data, i) => (
                    <Stack
                      direction="row"
                      sx={{ p: 3 }}
                      alignItems="center"
                      spacing={2}
                    >
                      <Scrollbar>
                        <ItemBlockStyle sx={{ minWidth: 120 }}>
                          <ItemIconStyle
                            icon={"material-symbols:account-box"}
                          />
                          <Typography variant="subtitle2">
                            {data.childName}
                          </Typography>
                        </ItemBlockStyle>

                        <ItemBlockStyle>
                          <Typography variant="body2">
                            Parent: {data.parentName}
                          </Typography>
                        </ItemBlockStyle>

                        <ItemBlockStyle>
                          <Typography variant="body2">
                            District: {data.district}
                          </Typography>
                        </ItemBlockStyle>

                        <ItemBlockStyle sx={{ minWidth: 88 }}>
                          <Typography variant="body2">
                            State: {data.state}
                          </Typography>
                        </ItemBlockStyle>

                        <IconWrapperStyle
                          sx={{
                            ...(i === 1 && {
                              color: "info.main",
                              bgcolor: (theme) =>
                                alpha(theme.palette.info.main, 0.08),
                            }),
                            ...(i === 2 && {
                              color: "error.main",
                              bgcolor: (theme) =>
                                alpha(theme.palette.error.main, 0.08),
                            }),
                          }}
                        >
                          <Iconify
                            icon={"ant-design:trophy-filled"}
                            width={20}
                            height={20}
                          />
                        </IconWrapperStyle>
                      </Scrollbar>
                    </Stack>
                  ))}

                <CardHeader title="Top Players of the Day - India" />
                {gamelink
                  .filter((cd) => cd.title <= moment().date())
                  .map((d, index) => (
                    <>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          key={d.title}
                          variant="contained"
                          onClick={async () => {
                            localStorage.setItem("fdate", d.title);
                            console.log("button click", index);
                            const response = await getTop(d.title, "india");
                            console.log("india", response.data);
                            setIndia(response.data);
                            console.log("india set", india);
                            console.log("array", india.overallScores.length);
                            setIsShown(true);
                          }}
                        >
                          {" "}
                          Click to view <br /> {d.title}/12/2022 Top Scorers
                        </Button>
                      </Box>
                      <br />
                    </>
                  ))}
                {isShown && india.overallScores.length > 0 && (
                  <>
                    <Typography>
                      Top 3 Winners of {localStorage.getItem("fdate")}/12/2022
                    </Typography>
                    {india.overallScores
                      .filter((pN) => pN.parentName !== null)
                      .filter((d, i) => i < 3)
                      .map((data, i) => (
                        <Stack
                          direction="row"
                          sx={{ p: 3 }}
                          alignItems="center"
                          spacing={2}
                        >
                          <Scrollbar>
                            <ItemBlockStyle sx={{ minWidth: 120 }}>
                              <ItemIconStyle
                                icon={"material-symbols:account-box"}
                              />
                              <Typography variant="subtitle2">
                                {data.childName}
                              </Typography>
                            </ItemBlockStyle>

                            <ItemBlockStyle>
                              <Typography variant="body2">
                                Parent: {data.parentName}
                              </Typography>
                            </ItemBlockStyle>

                            <ItemBlockStyle>
                              <Typography variant="body2">
                                District: {data.district}
                              </Typography>
                            </ItemBlockStyle>

                            <ItemBlockStyle sx={{ minWidth: 88 }}>
                              <Typography variant="body2">
                                State: {data.state}
                              </Typography>
                            </ItemBlockStyle>

                            <IconWrapperStyle
                              sx={{
                                ...(i === 1 && {
                                  color: "info.main",
                                  bgcolor: (theme) =>
                                    alpha(theme.palette.info.main, 0.08),
                                }),
                                ...(i === 2 && {
                                  color: "error.main",
                                  bgcolor: (theme) =>
                                    alpha(theme.palette.error.main, 0.08),
                                }),
                              }}
                            >
                              <Iconify
                                icon={"ant-design:trophy-filled"}
                                width={20}
                                height={20}
                              />
                            </IconWrapperStyle>
                          </Scrollbar>
                        </Stack>
                      ))}
                    <Divider />
                  </>
                )}
              </Card>
            </Grid>
            <Grid item sm="6" xs="12">
              <Card
                xs={{ maxWidth: "auto", pr: 5, pl: 5, pt: 0, pb: 0, ml: 5 }}
              >
                <br />
                {winnersOthers[0].childName !== "" && (
                  <CardHeader title="Overall Winners - Overseas" />
                )}
                {winnersOthers
                  .filter((c) => c.childName !== "")
                  .map((data, i) => (
                    <Stack
                      direction="row"
                      sx={{ p: 3 }}
                      alignItems="center"
                      spacing={2}
                    >
                      <Scrollbar>
                        <ItemBlockStyle sx={{ minWidth: 120 }}>
                          <ItemIconStyle
                            icon={"material-symbols:account-box"}
                          />
                          <Typography variant="subtitle2">
                            {data.childName}
                          </Typography>
                        </ItemBlockStyle>

                        <ItemBlockStyle>
                          <Typography variant="body2">
                            Parent: {data.parentName}
                          </Typography>
                        </ItemBlockStyle>

                        <ItemBlockStyle>
                          <Typography variant="body2">
                            State: {data.state}
                          </Typography>
                        </ItemBlockStyle>

                        <ItemBlockStyle sx={{ minWidth: 88 }}>
                          <Typography variant="body2">
                            Country: {data.country}
                          </Typography>
                        </ItemBlockStyle>

                        <IconWrapperStyle
                          sx={{
                            ...(i === 1 && {
                              color: "info.main",
                              bgcolor: (theme) =>
                                alpha(theme.palette.info.main, 0.08),
                            }),
                            ...(i === 2 && {
                              color: "error.main",
                              bgcolor: (theme) =>
                                alpha(theme.palette.error.main, 0.08),
                            }),
                          }}
                        >
                          <Iconify
                            icon={"ant-design:trophy-filled"}
                            width={20}
                            height={20}
                          />
                        </IconWrapperStyle>
                      </Scrollbar>
                    </Stack>
                  ))}
                <CardHeader title="Top Players of the Day - Overseas" />
                {gamelink
                  .filter((cd) => cd.title <= moment().date())
                  .map((d, index) => (
                    <>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          key={d.title}
                          variant="contained"
                          onClick={async () => {
                            localStorage.setItem("fdate", d.title);
                            console.log("button click", index);
                            const response = await getTop(d.title, "nonindia");
                            console.log("non-india", response.data);
                            setNonindia(response.data);
                            console.log("non-india set", nonindia);
                            console.log("array", nonindia.overallScores.length);
                            setIsShown(true);
                          }}
                        >
                          {" "}
                          Click to view <br /> {d.title}/12/2022 Top Scorers
                        </Button>
                      </Box>
                      <br />
                    </>
                  ))}

                {isShown && nonindia.overallScores.length > 0 && (
                  <>
                    <Typography>
                      Top 3 Winners of {localStorage.getItem("fdate")}/12/2022
                    </Typography>

                    {nonindia.overallScores
                      .filter((pN) => pN.parentName !== null)
                      .filter((d, i) => i < 3)
                      .map((data, i) => (
                        <Stack
                          key={i}
                          direction="row"
                          sx={{ p: 3 }}
                          alignItems="center"
                          spacing={2}
                        >
                          <Scrollbar>
                            <ItemBlockStyle sx={{ minWidth: 120 }}>
                              <ItemIconStyle
                                icon={"material-symbols:account-box"}
                              />
                              <Typography variant="subtitle2">
                                {data.childName}
                              </Typography>
                            </ItemBlockStyle>

                            <ItemBlockStyle>
                              <Typography variant="body2">
                                Parent: {data.parentName}
                              </Typography>
                            </ItemBlockStyle>

                            <ItemBlockStyle sx={{ minWidth: 88 }}>
                              <Typography variant="body2">
                                State: {data.state}
                              </Typography>
                            </ItemBlockStyle>

                            <ItemBlockStyle>
                              <Typography variant="body2">
                                Country: {data.country}
                              </Typography>
                            </ItemBlockStyle>

                            <IconWrapperStyle
                              sx={{
                                ...(i === 1 && {
                                  color: "info.main",
                                  bgcolor: (theme) =>
                                    alpha(theme.palette.info.main, 0.08),
                                }),
                                ...(i === 2 && {
                                  color: "error.main",
                                  bgcolor: (theme) =>
                                    alpha(theme.palette.error.main, 0.08),
                                }),
                              }}
                            >
                              <Iconify
                                icon={"ant-design:trophy-filled"}
                                width={20}
                                height={20}
                              />
                            </IconWrapperStyle>
                          </Scrollbar>
                        </Stack>
                      ))}
                    <Divider />
                  </>
                )}
              </Card>
            </Grid>
          </Grid>
          <br /> <br />
          <Grid container spacing={3}>
            <Grid item sm="6" xs="12">
              <Card xs={{ maxWidth: "auto", pr: 5, pl: 5, pt: 0, pb: 0 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="340"
                    image="/assets/quizbg.jpg"
                  />
                  <CardContent>
                    <Stack>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Link
                          underline="none"
                          color="inherit"
                          component={RouterLink}
                          to={PATH_DASHBOARD.general.quiz}
                        >
                          <Button size="large" variant="contained">
                            Play Quiz
                          </Button>
                        </Link>
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item sm="6" xs="12">
              <Card xs={{ maxWidth: "auto", pr: 5, pl: 5, pt: 0, pb: 0 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="340"
                    image="/assets/xmasgames.jpg"
                  />

                  <CardContent>
                    {gamelink
                      .filter((d) => d.title === date)
                      .map((data) => (
                        <Stack>
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Button
                              size="large"
                              variant="contained"
                              href={data.url}
                              target="_blank"
                            >
                              Play Special
                            </Button>
                          </Box>
                        </Stack>
                      ))}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid
              item
              xs="12"
              md="12"
              sx={{ alignItems: "center", flex: "middle" }}
            >
              <br />
              <br />
              <br />
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  size="large"
                  style={{ fontSize: "30px", color: "#fffffa" }}
                  variant="text"
                >
                  {" "}
                  Kidsmas Kondattam - Season 3 <br />
                  Videos
                  <br />
                </Button>
              </Box>
              <br />
              <br />
            </Grid>

            {feed.feedList
              .filter((_id) => _id.feedName === "Kidsmas")
              .map((data, i) => (
                <Grid item sm="12" xs="12" key={data}>
                  <Card xs={{ maxWidth: "auto", pr: 5, pl: 5 }}>
                    <CardActionArea>
                      <CardContent className="video-container">
                        <Typography align="center" className="video-container">
                          <YouTube
                            videoId={data.feedUrl}
                            onReady={youtubeOnReady}
                          />
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <br />
          <br />
        </Container>
      </RootStyle>
    </Page>
  );
}
