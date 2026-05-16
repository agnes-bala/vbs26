// import React, { useState, useEffect} from 'react';

// import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
// import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
// import {Card,Button,CardContent,Grid, Typography} from '@mui/material';
// import { PATH_DASHBOARD } from 'src/routes/paths';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { updateScore } from '../../../../services/JRMFeedService';


//  export default function JigsawGame(){
//   const navigate = useNavigate();
//   const [seconds, setSeconds] = useState(0);
//   const pId = localStorage.getItem("partnerId");
//     const cId = localStorage.getItem("childId");
//     const token = localStorage.getItem("jwt");
//     const gameName = localStorage.getItem('path');
//   const [score, setScore] = useState(0);
//   const [isActive, setIsActive] = useState(false);
//   const [show_btn, set_btn] = useState(true);
//   // const [text, setText] = useState("");
//   const date = localStorage.getItem('qdate') * 1;
//   const image = `/assets/${date}.jpg`;
//   const category = localStorage.getItem('category');

//   let score_val=null;
//   useEffect(() => {
    
//     let interval = null;
//     if (isActive) {
//       interval = setInterval(() => {
//         setSeconds(seconds => seconds + 1);
//       }, 1000);
//     } else if (!isActive && seconds !== 0) {
//       calcScore();
//       setScore(score_val);
//      // console.log("You completed in "+seconds+" seconds."+"Your score is "+score);
//       clearInterval(interval);
//     }
    
//     return () => {clearInterval(interval)};
//   }, [isActive, seconds, score]);


//   const set = async() => {
//    // alert("You completed in "+seconds+" seconds."+"Your score is "+score);
//   calcScore();
//       setScore(score_val);
//     setIsActive(!isActive);
//     const result = await updateScore(pId, cId, date, score_val,token,gameName);
//     console.log("puzzle submit", result);
//     if ( !result ) {
//       toast.error ("Error: Unable to communicate");
//       console.log("Error: Unable to communicate")
//       return;
//   }
//   if (!result.ok) {
//     console.log("respose code", result.status)
//     if ( result.status === 401) {
//         toast.error ("error",result);
//         console.log("error", result);
//     } 
//     return;
// }  
// console.log(`You completed in ${seconds} seconds and score is ${score_val}`);
// toast.success ("Congradulations!!!");
//    // setText(`Congratulations!!You completed in ${seconds} seconds.Your score is ${score}`);  
//     alert(`You completed in ${seconds} seconds and score is ${score_val}`);
   
//     navigate(PATH_DASHBOARD.general.myapp);
//   };

//   const calcScore = async() => {
    
//     if (seconds<=30){
//       score_val = 10;
//       setScore(10);
//       console.log(seconds);
//       console.log("score val",score);
//     // return score;
//     } 
//     else 
//       if (seconds>30 && seconds<=60){
//         score_val = 8;
//         setScore(8);
//         console.log(seconds);
//       console.log("score val",score);
//      // return score;
//       }
    
//     else 
//       if (seconds>60 && seconds<=90){
//         score_val = 6;
//         setScore(6);
//         console.log(seconds);
//         console.log("score val",score);
//     //  return score;
//       }
//       else 
//       if (seconds>90 && seconds<=120){
//         score_val = 4;
//         setScore(4);
//         console.log(seconds);
//       console.log("score val",score);
//     //  return score;
//       }
//       else 
//       if (seconds>120 && seconds<=150){
//         score_val = 2;
//         setScore(2);
//         console.log(seconds);
//       console.log("score val",score);
//       }
//       else {
//         score_val = 1;
//         setScore(1);
//         console.log(seconds);
//       console.log("score val",score);
//     //  return score;
//       }
//     //  alert(`You completed in ${seconds} seconds.`);
//   };

//   function toggle() {
//     setIsActive(!isActive);
//     set_btn(false);
//     console.log("show puzzle",isActive)
//   };


//   return (
//     <>
//     <Grid item xs={12} sm={12} md={12} align="center" >
//     <br/><br/>
//     <Card style={{background: "transparent"}}>
   
//     { isActive===true &&
//        <>
//               <img alt='puzzle' width="180" height="100" src= {image} />
//             <Typography color='white'>Preview Image</Typography>
//             <br />
//             <JigsawPuzzle
//             imageSrc={image}
//             rows={ category === 'senior' ? 4 : category === 'junior' ? 3 : 3}
//             columns={category === 'senior' ? 3 : category === 'junior' ? 3 : 2}
//             onSolved={set}
//             />
//            <br/><br/>
//            <Typography color='white'>{seconds}s</Typography>
//             <br/>
 
//         </>
//         }
         
//          {show_btn &&
//       <CardContent  className='container'>

//             <Button variant="outlined" size='large'
//             onClick={toggle} >Click to Unpuzzle the pieces</Button>
       
       
//         </CardContent>
//  }

//     </Card>
    
//     </Grid>
//     </>

    
//   );
// }

