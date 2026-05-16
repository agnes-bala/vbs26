import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// form
import { useFormik, Form, FormikProvider } from 'formik';

// @mui
import { Stack, IconButton,TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hook
import { getSetPasswordInfo, removeSetPasswordInfo } from '../../../auth/AppAuthStorage';
import { setPassword } from '../../../services/JRMPartnerAuthService';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------

export default function SetPasswordForm() {
  const navigate = useNavigate();
 
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
      
       //  Retrieve the JWT and the Url
       const setPasswordInfo = await getSetPasswordInfo();
       console.log ("Set Password retrieve info", setPasswordInfo);
       
       const result = await setPassword(setPasswordInfo, passwordDetails);
       console.log("password JEEVIN",passwordDetails);
       if (!result.ok) {
        console.log ("Set Password FAILED", result.data);
        return toast.error ("ERROR: Could not set password ");
          }

    //  Remove the SetPasswordInfo 
    removeSetPasswordInfo();

    console.log ("Password successfully set", result.data);
    toast.success ("Password successfully set");
    navigate(PATH_AUTH.login, { replace: true });
}   
  },
);
const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
    <Stack  spacing={2}>
 
        <TextField
          name="password"
          label="Password"
          type= 'password'
          {...getFieldProps('password')}
        error={Boolean(touched.password && errors.password)}
        helperText={touched.password && errors.password}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...getFieldProps('confirmPassword')}
        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
        helperText={touched.confirmPassword && errors.confirmPassword}
        />
</Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
          Set password
        </LoadingButton>
   
      </Form>
    </FormikProvider>
  );
}
