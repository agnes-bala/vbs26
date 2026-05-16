// import React from "react"
// import { useFormikContext} from "formik";
// import { TextField } from "@mui/material";

// function MuiTextField(props) {
//   const { label, name,value,enableUpperCase=false, ...rest } = props;
//   const {errors,touched} = useFormikContext();
//   return (
//     <>
//       <TextField fullWidth
//       label={label} 
//       name={name}
//       size='small'
//       value={value}
//       error={Boolean(touched[name] && errors[name])}
//       helperText={touched[name] && errors[name]}
//       onInput={(e) => {
//         if(enableUpperCase === true){
//           const { selectionStart } = e.target;
//           if(!isNaN(+e.target.value)){
//             // e.target.value = e.target.value;
//             setTimeout(() => e.target.setSelectionRange(selectionStart, selectionStart), 0);
//           }
//           else {
//             e.target.value = e.target.value.toUpperCase();
//             setTimeout(() => e.target.setSelectionRange(selectionStart, selectionStart), 0);
//           }
//         }
        
       
//       }}
//       {...rest}
//       />
//     </>
//   )
// }
// export default MuiTextField;


// import React from "react"
// import { useFormikContext} from "formik";
// import { TextField } from "@mui/material";

// function MuiTextField(props) {
//   const { label, name,value,enableUpperCase=false, ...rest } = props;
//   const {errors,touched} = useFormikContext();
//   return (
//     <>
//       <TextField fullWidth
//       label={label} 
//       name={name}
//       size='small'
//       value={value}
//       error={Boolean(touched[name] && errors[name])}
//       helperText={touched[name] && errors[name]}
//       onInput={(e) => {
//         if(enableUpperCase === true){
//           const { selectionStart } = e.target;
//           if(!isNaN(+e.target.value)){
//             // e.target.value = e.target.value;
//             setTimeout(() => e.target.setSelectionRange(selectionStart, selectionStart), 0);
//           }
//           else {
//             e.target.value = e.target.value.toUpperCase();
//             setTimeout(() => e.target.setSelectionRange(selectionStart, selectionStart), 0);
//           }
//         }


//       }}
//       {...rest}
//       />
//     </>
//   )
// }
// export default MuiTextField;

// src/components/formfield/TextField.js
import React from "react";
import { TextField } from "@mui/material";

function MuiTextField(props) {
  const {
    label,
    name,
    value,
    enableUpperCase = false,
    error,
    helperText,
    onChange,
    onInput,
    ...rest
  } = props;

  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      size='small'
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
      onInput={(e) => {
        if (enableUpperCase === true) {
          const { selectionStart } = e.target;
          if (!isNaN(+e.target.value)) {
            setTimeout(() => e.target.setSelectionRange(selectionStart, selectionStart), 0);
          } else {
            e.target.value = e.target.value.toUpperCase();
            setTimeout(() => e.target.setSelectionRange(selectionStart, selectionStart), 0);
          }
        }
        if (onInput) onInput(e);
      }}
      {...rest}
    />
  );
}

export default MuiTextField;