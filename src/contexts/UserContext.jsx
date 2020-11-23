import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
    console.log('yao')
    const [user, setUser] = useState({});
    console.log('yao2')

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
}



