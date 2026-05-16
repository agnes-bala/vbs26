// import * as Yup from 'yup';
// import { useState, useContext,useEffect } from 'react';
// import * as React from 'react';

// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { useFormik, Form, FormikProvider } from 'formik';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// // material
// import { Stack, Checkbox, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// // routes

// import { PATH_AFTER_LOGIN } from '../../../config';
// import Iconify from '../../../components/Iconify';
// import { AppAuthContext } from '../../../auth/AppAuthContext';
// import { storeAuthInfo } from '../../../auth/AppAuthStorage';
// import { loginPartner } from '../../../services/JRMPartnerAuthService';
// import MuiTextField from "src/components/formfield/TextField";
// // ----------------------------------------------------------------------

// export default function LoginForm() {
//   const navigate = useNavigate();
//   const [isInd, setInd]= useState('IN');
//   const authContext = useContext(AppAuthContext);
//   const[value, setValue] = useState('');

//   const saveAuthInfo = async (authInfo) => {
//     //console.log('Storing Auth Info ', authInfo);
//     storeAuthInfo(authInfo);
//   };
//   useEffect(() => {
//     async function fetchData(){
//       const response = await axios.get('https://api.country.is')
//       //console.log("response",response);
//       setInd(response.data.country);
//       let mode = JSON.parse(localStorage.getItem('authInfo'));
//      // console.log('mode',mode);
//       setValue(mode.authName);
//       formik.setFieldValue('authName', mode.authName);
//       localStorage.setItem('mobileNumber', mode.mobileNumber);
//       formik.setFieldValue('mobileNumber', mode.mobileNumber);
//       localStorage.setItem('emailAddress', mode.emailAddress);
//       formik.setFieldValue('emailAddress', mode.emailAddress);
//     }
//   fetchData();
//   },[value]);
//   //console.log('value',value);
//   const storedLocation=localStorage.getItem('storedLocation');

//   const [showPassword, setShowPassword] = useState(false);
//   const LoginSchema = Yup.object().shape({
//     emailAddress: Yup.string(),
//       mobileNumber: Yup.string(),
//         authName: Yup.string().required('Please Enter Email/Mobile'),
//         password: Yup.string()
//       .required('Password is required')
//       .min(6, 'min length should be 6'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       isIndia : isInd,
//       authName: value ||'',
//       emailAddress: value ||'',
//       mobileNumber: value ||'',
//       password: '',
//       remember: true,
//     },
//     validationSchema: LoginSchema,
//     onSubmit: async (values, { resetForm }) => {
  
//       const result = await loginPartner(values);
//       //console.log(result);
//       //  If there is no result then it is an error
//       if (!result) {
//         toast.error('Error: Unable to communicate');
//         console.log('Error: Unable to communicate');
//         return;
//       }
//       if (!result.ok) {
//         console.log('Login FAILED status=', result.status);
//         if (result.status === 401) {
//           toast.error('Invalid Credentials');
//           console.log('Login FAILED status=', result.status);
//         } else {
//           toast.error('Could not able to login ');
//           console.log('Login FAILED status=', result.status);
//         }
//         return;
//       }
//       console.log('Login successful', result);
   
//       const { emailAddress } = result.data;

//       // Check if the user's email matches the admin email
//       if (emailAddress === 'asmitha287@gmail.com' || emailAddress === 'jeevinck@jesusredeems.org') {
//         // Set the admin role in local storage
//         localStorage.setItem('role', 'admin');
//       } else {
//         // Set the user role (assuming non-admin users)
//         localStorage.setItem('role', 'user');
//       }
//       toast.success('Login successful!');
//       //  Store the info received in Login in LocalStorage
//       authContext.setUser(result.data);
//       saveAuthInfo(result.data);
//       let configure = {'Authorization': `Bearer ${result.data.jwt}`} ;
//       let resp = await axios.get(`${result.data.profileUrl}/contactinfo`,{headers : configure} )
//       let resp1 = await axios.get(`${result.data.profileUrl}/childreninfo`,{headers : configure} )
//       let resp2 = await axios.get(`${result.data.profileUrl}/familymemberinfo`,{headers : configure} )
//       //console.log("login resp",resp);
//       if(resp.data.fullName == null || resp.data.fullName == '' || resp.data.fullName == undefined)
//       {
//         localStorage.setItem('profileStatus', 0);
//       }
//       else{
//         localStorage.setItem('profileStatus', 1);
//       }
//       let members ={"main":resp.data,"spouse":resp.data, "family":resp2.data, "kids":resp1.data}
//       localStorage.setItem('members',JSON.stringify(members));
//       // resetForm();
//       if (storedLocation) {
//         navigate(storedLocation??PATH_AFTER_LOGIN, { replace: true });
//         return;
//       }
//       navigate(PATH_AFTER_LOGIN, { replace: true });
//     },
//   });

