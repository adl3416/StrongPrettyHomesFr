import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL;



const getTourRequests = () => {
    return axios.get(`${API_URL}/tour/admin/all`,
    { headers:authHeader()} )
};


const getTourId = (id) => {
  return axios.get(`${API_URL}/tour/${id}/admin`, { headers: authHeader() });
};


const downloadTours = () => {
  return axios.get(`${API_URL}/excel/download/tourrequests`, {
    headers: {...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "blob",
  });
};


const updateTour = (tourid, propertyId, tour) => {
  return axios.put(`${API_URL}/tour/admin/auth?propertyId=${propertyId}&tourId=${tourid}`, tour, { headers: authHeader() });
};


const deleteTour = (id) => {
  return axios.delete(`${API_URL}/tour/admin/${id}/auth`, { headers: authHeader() });
};


export { getTourRequests , downloadTours,updateTour,deleteTour ,getTourId };