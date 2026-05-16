import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider, FieldArray, getIn } from 'formik';
import axios from "axios";
import { toast } from 'react-toastify';
// @mui
import {
  Grid, Stack, TextField, Button, Divider, FormControl, FormLabel, FormHelperText,
  RadioGroup, FormControlLabel, Radio, MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MobileDatePicker } from '@mui/x-date-pickers';

import moment from "moment";
import { PATH_DASHBOARD } from '../../../routes/paths';
import { getAuthInfo } from '../../../auth/AppAuthStorage';
import { updatePartnerChildrenInfo } from '../../../services/JRMPartnerAuthService';
// components

import config from "../../../partnerconfig.json";

// ----------------------------------------------------------------------

const genderList = [
  { _id: "1", name: "Male" },
  { _id: "2", name: "Female" }
];

const url = config.jrmClientUrl;

export default function ChildForm() {
  const navigate = useNavigate();

  // const pId = localStorage.getItem("partnerId");
  // const token = localStorage.getItem("jwt");
  const [childCount, setCount] = useState(0);
  const [childdata, setChilddata] = useState({});

  // const config = { 'Authorization': `Bearer ${token}` }




  const ValidationSchema = Yup.object().shape({
    relationship: Yup.string().required("Please select your relationship with a child"),
    children: Yup.array().of(
      Yup.object().shape({
        childId: Yup.string(),
        fullName: Yup.string().min(3, 'Too Short!').max(28, 'Too Long!').required("child name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        dateOfBirth: Yup.string().nullable().test("dateOfBirth", "You must be 15 years or younger", value => { return (moment().diff(moment(value, "YYYY-MM-DD"), "years") < 15) })
          .test("dateOfBirth", "child age must be 5 months or more", value => { return (moment().diff(moment(value, "YYYY-MM-DD"), "months") > 5) }).required("DOB is required"),
        gender: Yup.string().required('gender is required')
      })
    ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      relationship: childdata.relationship || 0,
      children: [
        {
          childId: "",
          fullName: '',
          dateOfBirth: "",
          gender: "",
        },
      ]
    },

    validationSchema: ValidationSchema,
    onSubmit: async (childrenInfo) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("ChildrenInfo request", childrenInfo);
      const authInfo = await getAuthInfo();
      console.log("ChildrenInfo authInfo", authInfo);
      //  Update the contact Info to server
      const result = await updatePartnerChildrenInfo(authInfo.profileUrl, authInfo.jwt, childrenInfo);
      if (!result.ok) {
        console.log("ChildrenInfo FAILED", result.data);
        return toast.error("Could not update ChildrenInfo", result.data);
      }
      console.log("ChildrenInfo successful", result.data);
      toast.success("Children information updated successfully");

      navigate(PATH_DASHBOARD.general.myapp);
    },
  });
  const { errors, values, touched, isSubmitting, handleSubmit, handleChange,
    handleBlur, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    const pId = localStorage.getItem("partnerId");
    const token = localStorage.getItem("jwt");
    const config = { 'Authorization': `Bearer ${token}` }
    axios
      .get(`${url}jrms/v1/partners/${pId}/childreninfo`, { headers: config })
      .then((response) => {
        formik.setFieldValue('children', response.data.children);
        formik.setFieldValue('relationship', response.data.relationship);
        console.log(setChilddata)
      })
      .catch((err) => console.log(err));
    // axios
    //   .get(
    //     `${url}jrms/v1/partners/${pId}/childreninfo`, { headers: config }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     console.log("response", response.data);

    //     formik.setFieldValue('children', response.data.children);
    //     formik.setFieldValue('relationship', response.data.relationship);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [formik]);

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <Grid item xs={12} md={6} lg={6}>

          <Stack spacing={3} >

            <Stack spacing={3} >
              <FormControl>
                <FormLabel>Relationship to a Child/Children</FormLabel>
                <RadioGroup
                  row
                  name="relationship"
                  value={formik.values.relationship}
                  onChange={(e) => {
                    formik.setFieldValue("relationship", e.currentTarget.value);

                  }}

                  {...getFieldProps('relationship')}
                  error={touched.relationship && errors.relationship}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Parent" />
                  <FormControlLabel value="2" control={<Radio />} label="Guardian" />
                </RadioGroup>
                <FormHelperText error>{touched.relationship && errors.relationship}</FormHelperText>
              </FormControl>
              {formik.values.relationship !== 0 &&
                <>
                  <FieldArray name="children">
                    {({ push, remove }) => (
                      <div>
                        {values.children.map((p, index) => {
                          const childCount = index + 1;
                          setCount(childCount);
                          const fullName = `children[${index}].fullName`;
                          const touchedchildName = getIn(touched, fullName);
                          const errorchildName = getIn(errors, fullName);

                          const dateOfBirth = `children[${index}].dateOfBirth`;
                          const touchedchildDOB = getIn(touched, dateOfBirth);
                          const errorchildDOB = getIn(errors, dateOfBirth);

                          const gender = `children[${index}].gender`;
                          const touchedchildGender = getIn(touched, gender);
                          const errorchildGender = getIn(errors, gender);

                          return (
                            <div key={index}>

                              {/* <Divider sx={{ borderBottomWidth: 5, backgroundColor: "blue", marginBottom: 4, marginTop: 1 }} /> */}

                              <Stack spacing={3}>
                                <br></br>
                                Child {index + 1} Details<br />
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                                  <TextField sx={{ minWidth: '25%' }}

                                    variant="outlined"
                                    label="Child name"
                                    name={fullName}
                                    value={p.fullName.toUpperCase()}
                                    required
                                    helperText={
                                      touchedchildName && errorchildName
                                        ? errorchildName
                                        : ""
                                    }
                                    // size="small"
                                    error={Boolean(touchedchildName && errorchildName)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />

                                  <MobileDatePicker
                                    name={dateOfBirth}
                                    disableFuture
                                    minDate={new Date("2007/01/01")}
                                    maxDate={new Date('2025/04')}
                                    placeholder='yyyy/MM/dd'
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    inputFormat="yyyy/MM/dd"
                                    label="Child Date of Birth"
                                    value={p.dateOfBirth}
                                    onChange={(value) => { setFieldValue(dateOfBirth, value === null || moment(value).format('YYYY/MM/DD')); }}
                                    renderInput={(params) => (<TextField {...params}
                                      error={Boolean(touchedchildDOB && errorchildDOB)}
                                      helperText={
                                        touchedchildDOB && errorchildDOB
                                          ? errorchildDOB
                                          : ""
                                      }
                                    />)}
                                  />

                                  <TextField
                                    select
                                    variant="outlined"
                                    align="left"
                                    label="Gender"
                                    name={gender}
                                    sx={{ minWidth: '20%' }}
                                    onChange={(e) => { formik.setFieldValue({ gender }, e) }}
                                    {...getFieldProps(gender)}
                                    helperText={
                                      touchedchildGender && errorchildGender
                                        ? errorchildGender
                                        : ""
                                    }
                                    error={Boolean(touchedchildGender && errorchildGender)}

                                  >
                                    {genderList.map(option => (
                                      <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                                    ))}
                                  </TextField>
                                  <FormControl alignItems='flex-end'>
                                    <Button sx={{ minWidth: '20%', mt: 2 }}
                                      color="secondary" size="small"
                                      variant="outlined"
                                      // sx={{ mt: { xs: 2, sm: 0 } }}
                                      onClick={() => {
                                        remove(index);
                                        setCount(index)
                                      }}
                                    >
                                      - Remove {index + 1}
                                    </Button>
                                  </FormControl>
                                </Stack>
                                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}

                                {/* <FormControl sx={{ minWidth: '25%' }}> */}
                                {/* 
                                    <TextField
                                      select
                                      variant="outlined"
                                      align="left"
                                      label="Gender"
                                      name={gender}
                                      onChange={(e) => { formik.setFieldValue({ gender }, e) }}
                                      {...getFieldProps(gender)}
                                      helperText={
                                        touchedchildGender && errorchildGender
                                          ? errorchildGender
                                          : ""
                                      }
                                      error={Boolean(touchedchildGender && errorchildGender)}

                                    >
                                      {genderList.map(option => (
                                        <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                                      ))}
                                    </TextField> */}

                                {/* </FormControl> */}

                                {/* <FormControl alignItems='flex-end'>
                                    <Button sx={{ minWidth: '20%' }}
                                      color="secondary" size="small"
                                      variant="outlined"
                                      onClick={() => {
                                        remove(index);
                                        setCount(index)
                                      }}
                                    >
                                      - Remove {index + 1}
                                    </Button>
                                  </FormControl> */}
                                {/* </Stack> */}
                                {/* <Divider sx={{ borderBottomWidth: 5, backgroundColor: "blue", marginTop: 6, }} /> */}
                              </Stack>
                            </div>
                          );
                        })}

                        {childCount < 10 &&
                          <Stack alignItems="flex-end" sx={{ mt: 3 }}>

                            <Button
                              variant="contained"
                              disabled={formik.values.relationship < 2 && childCount > 11}
                              color='inherit'
                              onClick={() =>
                                push({ fullName: "", dateOfBirth: "", gender: "" })
                              }
                            >
                              Add Child +
                            </Button>
                          </Stack>
                        }
                      </div>
                    )}
                  </FieldArray>

                  <p> Total Child Count  : {childCount}</p>
                </>
              }
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton disabled={childCount === 0 && formik.values.relationship === 0} size="large" type="submit" variant="contained" color='info' loading={isSubmitting}>
                  save changes
                </LoadingButton>
              </Stack>
              <Divider style={{ marginTop: 40, marginBottom: 40 }} />

            </Stack>
          </Stack>
        </Grid>

        {/* _________________________________________________________________________________________________ */}


        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton disabled={childCount === 0 && formik.values.relationship === 0} size="large" type="submit" variant="contained" color='info' loading={isSubmitting}>
            save changes
          </LoadingButton>
        </Stack>
        {/* <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            {debug && (
              <>
                <pre style={{ textAlign: "left" }}>
                  <strong>Values</strong>
                  <br />
                  {JSON.stringify(values, null, 2)}
                </pre>
                <pre style={{ textAlign: "left" }}>
                  <strong>Errors</strong>
                  <br />
                  {JSON.stringify(errors, null, 2)}
                </pre>
              </>
            )} */}

      </Form>
    </FormikProvider>

  );
}