//   const { values, isSubmitting, handleSubmit, getFieldProps } = formik;

//   const handleShowPassword = () => {
//     setShowPassword((show) => !show);
//   };
  
//   // useEffect(() => {
//   //   const storedLocation = localStorage.getItem('storedLocation');
//   //   {
//   //     console.log('Stored location:', storedLocation);
//   //   }

//   //   if (storedLocation) {
//   //     navigate(storedLocation);
//   //   }
//   // }, [navigate]);

//   return (
//     <FormikProvider value={formik}>
//       <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//         <Stack spacing={3}>
         
//         <MuiTextField name='authName' label='Email/Mobile'  
//         onChange={(e,v)=> {const val = e.target.value || ""; 
        
//           formik.setFieldValue('authName',val);
//           //console.log(val);
         
//           //console.log("typeof", !isNaN(+val));
//           if(!isNaN(+val))  {
//             formik.setFieldValue('mobileNumber',val); 
//             formik.setFieldValue('emailAddress',"")}
//             else{
//               formik.setFieldValue('emailAddress',val);
//               formik.setFieldValue('mobileNumber',"")
//             } 
//         }}
//         value={formik.values.authName }/>
    
//             <MuiTextField name='emailAddress' label='Email' type='email' hidden  
//         onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('emailAddress',val)}}
//         value={formik.values.emailAddress }/>
    
//         <MuiTextField name='mobileNumber' label='Mobile' type='number' hidden  
        
//         onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('mobileNumber',val)}}
//         value={formik.values.mobileNumber }/>
    

//           <MuiTextField name='password' autoComplete="current-password" type={showPassword ? 'text' : 'password'}  
//             label="Password"
//             onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('password',val)}}
//           value={formik.values.password}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleShowPassword} edge="end">
//                     <Iconify
//                       icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
//                     />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
           
//           />
//         </Stack>

//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           sx={{ my: 2 }}
//         >
//           <FormControlLabel
//             control={
//               <Checkbox
//                 {...getFieldProps('remember')}
//                 checked={values.remember}
//               />
//             }
//             label="Remember me"
//           />
//           {/* <div>
//             <Link
//               variant="subtitle2"
//               component={RouterLink}
//               to={PATH_AUTH.eForgotPassword}
//               sx={{ mt: 1 }}
//             >
//               Login with OTP
//             </Link>
//           </div> */}
//         </Stack>

//         <LoadingButton
//           fullWidth
//           size="large"
//           type="submit"
//           variant="contained"
//           loading={isSubmitting}
//         >
//           Login
//         </LoadingButton>
//       </Form>
//     </FormikProvider>
//   );
// }
// import * as Yup from "yup";
// import { useState, useContext, useEffect } from "react";
// import * as React from "react";

// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useFormik, Form, FormikProvider } from "formik";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// // material
// import {
//   Stack,
//   Checkbox,
//   IconButton,
//   InputAdornment,
//   FormControlLabel,
//   Button,
//   Box,
//   Typography,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// // routes

// import { PATH_AFTER_LOGIN } from "../../../config";
// import Iconify from "../../../components/Iconify";
// import { AppAuthContext } from "../../../auth/AppAuthContext";
// import { storeAuthInfo } from "../../../auth/AppAuthStorage";
// import { loginPartner } from "../../../services/JRMPartnerAuthService";
// import MuiTextField from "src/components/formfield/TextField";

// // ----------------------------------------------------------------------

// export default function LoginForm() {
//   const navigate = useNavigate();
//   const [isInd, setInd] = useState("IN");
//   const authContext = useContext(AppAuthContext);
//   const [value, setValue] = useState("");

//   const saveAuthInfo = async (authInfo) => {
//     //console.log('Storing Auth Info ', authInfo);
//     storeAuthInfo(authInfo);
//   };
//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.get("https://api.country.is");
//       //console.log("response",response);
//       setInd(response.data.country);
//       let mode = JSON.parse(localStorage.getItem("authInfo"));
//       // console.log('mode',mode);
//       setValue(mode.authName);
//       formik.setFieldValue("authName", mode.authName);
//       localStorage.setItem("mobileNumber", mode.mobileNumber);
//       formik.setFieldValue("mobileNumber", mode.mobileNumber);
//       localStorage.setItem("emailAddress", mode.emailAddress);
//       formik.setFieldValue("emailAddress", mode.emailAddress);
//     }
//     fetchData();
//   }, [value]);
//   //console.log('value',value);
//   const storedLocation = localStorage.getItem("storedLocation");

