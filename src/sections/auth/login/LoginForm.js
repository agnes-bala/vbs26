// // LoginForm.js
// import * as Yup from "yup";
// import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
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
//   // Typography,
//   Alert,
//   LinearProgress,
//   Link,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";

// // routes
// import { PATH_AFTER_LOGIN } from "../../../config";
// import Iconify from "../../../components/Iconify";
// import { AppAuthContext } from "../../../auth/AppAuthContext";
// import MuiTextField from "src/components/formfield/TextField";
// import {
//   loginWithPassword,
//   loginWithOTP,
//   sendOTP,
//   registerPartner,
//   isPhone,
//   isEmail,
//   normalizePhone,
// } from "../../../services/JRMPartnerAuthService";
// import { AddNotification } from "../../../auth/Notifications";

// // ----------------------------------------------------------------------

// export default function LoginForm() {
//   const navigate = useNavigate();
//   const authContext = useContext(AppAuthContext);

//   // State for multi-step login
//   const [step, setStep] = useState("identifier"); // identifier, password, otp, otp-login
//   const [identifier, setIdentifier] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPrefix, setShowPrefix] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // OTP resend state
//   const RESEND_OTP_LIMIT = 3;
//   const RESEND_SEC = 60;
//   const [resendCount, setResendCount] = useState(0);
//   const [resendTimer, setResendTimer] = useState(0);

//   // Country detection
//   const [isInd, setInd] = useState("IN");

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get("https://api.country.is");
//         setInd(response.data.country);

