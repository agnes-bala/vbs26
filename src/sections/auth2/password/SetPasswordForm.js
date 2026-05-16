import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// form
import { useFormik, Form, FormikProvider } from 'formik';

// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hook
//import { getSetPasswordInfo, removeSetPasswordInfo } from '../../../auth/AppAuthStorage';
import { setPassword } from '../../../services/JRMPartnerAuthService';
// routes
//import { PATH_AUTH } from '../../../routes/paths';
import { config } from 'src/partnerconfig';
// components
import Iconify from '../../../components/Iconify';
import MuiTextField from '../../../components/formfield/TextField';

// ----------------------------------------------------------------------

export default function SetPasswordForm() {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const pId = localStorage.getItem('partnerId');
 
  const [showPassword, setShowPassword] = useState(false);

  const VerifyCodeSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Password must match'),
  });

  const formik = useFormik({
    initialValues:{
    password:'',
    },
    
    validationSchema: VerifyCodeSchema,
    onSubmit : async (passwordDetails) => {
      console.log("passwordDetails",passwordDetails);
      
      try {
        const result1 = await setPassword({oneTimeJWT:jwt,...passwordDetails},`${config.jrmPartnerProfileUrl}/${pId}/setpassword`
        );
        console.log("Password update", result1);
        
        if (result1.status > 300 ) {
          console.log("Password update FAILED", result1.data);
          return toast.error("Error in Password update", result1.data?.message || "Unknown error");
        }
        console.log ("Password successfully set", result1.data);
        toast.success ("Password successfully set");
      } catch (error) {
        console.error("Password update error:", error);
        return toast.error("Error in Password update", error.message || "Unknown error");
      }

    

}   
  },
);
const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
    <Stack  spacing={2}>
 
    <MuiTextField name='password' label='password' type='password'  
        onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('password',val)}}
        value={formik.values.password}/>

    <MuiTextField name='confirmPassword' label='Confirm Password' type={showPassword ? 'text' : 'password'}  
    onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('confirmPassword',val)}}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
          </IconButton>
        </InputAdornment>
      ),
    }}
    value={formik.values.confirmPassword}/>
        
</Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
          Set password
        </LoadingButton>
   
      </Form>
    </FormikProvider>
  );
}
