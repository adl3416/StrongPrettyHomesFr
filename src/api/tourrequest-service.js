import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;


const getUserTourRequests = () => {
  return axios.get(`${API_URL}/tour/all`, {headers: authHeader(),});
};

const getUserTourRequestById = (id) => {
  console.log(id);
  return axios.get(`${API_URL}/tour/${id}/auth`, {headers: authHeader()});
};


const makeTourRequest = (tour) => {
    console.log(tour);
    const { propertyId } = tour;
    
    return axios.post(`${API_URL}/tour/add?propertyId=${propertyId}`, tour, { headers: authHeader() });

  };

export { getUserTourRequestById, getUserTourRequests, makeTourRequest };