//         // Load saved identifier
//         const saved = sessionStorage.getItem("identifier") || "";
//         if (saved) {
//           setIdentifier(saved);
//           setShowPrefix(isPhone(saved));
//         }
//       } catch (error) {
//         console.error("Country detection failed", error);
//       }
//     }
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (resendTimer > 0) {
//       const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [resendTimer]);

//   const startResendCooldown = () => {
//     setResendTimer(RESEND_SEC);
//   };

//   // Form validation schemas
//   const IdentifierSchema = Yup.object().shape({
//     authName: Yup.string()
//       .required("Email/Mobile is required")
//       .test(
//         "valid-identifier",
//         "Please enter a valid email or mobile number",
//         (value) => isEmail(value) || isPhone(value),
//       ),
//   });

//   const PasswordSchema = Yup.object().shape({
//     authName: Yup.string().required("Email/Mobile is required"),
//     password: Yup.string()
//       .required("Password is required")
//       .min(6, "Password must be at least 6 characters"),
//   });

//   const OTPSchema = Yup.object().shape({
//     authName: Yup.string().required("Email/Mobile is required"),
//     otp: Yup.string()
//       .required("OTP is required")
//       .matches(/^\d{6}$/, "OTP must be 6 digits"),
//   });

//   // Formik instance
//   const formik = useFormik({
//     initialValues: {
//       authName: identifier || "",
//       emailAddress: "",
//       mobileNumber: "",
//       password: "",
//       otp: "",
//       remember: true,
//       isIndia: isInd,
//     },
//     validationSchema:
//       step === "identifier"
//         ? IdentifierSchema
//         : step === "password"
//         ? PasswordSchema
//         : OTPSchema,
//     onSubmit: async (values) => {
//       if (step === "identifier") {
//         await handleIdentifierSubmit(values);
//       } else if (step === "password") {
//         await handlePasswordSubmit(values);
//       } else if (step === "otp" || step === "otp-login") {
//         await handleOTPSubmit(values);
//       }
//     },
//   });

//   // Step 1: Identifier submission
//   // Step 1: Identifier submission
//   const handleIdentifierSubmit = async (values) => {
//     setIsSubmitting(true);
//     setErrorMessage(null);

//     const id = values.authName.trim();
//     setIdentifier(id);
//     sessionStorage.setItem("identifier", id);

//     const phone = isPhone(id) ? normalizePhone(id) : "";
//     const email = isEmail(id) ? id.toLowerCase() : "";

//     try {
//       // Check if the identifier is a phone number or email
//       if (isPhone(id)) {
//         // For mobile numbers - always send OTP
//         const otpResponse = await sendOTP({
//           emailAddress: "",
//           mobileNumber: phone,
//           country: "",
//         });

//         if (otpResponse?.ok) {
//           toast.success("OTP sent successfully!");
//           setStep("otp-login");
//           startResendCooldown();
//           setResendCount(0);
//           AddNotification(
//             "Welcome to Self Care Portal",
//             "/dashboard/user?tab=password",
//             "Update your password",
//             true,
//           );
//         } else {
//           setErrorMessage(otpResponse?.data?.message || "Failed to send OTP");
//         }
//       } else if (isEmail(id)) {
//         // For email - try to register first to check if user exists
//         const response = await registerPartner({
//           emailAddress: email,
//           mobileNumber: "",
//         });

//         if (response?.ok && response?.data) {
//           // User exists with password - go to password login
//           setStep("password");
//           AddNotification(
//             "Welcome to Self Care Portal",
//             "/dashboard/user",
//             "Update your profile",
//             true,
//           );
//         } else {
//           // User doesn't exist or requires OTP - send OTP to email
//           const otpResponse = await sendOTP({
//             emailAddress: email,
//             mobileNumber: "",
//             country: "",
//           });

//           if (otpResponse?.ok) {
//             toast.success("OTP sent successfully!");
//             setStep("otp-login");
//             startResendCooldown();
//             setResendCount(0);
//             AddNotification(
//               "Welcome to Self Care Portal",
//               "/dashboard/user?tab=password",
//               "Update your password",
//               true,
//             );
//           } else {
//             setErrorMessage(otpResponse?.data?.message || "Failed to send OTP");
//           }
//         }
//       } else {
//         setErrorMessage("Please enter a valid email or mobile number");
//       }
//     } catch (error) {
//       setErrorMessage(error.message || "An error occurred");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   // const handleIdentifierSubmit = async (values) => {
//   //   setIsSubmitting(true);
//   //   setErrorMessage(null);

//   //   const id = values.authName.trim();
//   //   setIdentifier(id);
//   //   sessionStorage.setItem('identifier', id);

//   //   const phone = isPhone(id) ? normalizePhone(id) : '';
//   //   const email = isEmail(id) ? id.toLowerCase() : '';

//   //   try {
//   //     // Try to register first (this will tell us if user exists)
//   //     const response = await registerPartner({
//   //       emailAddress: email,
//   //       mobileNumber: phone
//   //     });

//   //     if (response?.ok && response?.data) {
//   //       // User exists with password - go to password login
//   //       setStep('password');
//   //       AddNotification(
//   //         'Welcome to Self Care Portal',
//   //         '/dashboard/user',
//   //         'Update your profile',
//   //         true
//   //       );
//   //     } else {
//   //       // User doesn't exist or requires OTP
//   //       const otpResponse = await sendOTP({
//   //         emailAddress: email,
//   //         mobileNumber: phone,
//   //         country: ''
//   //       });

//   //       if (otpResponse?.ok) {
//   //         toast.success('OTP sent successfully!');
//   //         setStep('otp-login');
//   //         startResendCooldown();
//   //         setResendCount(0);
//   //         AddNotification(
//   //           'Welcome to Self Care Portal',
//   //           '/dashboard/user?tab=password',
//   //           'Update your password',
//   //           true
//   //         );
//   //       } else {
//   //         setErrorMessage(otpResponse?.data?.message || 'Failed to send OTP');
//   //       }
//   //     }
//   //   } catch (error) {
//   //     setErrorMessage(error.message || 'An error occurred');
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   // Step 2a: Password login
//   const handlePasswordSubmit = async (values) => {
//     setIsSubmitting(true);
//     setErrorMessage(null);

//     const params = {};
//     if (identifier.includes("@")) {
//       params.emailAddress = identifier.toLowerCase();
//     } else {
//       params.mobileNumber = normalizePhone(identifier);
//     }

//     try {
//       const result = await loginWithPassword({
//         ...params,
//         password: values.password,
//       });

//       if (result?.ok) {
//         toast.success("Login successful!");
//         authContext.setUser(result.data);

//         // Load additional profile data
//         await loadProfileData(result.data);

//         const storedLocation = sessionStorage.getItem("storedLocation");
//         navigate(storedLocation || PATH_AFTER_LOGIN, { replace: true });
//       } else if (result?.status === 401) {
//         setErrorMessage("Invalid credentials");
//       } else if (result?.status === 404) {
//         setErrorMessage("User does not exist");
//       } else {
//         setErrorMessage(result?.data?.message || "Login failed");
//       }
//     } catch (error) {
//       setErrorMessage(error.message || "An error occurred");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Step 2b: OTP login
//   const handleOTPSubmit = async (values) => {
//     setIsSubmitting(true);
//     setErrorMessage(null);

//     const params = {};
//     if (identifier.includes("@")) {
//       params.emailAddress = identifier.toLowerCase();
//     } else {
//       params.mobileNumber = normalizePhone(identifier);
//     }

//     try {
//       const result = await loginWithOTP({
//         ...params,
//         otp: values.otp,
//       });

//       if (result?.ok) {
//         toast.success("Login successful!");
//         authContext.setUser(result.data);

//         // Load additional profile data
//         await loadProfileData(result.data);

//         const storedLocation = sessionStorage.getItem("storedLocation");
//         navigate(storedLocation || PATH_AFTER_LOGIN, { replace: true });
//       } else {
//         setErrorMessage(result?.data?.message || "Invalid OTP");
//       }
//     } catch (error) {
//       setErrorMessage(error.message || "An error occurred");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Load profile data after login
//   const loadProfileData = async (authInfo) => {
//     try {
//       const config = { Authorization: `Bearer ${authInfo.jwt}` };

//       const [contactRes, childrenRes, familyRes] = await Promise.all([
//         axios.get(`${authInfo.profileUrl}/contactinfo`, { headers: config }),
//         axios.get(`${authInfo.profileUrl}/childreninfo`, { headers: config }),
//         axios.get(`${authInfo.profileUrl}/familymemberinfo`, {
//           headers: config,
//         }),
//       ]);

//       const profileCompleted = contactRes.data.fullName ? 1 : 0;
//       localStorage.setItem("profileStatus", profileCompleted);

//       const members = {
//         main: contactRes.data,
//         family: familyRes.data,
//         kids: childrenRes.data,
//       };
//       localStorage.setItem("members", JSON.stringify(members));
//       localStorage.setItem("cachedProfile", JSON.stringify(contactRes.data));
//     } catch (error) {
//       console.error("Failed to load profile data", error);
//     }
//   };

//   // Handle OTP resend
//   const handleResendOTP = async () => {
//     if (resendCount >= RESEND_OTP_LIMIT) {
//       toast.error("Maximum resend attempts reached");
//       return;
//     }

//     const phone = isPhone(identifier) ? normalizePhone(identifier) : "";
//     const email = isEmail(identifier) ? identifier.toLowerCase() : "";

//     try {
//       const response = await sendOTP({
//         emailAddress: email,
//         mobileNumber: phone,
//         country: "",
//       });

//       if (response?.ok) {
//         toast.success("OTP resent successfully!");
//         setResendCount((prev) => prev + 1);
//         startResendCooldown();
//         formik.setFieldValue("otp", "");
//       } else {
//         setErrorMessage(response?.data?.message || "Failed to resend OTP");
//       }
//     } catch (error) {
//       setErrorMessage(error.message || "An error occurred");
//     }
//   };

//   // Switch between password and OTP methods
//   const switchToOTP = () => {
//     handleResendOTP();
//     setStep("otp-login");
//   };

//   const switchToPassword = () => {
//     setStep("password");
//   };

//   return (
//     <>
//       {errorMessage && (
//         <Alert
//           severity="error"
//           sx={{ mb: 3 }}
//           onClose={() => setErrorMessage(null)}
//         >
//           {errorMessage}
//         </Alert>
//       )}

//       {isSubmitting && <LinearProgress sx={{ mb: 2 }} />}

//       <form onSubmit={formik.handleSubmit} noValidate>
//         <Stack spacing={3}>
//           {/* Always show identifier field */}
//           {/* <MuiTextField
//             name="authName"
//             label="Email/Mobile"
//             value={formik.values.authName}
//             onChange={(e) => {
//               const value = e.target.value;
//               formik.setFieldValue("authName", value);
//               setShowPrefix(isPhone(value));

//               // Update hidden fields
//               if (!isNaN(+value)) {
//                 formik.setFieldValue("mobileNumber", value);
//                 formik.setFieldValue("emailAddress", "");
//               } else {
//                 formik.setFieldValue("emailAddress", value);
//                 formik.setFieldValue("mobileNumber", "");
//               }
//             }}
//             error={formik.touched.authName && formik.errors.authName}
//             helperText={formik.touched.authName && formik.errors.authName}
//             InputProps={{
//               startAdornment: showPrefix ? (
//                 <InputAdornment position="start" sx={{ color: 'primary.main', fontWeight: 500 }}>
//                   +91
//                 </InputAdornment>
//               ) : null,
//             }}
//           /> */}

//           {/* Identifier field */}
//           <MuiTextField
//             name="authName"
//             label={isInd === "IN" ? "Mobile/Email" : "Email"}
//             value={formik.values.authName}
//             disabled={step !== "identifier"}
//             onChange={(e) => {
//               const value = e.target.value;
//               formik.setFieldValue("authName", value);
//               setShowPrefix(isPhone(value));
//               // ... rest of your onChange logic
//             }}
//             error={formik.touched.authName && Boolean(formik.errors.authName)}
//             helperText={formik.touched.authName && formik.errors.authName}
//             InputProps={{
//               startAdornment: showPrefix ? (
//                 <InputAdornment
//                   position="start"
//                   sx={{ color: "primary.main", fontWeight: 500 }}
//                 >
//                   +91
//                 </InputAdornment>
//               ) : null,
//             }}
//           />

//           {/* Hidden fields */}
//           <MuiTextField
//             name="emailAddress"
//             label="Email"
//             type="email"
//             hidden
//             value={formik.values.emailAddress}
//           />
//           <MuiTextField
//             name="mobileNumber"
//             label="Mobile"
//             type="number"
//             hidden
//             value={formik.values.mobileNumber}
//           />

//           {/* Password field (only in password step) */}
//           {step === "password" && (
//             <>
//               <Box sx={{ textAlign: "right" }}>
//                 <Link
//                   component="button"
//                   type="button"
//                   variant="body2"
//                   onClick={switchToOTP}
//                   sx={{ mt: 1 }}
//                 >
//                   Login with OTP
//                 </Link>
//               </Box>
//               {/* Password field */}
//               <MuiTextField
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 label="Password"
//                 value={formik.values.password}
//                 onChange={(e) =>
//                   formik.setFieldValue("password", e.target.value)
//                 }
//                 error={
//                   formik.touched.password && Boolean(formik.errors.password)
//                 }
//                 helperText={formik.touched.password && formik.errors.password}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         <Iconify
//                           icon={
//                             showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
//                           }
//                         />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* <MuiTextField
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 label="Password"
//                 value={formik.values.password}
//                 onChange={(e) => formik.setFieldValue("password", e.target.value)}
//                 error={formik.touched.password && formik.errors.password}
//                 helperText={formik.touched.password && formik.errors.password}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                         <Iconify
//                           icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
//                         />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               /> */}
//             </>
//           )}

//           {/* OTP field (in OTP steps) */}
//           {(step === "otp" || step === "otp-login") && (
//             <>
//               {step === "otp-login" && (
//                 <Box sx={{ textAlign: "right" }}>
//                   <Link
//                     component="button"
//                     type="button"
//                     variant="body2"
//                     onClick={switchToPassword}
//                   >
//                     Login with Password
//                   </Link>
//                 </Box>
//               )}
//               <MuiTextField
//                 name="otp"
//                 label="Enter 6-digit OTP"
//                 value={formik.values.otp}
//                 onChange={(e) => {
//                   const val = e.target.value.replace(/\D/g, "").slice(0, 6);
//                   formik.setFieldValue("otp", val);
//                 }}
//                 error={formik.touched.otp && Boolean(formik.errors.otp)}
//                 helperText={formik.touched.otp && formik.errors.otp}
//                 inputProps={{ maxLength: 6 }}
//               />
//               {/* <MuiTextField
//                 name="otp"
//                 label="Enter OTP"
//                 value={formik.values.otp}
//                 onChange={(e) => {
//                   const val = e.target.value.replace(/\D/g, '').slice(0, 6);
//                   formik.setFieldValue("otp", val);
//                 }}
//                 error={formik.touched.otp && formik.errors.otp}
//                 helperText={formik.touched.otp && formik.errors.otp}
//                 inputProps={{ maxLength: 6 }}
//               /> */}
//             </>
//           )}
//         </Stack>

//         {/* Remember me checkbox (only for password login) */}
//         {step === "password" && (
//           <Stack
//             direction="row"
//             alignItems="center"
//             justifyContent="space-between"
//             sx={{ my: 2 }}
//           >
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   {...formik.getFieldProps("remember")}
//                   checked={formik.values.remember}
//                 />
//               }
//               label="Remember me"
//             />
//           </Stack>
//         )}

//         {/* Submit button */}
//         <LoadingButton
//           fullWidth
//           size="large"
//           type="submit"
//           variant="contained"
//           loading={isSubmitting}
//           sx={{ mt: 3 }}
//         >
//           {step === "identifier" && "Continue"}
//           {step === "password" && "Login"}
//           {(step === "otp" || step === "otp-login") && "Verify OTP"}
//         </LoadingButton>

//         {/* Resend OTP button */}
//         {(step === "otp" || step === "otp-login") && (
//           <Button
//             fullWidth
//             variant="text"
//             onClick={handleResendOTP}
//             disabled={resendTimer > 0 || resendCount >= RESEND_OTP_LIMIT}
//             sx={{ mt: 2 }}
//           >
//             {resendCount >= RESEND_OTP_LIMIT
//               ? "Resend OTP (limit reached)"
//               : resendTimer > 0
//               ? `Resend OTP (${resendTimer}s)`
//               : "Resend OTP"}
//           </Button>
//         )}
//       </form>

//       {/* Forgot password link */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           flexDirection: "column",
//           alignItems: "center",
//           mt: 3,
//         }}
//       >
//         {/* <Typography variant="body2" color="text.secondary">
//           Forgot Password?
//         </Typography> */}
//         {/* <Button
//           variant="text"
//           onClick={() => navigate("/auth/forgot-password")}
//           sx={{ textTransform: 'none' }}
//         >
//           Reset Password
//         </Button> */}
//       </Box>
//     </>
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
  Alert,
  LinearProgress,
  Link,
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
  normalizePhone,
} from "../../../services/JRMPartnerAuthService";
import { AddNotification } from "../../../auth/Notifications";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const authContext = useContext(AppAuthContext);

  // State for multi-step login
  const [step, setStep] = useState("identifier"); // identifier, password, otp-login
  const [identifier, setIdentifier] = useState("");
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
        const saved = sessionStorage.getItem("identifier") || "";
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
      .test(
        "valid-identifier",
        "Please enter a valid email or mobile number",
        (value) => isEmail(value) || isPhone(value),
      ),
  });

  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const OTPSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be 6 digits"),
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
      isIndia: isInd,
    },
    validationSchema:
      step === "identifier"
        ? IdentifierSchema
        : step === "password"
        ? PasswordSchema
        : OTPSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      if (step === "identifier") {
        await handleIdentifierSubmit(values);
      } else if (step === "password") {
        await handlePasswordSubmit(values);
      } else if (step === "otp-login") {
        await handleOTPSubmit(values);
      }
    },
  });

  // Helper function to send OTP
  const sendOTPToIdentifier = async (id) => {
    const phone = isPhone(id) ? normalizePhone(id) : "";
    const email = isEmail(id) ? id.toLowerCase() : "";

    const response = await sendOTP({
      emailAddress: email,
      mobileNumber: phone,
      country: "",
    });

    return response;
  };

  // Step 1: Identifier submission
  const handleIdentifierSubmit = async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const id = values.authName.trim();
    setIdentifier(id);
    sessionStorage.setItem("identifier", id);

    try {
      if (isPhone(id)) {
        // For mobile numbers - always send OTP
        const otpResponse = await sendOTPToIdentifier(id);

        if (otpResponse?.ok) {
          toast.success("OTP sent successfully!");
          setStep("otp-login");
          startResendCooldown();
          setResendCount(0);
          AddNotification(
            "Welcome to Self Care Portal",
            "/dashboard/user?tab=password",
            "Update your password",
            true,
          );
        } else {
          setErrorMessage(otpResponse?.data?.message || "Failed to send OTP");
        }
      } else if (isEmail(id)) {
        // For email - try to register first to check if user exists
        const email = id.toLowerCase();
        const response = await registerPartner({
          emailAddress: email,
          mobileNumber: "",
        });

        if (response?.ok && response?.data) {
          // User exists with password - go to password login
          setStep("password");
          AddNotification(
            "Welcome to Self Care Portal",
            "/dashboard/user",
            "Update your profile",
            true,
          );
        } else {
          // User doesn't exist or requires OTP - send OTP to email
          const otpResponse = await sendOTPToIdentifier(id);

          if (otpResponse?.ok) {
            toast.success("OTP sent successfully!");
            setStep("otp-login");
            startResendCooldown();
            setResendCount(0);
            AddNotification(
              "Welcome to Self Care Portal",
              "/dashboard/user?tab=password",
              "Update your password",
              true,
            );
          } else {
            setErrorMessage(otpResponse?.data?.message || "Failed to send OTP");
          }
        }
      } else {
        setErrorMessage("Please enter a valid email or mobile number");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2a: Password login
  const handlePasswordSubmit = async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const params = {};
    if (identifier.includes("@")) {
      params.emailAddress = identifier.toLowerCase();
    } else {
      params.mobileNumber = normalizePhone(identifier);
    }

    try {
      const result = await loginWithPassword({
        ...params,
        password: values.password,
      });

      if (result?.ok) {
        toast.success("Login successful!");
        authContext.setUser(result.data);

        // Load additional profile data
        await loadProfileData(result.data);

        const storedLocation = sessionStorage.getItem("storedLocation");
        navigate(storedLocation || PATH_AFTER_LOGIN, { replace: true });
      } else if (result?.status === 401) {
        setErrorMessage("Invalid credentials");
      } else if (result?.status === 404) {
        setErrorMessage("User does not exist");
      } else {
        setErrorMessage(result?.data?.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2b: OTP login
  const handleOTPSubmit = async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const params = {};
    if (identifier.includes("@")) {
      params.emailAddress = identifier.toLowerCase();
    } else {
      params.mobileNumber = normalizePhone(identifier);
    }

    try {
      const result = await loginWithOTP({
        ...params,
        otp: values.otp,
      });

      if (result?.ok) {
        toast.success("Login successful!");
        authContext.setUser(result.data);

        // Load additional profile data
        await loadProfileData(result.data);

        const storedLocation = sessionStorage.getItem("storedLocation");
        navigate(storedLocation || PATH_AFTER_LOGIN, { replace: true });
      } else {
        setErrorMessage(result?.data?.message || "Invalid OTP");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
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
        axios.get(`${authInfo.profileUrl}/familymemberinfo`, {
          headers: config,
        }),
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
      toast.error("Maximum resend attempts reached");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await sendOTPToIdentifier(identifier);

      if (response?.ok) {
        toast.success("OTP resent successfully!");
        setResendCount((prev) => prev + 1);
        startResendCooldown();
        formik.setFieldValue("otp", "");
      } else {
        setErrorMessage(response?.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Switch between password and OTP methods
  const switchToOTP = async () => {
    // Send OTP only when manually switching from password to OTP
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await sendOTPToIdentifier(identifier);

      if (response?.ok) {
        toast.success("OTP sent to your email/phone!");
        setStep("otp-login");
        startResendCooldown();
        setResendCount(0);
        formik.setFieldValue("otp", "");
        formik.setFieldValue("password", "");
      } else {
        setErrorMessage(response?.data?.message || "Failed to send OTP");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchToPassword = () => {
    setStep("password");
    formik.setFieldValue("otp", "");
    setErrorMessage(null);
  };

  return (
    <>
      {errorMessage && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setErrorMessage(null)}
        >
          {errorMessage}
        </Alert>
      )}

      {isSubmitting && <LinearProgress sx={{ mb: 2 }} />}

      <form onSubmit={formik.handleSubmit} noValidate>
        <Stack spacing={3}>
          {/* Identifier field */}
          <MuiTextField
            name="authName"
            label={isInd === "IN" ? "Mobile/Email" : "Email"}
            value={formik.values.authName}
            disabled={step !== "identifier"}
            onChange={(e) => {
              const value = e.target.value;
              formik.setFieldValue("authName", value);
              setShowPrefix(isPhone(value));

              // Update hidden fields
              if (isPhone(value)) {
                formik.setFieldValue("mobileNumber", normalizePhone(value));
                formik.setFieldValue("emailAddress", "");
              } else if (isEmail(value)) {
                formik.setFieldValue("emailAddress", value.toLowerCase());
                formik.setFieldValue("mobileNumber", "");
              }
            }}
            error={formik.touched.authName && Boolean(formik.errors.authName)}
            helperText={formik.touched.authName && formik.errors.authName}
            InputProps={{
              startAdornment: showPrefix ? (
                <InputAdornment
                  position="start"
                  sx={{ color: "primary.main", fontWeight: 500 }}
                >
                  +91
                </InputAdornment>
              ) : null,
            }}
          />

          {/* Hidden fields - removed as they're not needed to be shown */}
          <input
            type="hidden"
            name="emailAddress"
            value={formik.values.emailAddress}
          />
          <input
            type="hidden"
            name="mobileNumber"
            value={formik.values.mobileNumber}
          />

          {/* Password field (only in password step) */}
          {step === "password" && (
            <>
              <MuiTextField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={formik.values.password}
                onChange={(e) =>
                  formik.setFieldValue("password", e.target.value)
                }
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          {/* OTP field (in OTP steps) */}
          {step === "otp-login" && (
            <MuiTextField
              name="otp"
              label="Enter 6-digit OTP"
              value={formik.values.otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                formik.setFieldValue("otp", val);
              }}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
              inputProps={{ maxLength: 6, inputMode: "numeric" }}
            />
          )}
        </Stack>

        {/* Remember me checkbox (only for password login) */}
        {step === "password" && (
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
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={switchToOTP}
            >
              Login with OTP
            </Link>
          </Stack>
        )}

        {/* Switch to password link for OTP step */}
        {step === "otp-login" && (
          <Box sx={{ textAlign: "right", mt: 1 }}>
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

        {/* Submit button */}
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          {step === "identifier" && "Continue"}
          {step === "password" && "Login"}
          {step === "otp-login" && "Verify OTP"}
        </LoadingButton>

        {/* Resend OTP button */}
        {step === "otp-login" && (
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
    </>
  );
}
