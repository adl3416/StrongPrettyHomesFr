import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getReviews = () => {
  return axios.get(`${API_URL}/reviews/all/auth`, { headers:  authHeader() });
};

const getReview = (id) => {
  return axios.get(`${API_URL}/reviews/${id}/admin`, { headers: authHeader() });
};

const deleteReview = (reviewId) => {
  return axios.delete(`${API_URL}/reviews/${reviewId}/delete`, { headers: authHeader() });
};

const updateReview = ( reviewId, status) => {
  return axios.patch(`${API_URL}/reviews/${reviewId}/updatestatus?status=${status}`, {} ,{ headers: authHeader() });
};


const downloadReviews = () => {
  return axios.get(`${API_URL}/excel/download/reviews`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: 'blob'
  });
};




export { getReviews, getReview, deleteReview, updateReview, downloadReviews };