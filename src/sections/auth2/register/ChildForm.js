import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider, FieldArray, getIn } from 'formik';
import axios from "axios";
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
// @mui
import {
  Grid, Stack, Button, Divider, FormControl, FormLabel, Box, FormHelperText,
  RadioGroup, FormControlLabel, Radio, LinearProgress
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
// import { MobileDatePicker } from '@mui/x-date-pickers';
import { PATH_DASHBOARD } from '../../../routes/paths';

import { getAuthInfo } from '../../../auth/AppAuthStorage';
import { updatePartnerChildrenInfo } from '../../../services/JRMPartnerAuthService';

import MuiSelect from 'src/components/formfield/Select';
import MuiTextField from 'src/components/formfield/TextField';
// components


import { jrmClientUrl } from 'src/partnerconfig';
import MuiMobilePicker from 'src/components/MuiMobilePicker';
import { genderList } from 'src/components/selectionList';

// ----------------------------------------------------------------------

export default function ChildForm() {
  const navigate = useNavigate();
  const theme = useTheme();
  const pId = localStorage.getItem("partnerId");
  const token = localStorage.getItem("jwt");
  const [childCount, setCount] = useState(0);
  const [childdata, setChilddata] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const config = { 'Authorization': `Bearer ${token}` }

  let fetchData = localStorage.getItem("members");
  // console.log ("fetchData", fetchData);
  fetchData = fetchData ? JSON.parse(fetchData) : {};
  useEffect(() => {
    setIsLoading(true);
    setChilddata(fetchData.kids);
    setIsLoading(false);
  }, [childdata]);


  // useEffect(() => {
  //   setIsLoading(true); 
  //   axios
  //     .get(
  //       `${jrmClientUrl}jrms/v1/partners/${pId}/childreninfo`,{headers : config}
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       console.log("response",response.data);
  //       formik.setFieldValue('children',response.data.children);
  //       formik.setFieldValue('relationship',response.data.relationship);
  //       setChilddata(response.data);
  //       setIsLoading(false);
  //       })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  Yup.addMethod(Yup.array, "unique", function (message) {
    return this.test("unique", message, function (list) {
      const mapper = x => x.fullName;
      const set = [...new Set(list.map(mapper))];
      const isUnique = list.length === set.length;
      if (isUnique) {
        return true;
      }
      const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
      return this.createError({
        path: `children[${idx}].fullName`,
        message: message,
      });
    });
  });

  const ValidationSchema = Yup.object().shape({
    relationship: Yup.string().required("Please select your relationship with a child"),
    children: Yup.array().of(
      Yup.object().shape({
        childId: Yup.string(),
        fullName: Yup.string().min(3, 'Too Short!').max(28, 'Too Long!').required("child name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        dateOfBirth: Yup.string().nullable().test("dateOfBirth", "child age must be 50 years or younger", value => { return (moment().diff(moment(value, "yyyy-MM-dd"), "years") < 50) })
          .test("dateOfBirth", "child age must be 1 months or more", value => { return (moment().diff(moment(value, "yyyy-MM-dd"), "days") > 30) }).required("DOB is required"),
        gender: Yup.string().required('gender is required')
      })
    ).unique('This child name is already present'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      relationship: childdata.relationship || 1,
      children: childdata.children || [
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
      console.log("ChildrenInfo request", childrenInfo);
      const authInfo = await getAuthInfo();
      //console.log ("ChildrenInfo authInfo", authInfo);
      const result = await updatePartnerChildrenInfo(authInfo.profileUrl, authInfo.jwt, childrenInfo);
      if (!result.ok) {
        console.log("ChildrenInfo FAILED", result.data);
        return toast.error("Could not update ChildrenInfo", result.data);
      }
      console.log("ChildrenInfo successful", result.data);
      toast.success("Children information updated successfully");
      let resp = await axios.get(`${jrmClientUrl}jrms/v1/partners/${pId}/childreninfo`, { headers: config })
      let fetchMembers = localStorage.getItem("members");
      // console.log ("fetchMembers", fetchMembers);
      fetchMembers = fetchMembers ? JSON.parse(fetchMembers) : {};
      fetchMembers.kids = resp.data;
      localStorage.setItem("members", JSON.stringify(fetchMembers));
      navigate(PATH_DASHBOARD.user.member);
    },
  });
  const { errors, values, touched, isSubmitting, handleSubmit,
    handleBlur, setFieldValue, getFieldProps } = formik;
  const skipForm = () => {
    navigate(PATH_DASHBOARD.user.member);
  }

  useEffect(() => {
    setCount(values.children.length);
  }, [values.children]);
  return (
    <>
      {isLoading ?
        <Box sx={{ position: 'relative' }}>
          <LinearProgress size={80}
            thickness={20}

            value={100} />
        </Box>
        :
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
                              // const childCount = index + 1;

                              const fullName = `children[${index}].fullName`;
                              const touchedfullName = getIn(touched, fullName);
                              const errorfullName = getIn(errors, fullName);

                              const dateOfBirth = `children[${index}].dateOfBirth`;
                              const toucheddateOfBirth = getIn(touched, dateOfBirth);
                              const errordateOfBirth = getIn(errors, dateOfBirth);

                              const gender = `children[${index}].gender`;
                              const touchedgender = getIn(touched, gender);
                              const errorgender = getIn(errors, gender);

                              // let minYear = new Date().getFullYear() - 15;

                              return (
                                <div key={index}>

                                  <Stack spacing={3}>
                                    Child {index + 1} Details<br />
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                                      <MuiTextField name={fullName} label='Child name' onBlur={handleBlur} required enableUpperCase={true}
                                        onChange={(e, v) => { const val = e.target.value || ""; formik.setFieldValue(fullName, val.toUpperCase()) }}
                                        value={p.fullName.toUpperCase()}
                                        sx={{ [theme.breakpoints.up('md')]: { maxWidth: '20%' }, [theme.breakpoints.up('xs')]: { minWidth: '20%' } }}
                                        helperText={touchedfullName && errorfullName ? errorfullName : ""}
                                        error={Boolean(touchedfullName && errorfullName)}
                                        size="small" />


                                      <MuiMobilePicker name={dateOfBirth}
                                        label="Child Date of Birth"
                                        minDate={new Date("1970")}
                                        maxDate={new Date()}
                                        value={p.dateOfBirth}
                                        sx={{ [theme.breakpoints.up('md')]: { maxWidth: '20%' }, [theme.breakpoints.up('xs')]: { minWidth: '20%' } }}
                                        onChange={(value) => { setFieldValue(dateOfBirth, value === null || new Intl.DateTimeFormat("en-GB").format(new Date(value)).split("/").reverse().join("/")) }}
                                        helperText={toucheddateOfBirth && errordateOfBirth ? errordateOfBirth : ""}
                                        error={Boolean(toucheddateOfBirth && errordateOfBirth)} />

                                      <MuiSelect name={gender}
                                        value={p.gender}
                                        sx={{ [theme.breakpoints.up('md')]: { maxWidth: '20%' }, [theme.breakpoints.up('xs')]: { minWidth: '20%' } }}
                                        align="left" label="Gender"
                                        options={genderList}
                                        onChange={(e) => { formik.setFieldValue(gender, e.target.value) }}
                                        helperText={touchedgender && errorgender ? errorgender : ""}
                                        error={Boolean(touchedgender && errorgender)} />

                                      <FormControl align='flex-end'>
                                        <Button
                                          // sx={{[theme.breakpoints.up('md')]:{maxWidth:'20%'},[theme.breakpoints.up('xs')]:{minWidth:'20%'} }} 
                                          color="error" size="small"
                                          variant="outlined"
                                          onClick={() => {
                                            remove(index);
                                            setCount(index)
                                          }}
                                        >
                                          - Remove {index + 1}
                                        </Button>
                                      </FormControl>
                                    </Stack>
                                    <Divider sx={{ borderBottomWidth: 5, backgroundColor: "black", marginTop: 4, }} />
                                  </Stack>
                                </div>
                              );
                            })}

                            {/* {childCount < 10 && */}
                              <Stack alignItems="flex-end" sx={{ mt: 3 }}>

                                <Button
                                  variant="contained"
                                  disabled={formik.values.relationship < 2 && childCount > 11}
                                  onClick={() =>
                                    push({ fullName: "", dateOfBirth: "", gender: "" })
                                  }
                                >
                                  Add Child +
                                </Button>
                              </Stack>
                            {/* // } */}
                          </div>
                        )}
                      </FieldArray>

                      <div style={{ color: "red", marginBottom: "8px" }}>
                        {(typeof errors.children) === 'string' ? errors.children : ""}
                      </div>
                      <p> Total Child Count  : {childCount}</p>
                    </>
                  }

                  <Divider style={{ marginTop: 40, marginBottom: 40 }} />
                </Stack>
              </Stack>
            </Grid>

            {/* _________________________________________________________________________________________________ */}


            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton disabled={childCount === 0 || formik.values.relationship === 0} size="large" type="submit" variant="contained" loading={isSubmitting}>
                save
              </LoadingButton>
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton  size="large" type="submit" variant="contained" color='info' loading={isSubmitting}>
                save changes
              </LoadingButton>
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton size="large" type="submit" color="secondary" variant="contained" onClick={skipForm}>
                Skip this section
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
      }
    </>
  );
}
