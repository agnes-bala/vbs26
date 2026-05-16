import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// form
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack, TextField, FormControl, Box, Autocomplete } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// hooks
import { storeContactInfo } from '../../../auth/AppAuthStorage';
import { registerPartnerMobile } from '../../../services/JRMPartnerAuthService';
// import useAuth from '../../../hooks/useAuth';
import { PATH_AUTH } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  // const { register } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((response) => {
        console.log("response", response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const country = [...new Set(data.map((item) => item.country))];
  // const sortcountry = country.sort();

  const handleCountry = (event, value) => {
    formik.setFieldValue('country', value);

  };

  const RegisterSchema = Yup.object().shape({
    emailAddress: Yup.string().email('Email must be a valid email address').required('Email is required').max(50),
    confirmemailAddress: Yup.string().oneOf([Yup.ref('emailAddress'), null], 'Email address must match').required('Confirm Email is required'),
    mobileNumber: Yup.number().when('country', {
      is: value => value && value === 'India', then: Yup.number().required('Mobile number is required').min(6001000000, 'Invaid number').max(9999000000, 'Invaid Number'), otherwise: Yup.number().nullable().test(
        'Is positive?', 'Invalid Number', (value) => value > 0).min(1000, 'number is too short').max(999999999999999, 'number is too large')
    }),
    confirmmobileNumber: Yup.number()
      .required('Confirm mobile number is required')
      .oneOf([Yup.ref('mobileNumber'), null], 'Mobile number must match'),
    // Address Data
    country: Yup.string().required('country is required').nullable(),
  });

  const formik = useFormik({
    initialValues: {
      country: '',
      emailAddress: '', mobileNumber: '',
      confirmemailAddress: '', confirmmobileNumber: '',
    },

    validationSchema: RegisterSchema,
    onSubmit: async (partnerDetails) => {
      const result = await registerPartnerMobile(partnerDetails);

      if (!result.ok) {
        console.log("Registration FAILED", result.data);
        toast.error(result.data.message);
        alert('You have already registered with this email id/mobile number. You can login with that password. If you forgot your password, you can reset it');
        return;
      }

      console.log("Registration successful - Verify OTP", result.data);
      toast.success("Verify OTP");

      //  Store the Contact Info for validation
      const contactInfo = {
        "emailAddress": partnerDetails.emailAddress,
        "mobileNumber": partnerDetails.mobileNumber, "country": partnerDetails.country
      };
      storeContactInfo(contactInfo);


      if (result.data.verifyMobileUrl !== null && result.data.verifyMobileUrl !== "") {
        navigate(PATH_AUTH.verifyMobile);
      } else if (result.data.verifyEmailUrl !== null && result.data.verifyEmailUrl !== "") {
        navigate(PATH_AUTH.verifyEmail);
      }
      else {
        //  Error
        toast.error(`Error sending OTP  ${result.data.message}`);
      }
      // localStorage.setItem('country',partnerDetails.country);

    },
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

          <FormControl sx={{ minWidth: '50%' }}>

            <Autocomplete
              required
              autoSelect
              autoComplete
              autoHighlight
              blurOnSelect
              onChange={(event, value) => handleCountry(event, value)}
              id="country"
              options={country}
              getOptionLabel={(country) => `${country}`}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              noOptionsText={"No Available Data"}
              renderOption={(props, country) => (
                <Box component="li" {...props} key={country} value={country}>
                  {country}
                </Box>
              )}
              clearOnEscape

              renderInput={(params) => <TextField {...params} label="Country" {...getFieldProps('country')}
                error={Boolean(touched.country && errors.country)}
                helperText={touched.country && errors.country} />}
            />

          </FormControl>
          <TextField
            fullWidth
            label="Email"
            {...getFieldProps('emailAddress')}
            error={Boolean(touched.emailAddress && errors.emailAddress)}
            helperText={touched.emailAddress && errors.emailAddress}
          />
          <TextField
            fullWidth
            label="Confirm Email"
            {...getFieldProps('confirmemailAddress')}
            error={Boolean(touched.confirmemailAddress && errors.confirmemailAddress)}
            helperText={touched.confirmemailAddress && errors.confirmemailAddress}
          />


          <TextField

            fullWidth
            label="Mobile"
            type="number"

            {...getFieldProps('mobileNumber')}
            error={Boolean(touched.mobileNumber && errors.mobileNumber)}
            helperText={touched.mobileNumber && errors.mobileNumber}
          />
          <TextField

            fullWidth
            label="Confirm Mobile"
            type="number"

            {...getFieldProps('confirmmobileNumber')}
            error={Boolean(touched.confirmmobileNumber && errors.confirmmobileNumber)}
            helperText={touched.confirmmobileNumber && errors.confirmmobileNumber}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>

      </Form>
    </FormikProvider>
  );

}
