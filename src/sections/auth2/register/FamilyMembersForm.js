import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider, FieldArray, getIn } from 'formik';
import axios from "axios";
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
// @mui
import { Grid, Stack, Box, Button, Divider, FormControl, Tooltip, LinearProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { PATH_DASHBOARD } from '../../../routes/paths';
import { getAuthInfo } from '../../../auth/AppAuthStorage';
import { updatePartnerAddlMemberInfo } from '../../../services/JRMPartnerAuthService';
// components
import { jrmClientUrl } from 'src/partnerconfig';

import MuiSelect from 'src/components/formfield/Select';
import MuiTextField from 'src/components/formfield/TextField';

import MuiMobilePicker from 'src/components/MuiMobilePicker';
import { genderList, occupationList } from 'src/components/selectionList';
// ----------------------------------------------------------------------


export default function FamilyMembersForm() {
  const navigate = useNavigate();
  const theme = useTheme();

  const pId = localStorage.getItem("partnerId");
  const token = localStorage.getItem("jwt");
  const [memberCount, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [familydata, setFamilydata] = useState([]);
  const config = { 'Authorization': `Bearer ${token}` }
  // let relationList = relationshipList.filter(f=> f._id < 90)
  let fetchData = localStorage.getItem("members");
  // console.log ("fetchData", fetchData);
  fetchData = fetchData ? JSON.parse(fetchData) : {};
  useEffect(() => {
    setIsLoading(true);
    setFamilydata(fetchData.family.addlFamilyMemberInfos);
    setIsLoading(false);
  }, [familydata]);

  // useEffect(() => {
  //   setIsLoading(true); 
  //   axios
  //     .get(
  //       `${jrmClientUrl}jrms/v1/partners/${pId}/familymemberinfo`,{headers : config}
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       console.log("response",response.data);
  //       formik.setFieldValue('addlFamilyMemberInfos',response.data.addlFamilyMemberInfos);
  //       setIsLoading(false);
  //       })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  Yup.addMethod(Yup.array, "unique", function (message) {
    return this.test("unique", message, function (list) {
      if (list !== null || list !== undefined) {
        const mapper = x => x.fullName;
        const set = [...new Set(list.map(mapper))];
        const isUnique = list.length === set.length;
        if (isUnique) {
          return true;
        }

        const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
        return this.createError({
          message: `${message} on detail ${idx + 1} data`,
        });
      }
    });
  });

  const ValidationSchema = Yup.object().shape({

    addlFamilyMemberInfos: Yup.array().of(
      Yup.object().shape({
        addlFamilyMemberId: Yup.string(),
        fullName: Yup.string().min(3, 'Too Short!').max(28, 'Too Long!').required("member name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        dateOfBirth: Yup.string().nullable().test("dateOfBirth", "Member age should be 1 or above", value => { return (moment().diff(moment(value, "yyyy-MM-dd"), "years") > 1) })
          .required("DOB is required"),
        gender: Yup.string().required('gender is required'),
        relationship: Yup.number().required("Please select your relationship with a member").min(1, "Please select your relationship with a member"),
        occupation: Yup.number().required('occupation is required').min(1, "Please select your occupation")

      })
    ).unique('Duplicate Member name'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      addlFamilyMemberInfos: familydata || [
        {
          addlFamilyMemberId: "",
          fullName: '',
          dateOfBirth: "",
          gender: "",
          relationship: "",
          occupation: "",
        },
      ]
    },
    validationSchema: ValidationSchema,
    onSubmit: async (memberInfo) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("memberInfo request", memberInfo);
      const authInfo = await getAuthInfo();
      //console.log ("memberInfo authInfo", authInfo);
      //  Update the contact Info to server
      const result = await updatePartnerAddlMemberInfo(authInfo.profileUrl, authInfo.jwt, memberInfo);
      if (!result.ok) {
        console.log("MemberInfo FAILED", result.data);
        return toast.error("Could not update MemberInfo", result.data);
      }
      console.log("MemberInfo successful", result.data);
      toast.success("Member information updated successfully");
      let resp = await axios.get(`${jrmClientUrl}jrms/v1/partners/${pId}/familymemberinfo`, { headers: config })
      let fetchMembers = localStorage.getItem("members");
      //console.log ("fetchMembers", fetchMembers);
      fetchMembers = fetchMembers ? JSON.parse(fetchMembers) : {};
      fetchMembers.family = resp.data;
      localStorage.setItem("members", JSON.stringify(fetchMembers));
      const storedLocation = localStorage.getItem('storedLocation');
      if (storedLocation) {
        navigate(storedLocation, { replace: true });
      }
      navigate(PATH_DASHBOARD.general.myapp);
    },
  });
  const { errors, values, touched, isSubmitting, handleSubmit,
    handleBlur, setFieldValue, getFieldProps } = formik;
  useEffect(() => {
    setCount(values.addlFamilyMemberInfos.length);
  }, [values.addlFamilyMemberInfos]);

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
                  <>
                    <FieldArray name="addlFamilyMemberInfos">
                      {({ push, remove }) => (
                        <div>
                          {values.addlFamilyMemberInfos.map((p, index) => {


                            const fullName = `addlFamilyMemberInfos[${index}].fullName`;
                            const touchedfullName = getIn(touched, fullName);
                            const errorfullName = getIn(errors, fullName);

                            const dateOfBirth = `addlFamilyMemberInfos[${index}].dateOfBirth`;
                            const toucheddateOfBirth = getIn(touched, dateOfBirth);
                            const errordateOfBirth = getIn(errors, dateOfBirth);

                            const gender = `addlFamilyMemberInfos[${index}].gender`;
                            const touchedgender = getIn(touched, gender);
                            const errorgender = getIn(errors, gender);

                            const relationship = `addlFamilyMemberInfos[${index}].relationship`;
                            const touchedrelationship = getIn(touched, relationship);
                            const errorrelationship = getIn(errors, relationship);

                            const occupation = `addlFamilyMemberInfos[${index}].occupation`;
                            const touchedoccupation = getIn(touched, occupation);
                            const erroroccupation = getIn(errors, occupation);

                            const maxDate = new Date().getFullYear() - 15;

                            return (
                              <div key={index}>

                                <Stack spacing={3}>
                                  Member {index + 1} Details<br />
                                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                                    <MuiTextField name={fullName} label='Member name' enableUpperCase={true}
                                      sx={{ [theme.breakpoints.up('md')]: { maxWidth: '20%' }, [theme.breakpoints.up('xs')]: { minWidth: '20%' } }} onBlur={handleBlur} required
                                      onChange={(e, v) => { const val = e.target.value || ""; formik.setFieldValue(fullName, val.toUpperCase()) }}
                                      value={p.fullName.toUpperCase()}
                                      helperText={touchedfullName && errorfullName ? errorfullName : ""}
                                      error={Boolean(touchedfullName && errorfullName)} />


                                    <MuiMobilePicker name={dateOfBirth}
                                      sx={{ [theme.breakpoints.up('md')]: { maxWidth: '20%' }, [theme.breakpoints.up('xs')]: { minWidth: '20%' } }}
                                      label="Date of Birth"
                                      minDate={new Date("1940")}
                                      maxDate={new Date()}
                                      value={p.dateOfBirth}
                                      onChange={(value) => { setFieldValue(dateOfBirth, value === null || new Intl.DateTimeFormat("en-GB").format(new Date(value)).split("/").reverse().join("/")) }}
                                      helperText={toucheddateOfBirth && errordateOfBirth ? errordateOfBirth : ""}
                                      error={Boolean(toucheddateOfBirth && errordateOfBirth)} />

                                    <MuiSelect name={gender} placeholder="choose one"
                                      value={p.gender}
                                      sx={{ [theme.breakpoints.up('md')]: { maxWidth: '15%' }, [theme.breakpoints.up('xs')]: { minWidth: '15%' } }}
                                      align="left" label="Gender"
                                      options={genderList}
                                      onChange={(e) => { formik.setFieldValue(gender, e.target.value) }}
                                      helperText={touchedgender && errorgender ? errorgender : ""}
                                      error={Boolean(touchedgender && errorgender)} />

                                    <MuiSelect name={relationship} placeholder="choose one"
                                      value={p.relationship}
                                      align="left" label="Relationship"
                                      sx={{ [theme.breakpoints.up('md')]: { maxWidth: '15%' }, [theme.breakpoints.up('xs')]: { minWidth: '15%' } }}
                                      options={relationList}
                                      onChange={(e) => { formik.setFieldValue(relationship, e.target.value) }}
                                      helperText={touchedrelationship && errorrelationship ? errorrelationship : ""}
                                      error={Boolean(touchedrelationship && errorrelationship)} />
                                    <MuiSelect name={occupation} placeholder="choose one"
                                      sx={{ [theme.breakpoints.up('md')]: { maxWidth: '15%' }, [theme.breakpoints.up('xs')]: { minWidth: '15%' } }}
                                      value={p.occupation}
                                      align="left" label="Occupation"
                                      options={occupationList}
                                      helperText={touchedoccupation && erroroccupation ? erroroccupation : ""}
                                      error={Boolean(touchedoccupation && erroroccupation)}
                                      onChange={(e) => { formik.setFieldValue(occupation, e.target.value) }} />


                                    <FormControl align='center' sx={{ justifyContent: 'center' }}>



                                      <Button
                                        color="secondary" size="small"
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

                          {memberCount < 30 &&
                            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                              <Tooltip title="Add another member" arrow>
                                <Button
                                  variant="outlined"
                                  disabled={memberCount > 30}
                                  onClick={() =>
                                    push({ fullName: "", dateOfBirth: "", gender: "", relationship: "", occupation: "" })
                                  }
                                >
                                  Add member+
                                </Button>
                              </Tooltip>

                            </Stack>
                          }
                        </div>
                      )}
                    </FieldArray>
                    <div style={{ color: "red", marginBottom: "8px" }}>
                      {(typeof errors.addlFamilyMemberInfos) === 'string' ? errors.addlFamilyMemberInfos : ""}
                    </div>
                    <p> Total Member Count  : {memberCount}</p>
                  </>
                  <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                </Stack>
              </Stack>
            </Grid>

            {/* _________________________________________________________________________________________________ */}

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton disabled={memberCount === 0} size="medium" type="submit" variant="contained" loading={isSubmitting}>
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
      }
    </>
  );
}
