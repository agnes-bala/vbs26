//  //const jrmClientUrl = process.env.NODE_ENV === 'production' ? "https://partnerservice-stage.jesusredeems.com/" : "http://10.12.1.120:8080/" ;
//  const jrmClientUrl ="https://partnerservice-stage.jesusredeems.com/";

// const config = 
// {
//   "baseUrl": jrmClientUrl,
//   "jrmPartnerRegisterMobileUrl": jrmClientUrl+"jrms/v1/partners/mobilesignup",
//   "jrmPartnerLoginUrl": jrmClientUrl+"jrms/v1/partners/signin",
//   "jrmPartnerotpLoginUrl": jrmClientUrl+"jrms/v1/partners/signinotp",
//   "jrmVideoFeedUrl": jrmClientUrl+"jrms/v1/feed/videos",
//   "jrmEventsFeedUrl": jrmClientUrl+"jrms/v1/feed/events",
//   "jrmPartnerProfileUrl": jrmClientUrl+"jrms/v1/partners",

//   "jrmPartnerVerifyMobileUrl" : jrmClientUrl+"jrms/v1/partners/verifymobileotp",
//   "jrmPartnerVerifyEmailUrl" : jrmClientUrl+"jrms/v1/partners/verifyemailotp",

//   "jrmInitPasswordResetUrl": jrmClientUrl+"jrms/v1/partners/initpasswordreset",
//   "jrmVerifyOTPUrl": jrmClientUrl+"jrms/v1/partners/verifypasswordotp",
//   "jrmResendOTPUrl": jrmClientUrl+"jrms/v1/partners/resendotp",

//   "jrmEventRegistrationUrl": jrmClientUrl+"jrms/v1/event-management/events",

//   "jrmPartnerDonationSericeUrl": jrmClientUrl+"jrms/v1/donations/partners",
//   "jrmPartnerBlessingPlanSericeUrl": jrmClientUrl+"jrms/v1/blessingplans/partners",
//   "jrmFeedServiceUrl": jrmClientUrl+"jrms/v1/feed/home",
//   "jrmPrayerServiceUrl": jrmClientUrl+"jrms/v1/feed/prayers",

//   // "jrmGetCountries": jrmClientUrl+"jrms/v1/lookup/country",
//   // "jrmGetStates": jrmClientUrl+"jrms/v1/lookup/states",
//   // "jrmGetDistricts": jrmClientUrl+"jrms/v1/lookup/districts",
//   // "jrmGetCities": jrmClientUrl+"jrms/v1/lookup/cities",
//    "jrmGetCountries": jrmClientUrl+"jrms/v1/lookup/country",
//   "jrmGetStates": jrmClientUrl+"jrms/v1/lookup/states",
//   "jrmGetDistricts": jrmClientUrl+"jrms/v1/lookup/districts",
//   "jrmGetCities": jrmClientUrl+"jrms/v1/lookup/cities"

// }

// export {
//   config, jrmClientUrl
// }

// partnerconfig.js
const jrmClientUrl = "https://partnerservice-stage.jesusredeems.com/";

const config = {
  "baseUrl": jrmClientUrl,
  "jrmPartnerRegisterMobileUrl": jrmClientUrl + "jrms/v1/partners/mobilesignup",
  "jrmPartnerLoginUrl": jrmClientUrl + "jrms/v1/partners/signin",
  "jrmPartnerotpLoginUrl": jrmClientUrl + "jrms/v1/partners/signinotp",
  "jrmVideoFeedUrl": jrmClientUrl + "jrms/v1/feed/videos",
  "jrmEventsFeedUrl": jrmClientUrl + "jrms/v1/feed/events",
  "jrmPartnerProfileUrl": jrmClientUrl + "jrms/v1/partners",

  "jrmPartnerVerifyMobileUrl": jrmClientUrl + "jrms/v1/partners/verifymobileotp",
  "jrmPartnerVerifyEmailUrl": jrmClientUrl + "jrms/v1/partners/verifyemailotp",

  "jrmInitPasswordResetUrl": jrmClientUrl + "jrms/v1/partners/initpasswordreset",
  "jrmVerifyOTPUrl": jrmClientUrl + "jrms/v1/partners/verifypasswordotp",
  "jrmResendOTPUrl": jrmClientUrl + "jrms/v1/partners/resendotp",

  "jrmEventRegistrationUrl": jrmClientUrl + "jrms/v1/event-management/events",
  "jrmPartnerDonationSericeUrl": jrmClientUrl + "jrms/v1/donations/partners",
  "jrmPartnerBlessingPlanSericeUrl": jrmClientUrl + "jrms/v1/blessingplans/partners",
  "jrmFeedServiceUrl": jrmClientUrl + "jrms/v1/feed/home",
  "jrmPrayerServiceUrl": jrmClientUrl + "jrms/v1/feed/prayers",

  "jrmGetCountries": jrmClientUrl + "jrms/v1/lookup/country",
  "jrmGetStates": jrmClientUrl + "jrms/v1/lookup/states",
  "jrmGetDistricts": jrmClientUrl + "jrms/v1/lookup/districts",
  "jrmGetCities": jrmClientUrl + "jrms/v1/lookup/cities",

  "quizGame": jrmClientUrl + "jrms/v1/kidsmas/partners",
  "quizIndiaResult": jrmClientUrl + "jrms/v1/kidsmas/overallresult/2022/india",
  "quizNonIndiaResult": jrmClientUrl + "jrms/v1/kidsmas/overallresult/2022/12",
  "quizQuestions": jrmClientUrl + "jrms/v1/kidsmas/",

  // API endpoints structure
  "endpoints": {
    "auth": {
      "login": "/jrms/v1/partners/signin",
      "register": "/jrms/v1/partners/mobilesignup",
      "loginwithemailotp": "/jrms/v1/partners/verifyemailotp",
      "loginwithmobileotp": "/jrms/v1/partners/verifymobileotp",
      "sendotp": "/jrms/v1/partners/signinotp",
      "setpassword": (id) => `/jrms/v1/partners/${id}/setpassword`
    },
    "partner": {
      "profile": (id) => `/jrms/v1/partners/${id}/contactinfo`,
      "spouse": (id) => `/jrms/v1/partners/${id}/spouseinfo`,
      "child": (id) => `/jrms/v1/partners/${id}/childreninfo`,
      "familymember": (id) => `/jrms/v1/partners/${id}/familymemberinfo`,
    },
    "lookup": {
      "country": "/jrms/v1/lookup/country",
      "state": (country) => `/jrms/v1/lookup/states?country=${country}`,
      "district": (country, state) => `/jrms/v1/lookup/districts?country=${country}&state=${state}`,
      "city": (country, state) => `/jrms/v1/lookup/cities?country=${country}&state=${state}`,
    },
    "feed": {
      "events": "/jrms/v1/feed/events",
      "home": "/jrms/v1/feed/home",
      "prayers": "/jrms/v1/feed/prayers",
      "videos": "/jrms/v1/feed/videos"
    }
  }
};

// export default config;

export {
  config, jrmClientUrl
}

