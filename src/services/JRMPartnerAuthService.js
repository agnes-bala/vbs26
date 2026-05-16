// import apiClient from "./Client";
// import config from "../partnerconfig.json";

// const registerPartnerMobile = (partnerDetails) => {
//   console.log("registerPartnerMobile", partnerDetails);
//   return apiClient.post(config.jrmPartnerRegisterMobileUrl, partnerDetails);
// };

// const verifyMobileOTP = (otp) => {
//   console.log("verifyMobileOTP", otp);
//   return apiClient.post(config.jrmPartnerVerifyMobileUrl, otp);
// };
// const resendMobileOTP = (otp) => {
//   console.log("resendMobileOTP", otp);
//   return apiClient.post(config.jrmResendOTPUrl, otp);
// };

// const verifyEmailOTP = (otp) => {
//   console.log("verifyEmailOTP", otp);
//   return apiClient.post(config.jrmPartnerVerifyEmailUrl, otp);
// };
// const resendEmailOTP = (otp) => {
//   console.log("resendEmailOTP", otp);
//   return apiClient.post(config.jrmResendOTPUrl, otp);
// };

// const setPassword = ( passwordDetails, url) => {

//   console.log ("setPassword setPasswordINfo=", url);
//   console.log ("setPassword request=", passwordDetails);

//  const config = {
//      headers:{
//          "Authorization": `Bearer ${passwordDetails.oneTimeJWT}`,
         
//      }
//  };

//  const request = { "password": passwordDetails.password};
//   console.log ("new password:", request);
//  return apiClient.post (url, request, config);
// };

// const loginPartner = (credentials) => {
//   return apiClient.post(config.jrmPartnerLoginUrl, credentials);
// };

// const logoutPartner = (authInfo) => {
//   console.log("LogoutPartner authInfo=", authInfo);

//   const config = {
//     headers: {
//       Authorization: `Bearer ${authInfo.jwt}`,
//     },
//   };

//   //  Empty request on purpose
//   const request = {};
//   return apiClient.post(authInfo.signOutUrl, request, config);
// };

// const updatePartnerContactInfo = (partnerUrl, jwt, partnerInfo) => {
//   const partnerContactInfoUrl = `${partnerUrl}/contactinfo`;

//   console.log(
//     "updatePartnerContactInfo",
//     partnerUrl,
//     partnerContactInfoUrl,
//     partnerInfo
//   );

//   const config = {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   };

//   return apiClient.post(partnerContactInfoUrl, partnerInfo, config);
// };

// const updatePartnerSpouseInfo = (partnerUrl, jwt, partnerInfo) => {
//   const partnerSpouseInfoUrl = `${partnerUrl}/spouseinfo`;

//   console.log(
//     "updatePartnerSpouseInfo",
//     partnerUrl,
//     partnerSpouseInfoUrl,
//     partnerInfo
//   );

//   const config = {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   };

//   return apiClient.post(partnerSpouseInfoUrl, partnerInfo, config);
// };

// const initiatePasswordReset = (data) => {
//   console.log("initiatePasswordReset", data);
//   // const request = { "mobile": mobile };
//   return apiClient.post(config.jrmInitPasswordResetUrl, data);
// };
// const getPartnerContactInfo = (partnerContactInfoUrl, jwt) => {
//   console.log(
//     "JRMAuthService getPartnerContactInfo",
//     partnerContactInfoUrl,
//     jwt
//   );

//   const config = {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   };

//   return apiClient.get(partnerContactInfoUrl, "", config);
// };

// const getPartnerSpouseInfo = (partnerSpouseInfoUrl, jwt) => {
//   console.log("JRMAuthService getPartnerSpouseInfo", partnerSpouseInfoUrl, jwt);

//   const config = {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   };

//   return apiClient.get(partnerSpouseInfoUrl, "", config);
// };

// const updatePartnerChildrenInfo = (partnerUrl, jwt, partnerChildrenInfo) => {
//   const partnerChidrenInfoUrl = `${partnerUrl}/childreninfo`;

