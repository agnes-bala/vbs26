import { Outlet } from 'react-router-dom';
// @mui
import { Box, Stack } from '@mui/material';
// components


// ----------------------------------------------------------------------

export default function MainLayout() {
  // const { pathname } = useLocation();

  // const isHome = pathname === '/';

  return (
    <Stack sx={{ minHeight: 1 }}>
      {/* <MainHeader /> */}

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      {/* {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
           

            <Typography variant="caption" component="p">
              © All rights reserved
              <br /> made by Jesus Redeems Ministries
              
            </Typography>
          </Container>
        </Box>
      )} */}
    </Stack>
  );
}
