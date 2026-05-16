import * as Yup from "yup";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// form
import { useFormik, Form, FormikProvider } from "formik";
// @mui
import { Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
// hook
import useTimer from "../../../components/useTimer";

import {
  verifyMobileOTP,
  resendMobileOTP,
} from "../../../services/JRMPartnerAuthService";
// routes
import { AppAuthContext } from "src/auth/AppAuthContext";
import { storeAuthInfo } from "../../../auth/AppAuthStorage";

import { PATH_AFTER_LOGIN } from "src/config";

// components
// ----------------------------------------------------------------------

export default function VerifyCodeMobile() {
  const navigate = useNavigate();
  const [firsttrigger, setFirsttrigger] = useState(false);
  const authContext = useContext(AppAuthContext);
  const saveAuthInfo = async (authInfo) => {
    //console.log('Storing Auth Info ', authInfo);
    storeAuthInfo(authInfo);
  };

  const [resendTime, setResendTime] = useTimer({
    multiplier: 1,
  });
  const storedLocation = localStorage.getItem("storedLocation");
  const mobileVerify = localStorage.getItem("mobileNumber");
  const handleResend = async () => {
    setResendTime(60);
    console.log("Resend OTP");
    //  Retrieve the contact Info stored in secure storage
    //   const contactInfo = await getContactInfo();
    //   console.log("handleOTPResend contactInfo=", contactInfo);
    //   if ( !contactInfo ) {
    //     toast.error ("Error resending OTP for verification!");
    //     navigate(PATH_AUTH.verifyMobile, { replace: true });
    //     return;
    // }
    //  Create the request from the OTP string
    const request = {
      emailAddress: "",
      mobileNumber: mobileVerify,
      country: "",
    };
    console.log("handleOTPResend request=", request);
    //  Provide the OTP entered
    const result = await resendMobileOTP(request);
    if (!result.ok) {
      console.log("handleOTPResend FAILED=", result);
      toast.error("Resend OTP failed");
      //  TODO: Need to give at least 3 tries - store in local Store
      //navigate(PATH_AUTH.verifyMobile, { replace: true });
      return;
    }
    toast.success("OTP resend was successful");
  };
  const handleVerify = () => {
    setFirsttrigger(true);
    setResendTime(60);
  };

  const VerifyCodeSchema = Yup.object().shape({
    mobileOTP: Yup.number()
      .typeError("Invalid Character")
      .min(100000, "check entered OTP")
      .max(999999, "check entered OTP")
      .required("Code is required"),
    mobileNumber: Yup.number()
      .required("Mobile number is required")
      .min(6001000000, "Invaid number")
      .max(9999000000, "Invaid Number"),
  });

  const formik = useFormik({
    initialValues: {
      mobileOTP: "",
      mobileNumber: mobileVerify || "",
    },

    validationSchema: VerifyCodeSchema,
    onSubmit: async (data) => {
      console.log("VerifyMobileOTPScreen OTP=", data);

      //  Retrieve the contact Info stored in secure storage
      //   const contactInfo = await getContactInfo();
      //   console.log("VerifyMobileOTPScreen contactInfo=", contactInfo);
      //   if ( !contactInfo ) {
      //     toast.error ("Error processing OTP verification!");
      //     navigate(PATH_AUTH.verifyMobile, { replace: true });
      //     return;
      // }

      //  Create the request from the OTP string
      const request = { mobile: data.mobileNumber, otp: data.mobileOTP };

      console.log("VerifyMobileOTPScreen request=", request);
      //  Provide the OTP entered
      const result = await verifyMobileOTP(request);

      if (!result.ok) {
        console.log("VerifyMobileOTPScreen FAILED=", result);
        toast.error("Incorrect OTP provided!");

        //  TODO: Need to give at least 3 tries - store in local Store
        // navigate(PATH_AUTH.verifyMobile, { replace: true });
        handleVerify();
        return;
      }

      //  Request is successful - remove contact Info and add setPasswordInfo
      //await removeContactInfo();
      //await storeSetPasswordInfo(result.data);
      // navigate(‘/dashboard/app’,{replace: true});

      console.log("OTP Verification successful", result.data);
      toast.success("OTP Verification successful");
      authContext.setUser(result.data);
      saveAuthInfo(result.data);
      let configure = { Authorization: `Bearer ${result.data.jwt}` };
      let resp = await axios.get(`${result.data.profileUrl}/contactinfo`, {
        headers: configure,
      });
      let resp1 = await axios.get(`${result.data.profileUrl}/childreninfo`, {
        headers: configure,
      });
      let resp2 = await axios.get(
        `${result.data.profileUrl}/familymemberinfo`,
        { headers: configure }
      );
      console.log("login resp", resp);
      if (
        resp.data.fullName == null ||
        resp.data.fullName == "" ||
        resp.data.fullName == undefined
      ) {
        localStorage.setItem("profileStatus", 0);
      } else {
        localStorage.setItem("profileStatus", 1);
      }
      let members = {
        main: resp.data,
        spouse: resp.data,
        family: resp2.data,
        kids: resp1.data,
      };
      localStorage.setItem("members", JSON.stringify(members));
      // resetForm();
      if (storedLocation) {
        navigate(storedLocation ?? PATH_AFTER_LOGIN, { replace: true });
        return;
      }
      navigate(PATH_AFTER_LOGIN, { replace: true });
    },
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <>
      <Typography variant="h3" paragraph>
        Please check your mobile!
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          width: { xs: "100%", sm: "100%", md: "50%", lg: "50%", xl: "50%" },
        }}
      >
        We have sent a 6-digit confirmation code to your mobile number, please
        enter the code in below box to verify your mobile number.
      </Typography>

      <br />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Mobile number"
              type="number"
              disabled={!!mobileVerify}
              {...getFieldProps("mobileNumber")}
              error={Boolean(touched.mobileNumber && errors.mobileNumber)}
              helperText={touched.mobileNumber && errors.mobileNumber}
            />

            <TextField
              fullWidth
              label="OTP"
              type="number"
              inputProps={{ minLength: 6, maxLength: 6 }}
              {...getFieldProps("mobileOTP")}
              error={Boolean(touched.mobileOTP && errors.mobileOTP)}
              helperText={touched.mobileOTP && errors.mobileOTP}
            />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ mt: 3 }}
          >
            Verify OTP
          </LoadingButton>

          {firsttrigger && (
            <div>
              <LoadingButton
                fullWidth
                size="medium"
                type="submit"
                disabled={resendTime !== 0}
                onClick={handleResend}
                variant="outlined"
                loading={isSubmitting}
                sx={{ mt: 3 }}
              >
                Resend OTP
              </LoadingButton>
              {resendTime !== 0 && <span> in {resendTime} seconds</span>}
            </div>
          )}
        </Form>
      </FormikProvider>
    </>
  );
}