//   const [showPassword, setShowPassword] = useState(false);
//   const LoginSchema = Yup.object().shape({
//     emailAddress: Yup.string(),
//     mobileNumber: Yup.string(),
//     authName: Yup.string().required("Please Enter Email/Mobile"),
//     password: Yup.string()
//       .required("Password is required")
//       .min(6, "min length should be 6"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       isIndia: isInd,
//       authName: value || "",
//       emailAddress: value || "",
//       mobileNumber: value || "",
//       password: "",
//       remember: true,
//     },
//     validationSchema: LoginSchema,
//     onSubmit: async (values, { resetForm }) => {
//       const result = await loginPartner(values);
//       //console.log(result);
//       //  If there is no result then it is an error
//       if (!result) {
//         toast.error("Error: Unable to communicate");
//         console.log("Error: Unable to communicate");
//         return;
//       }
//       if (!result.ok) {
//         console.log("Login FAILED status=", result.status);
//         if (result.status === 401) {
//           toast.error("Invalid Credentials");
//           console.log("Login FAILED status=", result.status);
//         } else {
//           toast.error("Could not able to login ");
//           console.log("Login FAILED status=", result.status);
//         }
//         return;
//       }
//       console.log("Login successful", result);

//       const { emailAddress } = result.data;

//       // Check if the user's email matches the admin email
//       if (
//         emailAddress === "asmitha287@gmail.com" ||
//         emailAddress === "jeevinck@jesusredeems.org"
//       ) {
//         // Set the admin role in local storage
//         localStorage.setItem("role", "admin");
//       } else {
//         // Set the user role (assuming non-admin users)
//         localStorage.setItem("role", "user");
//       }
//       toast.success("Login successful!");
//       //  Store the info received in Login in LocalStorage
//       authContext.setUser(result.data);
//       saveAuthInfo(result.data);
//       let configure = { Authorization: `Bearer ${result.data.jwt}` };
//       let resp = await axios.get(`${result.data.profileUrl}/contactinfo`, {
//         headers: configure,
//       });
//       let resp1 = await axios.get(`${result.data.profileUrl}/childreninfo`, {
//         headers: configure,
//       });
//       let resp2 = await axios.get(
//         `${result.data.profileUrl}/familymemberinfo`,
//         { headers: configure }
//       );
//       //console.log("login resp",resp);
//       if (
//         resp.data.fullName === null ||
//         resp.data.fullName === "" ||
//         resp.data.fullName === undefined
//       ) {
//         localStorage.setItem("profileStatus", 0);
//       } else {
//         localStorage.setItem("profileStatus", 1);
//       }
//       let members = {
//         main: resp.data,
//         spouse: resp.data,
//         family: resp2.data,
//         kids: resp1.data,
//       };
//       localStorage.setItem("members", JSON.stringify(members));
//       // resetForm();
//       if (storedLocation) {
//         navigate(storedLocation ?? PATH_AFTER_LOGIN, { replace: true });
//         return;
//       }
//       navigate(PATH_AFTER_LOGIN, { replace: true });
//     },
//   });

//   const { values, isSubmitting, handleSubmit, getFieldProps } = formik;

//   const handleShowPassword = () => {
//     setShowPassword((show) => !show);
//   };

//   // useEffect(() => {
//   //   const storedLocation = localStorage.getItem('storedLocation');
//   //   {
//   //     console.log('Stored location:', storedLocation);
//   //   }

//   //   if (storedLocation) {
//   //     navigate(storedLocation);
//   //   }
//   // }, [navigate]);

//   return (
//     <FormikProvider value={formik}>
//       <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//         <Stack spacing={3}>
//           <MuiTextField
//             name="authName"
//             label="Email/Mobile"
//             onChange={(e, v) => {
//               const val = e.target.value || "";

//               formik.setFieldValue("authName", val);
//               //console.log(val);

//               //console.log("typeof", !isNaN(+val));
//               if (!isNaN(+val)) {
//                 formik.setFieldValue("mobileNumber", val);
//                 formik.setFieldValue("emailAddress", "");
//               } else {
//                 formik.setFieldValue("emailAddress", val);
//                 formik.setFieldValue("mobileNumber", "");
//               }
//             }}
//             value={formik.values.authName}
//           />

