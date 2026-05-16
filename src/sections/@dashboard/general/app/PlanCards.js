import PropTypes from 'prop-types';
// @mui

import { Box, Button, Card,  Divider, Typography, Stack } from '@mui/material';
// utils


// components
import Image from '../../../../components/Image';

// ----------------------------------------------------------------------

// const OverlayStyle = styled('div')(({ theme }) => ({
//   ...cssStyles().bgBlur({ blur: 1, color: theme.palette.primary.darker }),
//   top: 0,
//   zIndex: 8,
//   content: "''",
//   width: '100%',
//   height: '100%',
//   position: 'absolute',
// }));

// ----------------------------------------------------------------------

PlanCards.propTypes = {
  plans: PropTypes.object.isRequired,
};





export default function PlanCards({ plans }) {
  const {   planTitle, planSubTitle1, planSubTitle2, planInfo, buttonLabel, _linkTo, imageLink } = plans;

  return (
    // <Card sx={{ textAlign: 'center' }}>
    //   <Box sx={{ position: 'relative' }}>
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', backgroundColor: 'theme.palette.primary.darker',
        '&:hover': {
          backgroundColor: 'theme.palette.primary.darker',
          opacity: [0.9, 0.8, 0.7],} }}>
     
      <Image src={imageLink} alt={imageLink} ratio="16/9" />
      </Box>
      
      <Box sx={{ mr: 2,ml:2 }}>
        <Typography variant="h4" sx={{ mt: 1 }} align= 'center'>
        {planTitle}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}align= 'center' >
      {planSubTitle1}
      </Typography>
<br />
<Typography variant="body2" sx={{ color: 'text.secondary' }}align= 'center' >
{planSubTitle2}
      </Typography>
<br />
      <Stack alignItems="center">
      <Typography variant="subtitle1" component="div" >
     {planInfo}
          </Typography>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed', mt:2 }} />
      <Stack alignItems="center" mb={5}>
     
<Button variant="contained" sx={{ mt: 2 }} href={_linkTo} target='_blank'>{buttonLabel}</Button>

      </Stack>  
     </Box>
     
     
        
    </Card>
  );
}