//   console.log(
//     "updatePartnerChildrenInfo",
//     partnerUrl,
//     partnerChidrenInfoUrl,
//     partnerChildrenInfo
//   );

//   const config = {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   };

//   return apiClient.post(partnerChidrenInfoUrl, partnerChildrenInfo, config);
// };

// const getPartnerChildrenInfo = (partnerChildrenInfoUrl, jwt) => {
//   console.log(
//     "JRMAuthService getPartnerChildrenInfo",
//     partnerChildrenInfoUrl,
//     jwt
//   );

//   const config = {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   };

//   return apiClient.get(partnerChildrenInfoUrl, "", config);
// };

// export {
//   registerPartnerMobile,
//   loginPartner,
//   logoutPartner,
//   verifyMobileOTP,
//   initiatePasswordReset,
//   updatePartnerContactInfo,
//   updatePartnerSpouseInfo,
//   setPassword,
//   getPartnerSpouseInfo,
//   resendMobileOTP,
//   verifyEmailOTP,
//   resendEmailOTP,
//   updatePartnerChildrenInfo,
//   getPartnerChildrenInfo,
//   getPartnerContactInfo,
// };
// // import apiClient from "./Client";
// // import config from "../partnerconfig.json";

// // const registerPartnerMobile = (partnerDetails) => {
// //   console.log("registerPartnerMobile", partnerDetails);
// //   return apiClient.post(config.jrmPartnerRegisterMobileUrl, partnerDetails);
// // };

// // const verifyMobileOTP = (otp) => {
// //   console.log("verifyMobileOTP", otp);
// //   return apiClient.post(config.jrmPartnerVerifyMobileUrl, otp);
// // };
// // const resendMobileOTP = (otp) => {
// //   console.log("resendMobileOTP", otp);
// //   return apiClient.post(config.jrmResendOTPUrl, otp);
// // };

// // const verifyEmailOTP = (otp) => {
// //   console.log("verifyEmailOTP", otp);
// //   return apiClient.post(config.jrmPartnerVerifyEmailUrl, otp);
// // };
// // const resendEmailOTP = (otp) => {
// //   console.log("resendEmailOTP", otp);
// //   return apiClient.post(config.jrmResendOTPUrl, otp);
// // };

// // const setPassword = ( passwordDetails, url) => {

// //   console.log ("setPassword setPasswordINfo=", url);
// //   console.log ("setPassword request=", passwordDetails);

// //  const config = {
// //      headers:{
// //          "Authorization": `Bearer ${passwordDetails.oneTimeJWT}`,

// //      }
// //  };

// //  const request = { "password": passwordDetails.password};
// //   console.log ("new password:", request);
// //  return apiClient.post (url, request, config);
// // };

// // const loginPartner = (credentials) => {
// //   return apiClient.post(config.jrmPartnerLoginUrl, credentials);
// // };

// // const logoutPartner = (authInfo) => {
// //   console.log("LogoutPartner authInfo=", authInfo);

// //   const config = {
// //     headers: {
// //       Authorization: `Bearer ${authInfo.jwt}`,
// //     },
// //   };

// //   //  Empty request on purpose
// //   const request = {};
// //   return apiClient.post(authInfo.signOutUrl, request, config);
// // };

// // const updatePartnerContactInfo = (partnerUrl, jwt, partnerInfo) => {
// //   const partnerContactInfoUrl = `${partnerUrl}/contactinfo`;

// //   console.log(
// //     "updatePartnerContactInfo",
// //     partnerUrl,
// //     partnerContactInfoUrl,
// //     partnerInfo
// //   );

// //   const config = {
// //     headers: {
// //       Authorization: `Bearer ${jwt}`,
// //     },
// //   };

// //   return apiClient.post(partnerContactInfoUrl, partnerInfo, config);
// // };

