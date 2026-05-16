import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from "axios";
import { toast } from 'react-toastify';
// @mui
import { Grid,Stack, Divider,IconButton,InputAdornment,Box,LinearProgress  } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import Iconify from 'src/components/Iconify';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { getAuthInfo } from '../../../auth/AppAuthStorage';
import { updatePartnerContactInfo  } from '../../../services/JRMPartnerAuthService';
import { getDistrictsData, getCitiesData, getStatesData } from '../../../services/JRMLookupService';

import MuiTextField from'src/components/formfield/TextField';
import MuiSelect from 'src/components/formfield/Select';

// components
import { config,  } from 'src/partnerconfig';
import { setPassword } from 'src/services/JRMPartnerAuthService';
import { genderList, occupationList, titleList } from 'src/components/selectionList';
import MuiMobilePicker from 'src/components/MuiMobilePicker';
import MuiAutocomplete from 'src/components/MuiAutocomplete';
// ----------------------------------------------------------------------

export default function ContactFormPopup({setOpen}) {
  const navigate = useNavigate();
  const pId = localStorage.getItem("partnerId");
  const [showPassword, setShowPassword] = useState(false);
  // const token = localStorage.getItem("jwt");
  // const [userdata, setUserdata] = useState([]);
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);
  const [getCity, setCity] = useState([]);
  const [districtdata, setDistrictdata] = useState([]);
  // const configure = {'Authorization': `Bearer ${token}`} ;
  const [isLoading, setIsLoading] = useState(false);
// ********_____________________useEffect___________________********* //
//  console.log('URL',jrmClientUrl);
//  console.log("Pid",pId);
//  console.log("token",token)
let fetchData = localStorage.getItem("members");
// console.log ("fetchData", fetchData);
  fetchData = fetchData ? JSON.parse(fetchData) : {};
  let userdata = fetchData.main;
  // const userData = async() =>{
  
  //   axios
  //   .get(`${jrmClientUrl}jrms/v1/partners/${pId}/contactinfo`,{headers : configure} )
  //   .then((response) => {
  //     setUserdata(response.data);
  //     setCountry(response.data.country);
  //     console.log("resp",response.data.country);
  //     setIsLoading(false);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //   }
//console.log("userdata",userdata);
//console.log("get Country", userdata.country);




useEffect(() => {
  setIsLoading(true); 
  // userData();
  getCountryList();
  setIsLoading(false); 
},[]);

const getCountryList = async() =>{
  await axios
  .get(
    "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
  )
  .then((response) => {
    const countryList = Array.from(new Set(response.data.map(item => item.country)));
     console.log(countryList);
    setData(countryList);
  })
  .catch((err) => {
    console.log(err);
  });
 }
// const getStateList = async() =>{
//  await axios.get(`${config.jrmGetStates}?country=${userdata.country}`)
//     .then((response) => {
//     //console.log("state response",response.data.stateList);
//     setData(response.data.stateList);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
    // console.log("State List",data);
    const handleCountry = async (event, value) => {
      formik.setFieldValue(`country`,value);
      console.log("handle country", value);
      const st = await getStatesData(value);
      console.log("let st value", st.data.stateList);
      setState(st.data.stateList);
      formik.setFieldValue(`stateInAddress`,'');
      formik.setFieldValue(`district`,'');
      formik.setFieldValue(`city`,'');
    };
    
