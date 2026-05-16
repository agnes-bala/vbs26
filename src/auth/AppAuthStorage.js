
// const jwtKey = "jwt";
// const emailKey = "emailAddress";
// const idKey = "partnerId";
// const profileUrlKey = "profileUrl";
// const signOutUrlKey = "signOutUrl";
// const countryKey = "country";

// const mobileNumberKey = "mobileNumber";
// const emailAddressKey = "emailAddress";

// const oneTimeJWTKey = "oneTimeJWT";
// const setPwdUrlKey = "setPwdUrl";

// const storeAuthInfo = async (authInfo) => {
//     try {
//         localStorage.setItem (jwtKey, authInfo.jwt);
//         localStorage.setItem (emailKey, authInfo.emailAddress);
//         localStorage.setItem (idKey, authInfo.partnerId);
//         localStorage.setItem (profileUrlKey, authInfo.profileUrl);
//         localStorage.setItem (signOutUrlKey, authInfo.signOutUrl);
//         localStorage.setItem (mobileNumberKey,authInfo.mobileNumber);
//     } catch (error) {
//         console.log("AppAuthStorage: storeAuthInfo Error storing the info", error);
//     }
// }

// const getAuthInfo = async () => {
//     try {
//         const jwt =  localStorage.getItem (jwtKey);
//         if ( !jwt ) return null;
//         const emailAddress =  localStorage.getItem (emailKey);
//         // const mobileNumber = await localStorage.getItem (mobileNumberKey);
//         const partnerId =  localStorage.getItem (idKey);
//         const profileUrl =  localStorage.getItem (profileUrlKey);
//         const signOutUrl =  localStorage.getItem (signOutUrlKey);
//         // const profileUrl = PartnerServiceConfig.jrmPartnerServiceUrl + PartnerServiceConfig.jrmPartnerServicePath + partnerId;
//         // const signoutUrl = profileUrl + "/signout";

//         console.log("AppAuthStorage getAuthInfo Value read from store", jwt, emailAddress, partnerId, profileUrl, signOutUrl);

//         const authInfo = { "jwt": jwt, "emailAddress": emailAddress, "partnerId": partnerId,
//                            "profileUrl": profileUrl, "signOutUrl": signOutUrl };

//         console.log("AppAuthStorage getAuthInfo authInfo jSON", authInfo);
//         return authInfo;
//     } catch (error) {
//         console.log("AppAuthStorage: getAuthInfo Error retrieving the info", error);
//     }

//     return null;
// }

// const removeAuthInfo = async () => {
//     try {
//         await localStorage.removeItem (jwtKey);
//         await localStorage.removeItem (emailKey);
//         await localStorage.removeItem (idKey);
//         await localStorage.removeItem (profileUrlKey);
//         await localStorage.removeItem (signOutUrlKey);
//         await localStorage.removeItem (mobileNumberKey);
//     } catch (error) {
//         console.log("AppAuthStorage: removeAuthInfo Error removing the info ", error);
//     }
// }

// const storeContactInfo = async (contactInfo) => {
//     try {
//         await localStorage.setItem (mobileNumberKey, contactInfo.mobileNumber);
//         await localStorage.setItem (emailAddressKey, contactInfo.emailAddress);
//         await localStorage.setItem (countryKey, contactInfo.country);
//     } catch (error) {
//         console.log("AppAuthStorage: Contact Info - Error storing", error);
//     }
// }

// const getContactInfo = async () => {
//     try {
//         const emailAddress = await localStorage.getItem (emailAddressKey);
//         const mobileNumber = await localStorage.getItem (mobileNumberKey);
//         const country = await localStorage.getItem (countryKey);

//         console.log("ContactInfo Value read from store", emailAddress, mobileNumber, country);

//         const contactInfo = { "emailAddress": emailAddress, "mobileNumber": mobileNumber, "country": country };

//         console.log("ContactInfo JSON", contactInfo);
//         return contactInfo;
//     } catch (error) {
//         console.log("AppAuthStorage: Contact Info - Error retrieving", error);
//     }

//     return null;
// }

