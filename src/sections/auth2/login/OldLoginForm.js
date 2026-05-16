import * as Yup from 'yup';
import { useState, useContext,useEffect } from 'react';
import * as React from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// material
import { Link, Stack, Checkbox, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// routes
import { PATH_AUTH } from '../../../routes/paths';
import { PATH_AFTER_LOGIN } from '../../../config';

import Iconify from '../../../components/Iconify';

import { AppAuthContext } from '../../../auth/AppAuthContext';
import { storeAuthInfo } from '../../../auth/AppAuthStorage';
import { loginPartner } from '../../../services/JRMPartnerAuthService';
import MuiTextField from "src/components/formfield/TextField";
// ----------------------------------------------------------------------

export default function LoginFormik() {
  const navigate = useNavigate();
  const [isInd, setInd]= useState('IN');
  const authContext = useContext(AppAuthContext);
  const saveAuthInfo = async (authInfo) => {
    //console.log('Storing Auth Info ', authInfo);
    storeAuthInfo(authInfo);
  };

  useEffect(() => {
    async function fetchData(){
      const response = await axios.get('https://api.country.is')
      console.log("response",response);
      // setInd(response.data.country);
      setInd('US');
    }
  fetchData();
  },[]);
  const storedLocation=localStorage.getItem('storedLocation');

  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    emailAddress: Yup.string().email('Email must be a valid email address').max(50).when('isIndia',{is: v => v && v === 'IN',
      then: Yup.string().email('Email must be a valid email address').max(50),otherwise: Yup.string().email('Email must be a valid email address').max(50).required('Email is required')
      }),
      mobileNumber: Yup.string().nullable().when('isIndia',{is: value => value && value === 'IN', then:Yup.string().required('Mobile number is required').nullable(),otherwise: Yup.string().nullable()}),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'min length should be 6'),
  });

  const formik = useFormik({
    initialValues: {
      isIndia : isInd,
      emailAddress: '',
      mobileNumber: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      const result = await loginPartner(values);
      console.log(result);
      //  If there is no result then it is an error
      if (!result) {
        toast.error('Error: Unable to communicate');
        console.log('Error: Unable to communicate');
        return;
      }
      if (!result.ok) {
        console.log('Login FAILED status=', result.status);
        if (result.status === 401) {
          toast.error('Invalid email and/or password');
          console.log('Login FAILED status=', result.status);
        } else {
          toast.error('Could not able to login ');
          console.log('Login FAILED status=', result.status);
        }
        return;
      }
      console.log('Login successful', result);
   
      const { emailAddress } = result.data;

      // Check if the user's email matches the admin email
      if (emailAddress === 'asmitha287@gmail.com' || emailAddress === 'jeevinck@jesusredeems.org') {
        // Set the admin role in local storage
        localStorage.setItem('role', 'admin');
      } else {
        // Set the user role (assuming non-admin users)
        localStorage.setItem('role', 'user');
      }
      toast.success('Login successful!');
      //  Store the info received in Login in LocalStorage
      authContext.setUser(result.data);
      saveAuthInfo(result.data);
      let configure = {'Authorization': `Bearer ${result.data.jwt}`} ;
      let resp = await axios .get(`${result.data.profileUrl}/contactinfo`,{headers : configure} )
      let resp1 = await axios .get(`${result.data.profileUrl}/childreninfo`,{headers : configure} )
      let resp2 = await axios .get(`${result.data.profileUrl}/familymemberinfo`,{headers : configure} )
      console.log("login resp",resp);
      if(resp.data.fullName == null || resp.data.fullName == '' || resp.data.fullName == undefined)
      {
        localStorage.setItem('profileStatus', 0);
      }
      else{
        localStorage.setItem('profileStatus', 1);
      }
      let members ={"main":resp.data, "family":resp2.data, "children":resp1.data}
      localStorage.setItem('members',JSON.stringify(members));

      
      // resetForm();
      if (storedLocation) {
        navigate(storedLocation??PATH_AFTER_LOGIN, { replace: true });
        return;
      }
      navigate(PATH_AFTER_LOGIN, { replace: true });
    },
    
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  
  // useEffect(() => {
  //   const storedLocation = localStorage.getItem('storedLocation');
  //   {
  //     console.log('Stored location:', storedLocation);
  //   }

  //   if (storedLocation) {
  //     navigate(storedLocation);
  //   }
  // }, [navigate]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
    {isInd !== 'IN' &&
            <MuiTextField name='emailAddress' label='Email' type='email'  
        onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('emailAddress',val)}}
        value={formik.values.emailAddress}/>
    }
    {isInd === 'IN' &&
        <MuiTextField name='mobileNumber' label='Mobile' type='number'  
        onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('mobileNumber',val)}}
        value={formik.values.mobileNumber}/>
    }

          <MuiTextField name='password' autoComplete="current-password" type={showPassword ? 'text' : 'password'}  
            label="Password"
            onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('password',val)}}
          value={formik.values.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
           
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('remember')}
                checked={values.remember}
              />
            }
            label="Remember me"
          />
          <div>
            <Link
              variant="subtitle2"
              component={RouterLink}
              to={PATH_AUTH.eForgotPassword}
              sx={{ mt: 1 }}
            >
              Forgot password?
            </Link>
          </div>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
