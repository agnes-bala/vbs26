import React from "react"
import { useFormikContext} from "formik";
import { TextField } from "@mui/material";

function MuiTextField(props) {
  const { label, name,value,enableUpperCase=false, ...rest } = props;
  const {errors,touched} = useFormikContext();
  return (
    <>
      <TextField fullWidth
      label={label} 
      name={name}
      size='small'
      value={value}
      error={Boolean(touched[name] && errors[name])}
      helperText={touched[name] && errors[name]}
      onInput={(e) => {
        if(enableUpperCase === true){
          const { selectionStart } = e.target;
          if(!isNaN(+e.target.value)){
            // e.target.value = e.target.value;
            setTimeout(() => e.target.setSelectionRange(selectionStart, selectionStart), 0);
          }
          else {
            e.target.value = e.target.value.toUpperCase();
            setTimeout(() => e.target.setSelectionRange(selectionStart, selectionStart), 0);
          }
        }
        
       
      }}
      {...rest}
      />
    </>
  )
}
export default MuiTextField;