//           <MuiTextField
//             name="emailAddress"
//             label="Email"
//             type="email"
//             hidden
//             onChange={(e, v) => {
//               const val = e.target.value || "";
//               formik.setFieldValue("emailAddress", val);
//             }}
//             value={formik.values.emailAddress}
//           />

//           <MuiTextField
//             name="mobileNumber"
//             label="Mobile"
//             type="number"
//             hidden
//             onChange={(e, v) => {
//               const val = e.target.value || "";
//               formik.setFieldValue("mobileNumber", val);
//             }}
//             value={formik.values.mobileNumber}
//           />

//           <MuiTextField
//             name="password"
//             autoComplete="current-password"
//             type={showPassword ? "text" : "password"}
//             label="Password"
//             onChange={(e, v) => {
//               const val = e.target.value || "";
//               formik.setFieldValue("password", val);
//             }}
//             value={formik.values.password}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleShowPassword} edge="end">
//                     <Iconify
//                       icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
//                     />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Stack>

//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           sx={{ my: 2 }}
//         >
//           <FormControlLabel
//             control={
//               <Checkbox
//                 {...getFieldProps("remember")}
//                 checked={values.remember}
//               />
//             }
//             label="Remember me"
//           />
//           {/* <div>
//             <Link
//               variant="subtitle2"
//               component={RouterLink}
//               to={PATH_AUTH.eForgotPassword}
//               sx={{ mt: 1 }}
//             >
//               Login with OTP
//             </Link>
//           </div> */}
//         </Stack>

//         <LoadingButton
//           fullWidth
//           size="large"
//           type="submit"
//           variant="contained"
//           loading={isSubmitting}
//         >
//           Login
//         </LoadingButton>
//       </Form>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           flexDirection: "column",
//           alignItems: "center",
//           mt: 2,
//         }}
//       >
//         <Typography>Forget Password</Typography>
//         <Button variant="contained" onClick={() => navigate("/auth/OTP")}>
//           Login With OTP
//         </Button>
//       </Box>
//     </FormikProvider>
//   );
// }
// import * as Yup from "yup";
// import { useState, useContext, useEffect } from "react";
// import * as React from "react";

// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useFormik, Form, FormikProvider } from "formik";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// // material
// import {
//   Stack,
//   Checkbox,
//   IconButton,
//   InputAdornment,
//   FormControlLabel,
//   Button,
//   Box,
//   Typography,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// // routes

// import { PATH_AFTER_LOGIN } from "../../../config";
// import Iconify from "../../../components/Iconify";
// import { AppAuthContext } from "../../../auth/AppAuthContext";
// import { storeAuthInfo } from "../../../auth/AppAuthStorage";
// import { loginPartner } from "../../../services/JRMPartnerAuthService";
// import MuiTextField from "src/components/formfield/TextField";

// // ----------------------------------------------------------------------

// export default function LoginForm() {
//   const navigate = useNavigate();
//   const [isInd, setInd] = useState("IN");
//   const authContext = useContext(AppAuthContext);
//   const [value, setValue] = useState("");

//   const saveAuthInfo = async (authInfo) => {
//     //console.log('Storing Auth Info ', authInfo);
//     storeAuthInfo(authInfo);
//   };
//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.get("https://api.country.is");
//       //console.log("response",response);
//       setInd(response.data.country);
//       let mode = JSON.parse(localStorage.getItem("authInfo"));
//       // console.log('mode',mode);
//       setValue(mode.authName);
//       formik.setFieldValue("authName", mode.authName);
//       localStorage.setItem("mobileNumber", mode.mobileNumber);
//       formik.setFieldValue("mobileNumber", mode.mobileNumber);
//       localStorage.setItem("emailAddress", mode.emailAddress);
//       formik.setFieldValue("emailAddress", mode.emailAddress);
//     }
//     fetchData();
//   }, [value]);
//   //console.log('value',value);
//   const storedLocation = localStorage.getItem("storedLocation");

