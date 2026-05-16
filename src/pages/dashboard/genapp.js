
// <Grid
//   container
//   rowSpacing={3}
//   columnSpacing={{ xs: 1, sm: 2, md: 8 }}
//   justifyContent="center"
//   alignItems="center"
// >
//   <br />
//   {status !== 0 && (
//     <>
//       {childInfo.map((data, i) => (
//         <>
//           <Grid item xs="12" md="8" key={i}>
//             <AppWidgetSummary
//               id={data.childId}
//               name={data.fullName}
//               dob={data.dateOfBirth}
//               gender={data.gender}
//             />

//             {isButtonEnabled ? (
//               <Button
//                 varient="contained"
//                 color="warning"
//                 disabled
//                 // disabled={time < 1140 ? true : false}
//                 onClick={() => {
//                   localStorage.setItem("cName", data.fullName);
//                   navigate(PATH_DASHBOARD.general.downloadCert, {
//                     replace: true,
//                   });
//                 }}
//               >
//                 Get Certificate
//               </Button>
//             ) : (
//               <Button
//                 varient="contained"
//                 color="warning"
//                 // disabled
//                 disabled={time < 1140 ? true : false}
//                 onClick={() => {
//                   localStorage.setItem("cName", data.fullName);
//                   navigate(PATH_DASHBOARD.general.downloadCert, {
//                     replace: true,
//                   });
//                 }}
//               >
//                 Get Certificate
//               </Button>
//             )}

//             {/* <Button
//               varient="contained"
//               color="warning"
//               disabled={date === 3 && time < 1140 ? true : false}
//               onClick={() => {
//                 localStorage.setItem("cName", data.fullName);
//                 navigate(PATH_DASHBOARD.general.downloadCert, {
//                   replace: true,
//                 });
//               }}
//             >
//               Get Certificate
//             </Button> */}
//           </Grid>
//         </>
//       ))}
//     </>
//   )}
//   <br />
//   <br />
// </Grid>
