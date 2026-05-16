// @mui
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import {
  Container, Grid, Stack,
  Box,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
// hooks
// import useSettings from '../../hooks/useSettings';
import axios from "axios";
// _mock_
// components
import Page from '../../components/Page';
// import useResponsive from '../../hooks/useResponsive';
// sections

import { Canva } from '../../sections/@dashboard/general/app';
import config from "../../partnerconfig.json";


// const HEIGHT = 450;
const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: 'auto',

  borderRadius: 10,
  [theme.breakpoints.up('md')]: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  paddingTop: 100,
  paddingBottom: 200,
}));
// const CardItemStyle = styled('div')(({ theme }) => ({
//   position: 'relative',
//   height: HEIGHT,
//   backgroundSize: 'cover',
//   padding: theme.spacing(3),
//   backgroundRepeat: 'no-repeat',
//   color: theme.palette.common.black,
//   // backgroundImage: 'url("/assets/vbsbg.jpg")',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   borderRadius: Number(theme.shape.borderRadius) * 3,
// }));

// ----------------------------------------------------------------------


const url = config.jrmClientUrl;
export default function Events() {

  // const [feed, setFeed] = useState({feedList:[]});
  const [childdata, setChilddata] = useState({ relationship: 0, children: [] });
  // const pId = localStorage.getItem("partnerId");
  // const token = localStorage.getItem("jwt");

  // const isDesktop = useResponsive('up', 'md');

  // const config = { 'Authorization': `Bearer ${token}` }
  const childName = localStorage.getItem('cName');

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${url}jrms/v1/partners/${pId}/childreninfo`, { headers: config }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       console.log("response", response.data);
  //       console.log("childdata1", response.data);
  //       setChilddata(response.data !== undefined ? response.data : "");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    const pId = localStorage.getItem("partnerId");
    const token = localStorage.getItem("jwt");
    const config = { Authorization: `Bearer ${token}` };

    axios.get(`${url}jrms/v1/partners/${pId}/childreninfo`, { headers: config })
      .then((response) => {
        console.log(response);
        console.log("response", response.data);
        console.log("childdata1", response.data);
        setChilddata(response.data !== undefined ? response.data : "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // now the dep array is correctly empty
  console.log("childdata", childdata);
  // alert(childdata.children);

  // const theme = useTheme();
  // const { themeStretch } = useSettings();


  return (
    <Page title="Certificate">
      <RootStyle>
        <Container >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>

              {/* <Typography variant="h2" component="div" textAlign='center' color="black" >
               VBS 2024 Certificate 
              </Typography> */}
              <br />

              <Box sx={{ position: 'relative', zIndex: 9, mb: 5 }}>

                <Stack alignItems="center" justifyContent="flex-center" spacing={3}>
                  {/* <CardWithCanvas /> */}
                  <Canva name={childName} />

                </Stack>

              </Box>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
