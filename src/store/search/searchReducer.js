import { types } from "../types";
import { searchInitialState } from "./searchInitialState";

export const searchReducer = (state=searchInitialState,action)=>{

    if(action.type === types.SET_SEARCH_PROPERTIES){
        return{
            ...state,
            searchies : action.payload
        }
    }
}
