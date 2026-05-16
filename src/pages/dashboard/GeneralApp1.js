import { styled, alpha } from '@mui/material/styles';
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  Card as MuiCard
} from '@mui/material';
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment-timezone";

// hooks
import useSettings from "../../hooks/useSettings";

import { PATH_DASHBOARD } from "../../routes/paths";

// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";

// services


// sections
import config from "../../partnerconfig.json";

// assets
import backgroundImage from "../../assets/ballo.avif";
// import { toast } from "react-toastify";

// Icons
import ChildCareIcon from '@mui/icons-material/ChildCare';
import DownloadIcon from '@mui/icons-material/Download';
import QuizIcon from '@mui/icons-material/Quiz';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import useCountdown from 'src/hooks/useCountdown';
import { getScore } from 'src/services/JRMFeedService';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  backgroundSize: 'cover',
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  marginTop: -80,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, ${alpha('#000', 0.7)} 0%, ${alpha('#1A1A2E', 0.8)} 100%)`
      : `linear-gradient(135deg, ${alpha('#FFF0F5', 0.3)} 0%, ${alpha('#E6E6FA', 0.4)} 100%)`,
    zIndex: 0,
  },
}));

// const isEventStarted = () => {
//   const eventStartDate = moment.tz('2026-05-11 12:00:00', 'Asia/Kolkata');
//   const currentDateTime = moment().tz('Asia/Kolkata');
//   return currentDateTime.isSameOrAfter(eventStartDate);
// };

// const isEventEnded = () => {
//   const eventEndDate = moment.tz('2026-05-15 23:59:59', 'Asia/Kolkata'); // May 15th 11:59 PM
//   const currentDateTime = moment().tz('Asia/Kolkata');
//   return currentDateTime.isSameOrAfter(eventEndDate);
// };

const getEventStatus = () => {
  const currentDateTime = moment().tz('Asia/Kolkata');
  const eventStartDate = moment.tz('2026-05-11 12:00:00', 'Asia/Kolkata');
  const eventEndDate = moment.tz('2026-05-15 23:59:59', 'Asia/Kolkata');

  if (currentDateTime.isBefore(eventStartDate)) {
    return 'upcoming';
  } else if (currentDateTime.isSameOrAfter(eventStartDate) && currentDateTime.isBefore(eventEndDate)) {
    return 'ongoing';
  } else {
    return 'ended';
  }
};

const FloatingElements = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  overflow: 'hidden',
  zIndex: 1,
  '& .floating-icon': {
    position: 'absolute',
    color: theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.25)
      : alpha(theme.palette.violet?.[800] || '#000000', 0.35),
    animation: 'float var(--duration, 15s) ease-in-out infinite',
    '--duration': '15s',
    '@keyframes float': {
      '0%': {
        transform: 'translateY(0px) rotate(0deg) scale(1)',
      },
      '25%': {
        transform: 'translateY(-15px) rotate(5deg) scale(1.05)',
      },
      '50%': {
        transform: 'translateY(-30px) rotate(10deg) scale(1.1)',
      },
      '75%': {
        transform: 'translateY(-15px) rotate(5deg) scale(1.05)',
      },
      '100%': {
        transform: 'translateY(0px) rotate(0deg) scale(1)',
      },
    },
  },
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  maxWidth: '1400px !important',
  margin: '0 auto',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

const GlassCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? alpha(theme.palette.background.paper, 0.75)
    : alpha('#FFFFFF', 0.85),
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  border: `1px solid ${theme.palette.mode === 'dark'
    ? alpha(theme.palette.common.white, 0.1)
    : alpha(theme.palette.violet?.[300] || '#9575CD', 0.2)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? `0 20px 40px ${alpha('#000', 0.4)},
       0 0 0 1px ${alpha(theme.palette.common.white, 0.05)} inset`
    : `0 20px 40px ${alpha(theme.palette.violet?.[900] || '#311B92', 0.15)},
       0 0 0 1px ${alpha(theme.palette.violet?.[300] || '#9575CD', 0.15)} inset`,
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
  backgroundImage: 'url(https://www.transparenttextures.com/patterns/cubes.png)', color: theme.palette.text.secondary, animation: 'fadeIn 1s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const TitleGradient = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
  fontWeight: 800,
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${theme.palette.violet?.[300] || '#9FA8DA'} 0%, ${theme.palette.violet?.[400] || '#5C6BC0'} 50%, ${theme.palette.common.white} 100%)`
    : `linear-gradient(135deg, ${theme.palette.violet?.[700] || '#5E35B1'} 0%, ${theme.palette.violet?.[500] || '#7E57C2'} 50%, ${theme.palette.violet?.[300] || '#B39DDB'} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
  letterSpacing: '-0.02em',
}));

