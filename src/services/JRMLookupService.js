import apiClient from "./Client";
import config from '../partnerconfig.json';

const getStatesData = (country) => {
    console.log("getting states from country", country);
    const stateapi = `${config.jrmGetStates}/?country=${country}`;
    return apiClient.get(stateapi);
}
const getDistrictsData = (country, state) => {
    console.log ("districtlist", config.jrmGetDistricts);
    const districtapi = `${config.jrmGetDistricts}/?country=${country}&state=${state}`;
    console.log('getdistrictdata',districtapi);
    return apiClient.get(districtapi);
};

const getCitiesData = (country, state) => {
    console.log ("citylist", config.jrmGetCities);
    const citiesapi = `${config.jrmGetCities}/?country=${country}&state=${state}`;
    console.log('getcitiesdata',citiesapi);
    return apiClient.get(citiesapi);
};

export {
    getStatesData,
    getDistrictsData,
    getCitiesData
}
