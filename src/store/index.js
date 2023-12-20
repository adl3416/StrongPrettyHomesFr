import { createContext, useContext, useReducer } from "react";
import { propertyInitialState } from "./property/propertyInitialState";
import { propertyReducer } from "./property/propertyReducer";
import { userReducer } from "./user/userReducer";
import { userInitialState } from "./user/userInitialState";
import { searchInitialState } from "./search/searchInitialState";
import { searchReducer } from "./search/searchReducer";
import { searchFormReducer } from "./search-form/searchFormReducer";
import { searchFormInitialState } from "./search-form/searchFormInitialState";


const Store = createContext();

export const useStore = () => useContext(Store);

export const StoreProvider = ({ children }) => {
  const [userState, dispatchUser] = useReducer(userReducer, userInitialState);
  const [propertyState, dispatchProperty] = useReducer(propertyReducer, propertyInitialState);
  const [searchState, dispatchSearch] = useReducer(searchReducer, searchInitialState);
  const [searchFormState, dispatchSearchForm] = useReducer(searchFormReducer, searchFormInitialState);
  const storeObject = { userState, dispatchUser,propertyState, dispatchProperty,searchState, dispatchSearch,searchFormState,dispatchSearchForm };
   
    return <Store.Provider value={storeObject}>{children}</Store.Provider>;
  };