// const removeContactInfo = async () => {
//     try {
//         await localStorage.removeItem (emailAddressKey);
//         await localStorage.removeItem (mobileNumberKey);
//     } catch (error) {
//         console.log("AppAuthStorage: Contact Info - Error removing", error);
//     }
// }

// const storeSetPasswordInfo = async (response) => {
//     try {
//         await localStorage.setItem (oneTimeJWTKey, response.oneTimeJWT);
//         await localStorage.setItem (setPwdUrlKey, response.passwordSetUrl);
//     } catch (error) {
//         console.log("AppAuthStorage: SetPassword Info - Error storing", error);
//     }
// }

// const getSetPasswordInfo = async () => {
//     try {
//         const oneTimeJWT = await localStorage.getItem (oneTimeJWTKey);
//         const passwordSetUrl = await localStorage.getItem (setPwdUrlKey);

//         console.log("SetPasswordInfo Value read from store", oneTimeJWT, passwordSetUrl);

//         const setPasswordInfo = { "oneTimeJWT": oneTimeJWT, "passwordResetUrl": passwordSetUrl };

//         console.log("SetPasswordInfo JSON", setPasswordInfo);
//         return setPasswordInfo;
//     } catch (error) {
//         console.log("AppAuthStorage: SetPassword Info - Error retrieving", error);
//     }

//     return null;
// }

// const removeSetPasswordInfo = async () => {
//     try {
//         await localStorage.removeItem (oneTimeJWTKey);
//         await localStorage.removeItem (setPwdUrlKey);
//     } catch (error) {
//         console.log("AppAuthStorage: SetPassword Info - Error removing", error);
//     }
// }




// export {
//     getAuthInfo, getContactInfo, getSetPasswordInfo, removeAuthInfo, removeContactInfo, removeSetPasswordInfo, storeAuthInfo, storeContactInfo, storeSetPasswordInfo
// };

/// src/auth/AppAuthStorage.js
const jwtKey = "jwt";
const emailKey = "emailAddress";
const idKey = "partnerId";
const profileUrlKey = "profileUrl";
const signOutUrlKey = "signOutUrl";
const countryKey = "country";
const mobileNumberKey = "mobileNumber";
const emailAddressKey = "emailAddress";
const oneTimeJWTKey = "oneTimeJWT";
const setPwdUrlKey = "setPwdUrl";
const fullNameKey = "fullName";
const administratorKey = "administrator";

// Validate token (simple check - you might want to check expiration)
export const isValidToken = (token) => {
  if (!token) return false;

  try {
    // Check if token is expired (if it's a JWT)
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < exp;
    }
    return true;
  } catch (error) {
    console.log("Invalid token format");
    return true; // Assume valid if not JWT format
  }
};

// Set session
export const setSession = (token) => {
  if (token) {
    localStorage.setItem(jwtKey, token);
  } else {
    localStorage.removeItem(jwtKey);
  }
};

// Store auth info
export const storeAuthInfo = async (authInfo) => {
  try {
    localStorage.setItem(jwtKey, authInfo.jwt);
    localStorage.setItem(emailKey, authInfo.emailAddress);
    localStorage.setItem(idKey, authInfo.partnerId);
    localStorage.setItem(profileUrlKey, authInfo.profileUrl);
    localStorage.setItem(signOutUrlKey, authInfo.signOutUrl);
    localStorage.setItem(mobileNumberKey, authInfo.mobileNumber || '');
    localStorage.setItem(fullNameKey, authInfo.fullName || '');
    localStorage.setItem(administratorKey, authInfo.administrator || false);

    // Store complete auth info for context
    localStorage.setItem("authInfo", JSON.stringify(authInfo));
  } catch (error) {
    console.log("storeAuthInfo Error storing the info", error);
  }
};

// Alias for backward compatibility
export const setAuthInfo = storeAuthInfo;

