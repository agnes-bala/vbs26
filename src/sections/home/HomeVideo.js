import { m } from "framer-motion";
import { useState, useEffect } from "react";
// @mui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Button, Container, Typography, Stack } from "@mui/material";
// routes
// import { PATH_AUTH } from '../../../public/assets/';
// components
import useResponsive from "../../hooks/useResponsive";
import Iconify from "../../components/Iconify";
import { MotionContainer, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  backgroundSize: "cover",
  backgroundPosition: "left",
  backgroundImage: "url(/assets/vbsbg.jpg)",
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "120vh",
    display: "flex",
    //  position: 'fixed',
    alignItems: "center",
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: "auto",
    textAlign: "center",
    position: "relative",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up("md")]: {
      margin: "unset",
      textAlign: "left",
    },
  })
);

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: "100%",
  margin: "auto",
  position: "absolute",
  [theme.breakpoints.up("lg")]: {
    right: "8%",
    width: "auto",
    height: "48vh",
  },
}));

// ----------------------------------------------------------------------

export default function HomeHeroVbs() {
  const theme = useTheme();
  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["2024"];
  const period = 2000;

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  return (
    <MotionContainer>
      <RootStyle>
        {/* <HeroOverlayStyle alt="overlay" src="/assets/overlay.svg" variants={varFade().in} /> */}
        {mdUp && (
          <HeroImgStyle
            alt="hero"
            src="../assets/VBS-logo.png"
            variants={varFade().inUp}
          />
        )}

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Box sx={{ color: "common.white", paddingTop: mdUp ? 5 : 0 }}>
                {`Welcome to`} <br />
                <Typography variant="h3">
                  {`Virtual Bible School`}{" "}
                  <span className="txt-rotate" data-rotate='[ "2024" ]'>
                    <span>{text}</span>
                  </span>
                </Typography>
                <br />
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <m.img
                    variants={varFade().inRight}
                    src={`/assets/funfair-ourrides-icon7.png`}
                  />
                  <Typography variant="h4" color={theme.palette.grey[300]}>
                    15 - 19 May
                  </Typography>
                  <m.img
                    variants={varFade().inRight}
                    src={`/assets/funfair-ourrides-icon7r.png`}
                  />
                </Stack>
                <br />
                <Typography variant="h5" color={theme.palette.grey[300]}>
                  Jesus Redeems Virtual Bible School, where kids can learn
                  action songs, memory verse and view innovative sections.
                </Typography>
              </Box>
            </m.div>

            <Stack spacing={2.5}>
              <m.div variants={varFade().inRight}>
                <Typography
                  variant="overline"
                  sx={{ color: "primary.contrast" }}
                >
                  Let 's enjoy this summer vacation with us
                </Typography>
              </m.div>
            </Stack>
            {!mdUp && <img alt="hero" src="../assets/VBS-logo.png" />}
            <m.div variants={varFade().inDown}>
              <Button
                variant="contained"
                size="large"
                color="warning"
                onClick={() => window.location.replace("/#reg")}
                endIcon={
                  <Iconify
                    icon={"material-symbols:arrow-circle-down-outline-rounded"}
                    width={25}
                    height={25}
                  />
                }
              >
                Register
              </Button>
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>

      {/* <Box sx={{ height: { md: '120vh' } }} /> */}
    </MotionContainer>
  );
}
