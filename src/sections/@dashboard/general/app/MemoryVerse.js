import { useRef } from "react";
// import PropTypes from "prop-types";

// @mui
import { m } from "framer-motion";
import { styled } from "@mui/material/styles";
import {
  // Box,
  Button,
  // Card,
  // Divider,
  Container,
  Typography,
  Stack,
} from "@mui/material";

// utils
// import cssStyles from "../../../../utils/cssStyles";
import useResponsive from "src/hooks/useResponsive";
import { MotionContainer } from "src/components/animate";

// components
// import Image from "../../../../components/Image";
import { useState } from "react";

// ----------------------------------------------------------------------

// const OverlayStyle = styled("div")(({ theme }) => ({
//   ...cssStyles().bgBlur({ blur: 1, color: theme.palette.primary }),
//   top: 0,

//   zIndex: 8,
//   content: "''",
//   width: "100%",
//   height: "100%",
//   position: "absolute",
// }));

const RootStyle = styled(m.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  backgroundSize: "cover",
  backgroundPosition: "right",
  backgroundImage: "url(/assets/Xmas_BG5.jpg)",

  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    //position: 'fixed',
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

// PlanCards.propTypes = {
//   plans: PropTypes.object.isRequired,
// };

export default function MemoryVerse() {
  const ref = useRef(null);
  const [state, setState] = useState("");
  // const theme = useTheme();
  // const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");
  return (
    <MotionContainer>
      <RootStyle>
        <Container>
          <ContentStyle>
            <>
              {mdUp && (
                <>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <img
                      alt=""
                      src="/assets/Kidsmaslogozipped.png"
                      width={250}
                    />
                  </Stack>
                  <Typography
                    variant="h2"
                    alignItems="center"
                    color="white"
                    justifyContent="center"
                  >
                    Games
                  </Typography>
                  <br />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("enm");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Tile Game
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("tam");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Lava
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("him");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Mickey
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("kam");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Rope
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("ano");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      UnScramble
                    </Button>
                  </Stack>
                  <br />

                  {/* <Typography variant="h2" color="white">
                    Rain Game
                  </Typography> */}

                  {/* <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setState("enr");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Water Game
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("tar");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Satan n super
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setState("hir");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Astro
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("kar");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Tower
                    </Button>
                  </Stack> */}
                  <br />
                </>
              )}
              {!mdUp && (
                <>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <img
                      alt=""
                      src="/assets/Kidsmaslogozipped.png"
                      width={200}
                    />
                  </Stack>

                  <Typography
                    variant="h2"
                    alignItems="center"
                    color="white"
                    justifyContent="center"
                  >
                    Games
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("enm");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Day1
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("tam");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Day2
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("him");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Day3
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("kam");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Day4
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("ano");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Day5
                    </Button>
                  </Stack>
                  <br />
                  {/* <header>
                    <Typography variant="h2" color="white">
                      Rain Game
                    </Typography>
                  </header> */}

                  {/* <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("enr");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      English
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("tar");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Tamil
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("hir");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Hindi
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState("kar");
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Kannada
                    </Button>
                  </Stack> */}
                  <br />
                </>
              )}
              <div ref={ref}>
                {/* tamil */}
                {state === "tam" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      <iframe
                        src="https://online.jesusredeems.com/games/2026/Day1"
                        width={400}
                        height={600}
                        title="Day1"
                      ></iframe>
                    </Stack>
                  </>
                )}
                {/* english */}
                {state === "enm" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      <iframe
                        src="https://online.jesusredeems.com/games/2026/Day2"
                        width={400}
                        height={800}
                        title="Day2"
                      ></iframe>
                    </Stack>
                  </>
                )}
                {/* hindi*/}
                {state === "him" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      <iframe
                        src="https://online.jesusredeems.com/games/2026/Day3"
                        width={300}
                        height={600}
                        title="Day3"
                      ></iframe>
                    </Stack>
                  </>
                )}
                {/* // kannada */}

                {/* <p>
        Edit <code>src/App.js</code> and save to reload.
      </p> */}
                {state === "kam" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      <iframe
                        src="https://online.jesusredeems.com/games/2026/Day4"
                        width={400}
                        height={800}
                        title="Day4"
                      ></iframe>
                    </Stack>
                  </>
                )}

                {state === "ano" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      <iframe
                        src="https://online.jesusredeems.com/games/2026/Day5"
                        width={400}
                        height={800}
                        title="Day5"
                      ></iframe>
                    </Stack>
                  </>
                )}
                {/* ______________RAIN_GAME___________________  */}
                {/* {state == "tar" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      <iframe
                        src="https://online.jesusredeems.com/games/match/"
                        width={400}
                        height={700}
                        title="A youtube video on React hooks"
                      ></iframe>
                    </Stack>
                  </>
                )} */}
                {/* english */}
                {/* {state == "enr" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      <iframe
                        src="http://online.jesusredeems.com/g/happyglass/"
                        width={300}
                        height={600}
                        title="Memory Verse Game"
                      ></iframe>
                    </Stack>
                  </>
                )} */}
                {/* hindi*/}
                {/* {state == "hir" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      <iframe
                        src="http://online.jesusredeems.com/g/astro/"
                        width={300}
                        height={600}
                        title="A youtube video on React hooks"
                      ></iframe>
                    </Stack>
                  </>
                )} */}
                {/* // kannada */}

                {/* <p>
        Edit <code>src/App.js</code> and save to reload.
      </p> */}
                {/* {state == "kar" && (
                  <>
                    <Stack alignItems="center" spacing={3}>
                      <iframe
                        src="http://online.jesusredeems.com/g/tower/"
                        width={300}
                        height={600}
                        title="A youtube video on React hooks"
                      ></iframe>
                    </Stack>{" "}
                  </>
                )} */}
              </div>
            </>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}
