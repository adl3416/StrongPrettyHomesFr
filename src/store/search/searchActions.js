import { types } from "../types";

export const setSearchProperties = (properties)=>({
    
    type:types.SET_SEARCH_PROPERTIES,
    payload : properties

})