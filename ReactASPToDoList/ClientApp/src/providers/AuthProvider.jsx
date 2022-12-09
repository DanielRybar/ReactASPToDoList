import React, { createContext, useReducer, useContext, useEffect } from "react";

const SESSION_STORAGE_ID = "oauth2_token";
let storedData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_ID));

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const CLEAR_ACCESS_TOKEN = "CLEAR_ACCESS_TOKEN";

const parseJwt = token => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
};

const initialState = {
    accessToken: null,
    userId: null,
    profile: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            let tokenData = parseJwt(action.payload);
            return { ...state, accessToken: action.payload, userId: tokenData.sub, profile: tokenData }
        case CLEAR_ACCESS_TOKEN:
            return { ...state, accessToken: null, userId: null, profile: null }
        default: break;
    }
}

export const AuthContext = createContext(initialState);
export const AuthConsumer = AuthContext.Consumer;
export const AuthProvider = props => {
    const [store, dispatch] = useReducer(
        reducer,
        storedData || initialState
    );
    useEffect(() => {
        sessionStorage.setItem(SESSION_STORAGE_ID, JSON.stringify(store));
    }, [store]);  
    return (
        <AuthContext.Provider value={[store, dispatch]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);