const SubtitleText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.1rem',
  },
  color: theme.palette.text.secondary,
  maxWidth: '600px',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    margin: '0',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  padding: theme.spacing(1.2, 3),
  borderRadius: theme.spacing(1.5),
  textTransform: 'none',
  fontWeight: 600,
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${theme.palette.violet?.[500] || '#3F51B5'} 0%, ${theme.palette.violet?.[400] || '#5C6BC0'} 100%)`
    : `linear-gradient(135deg, ${theme.palette.violet?.[700] || '#5E35B1'} 0%, ${theme.palette.violet?.[500] || '#7E57C2'} 100%)`,
  color: 'white',
  boxShadow: theme.palette.mode === 'dark'
    ? `0 8px 16px ${alpha('#000', 0.3)}`
    : `0 8px 16px ${alpha(theme.palette.violet?.[700] || '#5E35B1', 0.2)}`,
  transition: 'all 0.2s',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, ${theme.palette.violet?.[600] || '#3949AB'} 0%, ${theme.palette.violet?.[500] || '#3F51B5'} 100%)`
      : `linear-gradient(135deg, ${theme.palette.violet?.[800] || '#4527A0'} 0%, ${theme.palette.violet?.[600] || '#5E35B1'} 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? `0 12px 24px ${alpha('#000', 0.4)}`
      : `0 12px 24px ${alpha(theme.palette.violet?.[700] || '#5E35B1', 0.3)}`,
  },
}));

// Countdown Component with Violet Theme
const CountdownSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${alpha(theme.palette.violet?.[900] || '#1A237E', 0.4)} 0%, ${alpha(theme.palette.violet?.[800] || '#283593', 0.4)} 100%)`
    : `linear-gradient(135deg, ${alpha(theme.palette.violet?.[50] || '#F3E5F5', 0.7)} 0%, ${alpha(theme.palette.violet?.[100] || '#EDE7F6', 0.7)} 100%)`,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  border: `1px solid ${theme.palette.mode === 'dark'
    ? alpha(theme.palette.common.white, 0.1)
    : alpha(theme.palette.violet?.[300] || '#9575CD', 0.3)}`,
}));

const CountdownGrid = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: { xs: 1, sm: 2, md: 3 },
  flexWrap: 'wrap',
});

const TimeBlock = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  minWidth: 70,
  [theme.breakpoints.up('sm')]: {
    minWidth: 90,
  },
  [theme.breakpoints.up('md')]: {
    minWidth: 110,
  },
  padding: theme.spacing(1.5),
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.palette.mode === 'dark'
    ? `0 4px 12px ${alpha('#000', 0.3)}`
    : `0 4px 12px ${alpha(theme.palette.violet?.[300] || '#9575CD', 0.15)}`,
  border: `1px solid ${theme.palette.mode === 'dark'
    ? alpha(theme.palette.violet?.[700] || '#303F9F', 0.4)
    : alpha(theme.palette.violet?.[200] || '#B39DDB', 0.3)}`,
}));

const TimeValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
  fontWeight: 700,
  color: theme.palette.mode === 'dark'
    ? theme.palette.violet?.[300] || '#9FA8DA'
    : theme.palette.violet?.[700] || '#5E35B1',
  lineHeight: 1.2,
}));

const TimeLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.85rem',
  },
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontWeight: 500,
}));

