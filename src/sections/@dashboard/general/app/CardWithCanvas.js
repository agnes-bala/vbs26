import React, { useEffect, useRef } from 'react';

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import QRCode from 'react-qr-code';
import {AppBar,Toolbar,Divider,Box,Button,CardActions,Grid,Stack,Avatar,Card,CardContent,CardMedia,Typography, CardActionArea } from '@mui/material';
import exportAsImage from './exportAsImage';
import { toast } from 'react-toastify';


const CardWithCanvas = ({ emNumber,qrcodeVal,firstName, Address1,Address2,Address3,mobile }) => {
  const canvasRef = useRef(null);
  const pageRef = useRef(null);
    
  const handleDownload = async () => {
    // exportAsImage(pageRef.current, `id_card`)
    //     console.log('ref',pageRef.current)
    //     toast.success('Downloading...')
      const canvas = await html2canvas(pageRef.current);
      canvas.toBlob((blob) => {
        saveAs(blob,'card.pdf');
      },"image/webp",1);
     
    }
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext('2d');
  //   const context1 = canvas.getContext('2d');
  //   const context2 = canvas.getContext('2d');

    
  //   context.font = '10px Arial';
  //   context.fillStyle = 'black';
  //   context.fillText('Jesus Redeems ', 10, 20);
  //   context1.fillText(' Ministries', 30, 45);
  //   context1.font = '20px Arial';
  //   context2.fillText('Volenteer', 40, 70);
  //   context2.font = '20px Arial';
  // }, []);

  const ProfileData=[
    {
        idNumber:'0001',
        firstName: 'Abi',
        Address1: '3/131,South Street,',
        Address2: 'Kadayam - 627415',
        Address3: 'Tenkasi',
        mobile:'8940756587',
        BloodGroup:"B+",
        emNumber:'8765434567',
        image:"../assets/volenteer1.jpg",
        qrcodeVal:"1",
    
   },
   {
    idNumber:'0002',
    firstName: 'Person2',
    Address1: '3/131,South Street,',
    Address2: 'Kadayam - 627415',
    Address3: 'Chennai',
    mobile:'1111111111',
    BloodGroup:"A+",
    emNumber:'8765434567',
    image:"../assets/volenteer2.jpg",
    qrcodeVal:"2",
    
   },
   {
    idNumber:'0003',
    firstName: 'Person3',
    Address1: '3/131,South Street,',
    Address2: 'Kadayam - 627415',
    Address3: 'Trichy',
    mobile:'2222222222',
    BloodGroup:"O+",
    emNumber:'8765434567',
    qrcodeVal:"3",
    image:"../assets/vol5-5.jpg"
   },
];

  return (
    <div className="card">
      <Stack ref={pageRef}>
      {ProfileData.map((profile) =>(
    <div>
    <Card  sx = {{
      maxWidth: 200,
      minHeight:200,
      alignItems:"center",
    backgroundPosition: 'center',
    }}>
<CardContent sx={{
     maxWidth: 200,
     minHeight:250,
     alignItems:"center",
     backgroundImage: "url('../assets/back1.jpg')",
      backgroundSize: 'cover',
  }} >
    
     <Stack        
     direction ="column"         
    alignItems="center"      
          >
            <CardActions>
             {/* <CardMedia
        component="img"
        alt="Image"
        height="10"
        image="../assets/jesus-redeems-logo-b.png" 
        sx={{  objectFit: "contain" }}
      /> */}
         <Avatar  sx={{  width: 50, height: 30 }} alt="img" src="../assets/jesus-redeems-logo-b.png" />   
          
           </CardActions>
           <Typography sx={{
        fontFamily:"sans-serif", fontSize:"13px",fontWeight: 'bold'}} 
         >
          Jesus Redeems Ministries 
        </Typography> 
            </Stack>
           
       
       
      
        <Typography  sx={{ fontFamily:"sans-serif",fontSize:"23px",fontWeight: 'bold'}} variant="h6"  className="heading" >
         VOLENTEER 
        </Typography>
        <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
          >
            {/* <CardMedia
        component="img"
        alt="Image"
        height="80"
        image={profile.image}
        sx={{ paddingBottom:1, objectFit: "contain" }}
      /> */}
            <Avatar  sx={{  width: 100, height: 100 }} alt="img" src={profile.image} />
            </Stack>
            <Typography sx={{fontFamily:"serif" ,fontWeight: 'bold'}} variant="h7" component="div">
          {profile.firstName}
            </Typography>
        <Grid item xs={12} md={12}>
        <Stack  direction={{ xs: 'row', sm: 'row' }} spacing={{ xs: 5, sm: 4, md: 4 }} >
        <QRCode size={40} className='qrcode' value={profile.qrcodeVal}/>
        <Typography sx={{fontFamily:"inherit",fontWeight: 'bold'}} variant="overline">
          ID: {profile.idNumber}
        </Typography>
        </Stack>
        </Grid>
      </CardContent>
      

</Card>
<Card sx = {{
      maxWidth: 200,
      minHeight:250,
      alignItems:"center",
      margin: 2,
     
    backgroundPosition: 'center',
    }}>
<CardContent sx={{
     maxWidth: 200,
     minHeight:250,
     alignItems:"center",
     backgroundImage: "url('../assets/back1.jpg')",
      backgroundSize: 'cover',
  }} >
   
      <Typography sx={{fontFamily: "sans-serif" ,fontSize:"12px"}} variant="h7" >
         Address : {profile.Address1}
        </Typography><br />
        <Typography sx={{fontFamily: "sans-serif",fontSize:"12px" }} variant="h7" >
          {profile.Address2}
        </Typography><br />
        <Typography sx={{fontFamily: "sans-serif",fontSize:"12px" }} variant="h7" >
          {profile.Address3}
        </Typography>
        
        <Typography sx={{fontFamily: "sans-serif",fontSize:"10px"}}  component="div">
         Mobile:  {profile.mobile}
        </Typography>
     
        <Typography sx={{mt:1 ,mb:1,fontFamily: "sans-serif",fontSize:"10px"}}  component="div">
         Blood Group:  {profile.BloodGroup}
        </Typography>
      
       <Divider />

       <Typography sx={{mt:2 ,mb:2, fontFamily: "sans-serif",lineHeight:"1",fontSize:"12px",fontWeight: 'bold'}}  >
        For Emergency:  {profile.emNumber}
        </Typography>
        <Divider />
        {/* <Grid item xs={12} md={12}>
        <Stack  direction={{ xs: 'row', sm: 'row' }} spacing={{ xs: 5, sm: 4, md: 4 }} >
        <Typography variant="h6" component="div"  className="heading">  Jesus Redeems Ministries  
        </Typography> */}
        <br/>
        <br/>
        
        <Typography sx={{fontFamily:"serif",fontSize:"15px",fontWeight:"bold"}}  component="div">
        Jesus Redeems Ministries
        </Typography>
        <Typography sx={{fontFamily:"serif",fontSize:"9px",fontWeight:"bold"}} color="#000080" component="div">
        Nalumavadi - 628 211,  Thoothukudi Dt
        </Typography>
        <Typography sx={{fontFamily:"serif",fontSize:"9px",fontWeight:"bold"}} color="#000080" component="div">
       India, Tel; +91 4639 353333
        </Typography>
        <Divider />
        <Typography sx={{fontFamily:"serif",fontSize:"6px",fontWeight:"bold"}} color="#000080" component="div">
        This card is the property of Jesus Redeems to Whom it must be returned on request if or found
        </Typography>
       
      </CardContent>
      

</Card>

</div>
      ))}
  </Stack>
        
     
    <Button onClick={handleDownload} variant="contained" color="primary">
    Download
  </Button>
  
    </div>
    
  );
};

export default CardWithCanvas;
