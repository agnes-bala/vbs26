import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from "axios";
import { toast } from 'react-toastify';
// @mui
import { Grid,Stack, TextField, Divider,FormControl,Box, FormHelperText,
  Autocomplete, MenuItem, Select, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MobileDatePicker } from '@mui/x-date-pickers';

import moment from "moment";
import { getAuthInfo } from '../../../auth/AppAuthStorage';
import { updatePartnerContactInfo ,  } from '../../../services/JRMPartnerAuthService';
import { getDistrictsData, getCitiesData,  } from '../../../services/JRMLookupService';

import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import config from "../../../partnerconfig.json";

// ----------------------------------------------------------------------

const url = config.jrmClientUrl;

const titleList = [
  { _id: "1", name: "Bro." },
  { _id: "2", name: "Sis." },
  { _id: "3", name: "Mr." },
  { _id: "4", name: "Mrs." },
  { _id: "5", name: "Dr." },
  { _id: "6", name: "Rev." },
  { _id: "7", name: "Pastor." }
];
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
const genderList = [
  { _id: "1", name: "Male" },
  { _id: "2", name: "Female" }
];

export default function ContactForm(field) {
  const navigate = useNavigate();
  const pId = localStorage.getItem("partnerId");
  const token = localStorage.getItem("jwt");
  const [userdata, setUserdata] = useState([]);
  const [getCity, setCity] = useState([]);
  const [districtdata, setDistrictdata] = useState([]);
  const config = {'Authorization': `Bearer ${token}`} ;

// ********_____________________useEffect___________________********* //
  const [getCountry, setCountry] = useState('');
  const userData = async() =>{
    axios
    .get(`${url}jrms/v1/partners/${pId}/contactinfo`,{headers : config} )
    .then((response) => {
      setUserdata(response.data);
      setCountry(response.data.country);
      console.log("resp",response.data.country);
    })
    .catch((err) => {
      console.log(err);
    });
    }
console.log("userdata",userdata);
console.log("get Country", userdata.country);




const [data, setData] = useState([]);

useEffect(() => {
  userData();
  getStateList();
},[userdata.country]);

const getStateList = async() =>{
 await axios.get(`${url}jrms/v1/lookup/states?country=${getCountry}`)
    .then((response) => {
    console.log("state response",response.data.stateList);
    setData(response.data.stateList);
    })
    .catch((err) => {
      console.log(err);
    });
}
    console.log("State List",data);

    
// ********_____________________handle function___________________********* //
      const handleState = async(event,value) =>{
      console.log("handle change State value", value);
      const dist =  await getDistrictsData(userdata.country,value);
      const result = dist.data !== undefined ? dist.data.districtList.filter((d,i,ar) => d !== "''" && d !== null && ar.indexOf(d) === i) : []
     
      console.log("let dist value", result);
      
      setDistrictdata(result);
      console.log("state change value", value);
      console.log("handle change state => district", dist);

      const city =  await getCitiesData(userdata.country,value);
      const result1 = city.data !== undefined ? city.data.cityList.filter((d,i,ar) => d !== "" && d !== null && ar.indexOf(d) === i) : []
     
      console.log("let dist value", result1);
     
      setCity(result1);
      console.log("state change value1", value);
      console.log("handle change state => city", city);
   
    formik.setFieldValue('stateInAddress',value);
    formik.setFieldValue('district','');
    formik.setFieldValue('city','');
   
    };


  const RegisterSchema = Yup.object().shape({
    // General Data
    title:  Yup.string().required('title is required').nullable(),
    fullName: Yup.string().min(3, 'Name is too short!').max(28, 'Name is too long!').required('Name required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    selectedGender: Yup.string().required('gender is required'),
  //  dateOfBirth: Yup.date().min(min, `date should be equal or later than ${min}`).max(new Date(max), `date should be equal or earlier than ${max}`).required('date is required').typeError('Valid date is required'),
     dateOfBirth: Yup.string().nullable().test("dateOfBirth", "You must be 18 years or older", value => {
      return moment().diff(moment(value, "YYYY/MM/DD"), "years") >= 18
  }).required("DOB is required"), 
     occupation:Yup.string().required('occupation is required'),
     whatsAppNumber: Yup.number().when('country',{is: value => value && value === 'India', then:Yup.number().min(6001000000,'Invaid number').max(9999000000,'Invaid Number'),otherwise: Yup.number().required('WhatsApp number is required').test(
      'Is positive?', 'Invalid Number', (value) => value > 0).min(1000,'number is too short').max(999999999999999,'number is too large')}), 
    
    // Address Data
     country: Yup.string().required('country is required').nullable(),
     address1: Yup.string().nullable(),
     address2: Yup.string().nullable(),
     stateInAddress: Yup.string().required('state is required').nullable(),
     district: Yup.string().when('country',{is: value => value && value === 'India', then:Yup.string().required('district is required').max(50).nullable(),otherwise:Yup.string().max(50).nullable() }), 
     // city: Yup.string().when('country',{is: value => value && value !== 'India', then:Yup.string().required('city is required').max(50).nullable(),otherwise:Yup.string().max(50).nullable() }), 
     city: Yup.string().min(3).max(30).required('city name is required').typeError(), 
     pincode: Yup.mixed().nullable().typeError().when('country',{is: value => value && value === 'India', then:Yup.number().nullable().typeError('pincode  is required').min(110000,'Invaid pincode').max(859999,'Invaid pincode').required('pincode  is required'),otherwise: Yup.string().nullable().typeError('pincode  is required').required('zipcode is required').matches(/^[A-Z0-9-]*$/).min(4).max(10)}),
    // marital status
    // maritalStatus:Yup.string().required(),
    });

  const formik = useFormik({
    enableReinitialize : true,
    initialValues:{
    title: userdata.title || '',
    fullName: userdata.fullName || '',
    selectedGender: userdata.gender || '',
    dateOfBirth: userdata.dateOfBirth || null,
    occupation: userdata.occupation || '',
     // Address Data 
    
    address1: userdata.address1 || '', 
    address2: userdata.address2 || '',
    pincode: userdata.pincode || '', 
    stateInAddress:  userdata.stateInAddress || "",
    district: userdata.district ||'',
    city: userdata.city ||"",
    country: userdata.country || "",
        // communication Data
  
    whatsAppNumber: userdata.whatsAppNumber || '',
     // marriage status
  
  
  },

    validationSchema : RegisterSchema,
   onSubmit : async (contactInfo) => {
   
    console.log("Personal ContactInfo request", contactInfo);
    console.log("formik values",formik.values.stateInAddress);
    const authInfo = await getAuthInfo();
    console.log ("Personal ContactInfo authInfo", authInfo);
    
//  Update the contact Info to server
const result = await updatePartnerContactInfo(authInfo.profileUrl, 
  authInfo.jwt, contactInfo
);
if (!result.ok) {
console.log ("Personal ContactInfo FAILED", result.data);
return toast.error ("Could not update Personal ContactInfo to server ", result.data.message);
}

console.log ("Personal ContactInfo successful", result.data);
toast.success ("Contact information updated successfully");
   setUserdata(contactInfo);
   // alert(JSON.stringify(contactInfo,null,2));
   navigate(PATH_DASHBOARD.user.spouse);
  
  },
});
const { errors, touched, isSubmitting,handleSubmit, getFieldProps } = formik;

console.log("state value",formik.values.stateInAddress);
console.log("district dta",districtdata);
console.log("cty dta",getCity);
  return (
<FormikProvider value={formik}>
<Form noValidate onSubmit={handleSubmit}>
      
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={12} md={6}>
   
        <Stack spacing={3} >
            <Divider > Dear Parent/Guardian, <br /> please update your contact info! </Divider>
        
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl sx={{  minWidth: 120 }}> 
                <Select
                align="left"
                label="Title"
                name="title"
                value={userdata.title}
                onChange={(e)=>{formik.setFieldValue('title',e)}}
                {...getFieldProps('title')}
                >
                {titleList.map(option =>(
                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                ))}
                </Select>
                <InputLabel id="title" color={touched.title && errors.title ? 'error' : 'primary'}>Title</InputLabel>
                <FormHelperText error>{touched.title && errors.title}</FormHelperText>
               
                </FormControl>
     
                <TextField    fullWidth    label="Full name"
                value={formik.values.fullName}
                {...getFieldProps('fullName')}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl sx={{  minWidth: '50%' }}>
                <Select
                align="left"
                label="Gender"
                value={userdata.gender}
                name="selectedGender"
                onChange={(e)=>{formik.setFieldValue('selectedGender',e)}}
                {...getFieldProps('selectedGender')}
                >
                {genderList.map(option =>(
                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                ))}
                </Select>
                <InputLabel id="gender" color={touched.gender && errors.gender ? 'error' : 'primary'}>Gender</InputLabel>
                <FormHelperText error>{touched.gender && errors.gender}</FormHelperText>
                </FormControl>

                <FormControl sx={{  minWidth: '47%' }}>
                <MobileDatePicker
                label="Date of Birth" fullWidth
                disableFuture
                minDate={new Date("1930/01/01")}
                maxDate={new Date("2002/12/31")}
                openTo="year"
                views={['year', 'month', 'day']}
                inputFormat='yyyy/MM/dd'
                value={formik.values.dateOfBirth}
                onChange={(value) => {formik.setFieldValue('dateOfBirth', value === null ? "" : moment(value).format('YYYY/MM/DD'));}}
                renderInput={(params) => (<TextField {...params} 
                error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                helperText={touched.dateOfBirth && errors.dateOfBirth}/>)}
                />
                </FormControl>
                
            
             </Stack>
             

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

            <FormControl sx={{  minWidth: '50%' }}>
                
                <Select
                align="left"
                label="Occupation"
                name="occupation"
                value={userdata.occupation}
                onChange={(e)=>{formik.setFieldValue('occupation',e)}}
                {...getFieldProps('occupation')}
                >
                {occupationList.map(option =>(
                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                ))}
                </Select>
                <InputLabel id="occupation" color={touched.occupation && errors.occupation ? 'error' : 'primary'}>Occupation</InputLabel>
                <FormHelperText error>{touched.occupation && errors.occupation}</FormHelperText>
               
            </FormControl>

            <TextField    fullWidth    type="number"    label="WhatsApp" 
                {...getFieldProps('whatsAppNumber')}
                error={Boolean(touched.whatsAppNumber && errors.whatsAppNumber)}
                helperText={touched.whatsAppNumber && errors.whatsAppNumber}
                />
            </Stack>

    </Stack>
    </Grid>

 {/* ------------------------------------------------------------------------------------------------------ */}
    <Grid item xs={12} md={6}>
    <Stack spacing={3}>
          <Divider />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {/* <FormControl sx={{  minWidth: '50%' }}>
                <TextField name="country" disabled value ={userdata.country} 
                 label="Country" {...getFieldProps('country')}/>
             
              </FormControl> */}

              <FormControl sx={{  minWidth: '50%' }}>
                <Select
                align="left"
                label="Country"
                 value={userdata.country}
                name="country"
                onChange={(e)=>{formik.setFieldValue('country',e)
              }}
                {...getFieldProps('country')}
                >
                <MenuItem key={userdata.country} value={userdata.country}>{userdata.country}</MenuItem>
                </Select>
                <InputLabel id="country" color={touched.country && errors.country ? 'error' : 'primary'}>Country</InputLabel>
                <FormHelperText error>{touched.country && errors.country}</FormHelperText>
                </FormControl>
                {/* <FormControl sx={{  minWidth: '50%' }}>
                
                <Select
                align="left"
                label="State"
                name="stateInAddress"
                value={userdata.stateInAddress}
                onChange={(e)=>{formik.setFieldValue('stateInAddress',e)}}
                {...getFieldProps('stateInAddress')}
                >
                {data.map((option,i) =>(
                <MenuItem key={i} value={data[i]}>{data[i]}</MenuItem>
                ))}
                </Select>
                <InputLabel id="stateInAddress" color={touched.stateInAddress && errors.stateInAddress ? 'error' : 'primary'}>State</InputLabel>
                <FormHelperText error>{touched.stateInAddress && errors.stateInAddress}</FormHelperText>
               
            </FormControl> */}

              <FormControl sx={{  minWidth: '50%' }}>
                <Autocomplete
                 required
                 autoSelect
                 autoComplete
                 autoHighlight
                 blurOnSelect
                  id="stateInAddress"
                
                 value ={formik.values.stateInAddress }
                 onChange={(event,value)=> handleState(event,value)}
                  getOptionLabel={(data) => `${data}`}
                  options={data}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                 
                  noOptionsText={"No Available list"}
                  renderOption={(props, data) => (
                    <Box component="li" {...props} key={data}>
                      {data}
                    </Box>
                  )}
                  renderInput={(params) => <TextField {...params} label="State" inputProps={{...params.inputProps,
                  autoComplete:"state", }} 
                   
                   {...getFieldProps('stateInAddress')}
                  error={Boolean(touched.stateInAddress && errors.stateInAddress)}
                  helperText={touched.stateInAddress && errors.stateInAddress} />}
                />
                
                </FormControl>
                
                
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          
                {userdata.country === 'India' &&
                
                <FormControl sx={{  minWidth: '50%' }}>

                 <Autocomplete
                 required
                 autoSelect
                 autoComplete
                 autoHighlight
                 blurOnSelect
                 value={formik.values.district}
                 id="district"
                 getOptionLabel={(districtdata) => `${districtdata}`}
                 options={districtdata}
                 isOptionEqualToValue={(option, value) => option.name === value.name}
                 renderOption={(props, districtdata) => (
                 <Box component="li" {...props} key={districtdata}>
                   {districtdata}
                 </Box>
                 )}
                 onChange={(event,values) => {
                  formik.setFieldValue('district',values);
                 }}
                 onBlur={field.onBlur}
                
                 renderInput={(params) => <TextField {...params} label="District" {...getFieldProps('district')}
                
                 error={Boolean(touched.district && errors.district)}
                 helperText={touched.district && errors.district}/>}
                 />
                
              </FormControl>
                }
              
                <TextField  fullWidth  label="Pin/Zip code" 
                {...getFieldProps('pincode')}
                error={Boolean(touched.pincode && errors.pincode)}
                helperText={touched.pincode && errors.pincode}
                /> 
        </Stack>


          <Divider />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl sx={{  minWidth: '50%' }}>
                <TextField fullWidth label="Address Line 1"
                placeholder='door no, street name'
                {...getFieldProps('address1')}
                error={Boolean(touched.address1 && errors.address1)}
                helperText={touched.address1 && errors.address1}
                />
                </FormControl>
                <TextField  fullWidth  label="Address Line 2"
                placeholder='Area'
                {...getFieldProps('address2')}
                error={Boolean(touched.address2 && errors.address2)}
                helperText={touched.address2 && errors.address2}
                />
              
              </Stack>
              <Autocomplete
              required
              autoSelect
              autoComplete
              autoHighlight
              blurOnSelect
                value={ formik.values.city}
                id="city"
                getOptionLabel={(getCity) => `${getCity}`}
                options={getCity}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                freeSolo
                renderOption={(props, getCity,i) => (
                <Box component="li" {...props} key={getCity[i]}>
                    {getCity}
                </Box>
                )}
                onChange={(event, newValue) => 
                formik.setFieldValue("city", newValue)}
                onBlur={field.onBlur}
                placeholder="Area or Town or City name"
                renderInput={(params) => <TextField {...params} label="City" {...getFieldProps('city')}
                error={Boolean(touched.city && errors.city)}
                helperText={touched.city && errors.city}/>}
                />
    </Stack>
    </Grid>
</Grid> 
     {/* _________________________________________________________________________________________________ */}
             
             
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton  size="large" type="submit"  variant="contained" loading={isSubmitting}>
                 Next
                </LoadingButton>
            </Stack>
        
  
</Form>
</FormikProvider>

  );
}
