import React, { createContext, useState } from "react";

export const CurrentAccountContext = createContext();

export function CurrentAccountProvider(props) {
    const [currentAccount, setCurrentAccount] = useState({});

    return (
        <CurrentAccountContext.Provider value={{ currentAccount, setCurrentAccount }}>
            {props.children}
        </CurrentAccountContext.Provider>
    );
}
