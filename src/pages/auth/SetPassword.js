import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// components
import Page from '../../components/Page';
// routes
import { PATH_AUTH } from '../../routes/paths';
// sections
import { SetPasswordForm, UpdatePasswordForm } from '../../sections/auth/password';
// assets
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

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

export default function SetPassword() {
  const jwt = localStorage.getItem("jwt");
  return (
    <Page title="New Password">
      <LogoOnlyLayout />
{ !jwt ? <>
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <SentIcon sx={{ mb: 5, mx: 'auto', height: 120 }} />

          <Typography variant="h3" gutterBottom>
            Set Password
          </Typography>
          <Box sx={{ mt: 5, mb: 3 }}>
            <SetPasswordForm />
          </Box>

          <Typography variant="body2">
            Go back to &nbsp;
            <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
</>
:
<>
      <Container>
        <ContentStyle sx={{ textAlign: 'center',  }} >
          
          <Typography variant="h3" gutterBottom>
           Update Password
          </Typography>
          <Box sx={{ mt: 1, mb: 1 }}>
            <UpdatePasswordForm />
          </Box>

        </ContentStyle>
      </Container>
      </>}
    </Page>
  );
}