//   const [showPassword, setShowPassword] = useState(false);
//   const LoginSchema = Yup.object().shape({
//     emailAddress: Yup.string(),
//     mobileNumber: Yup.string(),
//     authName: Yup.string().required("Please Enter Email/Mobile"),
//     password: Yup.string()
//       .required("Password is required")
//       .min(6, "min length should be 6"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       isIndia: isInd,
//       authName: value || "",
//       emailAddress: value || "",
//       mobileNumber: value || "",
//       password: "",
//       remember: true,
//     },
//     validationSchema: LoginSchema,
//     onSubmit: async (values, { resetForm }) => {
//       const result = await loginPartner(values);
//       //console.log(result);
//       //  If there is no result then it is an error
//       if (!result) {
//         toast.error("Error: Unable to communicate");
//         console.log("Error: Unable to communicate");
//         return;
//       }
//       if (!result.ok) {
//         console.log("Login FAILED status=", result.status);
//         if (result.status === 401) {
//           toast.error("Invalid Credentials");
//           console.log("Login FAILED status=", result.status);
//         } else {
//           toast.error("Could not able to login ");
//           console.log("Login FAILED status=", result.status);
//         }
//         return;
//       }
//       console.log("Login successful", result);

//       const { emailAddress } = result.data;

//       // Check if the user's email matches the admin email
//       if (
//         emailAddress === "asmitha287@gmail.com" ||
//         emailAddress === "jeevinck@jesusredeems.org"
//       ) {
//         // Set the admin role in local storage
//         localStorage.setItem("role", "admin");
//       } else {
//         // Set the user role (assuming non-admin users)
//         localStorage.setItem("role", "user");
//       }
//       toast.success("Login successful!");
//       //  Store the info received in Login in LocalStorage
//       authContext.setUser(result.data);
//       saveAuthInfo(result.data);
//       let configure = { Authorization: `Bearer ${result.data.jwt}` };
//       let resp = await axios.get(`${result.data.profileUrl}/contactinfo`, {
//         headers: configure,
//       });
//       let resp1 = await axios.get(`${result.data.profileUrl}/childreninfo`, {
//         headers: configure,
//       });
//       let resp2 = await axios.get(
//         `${result.data.profileUrl}/familymemberinfo`,
//         { headers: configure }
//       );
//       //console.log("login resp",resp);
//       if (
//         resp.data.fullName === null ||
//         resp.data.fullName === "" ||
//         resp.data.fullName === undefined
//       ) {
//         localStorage.setItem("profileStatus", 0);
//       } else {
//         localStorage.setItem("profileStatus", 1);
//       }
//       let members = {
//         main: resp.data,
//         spouse: resp.data,
//         family: resp2.data,
//         kids: resp1.data,
//       };
//       localStorage.setItem("members", JSON.stringify(members));
//       // resetForm();
//       if (storedLocation) {
//         navigate(storedLocation ?? PATH_AFTER_LOGIN, { replace: true });
//         return;
//       }
//       navigate(PATH_AFTER_LOGIN, { replace: true });
//     },
//   });

//   const { values, isSubmitting, handleSubmit, getFieldProps } = formik;

//   const handleShowPassword = () => {
//     setShowPassword((show) => !show);
//   };

//   // useEffect(() => {
//   //   const storedLocation = localStorage.getItem('storedLocation');
//   //   {
//   //     console.log('Stored location:', storedLocation);
//   //   }

//   //   if (storedLocation) {
//   //     navigate(storedLocation);
//   //   }
//   // }, [navigate]);

//   return (
//     <FormikProvider value={formik}>
//       <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//         <Stack spacing={3}>
//           <MuiTextField
//             name="authName"
//             label="Email/Mobile"
//             onChange={(e, v) => {
//               const val = e.target.value || "";

//               formik.setFieldValue("authName", val);
//               //console.log(val);

//               //console.log("typeof", !isNaN(+val));
//               if (!isNaN(+val)) {
//                 formik.setFieldValue("mobileNumber", val);
//                 formik.setFieldValue("emailAddress", "");
//               } else {
//                 formik.setFieldValue("emailAddress", val);
//                 formik.setFieldValue("mobileNumber", "");
//               }
//             }}
//             value={formik.values.authName}
//           />

//           <MuiTextField
//             name="emailAddress"
//             label="Email"
//             type="email"
//             hidden
//             onChange={(e, v) => {
//               const val = e.target.value || "";
//               formik.setFieldValue("emailAddress", val);
//             }}
//             value={formik.values.emailAddress}
//           />

//           <MuiTextField
//             name="mobileNumber"
//             label="Mobile"
//             type="number"
//             hidden
//             onChange={(e, v) => {
//               const val = e.target.value || "";
//               formik.setFieldValue("mobileNumber", val);
//             }}
//             value={formik.values.mobileNumber}
//           />

//           <MuiTextField
//             name="password"
//             autoComplete="current-password"
//             type={showPassword ? "text" : "password"}
//             label="Password"
//             onChange={(e, v) => {
//               const val = e.target.value || "";
//               formik.setFieldValue("password", val);
//             }}
//             value={formik.values.password}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleShowPassword} edge="end">
//                     <Iconify
//                       icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
//                     />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Stack>

