// @mui

// components

import Page from "../components/Page";

// sections
import { HomeHeroVbs } from "../sections/home";

// const winnersIndia = [
//   {
//     childName: 'ASHLIN', parentName: "DAVID", district: "KANYAKUMARI",
//     state: "TAMIL NADU",
//   },
//   {
//     childName: 'AKHIL', parentName: "DAVID", district: "KANYAKUMARI",
//     state: "TAMIL NADU",
//   },
//   {
//     childName: 'HASINI S', parentName: "SANTHOSH", district: "CHENNAI",
//     state: "TAMIL NADU",
//   },
// ];
// const winnersOthers = [
//   {
//     childName: 'KORNELIUS WINSTAR', parentName: "SOULWIN ASIR JEBAKUMAR", state: "BADEN-WÜRTTEMBERG",
//     country: "GERMANY",
//   },
//   {
//     childName: 'KERUBIN WINSTA', parentName: "SOULWIN ASIR JEBAKUMAR", state: "BADEN-WÜRTTEMBERG",
//     country: "GERMANY",
//   },
//   {
//     childName: 'AANA PRISCILLA', parentName: "KAMINI CHRISTOPHER", state: "HESSE",
//     country: "GERMANY",
//   },
// ];

// ----------------------------------------------------------------------

// const ContentStyle = styled(m.div)(({ theme }) => ({
//   overflow: 'hidden',
//   position: 'relative',
//   // 'url(/assets/vbsbg.jpg)',
// }));
// const ItemBlockStyle = styled((props) => <Stack direction="row" alignItems="center" {...props} />)({
//   minWidth: 72,
//   flex: '1 1',
// });
// const IconWrapperStyle = styled('div')(({ theme }) => ({
//   width: 40,
//   height: 40,
//   display: 'flex',
//   borderRadius: '50%',
//   alignItems: 'center',
//   justifyContent: 'center',
//   color: theme.palette.primary.main,
//   backgroundColor: alpha(theme.palette.primary.main, 0.08),
// }));

// const ItemIconStyle = styled(Iconify)(({ theme }) => ({
//   width: 16,
//   height: 16,
//   marginRight: theme.spacing(0.5),
//   color: theme.palette.text.disabled,
// }));

// ----------------------------------------------------------------------

