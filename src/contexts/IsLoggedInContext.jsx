import React, { createContext, useState } from "react";
// import useToggleState from '../hooks/useToggleState'

export const IsLoggedInContext = createContext();

export function IsLoggedInProvider(props) {
    // const [isLoggedIn, toggleIsLoggedIn] = useToggleState(false);
    const [isLoggedIn, toggleIsLoggedIn] = useState(false);

    return (
        <IsLoggedInContext.Provider value={{ isLoggedIn, toggleIsLoggedIn }}>
            {props.children}
        </IsLoggedInContext.Provider>
    );
}