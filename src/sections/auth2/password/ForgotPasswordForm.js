import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// form
import { useFormik, Form, FormikProvider } from 'formik';

// @mui
import { Stack,  } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// hooks
import { storeContactInfo } from '../../../auth/AppAuthStorage';
import { initiatePasswordReset } from '../../../services/JRMPartnerAuthService';
// import useAuth from '../../../hooks/useAuth';
import { PATH_AUTH } from '../../../routes/paths';
import MuiTextField from "src/components/formfield/TextField";
import MuiAutocomplete from "src/components/formfield/MuiAutocomplete";

// ----------------------------------------------------------------------

export default function ForgotPasswordForm() {
 
  const navigate = useNavigate();
  const [data, setData] = useState([]);
 
  const [getState, setState] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((response) => {
        // console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const country = [...new Set(data.map((item) => item.country))];
  const sortcountry = country.sort();
   const handleCountry = (event, value) => {
    let states = data.filter((state) => state.country === value);
    formik.setFieldValue('country',value);
    
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
    
  };

  const RegisterSchema = Yup.object().shape({
    country: Yup.string().required('Country is required').nullable(), 
    emailAddress: Yup.string().required('Email is required').max(50),
    mobileNumber: Yup.number().when('country',{is: value => value && value === 'India', then:Yup.number().required('Mobile number is required').min(6001000000,'Invaid number').max(9999000000,'Invaid Number'),otherwise: Yup.number().nullable().test(
      'Is positive?', 'Invalid Number', (value) => value > 0 ).min(1000,'number is too short').max(999999999999999,'number is too large').nullable()}),  
  });

  const formik = useFormik({
    initialValues:{
      country:'',
      emailAddress: '',
      mobileNumber: "",
  },

   validationSchema : RegisterSchema,
  onSubmit :async (data) => {

    console.log("InitiateResetPasswordScreen data=", data);

    //  Request the password reset initiation
    const result = await initiatePasswordReset(data);
    if (!result.ok) {
      console.log ("Password reset initiation FAILED", result.data);
      if ( result.status !== null && (result.status === 400 || result.status === 409 || result.status === 500) ) 
      {
         toast.error (result.data.message);
    }
    else {
       return  toast.error (`Unable to initiate password reset { ${result.data.message} }`);
    }
  } 
  else{

  console.log ("Password reset initiation  successful", result.data);
       toast.success ("SUCCESS");
       //  Store the Contact Info for validation
       const contactInfo = { "emailAddress": data.emailAddress, 
       "mobileNumber": data.mobileNumber,
      "country" : data.country };
        storeContactInfo(contactInfo);
        if (result.data.verifyMobileUrl !== null && result.data.verifyMobileUrl !== "" ) {
          navigate(PATH_AUTH.verifyMobile);
      } else  if (result.data.verifyEmailUrl !== null && result.data.verifyEmailUrl !== "" ) {
        navigate(PATH_AUTH.verifyEmail);
      }
      else {
          //  Error
          toast.error (`Error sending OTP  ${result.data.message}`);
      }
  }
// if (ex.response && ex.response.status === 400){
//   toast.error("Mandatory Fields are required");
// }
// else if (ex.response && ex.response.status === 409){
//   toast.error("USER ALREADY FOUND");
// }

}   ,
});
const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
<FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
      <Stack spacing={3}>

      <MuiAutocomplete name='country' label='Country'   
        value ={formik.values.country } 
        onChange={(event, value) => formik.setFieldValue('country',value)}
        options={country}/>
  
       <MuiTextField name='emailAddress' label='Email' type='email'  
        onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('emailAddress',val)}}
        value={formik.values.emailAddress}/>

<MuiTextField name='mobileNumber' label='Mobile' type='number'  
         onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('mobileNumber',val)}}
        value={formik.values.mobileNumber }/>

              
          
        <LoadingButton fullWidth size="medium" type="submit"  variant="contained" loading={isSubmitting}>
          Send request
        </LoadingButton>
       </Stack>
       
      </Form>
    </FormikProvider>
  );

}
