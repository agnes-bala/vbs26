import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// form
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack,FormControl, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// hooks
import { storeContactInfo } from '../../../auth/AppAuthStorage';
import { registerPartnerMobile } from '../../../services/JRMPartnerAuthService';
// import useAuth from '../../../hooks/useAuth';
import { PATH_AUTH } from '../../../routes/paths';
import MuiTextField from "src/components/formfield/TextField";
import MuiAutocomplete from 'src/components/MuiAutocomplete';



// ----------------------------------------------------------------------

export default function RegisterForm() {
  // const { register } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isInd, setInd]= useState('IN');

    useEffect(() => {
      async function fetchData(){
        const countryList = await axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json");
        setData(countryList.data);
        const response = await axios.get('https://api.country.is')
        console.log("response",response);
        setInd(response.data.country);
      }
    fetchData();
    },[]);
  
  const country = [...new Set(data.map((item) => item.country))];
  console.log("Country--",country);
  const sortcountry = country.sort();
 
   const handleCountry = (event, value) => {
    formik.setFieldValue('country',value);
    
  };

  const RegisterSchema = Yup.object().shape({
      emailAddress: Yup.string().email('Email must be a valid email address').required('Email is required').max(50),
      confirmEmailAddress: Yup.string().oneOf([Yup.ref('emailAddress'), null],'Email address must match').required('Confirm Email is required'),
      mobileNumber: Yup.number().when('country',{is: value => value && value === 'India', then:Yup.number().required('Mobile number is required').min(6001000000,'Invaid number').max(9999000000,'Invaid Number'),otherwise: Yup.number().nullable().test(
      'Is positive?', 'Invalid Number', (value) => value > 0).min(1000,'number is too short').max(999999999999999,'number is too large')}),
      confirmMobileNumber: Yup.number()
      .required('Confirm mobile number is required')
      .oneOf([Yup.ref('mobileNumber'), null], 'Mobile number must match'),
    // Address Data
     country: Yup.string().required('country is required').nullable(),
    });

  const formik = useFormik({
    initialValues:{
    country: isInd === 'IN' ? 'India' : '',
    emailAddress: '',         mobileNumber:'',
    confirmEmailAddress: '',  confirmMobileNumber:'',  
  },

    validationSchema : RegisterSchema,
    onSubmit :async (partnerDetails) => {
            const result = await registerPartnerMobile(partnerDetails);
            
            if (!result.ok) {
              console.log ("Registration FAILED", result.data);
              toast.error (result.data.message);
              return;
          }

              console.log ("Registration successful - Verify OTP", result.data);
              toast.success ("Verify OTP");

              //  Store the Contact Info for validation
              const contactInfo = { "emailAddress": partnerDetails.emailAddress, 
              "mobileNumber": partnerDetails.mobileNumber, "country": partnerDetails.country };
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
             // localStorage.setItem('country',partnerDetails.country);
          
  },
});
const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
<FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
      <Stack spacing={3}>
        
        <FormControl sx={{  minWidth: '50%' }}>
        <MuiAutocomplete name='country' label='Country' 
        value ={formik.values.country } 
        onChange={(event, value) => formik.setFieldValue('country',value)}
        options={country}/>
              
    
        </FormControl>
     
        <MuiTextField name='emailAddress' label='Email' type='email' focused={formik.values.emailAddress== '' ? false : true}  
        onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('emailAddress',val.toLowerCase())}}
        value={formik.values.emailAddress}/>
        <MuiTextField name='confirmEmailAddress' label='Confirm Email' type='email'focused={formik.values.confirmEmailAddress == '' ? false : true}  
        onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('confirmEmailAddress',val.toLowerCase())}}
        value={formik.values.confirmEmailAddress}/>
        <MuiTextField name='mobileNumber' label='Mobile' type='number' focused={formik.values.mobileNumber == '' ? false : true}  
        onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('mobileNumber',val)}}
        value={formik.values.mobileNumber}/>
        <MuiTextField name='confirmMobileNumber' label='Confirm Mobile' type='number' focused={formik.values.confirmMobileNumber == '' ? false : true}  
        onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('confirmMobileNumber',val)}}
        value={formik.values.confirmMobileNumber}/>

          
        <LoadingButton fullWidth size="large" type="submit"  variant="contained" loading={isSubmitting}>
        Create Account
        </LoadingButton>
       </Stack>
       
      </Form>
    </FormikProvider>
  );

}
