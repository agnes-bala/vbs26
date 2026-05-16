import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider , FieldArray, getIn} from 'formik';
import axios from "axios";
import { toast } from 'react-toastify';
// @mui
import { Grid,Stack, Button, Divider,Dialog, DialogTitle, DialogActions, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from "src/components/Iconify";

import moment from "moment";
import { updatePartnerAddlMemberInfo, updatePartnerSpouseInfo, updatePartnerChildrenInfo} from '../../../services/JRMPartnerAuthService';
// components
import { config } from 'src/partnerconfig';

import MuiMobilePicker from 'src/components/formfield/MuiMobilePicker';
import MuiSelect from'src/components/formfield/Select';
import MuiTextField from 'src/components/formfield/TextField';
import { genderList, relationshipList, occupationList } from 'src/assets/Data/SelectionList';
import {  jrmClientUrl } from 'src/partnerconfig';
// ----------------------------------------------------------------------
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function AddMemberForm({onDataupdate,handleClose}) {
  const navigate = useNavigate();
  //console.log("ADD ARR",arr);

  const pId = localStorage.getItem("partnerId");
  const token = localStorage.getItem("jwt");

  const config = {'Authorization': `Bearer ${token}`}
  // const [childdata, setChilddata] = useState({});
  // const [spousedata, setSpousedata] = useState({});
  // const [familydata, setFamilydata] = useState({});

  const ValidationSchema = Yup.object().shape({
        addlFamilyMemberInfos: Yup.array().of(
        Yup.object().shape({
        addlFamilyMemberId:Yup.string(),
        fullName: Yup.string().min(3, 'Too Short!').max(28, 'Too Long!').required("member name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        dateOfBirth: Yup.string().nullable()
        .test("dateOfBirth", "Member age should be 1 or above, check relationship", value => {return (moment().diff(moment(value, "yyyy-MM-dd"), "years") >= 1 )}).required("DOB is required"),
        gender: Yup.string().required('gender is required'),
        relationship: Yup.string().required("Please select your relationship with a member"),
        occupation: Yup.string().when('relationship',{ is : (v) => v != "97",
          then: Yup.string().required('occupation is required'),
          otherwise: Yup.string().nullable()
        })
})
),
});

  const formik = useFormik({
      enableReinitialize : true,
      initialValues:{
      addlFamilyMemberInfos: [
          {
            addlFamilyMemberId:  "",
            fullName: '',
            dateOfBirth:  "",
            gender: "",
            relationship:"",
            occupation: "",
          },
              ]
                  },
   validationSchema : ValidationSchema,
   onSubmit : async (memberInfo) => {
    console.log("MemberInfo request", memberInfo);
    // alert(JSON.stringify(values, null, 2));
    if(memberInfo.addlFamilyMemberInfos[0].relationship == 97) {
      console.log("INSIDE CHILD")
      await axios.get(`${jrmClientUrl}jrms/v1/partners/${pId}/childreninfo`,{headers : config})
      .then(async(response) => {
      console.log(response);
      console.log("response",response.data);
      // const checkUsername = obj => obj.name === memberInfo.addlFamilyMemberInfos[0].fullName;
      // console.log("checkUsername",checkUsername);
      // console.log("B",memberInfo.addlFamilyMemberInfos[0].fullName.concat(memberInfo.addlFamilyMemberInfos[0].dateOfBirth)); 
       let validate = response.data.children.find((child) => child.fullName === memberInfo.addlFamilyMemberInfos[0].fullName
      
      );

       console.log("validate",validate);
       if(validate){
        return  toast.error ("This Child name is already present",);}
       else {
        let data= {};
        data.childId = '';
        data.fullName = memberInfo.addlFamilyMemberInfos[0].fullName;
        data.dateOfBirth = memberInfo.addlFamilyMemberInfos[0].dateOfBirth;
        data.gender = memberInfo.addlFamilyMemberInfos[0].gender;
        data.relationship = memberInfo.addlFamilyMemberInfos[0].relationship;
        data.occupation = memberInfo.addlFamilyMemberInfos[0].occupation;
        response.data.children.push(data);
        console.log("response.data.children",response.data);
        //setChilddata(response.data)
        const result = await updatePartnerChildrenInfo(`${jrmClientUrl}jrms/v1/partners/${pId}`, token, response.data);
      console.log("result",result)
   
      if (!result.ok) {
        console.log ("ChildrenInfo FAILED", result);
        return toast.error ("Could not update ChildrenInfo", result.data);
        }
        console.log ("ChildrenInfo successful", result.data);
        let resp1 = await axios.get(`${jrmClientUrl}jrms/v1/partners/${pId}/childreninfo`,{headers : config} )
        let fetchMembers = localStorage.getItem("members");
        console.log ("fetchMembers", fetchMembers);
         fetchMembers = fetchMembers ? JSON.parse(fetchMembers) : {};
        fetchMembers.kids = resp1.data;
        localStorage.setItem("members",JSON.stringify(fetchMembers));
        // toast.success ("Children information updated successfully");
        onDataupdate();
        handleClose();
        window.location.reload();
          return toast.success ("Child name is added");
        
        }
    })
    .catch((err) => {
      console.log(err);
    });


    } 
    else if(memberInfo.addlFamilyMemberInfos.relationship == 98) {
      console.log("INSIDE SPOUSE")
      await axios.get(`${jrmClientUrl}jrms/v1/partners/${pId}/spouseinfo`,{headers : config})
      .then(async(response) => {
      console.log(response);
      console.log("response",response.data);
      response.data.spouseName = memberInfo.addlFamilyMemberInfos[0].fullName;
      response.data.spouseDateOfBirth = memberInfo.addlFamilyMemberInfos[0].dateOfBirth;
      response.data.spouseGender = memberInfo.addlFamilyMemberInfos[0].gender;
      response.data.spouseOccupation = memberInfo.addlFamilyMemberInfos[0].occupation;
        console.log("response.data.children",response.data);
      
        const result = await updatePartnerSpouseInfo(`${jrmClientUrl}jrms/v1/partners/${pId}`, token, response.data);
      console.log("result",result)
    
      if (!result.ok) {
        console.log ("SpouseInfo FAILED", result);
        return toast.error ("Could not update SpouseInfo", result.data);
        }
        console.log ("SpouseInfo successful", result.data);
        let resp1 = await axios.get(`${jrmClientUrl}jrms/v1/partners/${pId}/spouseinfo`,{headers : config} )
        let fetchMembers = localStorage.getItem("members");
        console.log ("fetchMembers", fetchMembers);
         fetchMembers = fetchMembers ? JSON.parse(fetchMembers) : {};
        fetchMembers.spouse = resp1.data;
        localStorage.setItem("members",JSON.stringify(fetchMembers));
        // toast.success ("Spouse information updated successfully");
        onDataupdate();
        handleClose();
        window.location.reload();
          return toast.success ("Spouse name is added");
    })
    .catch((err) => {
      console.log(err);
    });
      
    }
    else{
      console.log("INSIDE OTHERS")
      await axios.get(`${jrmClientUrl}jrms/v1/partners/${pId}/familymemberinfo`,{headers : config})
      .then(async(response) => {
      console.log(response);
      console.log("response",response.data);
       let validate = response.data.addlFamilyMemberInfos.find((mem) => mem.fullName === memberInfo.addlFamilyMemberInfos[0].fullName
      
      );

       console.log("validate",validate);
       if(validate){return  toast.error ("This name is already present",);}
       else {
        let data= {};
        data.addlFamilyMemberId = '';
        data.fullName = memberInfo.addlFamilyMemberInfos[0].fullName;
        data.dateOfBirth = memberInfo.addlFamilyMemberInfos[0].dateOfBirth;
        data.gender = memberInfo.addlFamilyMemberInfos[0].gender;
        data.relationship = memberInfo.addlFamilyMemberInfos[0].relationship;
        data.occupation = memberInfo.addlFamilyMemberInfos[0].occupation;
        response.data.addlFamilyMemberInfos.push(data);
        console.log("response.data.addlFamilyMemberInfos",response.data);
       
        const result = await updatePartnerAddlMemberInfo(`${jrmClientUrl}jrms/v1/partners/${pId}`, token, response.data);
        console.log("result",result)
      // await axios.post(`${jrmClientUrl}jrms/v1/partners/${pId}/childreninfo`,childdata.data,{headers : config}).then((result) => {
        if (!result.ok) {
          console.log ("FamilyInfo FAILED", result);
          return toast.error ("Could not update FamilyInfo", result.data);
          }
          console.log ("FamilyInfo successful", result.data);
          let resp1 = await axios.get(`${jrmClientUrl}jrms/v1/partners/${pId}/familymemberinfo`,{headers : config} )
          let fetchMembers = localStorage.getItem("members");
          console.log ("fetchMembers", fetchMembers);
           fetchMembers = fetchMembers ? JSON.parse(fetchMembers) : {};
          fetchMembers.family = resp1.data;
          localStorage.setItem("members",JSON.stringify(fetchMembers));
         
          onDataupdate();
          handleClose();
          window.location.reload();
            return toast.success ("Member name is added");
        }
    })
    .catch((err) => {
      console.log(err);
    });
    }
        },
      });
    const { errors, values, touched, isSubmitting,handleSubmit,
      handleBlur,setFieldValue} = formik;


return (

<FormikProvider value={formik}>
<Form noValidate onSubmit={handleSubmit}>
  <Grid item xs={12} md={12} lg={12}> 
        <Stack spacing={3} >    
            <Stack spacing={3} >
                <>
                <FieldArray name="addlFamilyMemberInfos">
                {({ push, remove }) => (
                  <div>
                  {values.addlFamilyMemberInfos.map((p, index) => {
                 
                    const fullName = `addlFamilyMemberInfos[${index}].fullName`;
                    const touchedfullName = getIn(touched, fullName) ;
                    const errorfullName = getIn(errors, fullName) ;

                    const dateOfBirth = `addlFamilyMemberInfos[${index}].dateOfBirth`;
                    const toucheddateOfBirth = getIn(touched, dateOfBirth) ;
                    const errordateOfBirth = getIn(errors, dateOfBirth) ;

                    const gender = `addlFamilyMemberInfos[${index}].gender`;
                    const touchedgender = getIn(touched, gender) ;
                    const errorgender = getIn(errors, gender) ;

                    const relationship = `addlFamilyMemberInfos[${index}].relationship`;
                    const touchedrelationship = getIn(touched, relationship) ;
                    const errorrelationship = getIn(errors, relationship) ;

                    const occupation = `addlFamilyMemberInfos[${index}].occupation`;
                    const touchedoccupation = getIn(touched, occupation) ;
                    const erroroccupation = getIn(errors, occupation) ;

                    const maxDate = new Date();

                    return (
                      <div key={index}>
                      
                        <Stack spacing={3}>
                        {/* Member {index + 1} Details<br /> */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        
                        <MuiTextField name={fullName} label='Member name' sx={{ xs:{minWidth: '20%'}, sm:{maxWidth: '20%'} }} 
                         onBlur={handleBlur} required enableUpperCase={true}
                        onChange={(e,v)=> {const val = e.target.value || ""; formik.setFieldValue(fullName,val.toUpperCase())}}
                        helperText={touchedfullName && errorfullName ? errorfullName: ""}
                        error={Boolean(touchedfullName && errorfullName)}
                        value={p.fullName.toUpperCase()}/>


                        <MuiMobilePicker  name={dateOfBirth} sx={{ xs:{minWidth: '20%'}, sm:{maxWidth: '20%'} }} 
                                label="Date of Birth"
                                minDate={new Date("1940")}
                                maxDate={new Date(maxDate)}
                                value={p.dateOfBirth}
                                helperText={toucheddateOfBirth && errordateOfBirth ? errordateOfBirth: ""}
                                error={Boolean(toucheddateOfBirth && errordateOfBirth)}
                                onChange={(value) => {setFieldValue(dateOfBirth,value === null ? "" : new Intl.DateTimeFormat("en-GB").format(new Date(value)).split("/").reverse().join("/"));
                                }}
                                />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <MuiSelect  name={gender} placeholder="choose one" sx={{ xs:{minWidth: '20%'}, sm:{maxWidth: '20%'} }} 
                                value={p.gender}
                                align="left"  label="Gender"
                                helperText={touchedgender && errorgender ? errorgender: ""}
                                error={Boolean(touchedgender && errorgender)}
                                options = {genderList}
                                onChange={(e)=>{formik.setFieldValue(gender,e.target.value)}} />

                          <MuiSelect name={relationship} placeholder="choose one" sx={{ xs:{minWidth: '20%'}, sm:{maxWidth: '20%'} }} 
                                value={p.relationship}
                                align="left" label="Relationship"
                                options = {relationshipList}
                                helperText={touchedrelationship && errorrelationship ? errorrelationship: ""}
                                error={Boolean(touchedrelationship && errorrelationship)}
                                onChange={(e)=>{formik.setFieldValue(relationship,e.target.value)}} />

                           <MuiSelect name={occupation} placeholder="choose one" sx={{ xs:{minWidth: '20%'}, sm:{maxWidth: '20%'} }} 
                                value={p.occupation} 
                                align="left" label="Occupation"
                                options = {occupationList}
                                helperText={touchedoccupation && erroroccupation ? erroroccupation: ""}
                                error={Boolean(touchedoccupation && erroroccupation)}
                                onChange={(e)=>{formik.setFieldValue(occupation,e.target.value)}} />
                       

                            </Stack>
                            {/* <Divider sx={{ borderBottomWidth: 5, backgroundColor:"black" , marginTop: 4, }}/> */}
                            </Stack>
                          </div>
                        );  } )} 
              
           {/* {   memberCount < 10  && 
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <Tooltip title="Add another member" arrow>
            <Button
            variant="outlined" 
            disabled={  memberCount > 3}
            onClick={() =>
              push({ fullName: "", dateOfBirth: "", gender:"", relationship:"" })
            }
          >
           Add +
          </Button>
            </Tooltip>
         
          </Stack>
           }  */}
          </div>
          )}
          </FieldArray>

          {/* <p> Total Member Count  : { memberCount}</p> */}
          </>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          </Stack>
    </Stack>
    </Grid>

     {/* _________________________________________________________________________________________________ */}
 
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton  size="medium" type="submit"  variant="contained" loading={isSubmitting}>
                 Add Member
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

export default function AddMember() {
    const [open2, setOpen2] = useState(false);
    const handleClickOpen2 = () => {
      setOpen2(true);
      
    };
    const handleClickClose2 = () => {
      setOpen2(false);
    };
  return (
    <div>
        <Stack direction="column" justifyContent='flex-end' alignItems="flex-end">
  <LoadingButton size="medium" variant='outlined' onClick={handleClickOpen2} 
      endIcon={ <Iconify icon="material-symbols:add-rounded" sx={{ width: 20, height: 20 }} />} >
      Add Another Member
      </LoadingButton>
      
  </Stack>
  
   <BootstrapDialog open={open2} onClose={handleClickClose2}  closeAfterTransition={false}>
                    <DialogTitle id="alert-dialog-title"> <div>Add member</div></DialogTitle>
                    <Button onClick={handleClickClose2} color="primary" sx={(theme) => ({
                    position: 'absolute',right: 8,top: 8})}>
                        close
                      </Button>
                    <DialogActions>
                    <AddMemberForm  onDataupdate={handleClickClose2}  handleClose={handleClickClose2}/>
                     
                      
                    </DialogActions>
                  </BootstrapDialog>
   
    </div>
  );
}