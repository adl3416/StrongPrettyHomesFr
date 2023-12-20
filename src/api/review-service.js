import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getReviewsAll=(propertyId) => {
    return axios.get(`${API_URL}/reviews/all?propertyId=${propertyId}`,{ headers:  authHeader() });
}
 
const getReviewById = (id) => {   //sadece admin. Bunun disindaki tüm methodlar ikisine de tanimlandi
return axios.get(`${API_URL}/reviews/${id}/admin`);

}


const getUserReviewsByUserId = () => {   
    return axios.get(`${API_URL}/reviews/auth/all`,{ headers:  authHeader() });
    
    }

const addReview = (reviews,propertyId) => {
return axios.post(`${API_URL}/reviews/add?propertyId=${propertyId}`, reviews,{ headers:  authHeader() });

}

const getUserReviewById = (id) => {
    return axios.get(`${API_URL}/reviews/${id}/auth`,{ headers:  authHeader() });
}

const updateReview = (reviewId,review) => {
    return axios.put(`${API_URL}/reviews/update/auth?reviewId=${reviewId}`,review,{ headers:  authHeader() });
}



const deleteUserReviewById = (id) => {
    return axios.get(`${API_URL}/reviews/${id}/auth`,{ headers:  authHeader() });
}

export { addReview, getReviewsAll, getReviewById,updateReview,  getUserReviewById, getUserReviewsByUserId, deleteUserReviewById }





