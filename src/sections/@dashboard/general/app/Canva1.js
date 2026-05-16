
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';
import { Button, Stack, Card, CardContent,  Typography,  } from '@mui/material';
import exportAsImage from './exportAsImage';

import Avatar from 'src/components/Avatar';
import { toast } from 'react-toastify';

Canva.propTypes = {
  name: PropTypes.string,
};

const ProfileData = [
  {
    idNumber: '0001',
    firstName: 'Abi',
    Address1: '3/131,South Street,',
    Address2: 'Kadayam',
    City: 'Tenkasi',
    district: "Tenkasi",
    state: "Tamil Nadu",
    pincode: "627415",
    mobile: '8940756587',
    BloodGroup: "B+",
    emNumber: '8765434567',
    //image:"../assets/vol_01.jpg",
    image: "http://10.20.1.103:8080/public/uploads/extras/5c162440-efd4-4513-b207-71a16347e7d0.jpg",
    qrcodeVal: "1",

  },
  //  {
  //   idNumber:'0002',
  //   firstName: 'Jeevin ChandraKumar J V',
  //   Address1: '3/131,South Street,',
  //   Address2: 'Kadayam - 627415',
  //   City: 'Chennai',
  //   district:"Chennai",
  //   state:"Tamil Nadu",
  //   pincode:"600015",
  //   mobile:'1111111111',
  //   BloodGroup:"A+",
  //   emNumber:'8765434567',
  //   image:"../assets/vol_02.jpg",
  //   qrcodeVal:"2",

  //  },
  //  {
  //   idNumber:'0003',
  //   firstName: 'Person3',
  //   Address1: '3/131,South Street,',
  //   Address2: 'Kadayam - 627415',
  //   City: 'Trichy',
  //   district:"Trichy",
  //   state:"Tamil Nadu",
  //   pincode:"640015",
  //   mobile:'2222222222',
  //   BloodGroup:"O+",
  //   emNumber:'8765434567',
  //   qrcodeVal:"3",
  //   image:"../assets/vol_01.jpg"
  //  },
];

