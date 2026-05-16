import { Box, Grid, Link, Typography, IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Jolly_Kids from "../../assets/Jolly Kids 2026.jpg";
import VBSbanner1 from "../../assets/JR2026VBS.jpg";
import Kids_Magazine from "../../assets/Kids Magazine 2026.jpg";
import home_section2_bg from "../../assets/home_section2.png";
import home_section2_cta from "../../assets/vbs-findmore.png";
// import home_section3_bg from "../../assets/home_section3_bg.png";
import home_section4_bg from "../../assets/home_section4_bg.png";
import home_section5_bg from "../../assets/home_section5_bg.png";
import librarybg from "../../assets/librarybgg5.jpg";
import tree from "../../assets/tree.svg";
// import bird from "../../assets/bird.gif";
import Jolly_Time from "../../assets/Jolly Time 2026.jpg";
import HeaderSection from "src/components/headersection";
import Baby from "../../assets/learning.webp";
import puthusu from "../../assets/Puthusu.jpg";
import stand from "../../assets/standandtable.svg";
// import cathyrabby from "../../assets/cathyrabby.png";
import checkoutmore from "../../assets/checkoutmore.png";

const images = [
  { src: Jolly_Kids, href: "https://www.youtube.com/@JollyKidsprograms" },
  { src: VBSbanner1, href: "/auth/login" },
  { src: Jolly_Time, href: "https://youtu.be/A4VqTcQtA6k" },
  { src: Kids_Magazine, href: "https://kids.jesusredeems.com/mag-download/" },
];

export default function VBS() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <>
      <HeaderSection />
      <Box sx={{ position: "relative" }}>
        {/* Arrow Buttons */}
        <IconButton
          onClick={scrollPrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            zIndex: 2, // Must be higher than embla viewport
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.7)",
            "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
          }}
          disabled={!prevEnabled}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        <IconButton
          onClick={scrollNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            zIndex: 2,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.7)",
            "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
          }}
          disabled={!nextEnabled}
        >
          <KeyboardArrowRightIcon />
        </IconButton>

        {/* Embla viewport */}
        <Box
          sx={{
            overflow: "hidden",
            marginTop: { md: "-15px", xs: "-9px", sm: "-15px" },
            width: "100%",
            position: "relative",
            zIndex: 1, // Important! Not -1!
          }}
          ref={emblaRef}
        >
          <Box sx={{ display: "flex" }}>
            {images.map((img, i) => (
              <Box
                key={i}
                sx={{
                  flex: "0 0 100%",
                  minWidth: 0,
                  height: "100%",
                  position: "relative",
                }}
                className="embla__slide"
              >
                <Link
                  href={img.href} target="_blank"
                  underline="none"
                  sx={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    zIndex: 3,
                    position: "relative",
                  }}
                >
                  <img
                    src={img.src}
                    alt="menus"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "12vh",
          backgroundColor: "#8927c8",
          position: "relative",
          zIndex: -1,
          display: { xs: "none", md: "block", sm: "block" },
        }}
      ></Box>
      <Grid
        container
        sx={{
          backgroundImage: `url(${home_section2_bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: {
            xs: "top", // mobile
            sm: "center", // tablet
            md: "top", // desktop
          },
        }}
      >
        <Grid
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "1px solid red",
          }}
        >
          {/* <Box
            component="img"
            src={bird}
            alt="Sun"
            sx={{
              width: {
                xs: "300px", // small screens
                sm: "400px", // tablets
                md: "500px", // desktops
              },
              height: "auto",
            }}
          /> */}
        </Grid>
        <Grid
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            // border: "1px solid red",
          }}
        >
          <Typography
            sx={{ color: "white", fontWeight: "bold" }}
            textAlign={"center"}
            variant="h1"
            fontSize={{ md: "5rem", xs: "2rem", sm: "2rem" }}
          >
            VBS
          </Typography>
          <Typography
            sx={{
              color: "white",
              width: { md: "80%", xs: "100%", sm: "100%" },
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            VBS is an acronym of Virtual Bible School, started with the vision
            of sharing the good news to the kids through visual media.
            <br> 
            </br><br> 
            </br>
            Every year we invite kids to join us and learn about Our Lord and Savior Jesus Christ based on the theme given by God. Stay tuned with us and watch us Live from 11 May 2026 to 15 May 2026.
          </Typography>
          <a href="/about">
            <Box
              sx={{
                ":hover": {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
              <img src={checkoutmore} alt="button" width={"150px"} height={"66px"} />
            </Box>
          </a>
        </Grid>
        <Grid
          xs={12}
          md={3}
          sx={{
            display: { md: "block", xs: "none", sm: "none" },
            // scale: { md: 0.1, xs: 1, sm: 0.5 },
            // border: "1px solid red",
            marginTop: -12,
            height: { md: "60vh", xs: "100vh", sm: "100vh" },
          }}
        >
          <img src={tree} alt="tree" />
        </Grid>
      </Grid>
      {/* <Grid
        container
        sx={{
          backgroundImage: `url(${home_section3_bg})`,
          height: { md: "100vh", xs: "75vh", sm: "100vh" },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: {
            xs: "top", // mobile
            sm: "center", // tablet
            md: "top", // desktop
          },
        }}
      >
        <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{ color: "white", fontWeight: "bold", fontSize: "32px" }}
          >
            Did you Vote ?
          </Typography>
          <Typography
            sx={{
              color: "white",
              width: { md: "80%", xs: "100%", sm: "100%" },
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Team Cathy? or Team Rabby?
          </Typography>
          <a href="/auth/login">
            <Box
              sx={{
                ":hover": {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
              <img src={home_section2_cta} alt="button" width={"150px"} height={"66px"} />
            </Box>
          </a>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={cathyrabby}
            alt="Sun image"
            sx={{
              width: {
                xs: "350px", // small screens
                sm: "400px", // tablets
                md: "800px", // desktops
              },
              height: "auto",
            }}
          />
        </Grid>
      </Grid> */}
      <Grid
        container
        sx={{
          backgroundImage: `url(${home_section4_bg})`,
          height: { md: "100vh", xs: "75vh", sm: "100vh" },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Baby} alt="baby" />
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{ color: "white", fontWeight: "bold", fontSize: "32px" }}
          >
            Kids Songs
          </Typography>
          <Typography
            sx={{
              color: "white",
              width: { md: "80%", xs: "100%", sm: "100%" },
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px",
            }}
          >
            Do watch our song released in youtube.
          </Typography>
          <a href="https://youtu.be/zTVjJR50SCU" target="_blank" rel="noreferrer">
            <Box
              sx={{
                ":hover": {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
              <img src={home_section2_cta} alt="button" width={"150px"} height={"66px"} />
            </Box>
          </a>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          backgroundImage: `url(${home_section5_bg})`,
          height: { md: "100vh", xs: "100vh", sm: "100vh" },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                border: 8,
                borderColor: "#FA4C2E",
                borderRadius: 2,
                width: { md: "60%", xs: "80%", sm: "60%" },
              }}
            >
              <a href="https://youtu.be/HkDZYZCJg-U" target="_blank" rel="noreferrer">
                <img
                  src={puthusu}
                  alt="tv"
                  style={{
                    borderRadius: 2,
                  }}
                />
              </a>
            </Box>
            <Box sx={{ width: "320px", mt: -1 }}>
              <img src={stand} alt="tv" />
            </Box>
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{ color: "white", fontWeight: "bold", fontSize: "32px" }}
          >
            Jolly Kids
          </Typography>
          <Typography
            sx={{
              color: "white",
              width: { md: "80%", xs: "100%", sm: "100%" },
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px",
            }}
          >
            We have a youtube channel especially for kids Do watch
          </Typography>
          <a href="https://www.youtube.com/@JollyKidsprograms" target="_blank" rel="noreferrer">
            <Box
              sx={{
                ":hover": {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
             <img src={home_section2_cta} alt="button" width={"150px"} height={"66px"} />
            </Box>
          </a>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          backgroundImage: `url(${librarybg})`,
          height: { md: "100vh", xs: "25vh", sm: "60vh" },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: {
            xs: "top", // mobile
            sm: "center", // tablet
            md: "top", // desktop
          },
        }}
      >
        {/* <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{ color: "white", fontWeight: "bold", fontSize: "32px" }}
          >
            Tinkle Library
          </Typography>
          <Typography
            sx={{
              color: "white",
              width: { md: "80%", xs: "100%", sm: "100%" },
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px",
            }}
          >
            Learn something new today! DIY projects, recipes, factoids and
            trivia features inside!
          </Typography>
          <a href="https://kids.jesusredeems.com/mag-download/">
            <Box
              sx={{
                ":hover": {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
              <img src={home_section2_cta} alt="button" />
            </Box>
          </a>
        </Grid> */}
        {/* <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={learning} alt="Learnig" />
        </Grid> */}
      </Grid>
    </>
  );
}
