import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// form
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack, IconButton,TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MuiTextField from 'src/components/formfield/TextField';

// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UpdatePasswordForm() {
  const navigate = useNavigate();
  // const { otpverify } = useAuth();

  const [showPassword, setShowPassword] = useState(false);


  const VerifyCodeSchema = Yup.object().shape({
    oldPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });


  const formik = useFormik({
    initialValues:{
    oldPassword:'',
    password:'',
    confirmPassword:'',
    },
    
    validationSchema: VerifyCodeSchema,
    
    onSubmit : async (values) => {
      try{
     // const response = await loginPartner(values);
     // console.log('Password is updated');
     // toast.success('Password is updated successfully');
     
    } catch (ex) {
      toast.error(ex);
    }
  },
});
const { errors, touched,  isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
    <Stack  spacing={2}>
    <MuiTextField name='oldPassword' label='Old Password' type={showPassword ? 'text' : 'password'}  
    onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('oldPassword',val)}}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
          </IconButton>
        </InputAdornment>
      ),
    }}
    value={formik.values.oldPassword}/>

    <MuiTextField name='password' label='New Password' type={showPassword ? 'text' : 'password'}  
    onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('password',val)}}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
            <Iconify icon={showPassword? 'eva:eye-fill' : 'eva:eye-off-fill'} />
          </IconButton>
        </InputAdornment>
      ),
    }} value={formik.values.password} /> 
 
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
<Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton  size="large" type="submit"  variant="contained" loading={isSubmitting}>
                 update Password
                </LoadingButton>
            </Stack>
   
      </Form>
    </FormikProvider>
  );
}