// // const updatePartnerSpouseInfo = (partnerUrl, jwt, partnerInfo) => {
// //   const partnerSpouseInfoUrl = `${partnerUrl}/spouseinfo`;

// //   console.log(
// //     "updatePartnerSpouseInfo",
// //     partnerUrl,
// //     partnerSpouseInfoUrl,
// //     partnerInfo
// //   );

// //   const config = {
// //     headers: {
// //       Authorization: `Bearer ${jwt}`,
// //     },
// //   };

// //   return apiClient.post(partnerSpouseInfoUrl, partnerInfo, config);
// // };

// // const initiatePasswordReset = (data) => {
// //   console.log("initiatePasswordReset", data);
// //   // const request = { "mobile": mobile };
// //   return apiClient.post(config.jrmInitPasswordResetUrl, data);
// // };
// // const getPartnerContactInfo = (partnerContactInfoUrl, jwt) => {
// //   console.log(
// //     "JRMAuthService getPartnerContactInfo",
// //     partnerContactInfoUrl,
// //     jwt
// //   );

// //   const config = {
// //     headers: {
// //       Authorization: `Bearer ${jwt}`,
// //     },
// //   };

// //   return apiClient.get(partnerContactInfoUrl, "", config);
// // };

// // const getPartnerSpouseInfo = (partnerSpouseInfoUrl, jwt) => {
// //   console.log("JRMAuthService getPartnerSpouseInfo", partnerSpouseInfoUrl, jwt);

// //   const config = {
// //     headers: {
// //       Authorization: `Bearer ${jwt}`,
// //     },
// //   };

// //   return apiClient.get(partnerSpouseInfoUrl, "", config);
// // };

// // const updatePartnerChildrenInfo = (partnerUrl, jwt, partnerChildrenInfo) => {
// //   const partnerChidrenInfoUrl = `${partnerUrl}/childreninfo`;

// //   console.log(
// //     "updatePartnerChildrenInfo",
// //     partnerUrl,
// //     partnerChidrenInfoUrl,
// //     partnerChildrenInfo
// //   );

// //   const config = {
// //     headers: {
// //       Authorization: `Bearer ${jwt}`,
// //     },
// //   };

// //   return apiClient.post(partnerChidrenInfoUrl, partnerChildrenInfo, config);
// // };

// // const getPartnerChildrenInfo = (partnerChildrenInfoUrl, jwt) => {
// //   console.log(
// //     "JRMAuthService getPartnerChildrenInfo",
// //     partnerChildrenInfoUrl,
// //     jwt
// //   );

// //   const config = {
// //     headers: {
// //       Authorization: `Bearer ${jwt}`,
// //     },
// //   };

// //   return apiClient.get(partnerChildrenInfoUrl, "", config);
// // };

// // export {
// //   registerPartnerMobile,
// //   loginPartner,
// //   logoutPartner,
// //   verifyMobileOTP,
// //   initiatePasswordReset,
// //   updatePartnerContactInfo,
// //   updatePartnerSpouseInfo,
// //   setPassword,
// //   getPartnerSpouseInfo,
// //   resendMobileOTP,
// //   verifyEmailOTP,
// //   resendEmailOTP,
// //   updatePartnerChildrenInfo,
// //   getPartnerChildrenInfo,
// //   getPartnerContactInfo,
// // };
// // JRMPartnerAuthService.js
// import apiClient from "./Client";
// import config from "../partnerconfig";

// // Helper functions
// export const normalizePhone = (s) => s.replace(/[\s-()+]/g, '');

// export const isPhone = (s) => {
//   const numeric = normalizePhone(s);
//   return /^[0-9]{7,15}$/.test(numeric);
// };

// export const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

// // Register partner
// export const registerPartner = (data) => {
//   console.log("registerPartner", data);
//   return apiClient.post(config.jrmPartnerRegisterMobileUrl, data);
// };