// ********_____________________handle function___________________********* //
      const handleState = async(event,value) =>{
        formik.setFieldValue('stateInAddress',value.toUpperCase());
      //console.log("handle change State value", value);
      const dist =  await getDistrictsData(formik.values.country,value);
      const result = dist.data !== undefined ? dist.data.districtList.filter((d,i,ar) =>  
       d !== "''" && d !== null && ar.indexOf(d) === i) : []
     
      //console.log("let dist value", result);
      setDistrictdata(result);
      //console.log("state change value", value);
      //console.log("handle change state => district", dist);

      const city =  await getCitiesData(userdata.country,value);
      const result1 = city.data !== undefined ? city.data.cityList.filter((d,i,ar) => d !== '' && 
      d !== null && ar.indexOf(d) === i) : []
      //console.log("let dist value", result1);
      setCity(result1);
      //console.log("state change value1", value);
      //console.log("handle change state => city", city);
   
    
    formik.setFieldValue('district','');
    formik.setFieldValue('city','');
    };

  const RegisterSchema = Yup.object().shape({
    // General Data
    title:  Yup.string().required('title is required').nullable(),
    fullName: Yup.string().min(3, 'Name is too short!').max(28, 'Name is too long!').required('Name required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    selectedGender: Yup.string().required('gender is required'),
  //  dateOfBirth: Yup.date().min(min, `date should be equal or later than ${min}`).max(new Date(max), `date should be equal or earlier than ${max}`).required('date is required').typeError('Valid date is required'),
     dateOfBirth: Yup.string().required("DOB is required").nullable().test("dateOfBirth", "You must be 15 years or older", value => {
      return moment().diff(moment(value, "yyyy-MM-dd"), "years") >= 15
  }), 
     occupation:Yup.string().required('occupation is required'),
     whatsAppNumber: Yup.number().when('country',{is: value => value && value === 'India', then:Yup.number().min(6001000000,'Invaid number').max(9999000000,'Invaid Number'),otherwise: Yup.number().required('WhatsApp number is required').test(
      'Is positive?', 'Invalid Number', (value) => value > 0).min(1000,'number is too short').max(999999999999999,'number is too large')}), 
    
    // Address Data
     country: Yup.string().required('country is required').nullable(),
     address1: Yup.string().max(30),
     address2: Yup.string().max(30),
     address3: Yup.string().min(3).max(30), 
     stateInAddress: Yup.string().required('state is required').nullable(),
     district: Yup.string().when('country',{is: value => value && value === 'India', then:Yup.string().required('district is required').max(50).nullable(),otherwise:Yup.string().max(50).nullable() }), 
     // city: Yup.string().when('country',{is: value => value && value !== 'India', then:Yup.string().required('city is required').max(50).nullable(),otherwise:Yup.string().max(50).nullable() }), 
     city: Yup.string().min(3).max(30).required('city or town name is required').typeError(), 
     pincode: Yup.mixed().nullable().typeError().when('country',{is: value => value && value === 'India', then:Yup.number().nullable().typeError('pincode  is required').min(110000,'Invaid pincode').max(859999,'Invaid pincode'),otherwise: Yup.string().nullable().typeError('pincode  is required').matches(/^[A-Z0-9-]*$/).min(4).max(10)}),
     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
     confirmPassword: Yup.string()
          .required('Confirm password is required')
          .oneOf([Yup.ref('password'), null], 'Password must match'),
     // marital status
    // maritalStatus:Yup.string().required(),

    });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues:{
    title: userdata.title || '',
    fullName: userdata.fullName || '',
    selectedGender: userdata.gender || userdata.selectedGender || '',
    dateOfBirth: userdata.dateOfBirth || null,
    occupation: userdata.occupation || '',
    // Address Data 
    address1: userdata.address1 || '', 
    address2: userdata.address2 || '',
    pincode: userdata.pincode || '', 
    stateInAddress:  userdata.stateInAddress || "",
    district: userdata.district ||'',
    city: userdata.city ||"",
    country: "",
    // communication Data
    whatsAppNumber: userdata.whatsAppNumber || '',
    password: '',
    confirmPassword:''
    // marriage status
  },
    validationSchema : RegisterSchema,
   onSubmit : async (contactInfo) => {
    console.log("Personal ContactInfo request", contactInfo);
   // console.log("formik values",formik.values.stateInAddress);
    const authInfo = await getAuthInfo();
  // console.log ("Personal ContactInfo authInfo", authInfo);
  //  Update the contact Info to server
const result = await updatePartnerContactInfo(authInfo.profileUrl, 
  authInfo.jwt, contactInfo
);
if (!result.ok) {
console.log ("Personal ContactInfo FAILED", result.data);
return toast.error ("Could not update Personal ContactInfo to server ", result.data.message);
}
try {
  const result1 = await setPassword(
    { password: contactInfo.password,oneTimeJWT:authInfo.jwt },
    `${config.jrmPartnerProfileUrl}/${pId}/setpassword`
  );
  console.log("Password update", result1);
  
  if (result1.status > 300 ) {
    console.log("Password update FAILED", result1.data);
    return toast.error("Error in Password update", result1.data?.message || "Unknown error");
  }
} catch (error) {
  console.error("Password update error:", error);
  return toast.error("Error in Password update", error.message || "Unknown error");
}
console.log ("Personal ContactInfo successful", result.data);
toast.success ("Contact information updated successfully");
  userdata = contactInfo;
  let fetchMembers = localStorage.getItem("members");
  //console.log ("fetchMembers", fetchMembers);
  fetchMembers = fetchMembers ? JSON.parse(fetchMembers) : {};
  fetchMembers.main = contactInfo;
  localStorage.setItem("members",JSON.stringify(fetchMembers));
   // alert(JSON.stringify(contactInfo,null,2));
   let profileStatus = localStorage.getItem('profileStatus');
   if(profileStatus == 1)
   {
    navigate(PATH_DASHBOARD.user.spouse);
   }
  localStorage.setItem('profileStatus', 1);
  window.location.reload();
  },
});
const {  isSubmitting,handleSubmit } = formik;
const maxDate = new Date().getFullYear() - 15;