//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           sx={{ my: 2 }}
//         >
//           <FormControlLabel
//             control={
//               <Checkbox
//                 {...getFieldProps("remember")}
//                 checked={values.remember}
//               />
//             }
//             label="Remember me"
//           />
//           {/* <div>
//             <Link
//               variant="subtitle2"
//               component={RouterLink}
//               to={PATH_AUTH.eForgotPassword}
//               sx={{ mt: 1 }}
//             >
//               Login with OTP
//             </Link>
//           </div> */}
//         </Stack>

//         <LoadingButton
//           fullWidth
//           size="large"
//           type="submit"
//           variant="contained"
//           loading={isSubmitting}
//         >
//           Login
//         </LoadingButton>
//       </Form>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           flexDirection: "column",
//           alignItems: "center",
//           mt: 2,
//         }}
//       >
//         <Typography>Forget Password</Typography>
//         <Button variant="contained" onClick={() => navigate("/auth/OTP")}>
//           Login With OTP
//         </Button>
//       </Box>
//     </FormikProvider>
//   );
// }
// LoginForm.js
import * as Yup from "yup";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// material
import {
  Stack,
  Checkbox,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Box,
  // Typography,
  Alert,
  LinearProgress,
  Link
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// routes
import { PATH_AFTER_LOGIN } from "../../../config";
import Iconify from "../../../components/Iconify";
import { AppAuthContext } from "../../../auth/AppAuthContext";
import MuiTextField from "src/components/formfield/TextField";
import {
  loginWithPassword,
  loginWithOTP,
  sendOTP,
  registerPartner,
  isPhone,
  isEmail,
  normalizePhone
} from "../../../services/JRMPartnerAuthService";
import { AddNotification } from "../../../auth/Notifications";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const authContext = useContext(AppAuthContext);

  // State for multi-step login
  const [step, setStep] = useState('identifier'); // identifier, password, otp, otp-login
  const [identifier, setIdentifier] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPrefix, setShowPrefix] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP resend state
  const RESEND_OTP_LIMIT = 3;
  const RESEND_SEC = 60;
  const [resendCount, setResendCount] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);

  // Country detection
  const [isInd, setInd] = useState("IN");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://api.country.is");
        setInd(response.data.country);

        // Load saved identifier
        const saved = sessionStorage.getItem('identifier') || '';
        if (saved) {
          setIdentifier(saved);
          setShowPrefix(isPhone(saved));
        }
      } catch (error) {
        console.error("Country detection failed", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const startResendCooldown = () => {
    setResendTimer(RESEND_SEC);
  };

  // Form validation schemas
  const IdentifierSchema = Yup.object().shape({
    authName: Yup.string()
      .required("Email/Mobile is required")
      .test('valid-identifier', 'Please enter a valid email or mobile number',
        value => isEmail(value) || isPhone(value))
  });

  const PasswordSchema = Yup.object().shape({
    authName: Yup.string().required("Email/Mobile is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
  });

  const OTPSchema = Yup.object().shape({
    authName: Yup.string().required("Email/Mobile is required"),
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be 6 digits")
  });

  // Formik instance
  const formik = useFormik({
    initialValues: {
      authName: identifier || "",
      emailAddress: "",
      mobileNumber: "",
      password: "",
      otp: "",
      remember: true,
      isIndia: isInd
    },
    validationSchema: step === 'identifier' ? IdentifierSchema :
      step === 'password' ? PasswordSchema :
        OTPSchema,
    onSubmit: async (values) => {
      if (step === 'identifier') {
        await handleIdentifierSubmit(values);
      } else if (step === 'password') {
        await handlePasswordSubmit(values);
      } else if (step === 'otp' || step === 'otp-login') {
        await handleOTPSubmit(values);
      }
    }
  });

  // Step 1: Identifier submission
  const handleIdentifierSubmit = async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const id = values.authName.trim();
    setIdentifier(id);
    sessionStorage.setItem('identifier', id);

    const phone = isPhone(id) ? normalizePhone(id) : '';
    const email = isEmail(id) ? id.toLowerCase() : '';

    try {
      // Try to register first (this will tell us if user exists)
      const response = await registerPartner({
        emailAddress: email,
        mobileNumber: phone
      });

      if (response?.ok && response?.data) {
        // User exists with password - go to password login
        setStep('password');
        AddNotification(
          'Welcome to Self Care Portal',
          '/dashboard/user',
          'Update your profile',
          true
        );
      } else {
        // User doesn't exist or requires OTP
        const otpResponse = await sendOTP({
          emailAddress: email,
          mobileNumber: phone,
          country: ''
        });

        if (otpResponse?.ok) {
          toast.success('OTP sent successfully!');
          setStep('otp-login');
          startResendCooldown();
          setResendCount(0);
          AddNotification(
            'Welcome to Self Care Portal',
            '/dashboard/user?tab=password',
            'Update your password',
            true
          );
        } else {
          setErrorMessage(otpResponse?.data?.message || 'Failed to send OTP');
        }
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2a: Password login
  const handlePasswordSubmit = async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const params = {};
    if (identifier.includes('@')) {
      params.emailAddress = identifier.toLowerCase();
    } else {
      params.mobileNumber = normalizePhone(identifier);
    }

    try {
      const result = await loginWithPassword({
        ...params,
        password: values.password
      });

      if (result?.ok) {
        toast.success('Login successful!');
        authContext.setUser(result.data);

        // Load additional profile data
        await loadProfileData(result.data);

        const storedLocation = sessionStorage.getItem('storedLocation');
        navigate(storedLocation || PATH_AFTER_LOGIN, { replace: true });
      } else if (result?.status === 401) {
        setErrorMessage('Invalid credentials');
      } else if (result?.status === 404) {
        setErrorMessage('User does not exist');
      } else {
        setErrorMessage(result?.data?.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2b: OTP login
  const handleOTPSubmit = async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const params = {};
    if (identifier.includes('@')) {
      params.emailAddress = identifier.toLowerCase();
    } else {
      params.mobileNumber = normalizePhone(identifier);
    }

    try {
      const result = await loginWithOTP({
        ...params,
        otp: values.otp
      });

      if (result?.ok) {
        toast.success('Login successful!');
        authContext.setUser(result.data);

        // Load additional profile data
        await loadProfileData(result.data);

        const storedLocation = sessionStorage.getItem('storedLocation');
        navigate(storedLocation || PATH_AFTER_LOGIN, { replace: true });
      } else {
        setErrorMessage(result?.data?.message || 'Invalid OTP');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load profile data after login
  const loadProfileData = async (authInfo) => {
    try {
      const config = { Authorization: `Bearer ${authInfo.jwt}` };

      const [contactRes, childrenRes, familyRes] = await Promise.all([
        axios.get(`${authInfo.profileUrl}/contactinfo`, { headers: config }),
        axios.get(`${authInfo.profileUrl}/childreninfo`, { headers: config }),
        axios.get(`${authInfo.profileUrl}/familymemberinfo`, { headers: config })
      ]);

      const profileCompleted = contactRes.data.fullName ? 1 : 0;
      localStorage.setItem("profileStatus", profileCompleted);

      const members = {
        main: contactRes.data,
        family: familyRes.data,
        kids: childrenRes.data,
      };
      localStorage.setItem("members", JSON.stringify(members));
      localStorage.setItem("cachedProfile", JSON.stringify(contactRes.data));
    } catch (error) {
      console.error("Failed to load profile data", error);
    }
  };

  // Handle OTP resend
  const handleResendOTP = async () => {
    if (resendCount >= RESEND_OTP_LIMIT) {
      toast.error('Maximum resend attempts reached');
      return;
    }

    const phone = isPhone(identifier) ? normalizePhone(identifier) : '';
    const email = isEmail(identifier) ? identifier.toLowerCase() : '';

    try {
      const response = await sendOTP({
        emailAddress: email,
        mobileNumber: phone,
        country: ''
      });

      if (response?.ok) {
        toast.success('OTP resent successfully!');
        setResendCount(prev => prev + 1);
        startResendCooldown();
        formik.setFieldValue('otp', '');
      } else {
        setErrorMessage(response?.data?.message || 'Failed to resend OTP');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  // Switch between password and OTP methods
  const switchToOTP = () => {
    handleResendOTP();
    setStep('otp-login');
  };

  const switchToPassword = () => {
    setStep('password');
  };

  return (
    <>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}

      {isSubmitting && <LinearProgress sx={{ mb: 2 }} />}

      <form onSubmit={formik.handleSubmit} noValidate>
        <Stack spacing={3}>
          {/* Always show identifier field */}
          {/* <MuiTextField
            name="authName"
            label="Email/Mobile"
            value={formik.values.authName}
            onChange={(e) => {
              const value = e.target.value;
              formik.setFieldValue("authName", value);
              setShowPrefix(isPhone(value));

              // Update hidden fields
              if (!isNaN(+value)) {
                formik.setFieldValue("mobileNumber", value);
                formik.setFieldValue("emailAddress", "");
              } else {
                formik.setFieldValue("emailAddress", value);
                formik.setFieldValue("mobileNumber", "");
              }
            }}
            error={formik.touched.authName && formik.errors.authName}
            helperText={formik.touched.authName && formik.errors.authName}
            InputProps={{
              startAdornment: showPrefix ? (
                <InputAdornment position="start" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  +91
                </InputAdornment>
              ) : null,
            }}
          /> */}

          {/* Identifier field */}
          <MuiTextField
            name="authName"
            label={isInd === 'IN' ? "Mobile/Email" : "Email"}
            value={formik.values.authName}
            disabled={step !== 'identifier'}
            onChange={(e) => {
              const value = e.target.value;
              formik.setFieldValue("authName", value);
              setShowPrefix(isPhone(value));
              // ... rest of your onChange logic
            }}
            error={formik.touched.authName && Boolean(formik.errors.authName)}
            helperText={formik.touched.authName && formik.errors.authName}
            InputProps={{
              startAdornment: showPrefix ? (
                <InputAdornment position="start" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  +91
                </InputAdornment>
              ) : null,
            }}
          />

          {/* Hidden fields */}
          <MuiTextField
            name="emailAddress"
            label="Email"
            type="email"
            hidden
            value={formik.values.emailAddress}
          />
          <MuiTextField
            name="mobileNumber"
            label="Mobile"
            type="number"
            hidden
            value={formik.values.mobileNumber}
          />

          {/* Password field (only in password step) */}
          {step === 'password' && (
            <>
              <Box sx={{ textAlign: 'right' }}>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={switchToOTP}
                  sx={{ mt: 1 }}
                >
                  Login with OTP
                </Link>
              </Box>
              {/* Password field */}
              <MuiTextField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={formik.values.password}
                onChange={(e) => formik.setFieldValue("password", e.target.value)}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* <MuiTextField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={formik.values.password}
                onChange={(e) => formik.setFieldValue("password", e.target.value)}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify
                          icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */}
            </>
          )}

          {/* OTP field (in OTP steps) */}
          {(step === 'otp' || step === 'otp-login') && (
            <>
              {step === 'otp-login' && (
                <Box sx={{ textAlign: 'right' }}>
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={switchToPassword}
                  >
                    Login with Password
                  </Link>
                </Box>
              )}
              <MuiTextField
                name="otp"
                label="Enter 6-digit OTP"
                value={formik.values.otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  formik.setFieldValue("otp", val);
                }}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                inputProps={{ maxLength: 6 }}
              />
              {/* <MuiTextField
                name="otp"
                label="Enter OTP"
                value={formik.values.otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  formik.setFieldValue("otp", val);
                }}
                error={formik.touched.otp && formik.errors.otp}
                helperText={formik.touched.otp && formik.errors.otp}
                inputProps={{ maxLength: 6 }}
              /> */}
            </>
          )}
        </Stack>

        {/* Remember me checkbox (only for password login) */}
        {step === 'password' && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...formik.getFieldProps("remember")}
                  checked={formik.values.remember}
                />
              }
              label="Remember me"
            />
          </Stack>
        )}

        {/* Submit button */}
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          {step === 'identifier' && 'Continue'}
          {step === 'password' && 'Login'}
          {(step === 'otp' || step === 'otp-login') && 'Verify OTP'}
        </LoadingButton>

        {/* Resend OTP button */}
        {(step === 'otp' || step === 'otp-login') && (
          <Button
            fullWidth
            variant="text"
            onClick={handleResendOTP}
            disabled={resendTimer > 0 || resendCount >= RESEND_OTP_LIMIT}
            sx={{ mt: 2 }}
          >
            {resendCount >= RESEND_OTP_LIMIT
              ? "Resend OTP (limit reached)"
              : resendTimer > 0
                ? `Resend OTP (${resendTimer}s)`
                : "Resend OTP"}
          </Button>
        )}
      </form>

      {/* Forgot password link */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
        }}
      >
        {/* <Typography variant="body2" color="text.secondary">
          Forgot Password?
        </Typography> */}
        {/* <Button
          variant="text"
          onClick={() => navigate("/auth/forgot-password")}
          sx={{ textTransform: 'none' }}
        >
          Reset Password
        </Button> */}
      </Box>
    </>
  );
}