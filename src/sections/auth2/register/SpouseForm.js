import * as Yup from 'yup';
import { useState,  } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import moment from 'moment';
// @mui
import { Grid, Stack, Box, Divider, LinearProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { PATH_DASHBOARD } from '../../../routes/paths';
import { getAuthInfo } from '../../../auth/AppAuthStorage';
import { updatePartnerSpouseInfo } from '../../../services/JRMPartnerAuthService';



import MuiTextField from'src/components/formfield/TextField';

import MuiMobilePicker from 'src/components/MuiMobilePicker';
import MuiSelect from 'src/components/Select';
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


export default function SpouseForm() {
  
  const navigate = useNavigate();
  const [status, setStatus] = useState(0);
  // const pId = localStorage.getItem("partnerId");
  // const token = localStorage.getItem("jwt");
  const [isLoading, setIsLoading] = useState(false);
  // const [spousedata, setSpousedata] = useState([]);
  const [fetchdata, setFetchdata] = useState(false);
  // const config = {'Authorization': `Bearer ${token}`};
  let fetchData = localStorage.getItem("members");
  // console.log ("fetchData", fetchData);
    fetchData = fetchData ? JSON.parse(fetchData) : {};
    let spousedata = fetchData.spouse;

  // useEffect(() => {
  //   setIsLoading(true); 
  //   fetch();
  // }, [fetchdata]);
  // console.log(spousedata);

// const fetch = async() =>{
//   await axios.get(`${jrmClientUrl}jrms/v1/partners/${pId}/contactinfo`,{headers : config})
//   .then((response) => {
//     console.log("fetch wedding data", response.data.weddingDay);
//     if(response.data.weddingDay !== null || response.data.weddingDay !== '')
//     {
//       setSpousedata(response.data);
//       setStatus(1);
//       setFetchdata(true);
//       console.log("spouse data", spousedata);
//       console.log("fetch data", fetchdata);
     
//     }
//     else
//     {
//       setSpousedata(false);
//       setStatus(0);
//       console.log("spouse data", spousedata);
//     }
//     setIsLoading(false);
    
//   })
// }

  const SpouseSchema = Yup.object().shape({
    weddingDay: Yup.string().nullable().required("weddingDay is required").typeError('Valid date is required'),
    spouseName: Yup.string().min(3, 'Too Short!').max(28, 'Too Long!')
    .required('Spouse Name required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "), 
    spouseDateOfBirth: Yup.string().nullable().test("spouseDateOfBirth", "You must be 18 years or older", value => 
     {return (moment().diff(moment(value, "yyyy-MM-dd"), "years") >= 18)}).required("DOB is required").typeError('Valid date is required'), 
     spouseOccupation:Yup.string().required("Spouse Occupation is required"),
    });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues:{
    weddingDay: spousedata.weddingDay || null,
    spouseName: spousedata.spouseName || '', 
    spouseDateOfBirth: spousedata.spouseDateOfBirth || null, 
    spouseOccupation: spousedata.spouseOccupation || '',
  },

  validationSchema : SpouseSchema,
  onSubmit :async (spouseInfo) => {
    console.log("spouseInfo request", spouseInfo);
    const authInfo = await getAuthInfo();
    //console.log ("spouseInfo request authInfo", authInfo);
//  Update the contact Info to server
    const result = await updatePartnerSpouseInfo(authInfo.profileUrl, 
      authInfo.jwt,spouseInfo);
    if (!result.ok) {
    console.log ("spouseInfo FAILED", result.data);
    return toast.error ("Could not update spouse information ", result.data.message);
    }

    console.log ("spouseInfo successful", result.data);
    toast.success ("spouse information updated successfully");
    let fetchMembers = localStorage.getItem("members");
    //console.log ("fetchMembers", fetchMembers);
    fetchMembers = fetchMembers ? JSON.parse(fetchMembers) : {};
    fetchMembers.spouse = spouseInfo;
    localStorage.setItem("members",JSON.stringify(fetchMembers));
    navigate(PATH_DASHBOARD.user.child);
          
      },
    });
    const {isSubmitting,handleSubmit } = formik;
    const maxDate = new Date().getFullYear() - 15;
    const skipForm = () =>{
      navigate(PATH_DASHBOARD.user.child);
    }

  return (
    <>
    {isLoading ?   
        <Box sx={{ position: 'relative' }}>
        <LinearProgress  size={80}
          thickness={20}
          
          value={100}/>
        </Box> 
        : 
<FormikProvider value={formik}>
<Form noValidate onSubmit={handleSubmit}>
      
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={12} md={6}>
      <Stack spacing={3} >
      <Divider>Spouse Detail</Divider>
      <MuiMobilePicker name='weddingDay'
            label="Wedding Date"
            minDate={new Date("1955/01/01")}
            maxDate={new Date()}
            value={formik.values.weddingDay }
            onChange={(value) => {formik.setFieldValue('weddingDay', value === null ? "" : new Intl.DateTimeFormat("en-GB").format(new Date(value)).split("/").reverse().join("/"))}}
            />
      </Stack>
  </Grid>
  
  <Grid item xs={12} md={6}>
        <Stack spacing={3} >
        <MuiTextField name='spouseName' label='Spouse Name' enableUpperCase={true}
         onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('spouseName',val.toUpperCase())}}
        value={formik.values.spouseName }/>

      <MuiMobilePicker  name='spouseDateOfBirth'
            label="Spouse DOB"
            minDate={new Date('1940/01/01')}
            maxDate={new Date(formik.values.weddingDay)}
            //.0defaultCalendarMonth={new Date(maxDate,11,31)}
            
            //maxDate={new Date(formik.values.weddingDay)}
            value={formik.values.spouseDateOfBirth }
            onChange={(value) => {formik.setFieldValue('spouseDateOfBirth', value === null ? "" : new Intl.DateTimeFormat("en-GB").format(new Date(value)).split("/").reverse().join("/"))}}
            />

          <MuiSelect name="spouseOccupation" placeholder="choose one"
                value={formik.values.spouseOccupation}
                align="left" sx={{  minWidth: '50%' }} label="Spouse Occupation"
                options = {occupationList}
                onChange={(e)=>{formik.setFieldValue('spouseOccupation',e.target.value)}} />

        </Stack>
    </Grid>
</Grid>
 {/* _________________________________________________________________________________________________ */}
  
        <Stack  alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton  size="medium" type="submit"  variant="contained" loading={isSubmitting}>
              Save
            </LoadingButton>
            
        </Stack> 
        <Stack  alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton  size="medium" type="submit" color="secondary" variant="contained" onClick={skipForm}>
              Skip this section
            </LoadingButton>
            
        </Stack> 
        
</Form>
</FormikProvider>
}</>
  );
}
