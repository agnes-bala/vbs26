// @mui
import { styled } from "@mui/material/styles";
import { m } from "framer-motion";
import { Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
// hooks
import useSettings from "../../hooks/useSettings";
import axios from "axios";
// _mock_
// components
import Page from "../../components/Page";
// import useResponsive from "../../hooks/useResponsive";
// sections
import { QuizRadio } from "../../sections/@dashboard/general/app";
import config from "../../partnerconfig.json";

// const HEIGHT = 450;
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
  paddingTop: 100,
  paddingBottom: 200,
}));
// const CardItemStyle = styled("div")(({ theme }) => ({
//   position: "relative",
//   height: HEIGHT,
//   backgroundSize: "cover",
//   padding: theme.spacing(3),
//   backgroundRepeat: "no-repeat",
//   color: theme.palette.common.black,
//   backgroundImage: 'url("/assets/christmas_tree.jpg")',
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   borderRadius: Number(theme.shape.borderRadius) * 3,
// }));

// ----------------------------------------------------------------------

const url = config.jrmClientUrl;
export default function Events() {
  const [feed, setFeed] = useState({ feedList: [] });
  const [childdata, setChilddata] = useState({ relationship: 0, children: [] });
  // const pId = localStorage.getItem("partnerId");
  // const token = localStorage.getItem("jwt");



  // const config = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch(`${url}jrms/v1/feed/home`)
      .then((data) => data.json())
      .then((data) => setFeed(data));
  }, []);
  console.log(feed);
  useEffect(() => {
    const pId = localStorage.getItem("partnerId");
    const token = localStorage.getItem("jwt");



    const config = { Authorization: `Bearer ${token}` };
    axios
      .get(`${url}jrms/v1/partners/${pId}/childreninfo`, { headers: config })
      .then((response) => {
        console.log(response);
        console.log("response", response.data);
        console.log("childdata1", response.data);
        setChilddata(response.data !== undefined ? response.data : "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("childdata", childdata);
  // alert(childdata.children);

  // const theme = useTheme();
  const { themeStretch } = useSettings();
  const path = localStorage.getItem("path");

  return (
    <Page title="Quiz">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Grid container spacing={3}>
            {path === "quiz" ? (
              <>
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="h2"
                    component="div"
                    textAlign="center"
                    color="white"
                    fontFamily="BiteChocolate"
                  >
                    Quiz
                  </Typography>
                  <br />
                  <QuizRadio list={childdata.children} />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="h2"
                    component="div"
                    textAlign="center"
                    color="white"
                    fontFamily="BiteChocolate"
                  >
                    Puzzle
                  </Typography>
                  <br />
                  <QuizRadio list={childdata.children} />
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
