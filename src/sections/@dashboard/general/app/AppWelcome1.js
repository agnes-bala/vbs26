// @mui
import PropTypes from 'prop-types';
import { styled , useTheme} from '@mui/material/styles';
import { Typography, Card, CardContent,  Box } from '@mui/material';


import Scrollbar from '../../../../components/Scrollbar';
import useResponsive from '../../../../hooks/useResponsive';


// ----------------------------------------------------------------------
// const CardItemStyle = styled('div')(({ theme }) => ({
//   position: 'relative',
//   backgroundSize: 'cover',
//   borderRadius : '-100',
//   borderWidth : '1',
//   backgroundRepeat: 'no-repeat',
//   color: theme.palette.common.white,
//   backgroundImage: 'url("/assets/bg_bible.jpg")',
//   backgroundPosition: 'center center',
//   display: 'flex',
//   opacity:0.3,
//   flexDirection: 'column',
//   justifyContent: 'space-between',
  
// }));

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  action: PropTypes.node,
  description: PropTypes.string,
  img: PropTypes.node,
  title: PropTypes.string,
};

export default function AppWelcome({ title, description, action, img, ...other }) {
  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');


  return (
    
    <RootStyle {...other}> 
     <Box sx={{ position: 'relative', backgroundColor: 'theme.palette.primary.darker', }}> 
      <CardContent
        sx={{
           p: { md: 3 },
           pl: { md: 5 },
          color: 'grey.800', 
        }}
      >
        <Typography gutterBottom variant="h5" sx={{ whiteSpace: 'pre-line' }}>
          {title}
        </Typography>

        { smUp ?
        <>
        <Typography variant="h5"  sx={{ pb: { xs: 3, xl: 5 },  mx: 'auto' }} color={theme.palette.primary.darker}>
          {description}
        </Typography>
        </>
          :
          <>
          <Scrollbar >
        <Typography variant="h5"  sx={{ pb: { xs: 3, xl: 5 },  mx: 'auto' }} color={theme.palette.primary.darker}>
          {description}
        </Typography>
        </Scrollbar>
        </>
          }
        {action && action}
      </CardContent>
      {img && img}
      
     </Box>
     
    </RootStyle>
    
  );
}
