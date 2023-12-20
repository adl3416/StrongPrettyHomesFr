import { types } from "../types";
import { searchFormInitialState } from "./searchFormInitialState";

export const searchFormReducer = (state=searchFormInitialState,action)=>{

    if(action.type === types.SET_SEARCH_FORM){
        return{
            ...state,
            searchForm : action.payload
        }
    }
}