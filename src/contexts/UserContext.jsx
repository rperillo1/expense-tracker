import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
    const [user, setUser] = useState({});
    const [isloggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{ userCtx: [user, setUser], isloggedCtx: [isloggedIn, setIsLoggedIn] }}>
            {props.children}
        </UserContext.Provider>
    );
}



