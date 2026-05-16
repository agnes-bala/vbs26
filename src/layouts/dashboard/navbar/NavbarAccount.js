import PropTypes from 'prop-types';
// @mui
;
// hooks

// routes
// components

// ----------------------------------------------------------------------

// const RootStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2, 2.5),
//   borderRadius: Number(theme.shape.borderRadius) * 1.5,
//   backgroundColor: theme.palette.primary.main,
//   transition: theme.transitions.create('opacity', {
//     duration: theme.transitions.duration.shorter,
//   }),
// }));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};



export default function NavbarAccount({ isCollapse }) {
 // const user = localStorage.getItem("userEmail");
  
  return (
    <></>
    // <Link underline="none" color="inherit" component={RouterLink} to={PATH_DASHBOARD.user.profile}>
    //   <RootStyle
    //     sx={{
    //       ...(isCollapse && {
    //         bgcolor: 'transparent',
    //       }),
    //     }}
    //   >
    //     <MyAvatar />
        
    //     <Box
    //       sx={{
    //         ml: 2,
    //         transition: (theme) =>
    //           theme.transitions.create('width', {
    //             duration: theme.transitions.duration.shorter,
    //           }),
    //         ...(isCollapse && {
    //           ml: 0,
    //           width: 0,
    //         }),
    //       } }
          
    //     >
    //       <Typography variant="subtitle2" color= "white" >
    //         My Profile
    //       </Typography>
          
                   
    //     </Box>
        
    //   </RootStyle>
    // </Link>
  );
}
