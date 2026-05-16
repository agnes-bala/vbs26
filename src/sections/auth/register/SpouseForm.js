import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// @mui
import {
  Grid, Stack, TextField, Divider, FormControl,
  FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, FormHelperText
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MobileDatePicker } from '@mui/x-date-pickers';
import moment from "moment";
import { PATH_DASHBOARD } from '../../../routes/paths';

import { getAuthInfo } from '../../../auth/AppAuthStorage';
import { updatePartnerSpouseInfo } from '../../../services/JRMPartnerAuthService';
import config from "../../../partnerconfig.json";
// ----------------------------------------------------------------------


const occupationList = [
  { _id: "1", name: "Student" },
  { _id: "2", name: "Private Employee" },
  { _id: "3", name: "Government Employee" },
  { _id: "4", name: "Business" },
  { _id: "5", name: "Homemaker" },
  { _id: "6", name: "Self Employed" },
  { _id: "7", name: "Reverend" },
  { _id: "8", name: "Pastor" },
  { _id: "9", name: "Others" },
  { _id: "10", name: "Dont Want To Mention" },
];
const url = config.jrmClientUrl;

export default function SpouseForm() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const pId = localStorage.getItem("partnerId");
  const token = localStorage.getItem("jwt");
  const [spousedata, setSpousedata] = useState([]);

  useEffect(() => {
    const config = { 'Authorization': `Bearer ${token}` }
    fetch(`${url}jrms/v1/partners/${pId}/contactinfo`, { headers: config })
      .then((spousedata) => spousedata.json())
      .then((spousedata) => setSpousedata(spousedata))
  }, [pId, token]);
  console.log(spousedata);


  const RegisterSchema = Yup.object().shape({
    maritalStatus: Yup.string().required(),
    weddingDay: Yup.string().nullable().when('maritalStatus', {
      is: value => value && value === '1',
      then: Yup.string().test("weddingDay", "Date must be greater than 10 months", value => { return (moment().diff(moment(value, "YYYY/MM/DD"), "months", true) >= 10) }).required("weddingDay is required").typeError('Valid date is required')
    }),

    spouseName: Yup.string().min(3, 'Too Short!').max(28, 'Too Long!').when('maritalStatus', {
      is: value => value && value === '1', then: Yup.string().min(3, 'Too Short!').max(28, 'Too Long!')
        .required('Spouse Name required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    }),

    spouseDateOfBirth: Yup.string().nullable().when('maritalStatus', {
      is: value => value && value === '1',
      then: Yup.string().test("spouseDateOfBirth", "You must be 18 years or older", value => { return (moment().diff(moment(value, "YYYY/MM/DD"), "years") >= 18) }).required("DOB is required").typeError('Valid date is required')
    }),

    spouseOccupation: Yup.string().required("Spouse Occupation is required"),
  });



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maritalStatus: spousedata.maritalStatus || '1',
      weddingDay: spousedata.weddingDay || null,
      spouseName: spousedata.spouseName || '',
      spouseDateOfBirth: spousedata.spouseDateOfBirth || null,
      spouseOccupation: spousedata.spouseOccupation || '',
    },

    validationSchema: RegisterSchema,
    onSubmit: async (spouseInfo) => {
      console.log("spouseInfo request", spouseInfo);
      const authInfo = await getAuthInfo();
      console.log("spouseInfo authInfo", authInfo);
      //  Update the contact Info to server
      const result = await updatePartnerSpouseInfo(authInfo.profileUrl,
        authInfo.jwt, spouseInfo
      );
      if (!result.ok) {
        console.log("spouseInfo FAILED", result.data);
        return toast.error("Could not update spouse information ", result.data.message);
      }

      console.log("spouseInfo successful", result.data);
      toast.success("spouse information updated successfully");
      navigate(PATH_DASHBOARD.user.child);

    },
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const skipForm = () => {
    navigate(PATH_DASHBOARD.user.child);
  }

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((response) => {
        // console.log(response);
        console.log(data)
        setData(response.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, [formik, data]);


  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>

            <Stack spacing={3} >
              <FormControl disabled >
                <FormLabel>Marital Status (Fill up form for parent only)</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="0"
                  value={formik.values.maritalStatus}
                  onChange={(e) => {
                    formik.setFieldValue("maritalStatus", e.currentTarget.value);
                  }}
                  {...getFieldProps('maritalStatus')}
                  error={touched.maritalStatus && errors.maritalStatus}
                >
                  <FormControlLabel value="0" control={<Radio />} label="Single" />
                  <FormControlLabel value="1" control={<Radio />} label="Married" />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3} >
              {formik.values.maritalStatus === '1' && (
                <>
                  <Divider>Spouse Detail</Divider>
                  <MobileDatePicker
                    disableFuture
                    label="Wedding Date"
                    minDate={new Date("1947/01/01")}
                    maxDate={new Date('2026/12/31')}
                    openTo="year"
                    views={['year', 'month', 'day']}
                    inputFormat="yyyy/MM/dd"
                    value={formik.values.weddingDay || ""}
                    onChange={(value) => { formik.setFieldValue('weddingDay', value === null ? "" : moment(value).format('YYYY/MM/DD')); }}
                    renderInput={(params) => (<TextField {...params}
                      {...getFieldProps('weddingDay')}
                      error={Boolean(touched.weddingDay && errors.weddingDay)}
                      helperText={touched.weddingDay && errors.weddingDay}
                    />)}
                  />

                  <TextField fullWidth
                    label="Spouse name"
                    value={formik.values.spouseName || ""}
                    onChange={(e) => { formik.setFieldValue('spouseName', e) }}
                    {...getFieldProps('spouseName')}
                    error={Boolean(touched.spouseName && errors.spouseName)}
                    helperText={touched.spouseName && errors.spouseName}
                  />

                  <MobileDatePicker
                    label="Spouse DOB"
                    disableFuture
                    minDate={new Date("1930/01/01")}
                    maxDate={new Date('2012/12/31')}
                    openTo="year"
                    views={['year', 'month', 'day']}
                    inputFormat="yyyy/MM/dd"
                    value={formik.values.spouseDateOfBirth || ""}
                    onChange={(value) => { formik.setFieldValue('spouseDateOfBirth', value === null ? "" : moment(value).format('YYYY/MM/DD')); }}
                    renderInput={(params) => (<TextField {...params}
                      {...getFieldProps('spouseDateOfBirth')}
                      error={Boolean(touched.spouseDateOfBirth && errors.spouseDateOfBirth)}
                      helperText={touched.spouseDateOfBirth && errors.spouseDateOfBirth}
                    />)}
                  />
                  <FormControl sx={{ minWidth: '50%' }}>
                    <Select
                      align="left"
                      label=" Spouse Occupation"
                      name="spouseOccupation"
                      value={spousedata.spouseOccupation}
                      onChange={(e, value) => { formik.setFieldValue('spouseOccupation', value) }}
                      {...getFieldProps('spouseOccupation')}
                    >
                      {occupationList.map(option => (
                        <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                      ))}
                    </Select>
                    <InputLabel id="spouseOccupation" color={touched.occupation && errors.occupation ? 'error' : 'primary'}> Spouse Occupation</InputLabel>
                    <FormHelperText error>{touched.occupation && errors.occupation}</FormHelperText>

                  </FormControl>

                </>)}
            </Stack>
          </Grid>
        </Grid>
        {/* _________________________________________________________________________________________________ */}

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Next
          </LoadingButton>

        </Stack>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton size="large" type="submit" color="secondary" variant="contained" onClick={skipForm}>
            Skip this section
          </LoadingButton>

        </Stack>

      </Form>
    </FormikProvider>
  );
}