// // Login with password
// export const loginWithPassword = async ({ emailAddress, mobileNumber, password }) => {
//   console.log("loginWithPassword called");
//   try {
//     const params = { emailAddress, mobileNumber, password };
//     const response = await apiClient.post(config.jrmPartnerLoginUrl, params);

//     if (response.ok && response.data?.jwt) {
//       await setSession(response.data.jwt);
//       await setAuthInfo(response.data);
//     }

//     return {
//       status: response.status,
//       data: response.data,
//       ok: response.ok
//     };
//   } catch (error) {
//     console.error("Error during login:", error);
//     return {
//       status: error?.status || 500,
//       data: { message: error?.message || 'Network error. Try again later' },
//       ok: false
//     };
//   }
// };

// // Login with OTP
// export const loginWithOTP = async ({ emailAddress, mobileNumber, otp }) => {
//   console.log("loginWithOTP called");
//   try {
//     let otpType = emailAddress ? "email" : "mobile";
//     const params = emailAddress 
//       ? { emailAddress, otp: Number(otp) }
//       : { mobile: mobileNumber, otp: Number(otp) };

//     const url = emailAddress 
//       ? config.jrmPartnerVerifyEmailUrl 
//       : config.jrmPartnerVerifyMobileUrl;

//     const response = await apiClient.post(url, params);

//     if (response.ok && response.data?.jwt) {
//       await setSession(response.data.jwt);
//       await setAuthInfo(response.data);
//     }

//     return {
//       status: response.status,
//       data: response.data,
//       ok: response.ok
//     };
//   } catch (error) {
//     console.error("Error during OTP login:", error);
//     return {
//       status: error?.status || 500,
//       data: { message: error?.message || 'Network error. Try again later' },
//       ok: false
//     };
//   }
// };

// // Send OTP
// export const sendOTP = async ({ emailAddress, mobileNumber, country }) => {
//   console.log("sendOTP called");
//   try {
//     const params = { emailAddress, mobileNumber, country };
//     const response = await apiClient.post(config.jrmPartnerotpLoginUrl, params);

