import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { AccountContext } from '../contexts/AccountContext';


function AccountCard({ getAllAccounts }) {
    const { user, setUser } = useContext(UserContext);
    const { accounts, setAccounts } = useContext(AccountContext);


    return (
        <div>
        {Object.keys(user).length > 0 ?
            accounts.map((acc) =>
                <div>
                    <div>{acc.name}</div>
                    <div>{acc.balance}</div>
                </div>
            )
            :
            <div>Please Create An Account</div>
        }
        </div>
    );
}

export default AccountCard;