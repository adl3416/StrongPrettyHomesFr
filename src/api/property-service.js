import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;



const getProperties = () => {
    return axios.get(`${API_URL}/property/visitors/all`);
  };

  const likesCount = () =>{
    return axios.patch(`${API_URL}/detail/auth/update`);

  }
 
   /*  {bathrooms ? bathrooms=${bathrooms} : ""}&
    {bedrooms ? bedrooms=${bedrooms} : ""}&{lowPrice ? lowPrice=${lowPrice} : ""}&
    {highPrice ? highPrice=${highPrice} : ""}&{city ? city=${city} : ""}`); */
    

  const getSearchProperties = (searchModel) => {
    const {type, category, lowPrice, highPrice,bedrooms, bathrooms, location, country, city, district }= searchModel;
   
    return axios.get(`${API_URL}/property/search?type=${type}&category=${category}&lowPrice=${lowPrice}&highPrice=${highPrice}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&location=${location}&country=${country}&&city=${city}&district=${district}`);

  }

    const postNewCount = (propertyId, like) => {
    return axios.post(`${API_URL}/${propertyId}/count?like=${like}`, {headers: authHeader()})

    }



export {getProperties, getSearchProperties,likesCount, postNewCount };

