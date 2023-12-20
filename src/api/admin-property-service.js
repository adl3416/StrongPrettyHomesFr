import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const downloadProperties = () => {
  return axios.get(`${API_URL}/excel/download/properties`, {
    headers: {...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "blob",
  });
};

const createProperty = (property) => {
  return axios.post(`${API_URL}/property/admin/add?agentId=1&detailId=1`, property, {
    headers: authHeader(),
  });
};

const updateProperty = (propertyId, property) => {
  return axios.put(
    `${API_URL}/property/admin/auth?id=${propertyId}&agentId=1&detailId=1`, property,
    { headers: authHeader() }
  );
};

const deleteProperty = (id) => {
  return axios.delete(
    `${API_URL}/property/admin/${id}/auth`,
    { headers: authHeader() }
  );
};

const uploadPropertyImage = (id,image) => {
  return axios.post(`${API_URL}/files/${id}/upload`, image, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
};

const getPropertyId = (id) => {
    return axios.get(`${API_URL}/property/visitors/${id}`);
  };

export { downloadProperties,createProperty,uploadPropertyImage,deleteProperty ,updateProperty,getPropertyId};