// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// components
import Page from '../../components/Page';
// sections
import { VerifyCodeEmail } from '../../sections/auth/verify-code';

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

export default function VerifyCode() {
 
  return (
    <Page title="Verify Email OTP">
      <LogoOnlyLayout />

      <Container>
 
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Please check your email!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            We have emailed a 6-digit confirmation code to your email,<br/> please enter the code in below box to verify your
            email.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <VerifyCodeEmail />
          </Box>

         
        </ContentStyle>

      </Container>
    </Page>
  );
}