//     return {
//       status: response.status,
//       data: response.data,
//       ok: response.ok
//     };
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     return {
//       status: error?.status || 500,
//       data: { message: error?.message || 'Network error. Try again later' },
//       ok: false
//     };
//   }
// };

// // Initiate password reset
// export const initiatePasswordReset = (data) => {
//   console.log("initiatePasswordReset", data);
//   return apiClient.post(config.jrmInitPasswordResetUrl, data);
// };

// // Verify OTP for password reset
// export const verifyOTP = (data) => {
//   console.log("verifyOTP", data);
//   return apiClient.post(config.jrmVerifyOTPUrl, data);
// };

// // Resend OTP
// export const resendOTP = (data) => {
//   console.log("resendOTP", data);
//   return apiClient.post(config.jrmResendOTPUrl, data);
// };

// // Set password
// export const setPassword = (passwordDetails, url) => {
//   console.log("setPassword", url);
//   const config = {
//     headers: {
//       "Authorization": `Bearer ${passwordDetails.oneTimeJWT}`,
//     }
//   };
//   const request = { "password": passwordDetails.password };
//   return apiClient.post(url, request, config);
// };

// // Logout partner
// export const logoutPartner = (authInfo) => {
//   console.log("logoutPartner", authInfo);
//   const config = {
//     headers: {
//       Authorization: `Bearer ${authInfo.jwt}`,
//     }
//   };
//   return apiClient.post(authInfo.signOutUrl, {}, config);
// };

// // ========== Profile APIs ==========

// // Update contact info
// export const updatePartnerContactInfo = (partnerUrl, jwt, partnerInfo) => {
//   const partnerContactInfoUrl = `${partnerUrl}/contactinfo`;
//   console.log("updatePartnerContactInfo", partnerContactInfoUrl, partnerInfo);

//   const config = {
//     headers: { Authorization: `Bearer ${jwt}` }
//   };

//   return apiClient.post(partnerContactInfoUrl, partnerInfo, config);
// };

// // Get contact info
// export const getPartnerContactInfo = (partnerContactInfoUrl, jwt) => {
//   console.log("getPartnerContactInfo", partnerContactInfoUrl);

//   const config = {
//     headers: { Authorization: `Bearer ${jwt}` }
//   };

//   return apiClient.get(partnerContactInfoUrl, "", config);
// };

// // Update spouse info
// export const updatePartnerSpouseInfo = (partnerUrl, jwt, partnerInfo) => {
//   const partnerSpouseInfoUrl = `${partnerUrl}/spouseinfo`;
//   console.log("updatePartnerSpouseInfo", partnerSpouseInfoUrl, partnerInfo);

//   const config = {
//     headers: { Authorization: `Bearer ${jwt}` }
//   };

//   return apiClient.post(partnerSpouseInfoUrl, partnerInfo, config);
// };

// // Get spouse info
// export const getPartnerSpouseInfo = (partnerSpouseInfoUrl, jwt) => {
//   console.log("getPartnerSpouseInfo", partnerSpouseInfoUrl);

//   const config = {
//     headers: { Authorization: `Bearer ${jwt}` }
//   };

//   return apiClient.get(partnerSpouseInfoUrl, "", config);
// };

// // Update children info
// export const updatePartnerChildrenInfo = (partnerUrl, jwt, partnerChildrenInfo) => {
//   const partnerChildrenInfoUrl = `${partnerUrl}/childreninfo`;
//   console.log("updatePartnerChildrenInfo", partnerChildrenInfoUrl, partnerChildrenInfo);

//   const config = {
//     headers: { Authorization: `Bearer ${jwt}` }
//   };

//   return apiClient.post(partnerChildrenInfoUrl, partnerChildrenInfo, config);
// };

// // Get children info
// export const getPartnerChildrenInfo = (partnerChildrenInfoUrl, jwt) => {
//   console.log("getPartnerChildrenInfo", partnerChildrenInfoUrl);

//   const config = {
//     headers: { Authorization: `Bearer ${jwt}` }
//   };

//   return apiClient.get(partnerChildrenInfoUrl, "", config);
// };

// // Update family member info
// export const updatePartnerFamilyMemberInfo = (partnerUrl, jwt, partnerFamilyInfo) => {
//   const partnerFamilyInfoUrl = `${partnerUrl}/familymemberinfo`;
//   console.log("updatePartnerFamilyMemberInfo", partnerFamilyInfoUrl, partnerFamilyInfo);

//   const config = {
//     headers: { Authorization: `Bearer ${jwt}` }
//   };

//   return apiClient.post(partnerFamilyInfoUrl, partnerFamilyInfo, config);
// };

// // Get family member info
// export const getPartnerFamilyMemberInfo = (partnerFamilyInfoUrl, jwt) => {
//   console.log("getPartnerFamilyMemberInfo", partnerFamilyInfoUrl);

//   const config = {
//     headers: { Authorization: `Bearer ${jwt}` }
//   };

//   return apiClient.get(partnerFamilyInfoUrl, "", config);
// };

// src/services/JRMPartnerAuthService.js
import apiClient from "./Client";
import { config } from "../partnerconfig"; // Change to named import
import { setSession, setAuthInfo } from "../auth/AppAuthStorage"; // Add this import

// Helper functions
export const normalizePhone = (s) => s?.replace(/[\s-()+]/g, '') || '';

export const isPhone = (s) => {
  if (!s) return false;
  const numeric = normalizePhone(s);
  return /^[0-9]{7,15}$/.test(numeric);
};

export const isEmail = (s) => {
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
};

// Original exports (keeping for backward compatibility)
export const registerPartnerMobile = (partnerDetails) => {
  console.log("registerPartnerMobile", partnerDetails);
  return apiClient.post(config.jrmPartnerRegisterMobileUrl, partnerDetails);
};

// New register function
export const registerPartner = (data) => {
  console.log("registerPartner", data);
  return apiClient.post(config.jrmPartnerRegisterMobileUrl, data);
};

// Login with password
export const loginPartner = (credentials) => {
  return apiClient.post(config.jrmPartnerLoginUrl, credentials);
};

export const loginWithPassword = async ({ emailAddress, mobileNumber, password }) => {
  console.log("loginWithPassword called");
  try {
    const params = { emailAddress, mobileNumber, password };
    const response = await apiClient.post(config.jrmPartnerLoginUrl, params);

    if (response.ok && response.data?.jwt) {
      setSession(response.data.jwt);
      setAuthInfo(response.data);
    }

    return {
      status: response.status,
      data: response.data,
      ok: response.ok
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      status: error?.status || 500,
      data: { message: error?.message || 'Network error. Try again later' },
      ok: false
    };
  }
};

// Login with OTP
export const loginWithOTP = async ({ emailAddress, mobileNumber, otp }) => {
  console.log("loginWithOTP called");
  try {
    // let otpType = emailAddress ? "email" : "mobile";
    const params = emailAddress
      ? { emailAddress, otp: Number(otp) }
      : { mobile: mobileNumber, otp: Number(otp) };

    const url = emailAddress
      ? config.jrmPartnerVerifyEmailUrl
      : config.jrmPartnerVerifyMobileUrl;

    const response = await apiClient.post(url, params);

    if (response.ok && response.data?.jwt) {
      setSession(response.data.jwt);
      setAuthInfo(response.data);
    }

    return {
      status: response.status,
      data: response.data,
      ok: response.ok
    };
  } catch (error) {
    console.error("Error during OTP login:", error);
    return {
      status: error?.status || 500,
      data: { message: error?.message || 'Network error. Try again later' },
      ok: false
    };
  }
};

// Send OTP
export const sendOTP = async ({ emailAddress, mobileNumber, country }) => {
  console.log("sendOTP called");
  try {
    const params = { emailAddress, mobileNumber, country };
    const response = await apiClient.post(config.jrmPartnerotpLoginUrl, params);

    return {
      status: response.status,
      data: response.data,
      ok: response.ok
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      status: error?.status || 500,
      data: { message: error?.message || 'Network error. Try again later' },
      ok: false
    };
  }
};

// Mobile OTP verification (keeping for backward compatibility)
export const verifyMobileOTP = (otp) => {
  console.log("verifyMobileOTP", otp);
  return apiClient.post(config.jrmPartnerVerifyMobileUrl, otp);
};

// Email OTP verification (keeping for backward compatibility)
export const verifyEmailOTP = (otp) => {
  console.log("verifyEmailOTP", otp);
  return apiClient.post(config.jrmPartnerVerifyEmailUrl, otp);
};

// Resend OTP (keeping for backward compatibility)
export const resendMobileOTP = (otp) => {
  console.log("resendMobileOTP", otp);
  return apiClient.post(config.jrmResendOTPUrl, otp);
};

export const resendEmailOTP = (otp) => {
  console.log("resendEmailOTP", otp);
  return apiClient.post(config.jrmResendOTPUrl, otp);
};

// Unified resend OTP
export const resendOTP = (data) => {
  console.log("resendOTP", data);
  return apiClient.post(config.jrmResendOTPUrl, data);
};

// Initiate password reset
export const initiatePasswordReset = (data) => {
  console.log("initiatePasswordReset", data);
  return apiClient.post(config.jrmInitPasswordResetUrl, data);
};

// Verify OTP for password reset
export const verifyOTP = (data) => {
  console.log("verifyOTP", data);
  return apiClient.post(config.jrmVerifyOTPUrl, data);
};

// Set password
export const setPassword = (passwordDetails, url) => {
  console.log("setPassword", url);
  const configHeaders = {
    headers: {
      "Authorization": `Bearer ${passwordDetails.oneTimeJWT}`,
    }
  };
  const request = { "password": passwordDetails.password };
  return apiClient.post(url, request, configHeaders);
};

// Logout partner
export const logoutPartner = (authInfo) => {
  console.log("logoutPartner", authInfo);
  const configHeaders = {
    headers: {
      Authorization: `Bearer ${authInfo.jwt}`,
    }
  };
  return apiClient.post(authInfo.signOutUrl, {}, configHeaders);
};

// ========== Profile APIs ==========

// Update contact info
export const updatePartnerContactInfo = (partnerUrl, jwt, partnerInfo) => {
  const partnerContactInfoUrl = `${partnerUrl}/contactinfo`;
  console.log("updatePartnerContactInfo", partnerContactInfoUrl, partnerInfo);

  const configHeaders = {
    headers: { Authorization: `Bearer ${jwt}` }
  };

  return apiClient.post(partnerContactInfoUrl, partnerInfo, configHeaders);
};

// Get contact info
export const getPartnerContactInfo = (partnerContactInfoUrl, jwt) => {
  console.log("getPartnerContactInfo", partnerContactInfoUrl);

  const configHeaders = {
    headers: { Authorization: `Bearer ${jwt}` }
  };

  return apiClient.get(partnerContactInfoUrl, "", configHeaders);
};

// Update spouse info
export const updatePartnerSpouseInfo = (partnerUrl, jwt, partnerInfo) => {
  const partnerSpouseInfoUrl = `${partnerUrl}/spouseinfo`;
  console.log("updatePartnerSpouseInfo", partnerSpouseInfoUrl, partnerInfo);

  const configHeaders = {
    headers: { Authorization: `Bearer ${jwt}` }
  };

  return apiClient.post(partnerSpouseInfoUrl, partnerInfo, configHeaders);
};

// Get spouse info
export const getPartnerSpouseInfo = (partnerSpouseInfoUrl, jwt) => {
  console.log("getPartnerSpouseInfo", partnerSpouseInfoUrl);

  const configHeaders = {
    headers: { Authorization: `Bearer ${jwt}` }
  };

  return apiClient.get(partnerSpouseInfoUrl, "", configHeaders);
};

// Update children info
export const updatePartnerChildrenInfo = (partnerUrl, jwt, partnerChildrenInfo) => {
  const partnerChildrenInfoUrl = `${partnerUrl}/childreninfo`;
  console.log("updatePartnerChildrenInfo", partnerChildrenInfoUrl, partnerChildrenInfo);

  const configHeaders = {
    headers: { Authorization: `Bearer ${jwt}` }
  };

  return apiClient.post(partnerChildrenInfoUrl, partnerChildrenInfo, configHeaders);
};

// Get children info
export const getPartnerChildrenInfo = (partnerChildrenInfoUrl, jwt) => {
  console.log("getPartnerChildrenInfo", partnerChildrenInfoUrl);

  const configHeaders = {
    headers: { Authorization: `Bearer ${jwt}` }
  };

  return apiClient.get(partnerChildrenInfoUrl, "", configHeaders);
};

// Update family member info
export const updatePartnerFamilyMemberInfo = (partnerUrl, jwt, partnerFamilyInfo) => {
  const partnerFamilyInfoUrl = `${partnerUrl}/familymemberinfo`;
  console.log("updatePartnerFamilyMemberInfo", partnerFamilyInfoUrl, partnerFamilyInfo);

  const configHeaders = {
    headers: { Authorization: `Bearer ${jwt}` }
  };

  return apiClient.post(partnerFamilyInfoUrl, partnerFamilyInfo, configHeaders);
};

// Get family member info
export const getPartnerFamilyMemberInfo = (partnerFamilyInfoUrl, jwt) => {
  console.log("getPartnerFamilyMemberInfo", partnerFamilyInfoUrl);

  const configHeaders = {
    headers: { Authorization: `Bearer ${jwt}` }
  };

  return apiClient.get(partnerFamilyInfoUrl, "", configHeaders);
};
