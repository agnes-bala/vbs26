// @mui
import { styled, useTheme } from "@mui/material/styles";
import { m } from "framer-motion";
import { Container, Grid, Typography } from "@mui/material";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
// sections

import { QuizGame } from "../../sections/Forms";

// ----------------------------------------------------------------------
const RootStyle = styled(m.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  backgroundSize: "cover",
  backgroundPosition: "bottomleft",
  backgroundImage: "url(/assets/bible-quiz.jpg)",
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

export default function Events() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="Quiz">
      <RootStyle>
        <Container
          maxWidth={themeStretch ? false : "xl"}
          backgroundImage="url(/assets/vbsbg.jpg)"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography
                variant="h5"
                component="div"
                textAlign="center"
                color={theme.palette.primary.light}
              >
                Quiz Games
              </Typography>
              <QuizGame />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
