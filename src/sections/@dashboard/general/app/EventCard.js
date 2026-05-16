import PropTypes from 'prop-types';

// @mui
import { styled,  } from '@mui/material/styles';
import { Box,Typography, Stack,  FormControl, } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// utils

// components

import AppDialog from './EventDialog';

// ----------------------------------------------------------------------

const HEIGHT = 450;

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT, 
  '& .slick-list': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const CardItemStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT,
  backgroundSize: 'cover',
  padding: theme.spacing(3),
  backgroundRepeat: 'no-repeat',
  color: theme.palette.common.black,
  backgroundImage: 'url("/assets/bg_gradient1blur.jpg")',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: Number(theme.shape.borderRadius) * 3,
}));

const shadowStyle = {
  mx: 'auto',
  width: 'calc(100% - 2px)',
  borderRadius: 3,
  position: 'absolute',
  height: 450,
  zIndex: 8,
  top: 8,
  left: 0,
  right: 0,
  bgcolor: 'grey.500',
  opacity: 0.38,
};

// ----------------------------------------------------------------------

EventCard.propTypes = {
  list: PropTypes.shape({
    eventId: PropTypes.string,
    eventTitle: PropTypes.string,
    eventSubTitle: PropTypes.string,
    place: PropTypes.string,
    speakers: PropTypes.string,
    eventDate: PropTypes.string,
    eventTime: PropTypes.string,
    eventMeta: PropTypes.string,
    eventLink: PropTypes.string,
    contactInfo: PropTypes.string,
    regStartDate: PropTypes.string,
    regEndDate: PropTypes.string,

    regMeta: PropTypes.string,
    eventImage: PropTypes.string,
    isFeatured: PropTypes.number,
  }),
  sx: PropTypes.object,
};

export default function EventCard({ list, sx }) {
  // const {eventId,
  //   eventTitle,
  //   eventSubTitle,
  //   place,
  //   speakers,
  //   eventDate,
  //   eventTime,
  //   eventMeta,
  //   eventLink,
  //   contactInfo,
  //   regStartDate,
  //   regEndDate,
  //   regMeta,
  //   eventImage,
  //   isFeatured} = list;
  // const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');


  return (
    <Box >
    {list.eventList.map((event) => (
      <>
    <RootStyle sx={sx} key={event.eventId}>
       <Box sx={{ position: 'relative', zIndex: 9, mb:5 }}>
      <CardItemStyle >
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="flex-center" spacing={1}>

        <FormControl>
          <Typography sx={{ typography: 'h4' }}>{event.eventTitle}</Typography>
          <Typography sx={{ typography: 'subtitle2',opacity: 0.80,textAlign: 'center' }}>{event.eventSubTitle}</Typography>
        </FormControl>
         
        </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent={isDesktop ? "flex-end" :"flex-center"} spacing={1}>
          <FormControl >
          <Typography sx={{ typography: 'h5', textAlign: 'center' }}>{event.eventDate}</Typography>
          <Typography sx={{ typography: 'h5', textAlign: 'center' }}>{event.eventTime}</Typography>
          </FormControl>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent={isDesktop ? "flex-end" :"flex-center"} spacing={1}>
          <Typography sx={{ typography: 'h6', textAlign: isDesktop ? 'right' : 'left' }}>{event.place}</Typography>
        
          </Stack>
       
        
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={1}>
        <FormControl >
      <Typography sx={{ typography: 'caption',opacity: 0.80, textAlign: isDesktop ? "left" : 'center' }}>speakers/message</Typography>
      <Typography sx={{ typography: 'h6', textAlign: 'center'  }}>{event.speakers}</Typography>
      </FormControl>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={1}>
      <FormControl >
          <Typography sx={{ mb: 1, typography: 'caption', opacity: 0.80, textAlign: isDesktop ? "left" : 'center' }}>Contact info</Typography>
          <Typography sx={{ typography: 'h6' }} > {event.contactInfo}</Typography>
          </FormControl >
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={1}>
      <FormControl>
      <Typography sx={{ typography: 'caption',opacity: 0.80, textAlign: isDesktop ? "left" : 'center' }}>Note</Typography>
      <Typography sx={{ typography: 'h6', textAlign: 'left'  }}>{event.eventMeta}</Typography>
      </FormControl>
      </Stack>


      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent={isDesktop ? "flex-end" :"flex-center"} spacing={1}>
      <AppDialog 
      title={event.eventTitle}
      lastDate={event.regEndDate}
      eventLink={event.eventLink}
      regMeta={event.regMeta}
      eventImage={event.eventImage}
      
      />

      </Stack>
      </CardItemStyle>

      
      </Box>
    
      <Box
        sx={{
          ...shadowStyle,
          
          bottom: 10,
          left: 5,
          zIndex: 7,
          bgcolor: 'grey.500',
          width: 'calc(100% - 2px)',
        }}
      />

    </RootStyle>
    <br/>
<br/>
    </>
    
     ))}
     </Box>
  );
}