export default function Home() {
  // const [feed, setFeed] = useState({ feedList: [] });
  // const [winnersIndia, setWinnersIndia] = useState({overallScores:[]});
  // const [winnersOthers, setWinnersOthers] = useState({overallScores:[]});
  // const { themeStretch } = useSettings();
  // const url = config.jrmClientUrl;

  // useEffect(() => {
  //   axios.all([
  //     axios.get(`${url}jrms/v1/feed/home`),
  //     axios.get(`${url}jrms/v1/kidsmas/overallresult/2023/05/19/india`),
  //     axios.get(`${url}jrms/v1/kidsmas/overallresult/2023/05/19/nonindia`)
  //   ])
  //   .then(axios.spread((vid, ind, nonind) => {
  //     // Both requests are now complete
  //     setFeed(vid.data);
  //     setWinnersIndia(ind.data);
  //     setWinnersOthers(nonind.data);
  //     console.log(feed,"feed");
  //     console.log(winnersIndia,'ind');
  //     console.log(winnersOthers,'nonind');
  //   }));

  // }, []);
  // console.log('ind',winnersIndia);
  //     console.log('nonind',winnersOthers);
  //   console.log("Feed Response",feed);
  // const youtubeOnReady = (event) => {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // }

  return (
    <Page title="VBS 2026">
      <HomeHeroVbs />

      {/* <Grid container spacing={3} sx={{backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/funfair-sectionbg1.jpg)'}}>
            <Grid item sm='6' xs='12'>
            <Card sx={{m: theme.breakpoints.up('md') ? 5 : 2, p:theme.breakpoints.up('md') ? 5 : 5 }} style={{backgroundColor: theme.palette.grey[200]}} id='reg'>
            <Typography variant='h5' color={theme.palette.primary.main} textAlign='center'>Registered kids can play quiz, puzzle and more games. </Typography>
            <Typography variant='h6' textAlign='center'>Not Yet Registered ?</Typography>
            <RegisterForm />

          </Card> 
        
        </Grid> 
        <Grid item sm='6' xs='12'>
        
            <Card sx={{m: theme.breakpoints.up('md') ? 5 : 5, p:theme.breakpoints.up('md') ? 5 : 1 }} style={{backgroundColor: theme.palette.grey[200]}} id='login'>
            <img src="/assets/rainbow-1.png" width="300" height="200"/> 
            <Typography variant='h5' color={theme.palette.primary.main} textAlign='center'>If you have already registered </Typography>
            <Typography variant='h6' textAlign='center'>login here</Typography>
            <LoginForm />

          </Card> 
        
        </Grid> 
        </Grid> */}

      {/* <ContentStyle>

        <Grid item xs='12' md='12' sx={{ alignItems: "center", flex: "middle" }} >
          <br />
          <Box display="flex" justifyContent="center" alignItems="center">

            <Button size="large" style={{ fontSize: '30px', color: 'black' }}
              variant="text">VBS 2023 Prize Winners<br /></Button>
          </Box>

        </Grid>

        <Grid container spacing={3} sx={{ mt: 1, mb: 1, pr: 5, pl: 5 }}>

          <Grid item sm='6' xs='12' >
            <Card xs={{ maxWidth: 'auto', p: 10, m: 5, }} sx={{ backgroundColor: theme.palette.primary.light }}>
              <br />

              <CardHeader title='Overall Winners - India' />
              {winnersIndia.map((data, i) => (
                <Stack key={i} direction="row" sx={{ p: 3 }} alignItems="center" spacing={2}>
                  <Scrollbar >

                    <ItemBlockStyle sx={{ minWidth: 120 }}>
                      <ItemIconStyle icon={'material-symbols:account-box'} />
                      <Typography variant="subtitle2">{data.childName}</Typography>
                    </ItemBlockStyle>

                    <ItemBlockStyle>
                      <Typography variant="body2">Parent: {data.parentName}</Typography>
                    </ItemBlockStyle>

                    <ItemBlockStyle>
                      <Typography variant="body2">District: {data.district}</Typography>
                    </ItemBlockStyle>

                    <ItemBlockStyle sx={{ minWidth: 88 }}>
                      <Typography variant="body2">State: {data.state}</Typography>
                    </ItemBlockStyle>

                    <IconWrapperStyle
                      sx={{
                        ...(i === 0 && {
                          color: 'info.main',
                          bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
                        }),
                        ...(i === 1 && {
                          color: 'error.main',
                          bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                        }),
                      }}
                    >
                      <Iconify icon={'ant-design:trophy-filled'} width={20} height={20} />
                    </IconWrapperStyle>
                  </Scrollbar>
                </Stack>
              ))}
            </Card>
          </Grid>
          <Grid item sm='6' xs='12' >
            <Card xs={{ maxWidth: 'auto', p: 10, m: 5 }} sx={{ backgroundColor: theme.palette.primary.light }}>
              <br />

              <CardHeader title='Overall Winners - Overseas' />
              {winnersOthers.filter(c => c.childName !== '').map((data, i) => (
                <Stack key={i} direction="row" sx={{ p: 3 }} alignItems="center" spacing={2}>
                  <Scrollbar >

                    <ItemBlockStyle sx={{ minWidth: 120 }}>
                      <ItemIconStyle icon={'material-symbols:account-box'} />
                      <Typography variant="subtitle2">{data.childName}</Typography>
                    </ItemBlockStyle>

                    <ItemBlockStyle>
                      <Typography variant="body2">Parent: {data.parentName}</Typography>
                    </ItemBlockStyle>

                    <ItemBlockStyle>
                      <Typography variant="body2">State: {data.state}</Typography>
                    </ItemBlockStyle>

                    <ItemBlockStyle sx={{ minWidth: 88 }}>
                      <Typography variant="body2">Country: {data.country}</Typography>
                    </ItemBlockStyle>

                    <IconWrapperStyle
                      sx={{
                        ...(i === 0 && {
                          color: 'info.main',
                          bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
                        }),
                        ...(i === 1 && {
                          color: 'error.main',
                          bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                        }),
                      }}
                    >
                      <Iconify icon={'ant-design:trophy-filled'} width={20} height={20} />
                    </IconWrapperStyle>
                  </Scrollbar>
                </Stack>
              ))}

            </Card>

          </Grid>

        </Grid>
        <br /> <br />
      </ContentStyle> */}

      <br />
      {/* {feed.feedList.filter(_id =>_id.feedName ==='VBS').length !== 0 && 
        <>  
          <Grid container spacing={3} sx={{backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: 'url(/assets/funfair-sep1.png)'}}>
          
          <Grid item xs='12' md='12' sx={{alignItems:"center", flex:"middle" }} >
          <br /><br />
          <Box  display="flex"  justifyContent="center"  alignItems="center">
     
          <Button size="large" style={{ fontSize: '30px',color:'black' }}  
          variant="text">  VBS 2023<br/></Button>
          </Box>
          
          </Grid>
        

          {feed.feedList.filter(_id =>_id.feedName ==='VBS').map((data,i) =>(
                         
              <Grid item xs='12' md='12' sx={{alignItems:"center", flex:"middle" }}  key={i}>
              <Card xs={{ maxWidth: 'auto', pr:5, pl:5 }}>
                <CardActionArea >
                  <CardContent className='video-container'>   
                    <Typography align="center" className='video-container'>
                      <YouTube  videoId={data.feedUrl}  onReady={youtubeOnReady}  />
                    </Typography>
        
                    
                  </CardContent>
                </CardActionArea>
               
              </Card>
              
            
          </Grid>
        
              ))}
             
        </Grid>
          </>
} */}
    </Page>
  );
}
