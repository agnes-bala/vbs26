
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Button, Card, Link, Container, Typography } from '@mui/material';
// hooks

import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import LogoW from '../../components/LogoW';

// sections
import { RegisterForm } from '../../sections/auth/register';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

// const HeaderStyle = styled('header')(({ theme }) => ({
//   top: 0,
//   zIndex: 9,
//   lineHeight: 0,
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   position: 'absolute',
//   padding: theme.spacing(3),
//   justifyContent: 'space-between',
//   [theme.breakpoints.up('md')]: {
//     alignItems: 'flex-start',
//     padding: theme.spacing(7, 5, 0, 7),
//   },
// }));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  // const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
      <RootStyle>
        

        {mdUp && (
          <SectionStyle>
              <Button variant="contained" style={{textTransform: 'none'}}>Promise of the 2022</Button>
        <Typography variant="h5" sx={{ px: 5, mb: 0 }} align='center' color='inherit'>
        Fear not, for I am with you.
        </Typography>
        <Typography variant="body1" sx={{ px: 5, mb: 5 }} align='center'>
        
Isaiah 41:10
        </Typography>
        <img src="../assets/login-interface-computer.png" alt="login" />  </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle align ="center">
          {isLight ? <Logo /> : <LogoW /> }

          <Button   variant="outlined">Register </Button>
              <Link   variant="h3" underline="none"> Register </Link>
           <br />
    
            <RegisterForm />

            <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
                  Login
                </Link>
              </Typography>
              <br />
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Could not able to register with your existing mobile/email ?{' '}<br />
                <Link variant="subtitle2" to={PATH_AUTH.eForgotPassword} component={RouterLink}>
                  Click here to reset password
                </Link>
              </Typography>
            
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
