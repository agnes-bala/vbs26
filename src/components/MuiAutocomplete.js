import React from "react"
import { useFormikContext} from "formik";
import { Box,Autocomplete,TextField } from "@mui/material";

function MuiAutocomplete(props) {
  const { label, name, options,value,onChange,noOptionsText, ...rest } = props;
  const { errors,touched } = useFormikContext();
  return (
  
               
        <Autocomplete
        required
        autoSelect
        autoComplete
         autoHighlight
         blurOnSelect 
         onChange={onChange}
         id={name}
         value ={value} 
           size="small"
         options={options}
         getOptionLabel={(name) => `${name}`}
         isOptionEqualToValue={(option, value) => option.name === value.name}
         noOptionsText={"No Available Data"|| noOptionsText}
         renderOption={(props, name) => (
           <Box component="li" {...props} key={name} value={name} >
             {name.toUpperCase()}
           </Box>
         )}
         clearOnEscape
         renderInput={(params) => <TextField {...params} label={label}
          
         error={Boolean(touched[name] && errors[name]) || false}
         helperText={touched[name] && errors[name]}
         onInput={(e) => {
          const { selectionStart } = e.target;
          if(!isNaN(+e.target.value)){
            // e.target.value = e.target.value;
            setTimeout(() => e.target.setSelectionRange(selectionStart, selectionStart), 0);
          }
          else {
             e.target.value = e.target.value !== "" ? e.target.value.toUpperCase() : e.target.value;
            setTimeout(() => e.target.setSelectionRange(selectionStart, selectionStart), 0);
          }
         
        }}
         {...rest}/>}
         
         {...rest}
       />
       
  )
}

export default MuiAutocomplete;