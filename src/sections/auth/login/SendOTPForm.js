import * as Yup from "yup";
import { useState, useEffect } from "react";
import * as React from "react";

import {  useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// material
import { Stack, Button, Box, Typography } from "@mui/material";

import { config } from "src/partnerconfig";
// routes

import MuiTextField from "src/components/formfield/TextField";

export default function SendOTPForm() {
  const navigate = useNavigate();
  const [isInd, setInd] = useState("IN");
  // const [hasAccount, setHasAccount] = useState(false);
  const [auth, setAuth] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://api.country.is");
      let mode = JSON.parse(localStorage.getItem("authInfo"));

      if (!mode) {
      } else {
        setEmail(mode.emailAddress);
        setMobile(mode.mobileNumber);
        setAuth(mode.authName);
      }

      //console.log("response",response);
      setInd(response.data.country);
      console.log("country", response.data.country);
    }
    fetchData();
  }, []);
  // const storedLocation = localStorage.getItem("storedLocation");
  console.log("auth", auth);
  const LoginSchema = Yup.object().shape({
    emailAddress: Yup.string(),
    mobileNumber: Yup.string(),
    authName: Yup.mixed().test(
      "authName",
      "Must be a number or a valid email address",
      function (value) {
        if (value === undefined || value === null) return false;

        // Check if it's a number
        if (!isNaN(value)) return true;

        // If it's a string, check if it's a valid email
        if (typeof value === "string") {
          return Yup.string().email().isValidSync(value);
        }

        // Otherwise, invalid
        return false;
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      authName: auth || "",
      emailAddress: email || "",
      mobileNumber: mobile || "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      console.log("isINd", isInd);
      if (values.mobileNumber !== "" && isInd !== "IN") {
        return toast.error("Please enter registered email address to get otp");
      }
      localStorage.setItem("authInfo", JSON.stringify(values));
      await axios
        .post(`${config.jrmPartnerotpLoginUrl}`, values)

        .then((result) => navigate("/auth/verify-otp"))
        .catch((error) => {
          toast(error.message);
          console.log("error", error);
        });
      // console.log("result",result);
      // if (!result.ok) {
      //   navigate('/auth/login')
      //   toast ('Existing User');
      //   return;
      //   }

      // else{
      //   navigate('/auth/verify-otp')
      //   return;
      // }

      // if (storedLocation) {
      //   navigate(storedLocation??PATH_AFTER_LOGIN, { replace: true });
      //   return;
      // }
      //navigate(PATH_AFTER_LOGIN, { replace: true });
    },
  });

  const { handleSubmit } = formik;

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          
        }}
      >
        <Box sx={{ mx: "auto", padding: "10px" }}>
          {isInd === "IN" ? (<Typography variant="h4" sx={{ mb: 5, textAlign: "center" }}>
          Please enter your<br></br> mobile number (without country code)
          <br></br> or<br></br> email id
        </Typography>) : (<Typography variant="h4" sx={{ mb: 5, textAlign: "center" }}>
          Please enter your email id
        </Typography>)} 
        

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3} direction={{ xs: "column", sm: "column", md: "column" }}>
              <MuiTextField
                name="authName"
                label={isInd === "IN" ? "Mobile Number or Email" : "Email Address"}
                onChange={(e, v) => {
                  const val = e.target.value || "";

                  formik.setFieldValue("authName", val);
                  //console.log(val);

                  //console.log("typeof", !isNaN(+val));
                  const numericVal = val.replace(/[\s-]/g, "");
                  const isPhoneNumber = /^[0-9]{7,15}$/.test(numericVal);
                  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

                  if (isPhoneNumber) {
                    formik.setFieldValue("mobileNumber", numericVal);
                    formik.setFieldValue("authName", numericVal);
                    formik.setFieldValue("emailAddress", "");
                  } else if (isEmail) {
                    formik.setFieldValue("emailAddress", val);
                    formik.setFieldValue("authName", val);
                    formik.setFieldValue("mobileNumber", "");
                  } else {
                    formik.setFieldValue("emailAddress", "");
                    formik.setFieldValue("mobileNumber", "");
                  }
                }}
                value={formik.values.authName}
              />
              <Button size="medium" type="submit" variant="contained">
                Get OTP
              </Button>
            </Stack>
            <Stack spacing={3}>
              <MuiTextField
                name="emailAddress"
                label="Email"
                type="email"
                hidden
                onChange={(e, v) => {
                  const val = e.target.value || "";
                  formik.setFieldValue("emailAddress", val);
                }}
                value={formik.values.emailAddress}
              />

              <MuiTextField
                name="mobileNumber"
                label="Mobile"
                type="number"
                hidden
                onChange={(e, v) => {
                  const val = e.target.value || "";
                  formik.setFieldValue("mobileNumber", val);
                }}
                value={formik.values.mobileNumber}
              />
            </Stack>
          </Form>
        </FormikProvider>
        </Box>
      </Box>
    </>
  );
}
