import React from "react"
import { useFormikContext} from "formik";
import { TextField,MenuItem,} from "@mui/material";

function MuiSelect(props) {
  
  const { label, name, options,value,onChange,Placeholder, ...rest } = props;
  const { errors,touched } = useFormikContext();

  return (
    <>
     <TextField fullWidth 
        select 
      label={label} 
      name={name}
      value={value}
      onChange={onChange}
        size='small'
      error={Boolean(touched[name] && errors[name])}
      helperText={touched[name] && errors[name]}

      {...rest}
      >
        {Placeholder && <MenuItem disabled value="">
            <em>{Placeholder}</em>
          </MenuItem>}
      {options.map(option =>(
                <MenuItem key={option._id} value={option._id} disabled={option.disabled && (option.disabled === true) ? true : false}>
                  {option.name.toUpperCase()} 
                </MenuItem>
                ))}
                </TextField>
    </>
  )
}

export default MuiSelect;