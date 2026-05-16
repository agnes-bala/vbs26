import React from "react"
import { useFormikContext} from "formik";
import { TextField,FormControl } from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers';
function MuiMobilePicker(props) {
  const { label, name, value,onChange,minDate,maxDate, ...rest } = props;
  const { errors,touched} = useFormikContext();
  return (
    <> 
     <MobileDatePicker
                name={name}
                closeOnSelect={true}
                label={label}  fullWidth
                disableFuture={true}
                minDate={minDate || new Date(1940,0,1)}
                maxDate={maxDate || new Date()}
                // defaultCalendarMonth={maxDate || new Date()}
                openTo='year'
                views={['year','month','day']}
                disableCloseOnSelect={false}
                inputFormat='yyyy-MM-dd'
                value={value}
                onChange={onChange}
                renderInput={(params) => (<TextField {...params}   size='small'
                  error={Boolean(touched[name] && errors[name])}
                  helperText={touched[name] && errors[name]}   {...rest}/>)}
                  {...rest}
                />
     
    </>
  )
}

export default MuiMobilePicker;