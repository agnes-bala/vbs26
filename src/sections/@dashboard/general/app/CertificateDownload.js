import React from "react";
import PropTypes from 'prop-types';
import { exportComponentAsJPEG } from "react-component-export-image";
import Canva from "./Canva";
import { Button } from "@mui/material";



Certificate.propTypes = {
  name: PropTypes.string,
};

export default function Certificate({name})  {
  const certificateWrapper = React.useRef();
    return (
      <div >
       
          <div id="downloadWrapper" ref={certificateWrapper} 
            style={{  marginTop: '0px'}}>
          <div id="certificateWrapper" >
          <Canva text={name}/>
          </div>
        </div>
            
        
        
        <Button varient='outlined'
            onClick={(e) => {
              e.preventDefault();
              exportComponentAsJPEG(certificateWrapper);
            }}
            >
            Download
            </Button>
    </div>
      
    );
  
}