// console.log("state value",formik.values.stateInAddress);
// console.log("district dta",districtdata);
// console.log("cty dta",getCity);

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
<Divider > Your Profile </Divider>
<br/>
<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={12} md={6}>
   
        <Stack spacing={3} >

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                
                <MuiSelect  name="title" 
                value={formik.values.title}
                align="left"
                label="Title"
                options = {titleList}
                onChange={(e)=>{formik.setFieldValue('title',e.target.value)}} />
              
              <MuiTextField name='fullName' fullWidth    label="Full Name" enableUpperCase={true}
                onChange={(e)=> {const val = e.target.value || ""; formik.setFieldValue('fullName',val.toUpperCase())}}
                value={formik.values.fullName.toUpperCase()}/>

            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

           <MuiMobilePicker name='dateOfBirth' label='Date of Birth' 
             value={formik.values.dateOfBirth}
             sx={{  minWidth: '47%' }}
             maxDate={new Date(maxDate,11,31)}
             defaultCalendarMonth={new Date(maxDate,11,31)}
             onChange={(value) => {
               console.log("value",value);
               let date1 = new Date(value).getFullYear();
               let date2 = new Date().getFullYear();
               formik.setFieldValue('age',date2 - date1);
               console.log("moment",new Intl.DateTimeFormat("en-GB").format(new Date(value)).split("/").reverse().join("/"))
              // formik.setFieldValue('dateOfBirth', value === null ? "" : new Date(value).toISOString().slice(0,10).split("-").join("/"));
               formik.setFieldValue('dateOfBirth', value === null ? "" : new Intl.DateTimeFormat("en-GB").format(new Date(value)).split("/").reverse().join("/"));
             }}
             />
              <MuiTextField name='age' fullWidth  label="Age" type='number' 
              InputLabelProps={{ shrink: true }}
           onChange={(e)=> {
             const val = e.target.value || 0; 
             let date = new Date().getFullYear();
            // console.log("date",date)
             //formik.setFieldValue('age',val  && parseInt(date) - parseInt(val));
             formik.setFieldValue('dateOfBirth',new Intl.DateTimeFormat("en-GB").format(new Date(date - parseInt(val),0,1)).split("/").reverse().join("/"))}}
           value={formik.values.age}/>

        </Stack>
             

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <MuiSelect name="selectedGender" placeholder="Choose Gender"
                value={formik.values.selectedGender}
                align="left"  label="Gender"
                options = {genderList}
                onChange={(e)=>{formik.setFieldValue('selectedGender',e.target.value)}} />
            <MuiSelect name="occupation" placeholder="choose one"
                value={formik.values.occupation}
                align="left" sx={{  minWidth: '50%' }} label="Occupation"
                options = {occupationList}
                onChange={(e)=>{formik.setFieldValue('occupation',e.target.value)}} />

            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <MuiTextField name='whatsAppNumber' label='WhatsApp' type='number'
            onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('whatsAppNumber',val)}}
            value={formik.values.whatsAppNumber }/>
            </Stack>


    </Stack>
    </Grid>

 {/* ------------------------------------------------------------------------------------------------------ */}
    <Grid item xs={12} md={6}>
    <Stack spacing={3}>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {/* <MuiTextField name='country' label='Country' disabled
            onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('country',val)}}
            value={formik.values.country }/> */}

          <MuiAutocomplete name='country' label='Country' sx={{  minWidth: '50%' }}
            value ={formik.values.country } 
            onChange={(event,value)=> handleCountry(event,value)}
            options={data}/>

             <MuiAutocomplete name='stateInAddress' label='State' sx={{  minWidth: '50%' }}
            value ={formik.values.stateInAddress } 
            onChange={(event,value)=> handleState(event,value)}
            options={state}/>
               
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          
                {formik.values.country === 'India' &&
                <MuiAutocomplete name='district' label='District' sx={{  minWidth: '50%' }}
                value ={formik.values.district } 
                onChange={(event, value) => formik.setFieldValue('district',value.toUpperCase())}
                options={districtdata}/>
           
                }
              <MuiTextField name='pincode' label='Pin/Zip code'
              onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('pincode',val)}}
              value={formik.values.pincode }/>
             
        </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <MuiTextField name='address1' label='Address Line 1' placeholder='door no, street name' enableUpperCase={true}
         onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('address1',val.toUpperCase())}}
        value={formik.values.address1 }/>

         <MuiTextField name='address2' label='Address Line 2' placeholder='Area' enableUpperCase={true}
         onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('address2',val.toUpperCase())}}
        value={formik.values.address2 }/>
 
              
              </Stack>

              <MuiAutocomplete name='city' label='City or Town Name' sx={{  minWidth: '50%' }} freeSolo
                value ={formik.values.city.toUpperCase() } 
                onChange={(event, value) => formik.setFieldValue('city',value.toUpperCase())}
                options={getCity}/>
         
    </Stack>
    </Grid>
  
    <Grid item xs={12} md={6} >
    <Stack  spacing={3}>
 
 <MuiTextField name='password' label='password' type='password'  
     onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue('password',val)}}
     value={formik.values.password}/>
</Stack>
</Grid>
<Grid item xs={12} md={6}>
    <Stack  spacing={3}>
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
    </Grid>
</Grid> 
     {/* _________________________________________________________________________________________________ */}
             
             
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton  size="large" type="submit"  variant="contained" loading={isSubmitting}>
                Save
                </LoadingButton>
            </Stack>
        
  
</Form>


</FormikProvider>
}
</>
  );
}
