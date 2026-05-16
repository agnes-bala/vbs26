import { m } from 'framer-motion';
import { useState, useEffect } from "react";

// @mui
import { styled } from '@mui/material/styles';

import { Box, Container, Typography, Button, Link } from '@mui/material';
import Iconify from '../../components/Iconify';
import Image from '../../components/Image';
import useResponsive from '../../hooks/useResponsive';
//
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(/assets/vbsbg.png)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 'auto',
    paddingBottom: 2,
    alignItems: 'flex-middle',
  },
}));

const SectionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function ContactHero() {

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
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
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <br />
        <Box sx={{ color: 'common.white', paddingTop: mdUp ? 10 : 0 }}>
          <h1>
            {`Welcome to`}{" "}<br />
            <Link variant="h3" underline="none">

              {`Virtual Bible School`}{" "}
              <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "2024" ]'  >
                <span className="wrap">{text}</span>
              </span><br /><br />
              <Typography variant='h5' color="#ffffff">
                Kidsmas Kondattam is a Celebration for
                the kids by Jesus Redeems Ministries.
                It's open to all kids aged 5 to 15.
              </Typography>

            </Link>
          </h1>

        </Box>

        <Box
          component={m.div}
          variants={varFade().inDown}
          sx={{
            mb: { xs: 3, md: 0 },
          }} alignItems='flex-end'
        >

          <m.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 1, repeat: Infinity }}>
            <Image
              visibleByDefault
              alt="rocket"
              src="/assets/VBS-logo.png"
              disabledEffect
              sx={{ maxWidth: 460 }}
            />
          </m.div>
        </Box>
        {!smUp && (
          <ContentStyle>
            <Button
              variant="contained"
              target="_blank"
              rel="noopener"
              href="https://jesusredeems.com/"
              endIcon={<Iconify icon={'bi:arrow-right-square'} />}
            >
              Register
            </Button>

          </ContentStyle>)}

        {mdUp && (
          <SectionStyle>
            <Button
              size="large"
              sx={{ width: 120, height: 60 }}
              variant="contained"
              target="_blank"
              rel="noopener"
              href="https://jesusredeems.com/"
              endIcon={<Iconify icon={'bi:arrow-right-square'} />}
            >
              Register
            </Button>

          </SectionStyle>
        )}
      </Container>
    </RootStyle>
  );
}
