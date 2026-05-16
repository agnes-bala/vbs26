import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {  Container, Typography, Stack, Link } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { ForgotPasswordForm } from '../../sections/auth/password';

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

export default function ForgotPassword() {
  return (
    <Page title="Forgot Password">
      <LogoOnlyLayout />

      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Forgot your password?
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Please enter the registered email and mobile number
          </Typography>
          
          <ForgotPasswordForm />
          <Stack  alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          
          <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
            Back to login
          </Link>
          
  
          </Stack>
        </ContentStyle>
      </Container>
    </Page>
  );
}
