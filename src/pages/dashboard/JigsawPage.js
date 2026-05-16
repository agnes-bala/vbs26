// @mui
import { styled,useTheme } from '@mui/material/styles';
import { Container, Grid,Typography } from '@mui/material';
// hooks
import { m } from 'framer-motion';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import JigsawGame from '../../sections/@dashboard/general/app/JigsawGame';

// ----------------------------------------------------------------------
const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  backgroundSize: 'cover',
  backgroundPosition: 'bottomleft',
  backgroundImage:
    'url(/assets/bg_gradient1blur.jpg)',
    borderRadius:10,
  [theme.breakpoints.up('md')]: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  paddingTop:100,
  paddingBottom:200,
}));
export default function JigsawPage() {
 
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="Puzzle">
      <RootStyle>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            
            <Typography variant="h5" component="div" textAlign='center' color={theme.palette.primary.dark}>
              Jigsaw Puzzle
              </Typography>
              <JigsawGame />
 
          </Grid>
        </Grid>
      </Container>
      </RootStyle>
    </Page>
  );
}