export default function Canva({ name }) {
  const exportRef = useRef();
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = document.querySelector('canvas');
    canvas.width = 500;
    const img = new Image();
    img.src = '../assets/id_bg4.jpg'
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 500, 'auto');
    };

  }, []);

  /* eslint lines-between-class-members: ["error", "never"] */

  return (
    <>
      <Stack>

        <Button varient='outlined' color='success' size='large'
          onClick={() => {
            exportAsImage(exportRef.current, `${name}`)
            console.log('ref', exportRef.current)
            toast.success('Downloading...')

          }}>
          Certificate for {name}</Button>
        <div className="card" ref={exportRef}>
          {/* <canvas ref={canvasRef} width={1200} height={845} /> */}
          <Stack ref={canvasRef}>
            {ProfileData.map((profile) => (
              <>

                <Card sx={{
                  maxWidth: 200, minHeight: 200, mt: 0,
                  alignItems: "center",
                  backgroundPosition: 'center', backgroundColor: 'transparent',
                  backgroundImage: "url('../assets/id_bg4.jpg')",
                  backgroundSize: 'cover',
                }}>
                  <CardContent
                    sx={{
                      pt: 1,
                      minWidth: 200,
                      maxWidth: 200,
                      minHeight: 300,
                      maxHeight: 300,
                      alignItems: "center",
                    }} >

                    <Stack
                      direction="column"
                      alignItems="center" sx={{ p: 1 }}
                    >
                      <Avatar sx={{ width: 30, height: 30 }} alt="img" style={{ border: '0.0px solid #6b0628' }}
                        src="../assets/jr-logo-512x512.png" />

                      <Typography sx={{
                        textAlign: 'center', color: '#6b0628',
                        fontFamily: "Cardo", fontSize: "12px", fontWeight: 'bold', p: 0.5
                      }}
                      >
                        JESUS REDEEMS
                      </Typography>
                      <Typography sx={{
                        textAlign: 'center', fontFamily: "Oswald", color: '#6b0628',
                        fontSize: "20px", fontWeight: 'bold'
                      }}   >
                        VOLUNTEER
                      </Typography>
                    </Stack>

                    <Stack spacing={2}
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
                      <Avatar sx={{ mt: 0, width: 80, height: 100 }} alt="img" variant='rounded'
                        src={profile.image}
                        style={{
                          border: '0.1px solid #6b0628'
                        }} />
                      <Stack direction={{ xs: 'column', sm: 'column' }} spacing={0.5} >
                        <QRCode size={40} fgColor='#6b0628' value={profile.qrcodeVal} viewBox={`0 0 256 256`} />
                        <Typography sx={{ fontFamily: "Cardo", fontSize: "8px", color: '#6b0628', fontWeight: 'bold' }} variant="overline">
                          ID: {profile.idNumber}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography sx={{
                      mt: 1,
                      textAlign: 'center',
                      fontFamily: "Cardo", textTransform: 'capitalize', color: '#6b0628',
                      fontSize: "20px", fontWeight: 'bold', lineHeight: '1'
                    }}   >
                      {profile.firstName}
                    </Typography>

                  </CardContent>
                </Card>

                <Card sx={{
                  maxWidth: 200, minHeight: 200, mt: 0.5,
                  alignItems: "center",
                  backgroundPosition: 'center'
                }}>
                  <CardContent sx={{
                    pt: 1,
                    minWidth: 200,
                    maxWidth: 200,
                    minHeight: 300,
                    maxHeight: 300,
                    alignItems: "center",
                    backgroundImage: "url('../assets/id_bg2.png')",
                    backgroundSize: 'cover',
                  }} >
                    <Typography sx={{
                      mt: 0,
                      textAlign: 'leftcenter',
                      fontFamily: "Cardo", textTransform: 'capitalize', color: '#6b0628',
                      fontSize: "12px", fontWeight: 'bold'
                    }} variant='title' >
                      Address :
                    </Typography><br />
                    <Typography sx={{
                      mt: 0,
                      textAlign: 'left',
                      fontFamily: "Cardo", textTransform: 'capitalize', color: '#6b0628',
                      fontSize: "10px"
                    }} >
                      {profile.Address1}
                      <br />
                      {profile.Address2}
                      <br />
                      {profile.City}
                      <br />
                      {profile.district}
                      <br />
                      {profile.state} - {profile.pincode}
                    </Typography>

                    <Typography sx={{
                      textAlign: 'left',
                      fontFamily: "Cardo", textTransform: 'capitalize', color: '#4b0628', fontWeight: 'bold',
                      fontSize: "10px"
                    }} >
                      Mobile:  {profile.mobile} / {profile.emNumber}
                    </Typography>


                    <br />
                    <Typography sx={{
                      textAlign: 'center',
                      fontFamily: "Cardo", textTransform: 'capitalize', color: '#4b0628',
                      fontSize: "12px", fontWeight: 'bold'
                    }} component="div">
                      FOR EMERGENCY
                    </Typography>
                    <Typography sx={{
                      textAlign: 'center',
                      fontFamily: "Cardo", textTransform: 'capitalize', color: '#4b0628',
                      fontSize: "12px", fontWeight: 'bold'
                    }} component="div">
                      +91 99422 90000
                    </Typography>
                    <br />
                    <Typography sx={{
                      textAlign: 'left',
                      fontFamily: "Cardo", textTransform: 'capitalize', color: '#000080',
                      fontSize: "12px", fontWeight: 'bold'
                    }} component="div">
                      Jesus Redeems Ministries
                    </Typography>

                    <Typography sx={{ fontFamily: "serif", fontSize: "9px", fontWeight: "bold" }} color="#000080" component="div">
                      Nalumavadi - 628 211,  Thoothukudi Dt
                    </Typography>
                    <Typography sx={{ fontFamily: "serif", fontSize: "9px", fontWeight: "bold" }} color="#000080" component="div">
                      India, Tel; +91 4639 353333
                    </Typography>

                    <Typography sx={{ fontFamily: "serif", fontSize: "6px", fontWeight: "bold" }} color="#000080" component="div">
                      This card is the property of Jesus Redeems to Whom it must be returned on request if or found
                    </Typography>
                  </CardContent>
                </Card>
              </>
            ))}
          </Stack>
          {/* <img
           ref={canvasRef}
          alt="Stackoverflow56203352"
          src={backImg}
         style={{zIndex: -1}}
        /> */}
        </div>


      </Stack>
      <Button varient='outlined' color='success' size='large'
        onClick={() => {
          exportAsImage(exportRef.current, `${name}`)
          console.log('ref', exportRef.current)
          toast.success('Downloading...')

        }}>
        Download Certificate for {name}</Button>
    </>
  );

}