// Get auth info
export const getAuthInfo = async () => {
  try {
    const jwt = localStorage.getItem(jwtKey);
    if (!jwt) return null;

    const emailAddress = localStorage.getItem(emailKey);
    const partnerId = localStorage.getItem(idKey);
    const profileUrl = localStorage.getItem(profileUrlKey);
    const signOutUrl = localStorage.getItem(signOutUrlKey);
    const mobileNumber = localStorage.getItem(mobileNumberKey);
    const fullName = localStorage.getItem(fullNameKey);
    const administrator = localStorage.getItem(administratorKey) === 'true';

    console.log("getAuthInfo Value read from store", jwt, emailAddress, partnerId);

    const authInfo = {
      jwt,
      emailAddress,
      partnerId,
      profileUrl,
      signOutUrl,
      mobileNumber,
      fullName,
      administrator
    };

    return authInfo;
  } catch (error) {
    console.log("getAuthInfo Error retrieving the info", error);
  }
  return null;
};

// Remove auth info
export const removeAuthInfo = async () => {
  try {
    const keys = [
      jwtKey, emailKey, idKey, profileUrlKey, signOutUrlKey,
      mobileNumberKey, fullNameKey, administratorKey, oneTimeJWTKey,
      setPwdUrlKey, "authInfo", "cachedProfile", "members", "role",
      "profileStatus"
    ];
    keys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.log("removeAuthInfo Error removing the info", error);
  }
};

// Remove set password info
export const removeSetPasswordInfo = async () => {
  try {
    localStorage.removeItem(oneTimeJWTKey);
    localStorage.removeItem(setPwdUrlKey);
  } catch (error) {
    console.log("removeSetPasswordInfo Error removing", error);
  }
};

// Store contact info
export const storeContactInfo = async (contactInfo) => {
  try {
    localStorage.setItem(mobileNumberKey, contactInfo.mobileNumber || '');
    localStorage.setItem(emailAddressKey, contactInfo.emailAddress || '');
    localStorage.setItem(countryKey, contactInfo.country || '');
  } catch (error) {
    console.log("storeContactInfo Error storing", error);
  }
};

// Get contact info
export const getContactInfo = async () => {
  try {
    const emailAddress = localStorage.getItem(emailAddressKey);
    const mobileNumber = localStorage.getItem(mobileNumberKey);
    const country = localStorage.getItem(countryKey);

    const contactInfo = { emailAddress, mobileNumber, country };
    return contactInfo;
  } catch (error) {
    console.log("getContactInfo Error retrieving", error);
  }
  return null;
};

// Store set password info
export const storeSetPasswordInfo = async (response) => {
  try {
    localStorage.setItem(oneTimeJWTKey, response.oneTimeJWT);
    localStorage.setItem(setPwdUrlKey, response.passwordSetUrl);
  } catch (error) {
    console.log("storeSetPasswordInfo Error storing", error);
  }
};

// Get set password info
export const getSetPasswordInfo = async () => {
  try {
    const oneTimeJWT = localStorage.getItem(oneTimeJWTKey);
    const passwordSetUrl = localStorage.getItem(setPwdUrlKey);

    const setPasswordInfo = { oneTimeJWT, passwordResetUrl: passwordSetUrl };
    return setPasswordInfo;
  } catch (error) {
    console.log("getSetPasswordInfo Error retrieving", error);
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem(jwtKey);
  return !!token && isValidToken(token);
};

// Get user role
export const getUserRole = () => {
  const isAdmin = localStorage.getItem(administratorKey) === 'true';
  return isAdmin ? 'admin' : 'user';
};

// Check if profile is completed
export const isProfileCompleted = () => {
  const fullName = localStorage.getItem(fullNameKey);
  return !!fullName;
};

// Export all for backward compatibility
// export default {
//   getAuthInfo,
//   getContactInfo,
//   getSetPasswordInfo,
//   getUserRole,
//   isAuthenticated,
//   isProfileCompleted,
//   isValidToken,
//   removeAuthInfo,
//   removeSetPasswordInfo,
//   setSession,
//   storeAuthInfo,
//   setAuthInfo: storeAuthInfo,
//   storeContactInfo,
//   storeSetPasswordInfo
// };

// Create a named object
const AppAuthStorage = {
  getAuthInfo,
  getContactInfo,
  getSetPasswordInfo,
  getUserRole,
  isAuthenticated,
  isProfileCompleted,
  isValidToken,
  removeAuthInfo,
  removeSetPasswordInfo,
  setSession,
  storeAuthInfo,
  setAuthInfo: storeAuthInfo,
  storeContactInfo,
  storeSetPasswordInfo
};

// Export the named object
export default AppAuthStorage;