import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{ userCtx: [user, setUser], isLoggedCtx: [isLoggedIn, setIsLoggedIn] }}>
            {props.children}
        </UserContext.Provider>
    );
}