const Separator = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
  fontWeight: 700,
  color: theme.palette.mode === 'dark'
    ? alpha(theme.palette.violet?.[500] || '#3F51B5', 0.5)
    : theme.palette.violet?.[400] || '#B39DDB',
  display: 'flex',
  alignItems: 'center',
}));

const StatusBadge = styled(Box)(({ theme, status }) => ({
  display: 'inline-block',
  padding: theme.spacing(0.5, 2),
  borderRadius: theme.spacing(2),
  fontSize: '0.85rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  ...(status === 'ongoing' && {
    background: alpha(theme.palette.success.main, 0.15),
    color: theme.palette.success.main,
    border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
  }),
  ...(status === 'upcoming' && {
    background: alpha(theme.palette.info.main, 0.15),
    color: theme.palette.info.main,
    border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
  }),
  ...(status === 'ended' && {
    background: alpha(theme.palette.warning.main, 0.15),
    color: theme.palette.warning.main,
    border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
  }),
}));

function EventCountdown() {
  const eventStartDate = moment('2026-05-11 12:00', 'YYYY-MM-DD HH:mm').toDate();
  const eventEndDate = moment('2026-05-15 23:59', 'YYYY-MM-DD HH:mm').toDate(); // May 15th 11:59 PM

  const startCountdown = useCountdown(eventStartDate);
  const endCountdown = useCountdown(eventEndDate);

  const eventStatus = getEventStatus();

  if (eventStatus === 'ended') {
    return (
      <Box>
        <StatusBadge status="ended" sx={{ textAlign: 'center', mx: 'auto', display: 'table' }}>
          Event Ended
        </StatusBadge>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
            textAlign: 'center',
            fontSize: { xs: '1rem', sm: '1.1rem' },
          }}
        >
          Thank you for participating in VBS 2026!
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: 'text.secondary',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          Event concluded on May 15, 2026
        </Typography>
      </Box>
    );
  }

  if (eventStatus === 'ongoing') {
    return (
      <Box>
        <StatusBadge status="ongoing" sx={{ textAlign: 'center', mx: 'auto', display: 'table' }}>
          Event is Live Now
        </StatusBadge>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: 'text.secondary',
            textAlign: 'center',
            fontSize: { xs: '1rem', sm: '1.1rem' },
          }}
        >
          Event Ends In
        </Typography>

        <CountdownGrid>
          <TimeBlock>
            <TimeValue>{endCountdown.days}</TimeValue>
            <TimeLabel>Days</TimeLabel>
          </TimeBlock>

          <Separator>:</Separator>

          <TimeBlock>
            <TimeValue>{endCountdown.hours}</TimeValue>
            <TimeLabel>Hours</TimeLabel>
          </TimeBlock>

          <Separator>:</Separator>

          <TimeBlock>
            <TimeValue>{endCountdown.minutes}</TimeValue>
            <TimeLabel>Mins</TimeLabel>
          </TimeBlock>

          <Separator>:</Separator>

          <TimeBlock>
            <TimeValue>{endCountdown.seconds}</TimeValue>
            <TimeLabel>Secs</TimeLabel>
          </TimeBlock>
        </CountdownGrid>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: 'text.secondary',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          Event ends May 15, 2026 (Midnight)
        </Typography>
      </Box>
    );
  }

  // Upcoming event
  return (
    <Box>
      <StatusBadge status="upcoming" sx={{ textAlign: 'center', mx: 'auto', display: 'table' }}>
        Coming Soon
      </StatusBadge>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: 'text.secondary',
          textAlign: 'center',
          fontSize: { xs: '1rem', sm: '1.1rem' },
        }}
      >
        Event Starts In
      </Typography>

      <CountdownGrid>
        <TimeBlock>
          <TimeValue>{startCountdown.days}</TimeValue>
          <TimeLabel>Days</TimeLabel>
        </TimeBlock>

        <Separator>:</Separator>

        <TimeBlock>
          <TimeValue>{startCountdown.hours}</TimeValue>
          <TimeLabel>Hours</TimeLabel>
        </TimeBlock>

        <Separator>:</Separator>

        <TimeBlock>
          <TimeValue>{startCountdown.minutes}</TimeValue>
          <TimeLabel>Mins</TimeLabel>
        </TimeBlock>

        <Separator>:</Separator>

        <TimeBlock>
          <TimeValue>{startCountdown.seconds}</TimeValue>
          <TimeLabel>Secs</TimeLabel>
        </TimeBlock>
      </CountdownGrid>

      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: 'text.secondary',
          textAlign: 'center',
          fontWeight: 500,
        }}
      >
        May 11 - 15, 2026 (Starts at 12:00 PM)
      </Typography>
    </Box>
  );
}

