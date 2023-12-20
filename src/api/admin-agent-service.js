import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getAgents = () => {
  return axios.get(`${API_URL}/agent/all`, { headers: authHeader() });
};
const createAgent = (imageId,agent) => {
  return axios.post(`${API_URL}/agent/admin/${imageId}/add`, agent, { headers: authHeader() });
};
const getAgent = (id) => {return axios.get(`${API_URL}/agent/${id}`, { headers: authHeader() });
};
const updateAgent = ( id, agentImageId, agentDto) => {
  return axios.put(`${API_URL}/agent/admin/auth?id=${id}&agentImageId=${agentImageId}`, agentDto, { headers: authHeader() });
};

const deleteAgent = (id) => {
  return axios.delete(`${API_URL}/agent/admin/${id}/delete`, { headers: authHeader() });
}; 


const downloadAgents = () => {
  return axios.get(`${API_URL}/excel/download/agents`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: 'blob'
  });
};
const uploadAgentImage = (image) => {
  return axios.post(`${API_URL}/agentImg/upload`, image, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "multipart/form-data",
    }
  });
};





export { getAgents ,createAgent,getAgent,updateAgent,deleteAgent,downloadAgents,uploadAgentImage};