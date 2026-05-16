import * as Yup from 'yup';
import { useState,  useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// form
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
// hook
import useTimer from '../../../components/useTimer';
import { removeContactInfo, storeSetPasswordInfo, getContactInfo } from '../../../auth/AppAuthStorage';
import { verifyEmailOTP, resendEmailOTP } from '../../../services/JRMPartnerAuthService';
// routes
import { AppAuthContext } from 'src/auth/AppAuthContext';
import { storeAuthInfo } from '../../../auth/AppAuthStorage';
//import {  PATH_AUTH } from '../../../routes/paths';
import { PATH_AFTER_LOGIN } from 'src/config';

// components

// ----------------------------------------------------------------------

export default function VerifyCodeEmail(){
  const navigate = useNavigate();
  const [firsttrigger, setFirsttrigger] = useState(true);
  const authContext = useContext(AppAuthContext);
  const saveAuthInfo = async (authInfo) => {
    //console.log('Storing Auth Info ', authInfo);
    storeAuthInfo(authInfo);
  };
  const [resendTime, setResendTime] = useTimer({
    multiplier: 1,
  });
  const storedLocation=localStorage.getItem('storedLocation');
  const emailVerify = localStorage.getItem('emailAddress');
  const handleResend = async () => {
    setResendTime(60);
    console.log ("Resend OTP");
    //  Retrieve the contact Info stored in secure storage
    // const contactInfo = await getContactInfo();
    // console.log("handleOTPResend contactInfo=", contactInfo);
    // if ( !contactInfo ) {
    //   toast.error ("Error resending OTP for verification!");
    //   navigate(PATH_AUTH.verifyEmail, { replace: true });
    //   return;
  // }
  //  Create the request from the OTP string
  const request = { "emailAddress": emailVerify, "mobileNumber":'', "country":'' };

  console.log("handleOTPResend request=", request);
  //  Provide the OTP entered
  const result = await resendEmailOTP(request);
  if (!result.ok) {
      console.log("handleOTPResend FAILED=", result);
      toast.error ("Incorrect OTP provided!");
      //  TODO: Need to give at least 3 tries - store in local Store
     // navigate(PATH_AUTH.verifyEmail, { replace: true });
      return;
  }

  toast.success ("OTP resend was successful");
  };
  const handleVerify = () => {
    setFirsttrigger(true);
    setResendTime(60);
  };


  const VerifyCodeSchema = Yup.object().shape({
    emailOTP: Yup.number().typeError('Invalid Character').min(100000,'check entered OTP').max(999999,'check entered OTP').required('Code is required'),
    emailAddress: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });
 
  const formik = useFormik({
    initialValues:{
      emailOTP: '',
    emailAddress: emailVerify || '',
    },
    
    validationSchema: VerifyCodeSchema,
    onSubmit : async (data) => {

      console.log("VerifyEmailOTPScreen OTP=", data.emailOTP);

      //  Retrieve the contact Info stored in secure storage
    //   const contactInfo = await getContactInfo();
    //   console.log("VerifyEmailOTPScreen contactInfo=", contactInfo);
    //   if ( !contactInfo ) {
    //     toast.error ("Error processing OTP verification!");
    //     navigate(PATH_AUTH.verify, { replace: true });
    //     return;
    // }

    //  Create the request from the OTP string
    const request = { "emailAddress": data.emailAddress, "otp": data.emailOTP };

    console.log("VerifyemailOTPScreen request=", request);
    //  Provide the OTP entered 
    const result = await verifyEmailOTP(request);

    if (!result.ok) {
      console.log("VerifyEmailOTPScreen FAILED=", result);
      toast.error ("Incorrect OTP provided!");

      //  TODO: Need to give at least 3 tries - store in local Store
      //  navigate(PATH_AUTH.verifyEmail, { replace: true });
      handleVerify();
      return;
  }

      //  Request is successful - remove contact Info and add setPasswordInfo
      // await removeContactInfo();
      // await storeSetPasswordInfo(result.data);
       
      // navigate(‘/dashboard/app’,{replace: true});
    
      console.log ("OTP Verification successful", result.data);
        toast.success ("OTP Verification successful");
        authContext.setUser(result.data);
        saveAuthInfo(result.data);
        let configure = {'Authorization': `Bearer ${result.data.jwt}`} ;
        let resp = await axios.get(`${result.data.profileUrl}/contactinfo`,{headers : configure} )
        let resp1 = await axios.get(`${result.data.profileUrl}/childreninfo`,{headers : configure} )
        let resp2 = await axios.get(`${result.data.profileUrl}/familymemberinfo`,{headers : configure} )
        //console.log("login resp",resp);
        if(resp.data.fullName == null || resp.data.fullName == '' || resp.data.fullName == undefined)
        {
          localStorage.setItem('profileStatus', 0);
        }
        else{
          localStorage.setItem('profileStatus', 1);
        }
        let members ={"main":resp.data,"spouse":resp.data, "family":resp2.data, "kids":resp1.data}
        localStorage.setItem('members',JSON.stringify(members));
        // resetForm();
        if (storedLocation) {
          navigate(storedLocation??PATH_AFTER_LOGIN, { replace: true });
          return;
        }
        navigate(PATH_AFTER_LOGIN, { replace: true });
    }
  },
);
const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <>
       <Typography variant="h3" paragraph>
            Please check your email!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            We have emailed a 6-digit confirmation code to your email, please enter the code in below box to verify your
            email.
          </Typography>
          <br/>
    <FormikProvider value={formik}>
    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
    <Stack  spacing={2}>
      
    <TextField
        fullWidth
        label="Email"
        disabled={!!emailVerify}
        {...getFieldProps('emailAddress')}
        error={Boolean(touched.emailAddress && errors.emailAddress)}
        helperText={touched.emailAddress && errors.emailAddress}
      />

<TextField
        fullWidth
        label="OTP"
        type="number"
        inputProps={{minlength:6, maxlength: 6}}
        {...getFieldProps('emailOTP')}
        error={Boolean(touched.emailOTP && errors.emailOTP)}
        helperText={touched.emailOTP && errors.emailOTP}
       
      />
</Stack>

        <LoadingButton fullWidth size="large" type="submit"  variant="contained"  loading={isSubmitting} sx={{ mt: 3 }}>
           Verify OTP
        </LoadingButton>

   {firsttrigger &&
   <div>
        <LoadingButton fullWidth size="medium" type="submit" disabled={resendTime !== 0} onClick={handleResend} variant="outlined"  loading={isSubmitting} sx={{ mt: 3 }}>
           Resend OTP
        </LoadingButton>
        {resendTime !== 0 && <span> in {resendTime} seconds</span>}
   </div>}
      </Form>
    </FormikProvider>
    </>
  );
}