// ----------------------------------------------------------------------


const IconWrapperStyle = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.mode === 'dark'
    ? theme.palette.violet?.[300] || '#9FA8DA'
    : theme.palette.violet?.[600] || '#7E57C2',
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.violet?.[800] || '#283593', 0.3)
    : alpha(theme.palette.violet?.[200] || '#B39DDB', 0.16),
}));

const ChildCard = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(2.5),
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.mode === 'dark'
    ? alpha(theme.palette.violet?.[700] || '#303F9F', 0.3)
    : alpha(theme.palette.violet?.[200] || '#B39DDB', 0.2)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? `0 4px 12px ${alpha('#000', 0.3)}`
    : `0 4px 12px ${alpha(theme.palette.violet?.[300] || '#9575CD', 0.1)}`,
  transition: 'all 0.2s',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark'
      ? `0 8px 24px ${alpha('#000', 0.4)}`
      : `0 8px 24px ${alpha(theme.palette.violet?.[400] || '#B39DDB', 0.2)}`,
    transform: 'translateY(-2px)',
    borderColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.violet?.[500] || '#3F51B5', 0.4)
      : alpha(theme.palette.violet?.[400] || '#B39DDB', 0.3),
  },
}));

const ChildInfo = styled(Box)({
  flexGrow: 1,
  marginBottom: 16,
});

const ChildName = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: 8,
}));

const ChildDetail = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
}));

const GameButton = styled(Button)(({ theme, variantcolor = 'violet' }) => ({
  fontSize: '0.85rem',
  padding: theme.spacing(0.75, 1.5),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 500,
  width: '100%',
  justifyContent: 'flex-start',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.violet?.[900] || '#1A237E', 0.3)
    : alpha(theme.palette.violet?.[100] || '#EDE7F6', 0.5),
  border: `1px solid ${theme.palette.mode === 'dark'
    ? alpha(theme.palette.violet?.[700] || '#303F9F', 0.3)
    : alpha(theme.palette.violet?.[300] || '#9575CD', 0.2)}`,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.violet?.[800] || '#283593', 0.4)
      : alpha(theme.palette.violet?.[200] || '#B39DDB', 0.3),
    borderColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.violet?.[600] || '#3949AB', 0.4)
      : alpha(theme.palette.violet?.[400] || '#B39DDB', 0.3),
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.grey[800], 0.3)
      : alpha(theme.palette.grey[300], 0.3),
    color: theme.palette.text.disabled,
  },
}));

const CertificateButton = styled(Button)(({ theme }) => ({
  fontSize: '0.85rem',
  padding: theme.spacing(0.75, 1.5),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 500,
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${theme.palette.violet?.[500] || '#3F51B5'} 0%, ${theme.palette.violet?.[400] || '#5C6BC0'} 100%)`
    : `linear-gradient(135deg, ${theme.palette.violet?.[600] || '#7E57C2'} 0%, ${theme.palette.violet?.[500] || '#9575CD'} 100%)`,
  color: 'white',
  width: '100%',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, ${theme.palette.violet?.[600] || '#3949AB'} 0%, ${theme.palette.violet?.[500] || '#3F51B5'} 100%)`
      : `linear-gradient(135deg, ${theme.palette.violet?.[700] || '#5E35B1'} 0%, ${theme.palette.violet?.[600] || '#7E57C2'} 100%)`,
  },
}));

const ChildrenGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxHeight: '600px',
  overflow: 'auto',
  padding: theme.spacing(1),
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.mode === 'dark'
      ? alpha(theme.palette.violet?.[900] || '#1A237E', 0.3)
      : alpha(theme.palette.violet?.[100] || '#EDE7F6', 0.5),
    borderRadius: 3,
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'dark'
      ? alpha(theme.palette.violet?.[600] || '#3949AB', 0.3)
      : alpha(theme.palette.violet?.[400] || '#B39DDB', 0.3),
    borderRadius: 3,
    '&:hover': {
      background: theme.palette.mode === 'dark'
        ? alpha(theme.palette.violet?.[500] || '#3F51B5', 0.5)
        : alpha(theme.palette.violet?.[500] || '#9575CD', 0.5),
    },
  },
}));

// ----------------------------------------------------------------------

const url = config.jrmClientUrl;

export default function GeneralApp1() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const pId = localStorage.getItem("partnerId");
  const token = localStorage.getItem("jwt");
  const authConfig = { Authorization: `Bearer ${token}` };
  const [childInfo, setChildInfo] = useState([]);
  const [scores, setScores] = useState({});

  let day = new Date();
  const date = moment(day).tz("Asia/Kolkata").format("DD");
  const currentDate = moment(day).tz("Asia/Kolkata").format("YYYY-MM-DD");
  const currentTime = moment(day).tz("Asia/Kolkata").format("HH:mm:ss");

  // useEffect(() => {
  //   getchildinfo();
  // }, []);

  const getchildinfo = useCallback(async () => {

    try {
      const response = await axios.get(`${url}jrms/v1/partners/${pId}/childreninfo`, {
        headers: authConfig
      });
      setChildInfo(response.data.children);
      response.data.children.forEach(child => getChildScore(child.childId));
    } catch (err) {
      console.log(err);
    }
  }, [pId, token]);

  useEffect(() => {
    getchildinfo();

    // Check event status
    const checkEventStatus = () => {
      // setEventStarted(isEventStarted());
      // setEventEnded(isEventEnded());
      setEventStatus(getEventStatus());
    };

    // Initial check
    checkEventStatus();

    // Check every minute to update when event status changes
    const interval = setInterval(checkEventStatus, 60000);

    return () => clearInterval(interval);
  }, [getchildinfo]);

  // const [eventStarted, setEventStarted] = useState(false);
  // const [eventEnded, setEventEnded] = useState(false);
  const [eventStatus, setEventStatus] = useState('upcoming');


  // const getchildinfo = async () => {
  //   try {
  //     const response = await axios.get(`${url}jrms/v1/partners/${pId}/childreninfo`, {
  //       headers: authConfig
  //     });
  //     setChildInfo(response.data.children);

  //     // Fetch scores for each child
  //     response.data.children.forEach(child => {
  //       getChildScore(child.childId);
  //     });

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getChildScore = async (childId) => {
    try {
      const result = await getScore(pId, childId, token, "gameName");
      const totalScore = result.data.gameScoreList.reduce((a, v) => a + v.score, 0);
      setScores(prev => ({ ...prev, [childId]: totalScore }));
      localStorage.setItem(`${childId}-score`, totalScore);
    } catch (err) {
      console.log(err);
    }
  };

  const { themeStretch } = useSettings();

  const isCertificateAvailable = new Date(`2026-05-01T09:00:00`).getTime() <
    new Date(`${currentDate}T${currentTime}`).getTime();

  const handlePlay = (id, dateOfBirth, path) => {
    localStorage.setItem("path", path);
    localStorage.setItem("date", date);
    var today = moment();
    var dob = moment(dateOfBirth, "YYYY-MM-DD");
    localStorage.setItem("currentChildId", id);
    localStorage.setItem("childId", id);

    if (today.diff(dob, "years") <= 7) {
      localStorage.setItem("category", "beginner");
    } else if (today.diff(dob, "years") > 7 && today.diff(dob, "years") <= 10) {
      localStorage.setItem("category", "primary");
    } else if (today.diff(dob, "years") >= 11 && today.diff(dob, "years") <= 13) {
      localStorage.setItem("category", "junior");
    }

    navigate(PATH_DASHBOARD.general.playgame(id));
  };

  const handleGame = (id, dateOfBirth) => {
    var dob = moment(dateOfBirth, "YYYY-MM-DD");
    localStorage.setItem("currentChildId", id);
    localStorage.setItem("childId", id);

    // Set category based on DOB
    if (dob.diff(moment("2026-02-26", "YYYY-MM-DD"), "days") === 0 ||
      dob.diff(moment("2026-02-27", "YYYY-MM-DD"), "days") === 0 ||
      dob.diff(moment("2026-02-28", "YYYY-MM-DD"), "days") === 0) {
      localStorage.setItem("category", "senior");
    } else {
      localStorage.setItem("category", "senior");
    }

    navigate(PATH_DASHBOARD.general.games(id));
  };

  const isGameDisabled = eventStatus !== 'ongoing';

  return (
    <Page title="Dashboard">
      <RootStyle>
        <FloatingElements>
          {/* Expanded icon list with more variety */}
          {[
            'Star', 'AutoAwesome', 'EmojiEvents', 'Celebration', 'Quiz', 'SportsEsports',
            'Lightbulb', 'School', 'Trophy', 'Medal', 'Crown', 'Diamond',
            'Rocket', 'Fire', 'Sparkles', 'Magic', 'Brain', 'CodeBraces',
            'Puzzle', 'Gamepad', 'Controller', 'Sword', 'Shield', 'Heart',
            'Music', 'Palette', 'Camera', 'Book', 'Leaf', 'Cloud',
            'WeatherSunny', 'WeatherNight', 'Flash', 'Bolt', 'CurrencyUsd', 'CurrencyEur',
            'Earth', 'Airplane', 'Car', 'Bike', 'Bus', 'Train',
            'FoodApple', 'FoodForkDrink', 'Cake', 'Coffee', 'Tea', 'IceCream',
            'Cat', 'Dog', 'Bird', 'Fish', 'Butterfly', 'Bee',
            'Phone', 'Computer', 'Laptop', 'Tablet', 'Watch', 'Headphones',
            'Basketball', 'Football', 'Soccer', 'Baseball', 'Tennis', 'Golf',
            'ChristmasTree', 'Gift', 'Balloon', 'Flag', 'Map', 'Compass'
          ].map((icon, index) => (
            <Box
              key={index}
              className="floating-icon"
              sx={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: isMobile ? '2rem' : `${2 + Math.random() * 4}rem`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
                opacity: 0.3 + Math.random() * 0.3,
                filter: `blur(${Math.random() * 1}px)`,
              }}
            >
              <Iconify
                icon={`mdi:${icon.toLowerCase()}`}
                width="1em"
                height="1em"
              />
            </Box>
          ))}
        </FloatingElements>

        <ContentWrapper maxWidth={themeStretch ? true : "xl"} sx={{ mt: 12, mb: 8 }}>
          <GlassCard>

            {/* Header Section */}
            <HeaderSection>

              {/* 
              <Box>
                <TitleGradient variant="h1">
                  VBS 2026 Adventure
                </TitleGradient>
                <SubtitleText variant="body1">
                  Thank you for registering! Get ready for fun games and activities.
                </SubtitleText>
                Dear Ablaze, welcome you to the Ablazer World!
              </Box> */}

              <Box>
                {new Date() < new Date("2026-04-27") ? (
                  // Before event starts - show registration message
                  <Box>
                    <TitleGradient variant="h1">
                      VBS 2026 Adventure
                    </TitleGradient>
                    <SubtitleText variant="body1">
                      Thank you for registering! Get ready for fun games and activities.
                    </SubtitleText>
                  </Box>
                ) : new Date() >= new Date("2026-04-27") && new Date() <= new Date("2026-05-01") ? (
                  // During event - show welcome message
                  <Box>
                    <TitleGradient variant="h3">
                      Dear Ablaze, welcome you to the Ablazer World!
                    </TitleGradient>
                  </Box>
                ) : (
                  // After event ends - maybe show thank you message
                  <Box>
                    <TitleGradient variant="h2">
                      Thank you for participating in VBS 2026!
                    </TitleGradient>
                  </Box>
                )}
              </Box>

              <Box sx={{ mt: { xs: 2, md: 0 } }}>
                <ActionButton
                  startIcon={<ChildCareIcon />}
                  onClick={() => navigate(PATH_DASHBOARD.user.child)}
                  size="large"
                >
                  Manage Children
                </ActionButton>
              </Box>
            </HeaderSection>

            {/* Countdown Section */}
            <CountdownSection>
              <EventCountdown />
            </CountdownSection>

            {/* Children Section */}
            <Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2
              }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark'
                      ? theme.palette.violet?.[300] || '#9FA8DA'
                      : theme.palette.violet?.[800] || '#4527A0',
                  }}
                >
                  Registered Children
                  {childInfo.length > 0 && (
                    <Chip
                      label={childInfo.length}
                      size="small"
                      sx={{
                        ml: 1,
                        background: theme.palette.mode === 'dark'
                          ? alpha(theme.palette.violet?.[800] || '#283593', 0.3)
                          : alpha(theme.palette.violet?.[500] || '#7E57C2', 0.1),
                        color: theme.palette.mode === 'dark'
                          ? theme.palette.violet?.[300] || '#9FA8DA'
                          : theme.palette.violet?.[700] || '#5E35B1',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Typography>
              </Box>

              {childInfo.length > 0 ? (
                <ChildrenGrid container spacing={2}>
                  {childInfo.map((data, i) => (
                    <Grid item xs={12} sm={6} lg={4} key={data.childId || i}>
                      <ChildCard>
                        <ChildInfo>
                          <ChildName variant="h6">
                            {data.fullName}
                            {scores[data.childId] > 0 && (
                              <Chip
                                label={`Score: ${scores[data.childId]}`}
                                size="small"
                                sx={{
                                  ml: 1,
                                  fontSize: '0.7rem',
                                  background: alpha(theme.palette.success.main, 0.1),
                                  color: 'success.main',
                                }}
                              />
                            )}
                          </ChildName>

                          <Stack spacing={1} sx={{ mb: 2 }}>
                            <ChildDetail variant="body2" component="div">
                              <Iconify
                                icon="mdi:calendar"
                                width={16}
                                height={16}
                                color={theme.palette.mode === 'dark'
                                  ? theme.palette.violet?.[400] || '#5C6BC0'
                                  : theme.palette.violet?.[400] || '#B39DDB'}
                              />
                              {moment(data.dateOfBirth.replace(/\//g, '-')).format('DD MMM YYYY')}
                            </ChildDetail>

                            <ChildDetail variant="body2" component="div">
                              <IconWrapperStyle
                                sx={{
                                  width: 20,
                                  height: 20,
                                  ...(data.gender === 2 && {
                                    color: theme.palette.error.main,
                                    bgcolor: alpha(theme.palette.error.main, 0.1),
                                  }),
                                }}
                              >
                                <Iconify
                                  width={12}
                                  height={12}
                                  icon={
                                    data.gender === 1
                                      ? "icon-park-solid:boy-one"
                                      : "icon-park-solid:girl-one"
                                  }
                                />
                              </IconWrapperStyle>
                              {data.gender === 1 ? 'Boy' : 'Girl'}
                            </ChildDetail>
                          </Stack>

                          {/* Game Buttons Section */}
                          <Stack spacing={1} sx={{ mt: 1 }}>
                            <GameButton
                              startIcon={<QuizIcon />}
                              onClick={() => handlePlay(data.childId, data.dateOfBirth, "quiz")}
                              disabled={isGameDisabled}
                              fullWidth
                              sx={{
                                opacity: isGameDisabled ? 0.7 : 1,
                                ...(isGameDisabled && {
                                  cursor: 'not-allowed',
                                  '&:hover': {
                                    backgroundColor: theme.palette.mode === 'dark'
                                      ? alpha(theme.palette.violet?.[900] || '#1A237E', 0.3)
                                      : alpha(theme.palette.violet?.[100] || '#EDE7F6', 0.5),
                                  }
                                })
                              }}
                            >
                              Play Quiz
                              {eventStatus === 'upcoming' && (
                                <Typography
                                  component="span"
                                  sx={{
                                    ml: 1,
                                    fontSize: '0.7rem',
                                    color: 'text.secondary'
                                  }}
                                >
                                  (Starts May 11, 12 PM)
                                </Typography>
                              )}
                              {eventStatus === 'ended' && (
                                <Typography
                                  component="span"
                                  sx={{
                                    ml: 1,
                                    fontSize: '0.7rem',
                                    color: 'text.secondary'
                                  }}
                                >
                                  (Event Ended)
                                </Typography>
                              )}
                            </GameButton>

                            <GameButton
                              startIcon={<SportsEsportsIcon />}
                              onClick={() => handleGame(data.childId, data.dateOfBirth)}
                              disabled={isGameDisabled}
                              fullWidth
                              sx={{
                                opacity: isGameDisabled ? 0.7 : 1,
                                ...(isGameDisabled && {
                                  cursor: 'not-allowed',
                                  '&:hover': {
                                    backgroundColor: theme.palette.mode === 'dark'
                                      ? alpha(theme.palette.violet?.[900] || '#1A237E', 0.3)
                                      : alpha(theme.palette.violet?.[100] || '#EDE7F6', 0.5),
                                  }
                                })
                              }}
                            >
                              Activities
                              {eventStatus === 'upcoming' && (
                                <Typography
                                  component="span"
                                  sx={{
                                    ml: 1,
                                    fontSize: '0.7rem',
                                    color: 'text.secondary'
                                  }}
                                >
                                  (Starts May 11, 12 PM)
                                </Typography>
                              )}
                              {eventStatus === 'ended' && (
                                <Typography
                                  component="span"
                                  sx={{
                                    ml: 1,
                                    fontSize: '0.7rem',
                                    color: 'text.secondary'
                                  }}
                                >
                                  (Event Ended)
                                </Typography>
                              )}
                            </GameButton>
                          </Stack>
                        </ChildInfo>

                        {/* Certificate Button */}
                        {isCertificateAvailable && (
                          <Box sx={{ mt: 2 }}>
                            <CertificateButton
                              variant="contained"
                              size="small"
                              startIcon={<DownloadIcon />}
                              onClick={() => {
                                localStorage.setItem("cName", data.fullName);
                                navigate(PATH_DASHBOARD.general.downloadCert, {
                                  replace: true,
                                });
                              }}
                              fullWidth
                            >
                              Get Certificate
                            </CertificateButton>
                          </Box>
                        )}
                      </ChildCard>
                    </Grid>
                  ))}
                </ChildrenGrid>
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 6,
                    px: 2,
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.violet?.[900] || '#1A237E', 0.2)
                      : alpha(theme.palette.violet?.[50] || '#F3E5F5', 0.3),
                    borderRadius: 3,
                    border: `1px dashed ${theme.palette.mode === 'dark'
                      ? alpha(theme.palette.violet?.[700] || '#303F9F', 0.3)
                      : alpha(theme.palette.violet?.[300] || '#9575CD', 0.3)}`,
                  }}
                >
                  <Iconify
                    icon="mdi:child-care"
                    width={48}
                    height={48}
                    color={theme.palette.mode === 'dark'
                      ? alpha(theme.palette.violet?.[500] || '#3F51B5', 0.5)
                      : alpha(theme.palette.violet?.[400] || '#B39DDB', 0.5)}
                  />
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mt: 2, mb: 1 }}
                  >
                    No Children Registered Yet
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Add your children's information to start playing games and activities
                  </Typography>
                  <ActionButton
                    variant="contained"
                    onClick={() => navigate(PATH_DASHBOARD.user.child)}
                  >
                    Add Children Now
                  </ActionButton>
                </Box>
              )}
            </Box>
          </GlassCard>
        </ContentWrapper>

      </RootStyle>
    </Page>
  );
}
