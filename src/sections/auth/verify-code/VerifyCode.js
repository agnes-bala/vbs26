import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import FormLabel from "@mui/material/FormLabel";
import VerifyCodeEmail from "../../auth/verify-code/VerifyCodeEmail";
import VerifyCodeMobile from "../../auth/verify-code/VerifyCodeMobile";
import { Box } from "@mui/material";

export default function VerifyCode() {
  const [showEmail, setEmail] = useState(false);
  const [showMobile, setMobile] = useState(false);
  const [option, setOption] = useState(false);
  useEffect(() => {
    const fetchAuthInfo = async () => {
      let mode = JSON.parse(localStorage.getItem("authInfo"));
      if (!mode) {
        try {
          const response = await axios.get("https://api.country.is");
          if (response.data.country === "IN") {
            setMobile(true);
          } else {
            setEmail(true);
          }
        } catch (error) {
          console.error("Error fetching country data:", error);
        }
      } else {
        if (!mode.authName) {
          setOption(true);
        } else if (!mode.emailAddress) {
          setMobile(true);
          localStorage.setItem("mobileNumber", mode.mobileNumber);
        } else {
          setEmail(true);
          localStorage.setItem("emailAddress", mode.emailAddress);
        }
      }
    };

    fetchAuthInfo();
  }, []);

  const handleRadioChange = (event) => {
    if (event.target.value === "mobile") {
      setMobile(true);
      setEmail(false);
    } else {
      setEmail(true);
      setMobile(false);
    }
  };

  return (
    <div>
      <>
        {option && (
          <FormControl sx={{ m: 1 }} variant="standard">
            <FormLabel id="demo-error-radios">Choose one option</FormLabel>
            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="otp"
              value="mobile"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="mobile"
                control={<Radio />}
                label="Login with Mobile"
              />
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="Login with Email"
              />
            </RadioGroup>
          </FormControl>
        )}
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ margin: "auto", padding: "10px" }}>
          {showMobile && <VerifyCodeMobile />}
          {showEmail && <VerifyCodeEmail />}
          </Box>
        </Box>
      </>
    </div>
  );
}
