import React, { createContext, useState } from "react";

export const AccountContext = createContext();

export function AccountProvider(props) {
    const [accounts, setAccounts] = useState([]);

    return (
        <AccountContext.Provider value={{ accounts, setAccounts }}>
            {props.children}
        </AccountContext.Provider>
    );
}
