import axios from "axios";
import http from './HTTPService';
import config from '../partnerconfig.json';

export function registerPartner (partnerDetails) {

    const httpConfig = {
        headers:{
            "Content-Type": "application/json"
        }
    };
    return http.post(config.jrmPartnerRegisterUrl, partnerDetails, httpConfig);
}


export function setPassword (partnerDetails,jwt,jrmResetPasswordUrl) {

    const httpConfig = {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        }
    };
    return http.post(jrmResetPasswordUrl, partnerDetails, httpConfig);
}

export function verifyEmail (partnerDetails) {

    const httpConfig = {
        headers:{
            "Content-Type": "application/json"
        }
    };
    return http.post(config.jrmPartnerVerifyEmailUrl, partnerDetails, httpConfig);
}

export function verifyMobile (partnerDetails) {

    const httpConfig = {
        headers:{
            "Content-Type": "application/json"
        }
    };
    return http.post(config.jrmPartnerVerifyMobileUrl, partnerDetails, httpConfig);
}




export function videoFeed (feedDetails) {

    const httpConfig = {
        headers:{
            "Content-Type": "application/json"
        }
    };
    return http.post(config.jrmVideoFeedUrl, feedDetails, httpConfig);
}


export function loginPartner(credentials) {
    const httpConfig = {
        headers:{
            "Content-Type": "application/json"
        }
    };
    return http.post(config.jrmPartnerLoginUrl, credentials, httpConfig);
}

export function getAllProfiles() {

    console.log ("PartnerProfile getAllProfiles");

    // axios.defaults.headers.common['Content-Type'] = 'application/json';

    const httpConfig = {
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    };
    const url = config.jrmPartnerProfileUrl + httpConfig;

    console.log ("PartnerProfile beforehttp");
    return axios.get(url);


    // return axios({ method: 'get', url, headers: { "Content-Type": "application/json" } })
};

