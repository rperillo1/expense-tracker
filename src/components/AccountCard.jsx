import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';


function AccountCard() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
        {Object.keys(user).length > 0 ?
            user.accounts.map((acc) =>
                <div>
                    <div>{acc}</div>
                </div>
            )
            :
            <div>Please Create An Account</div>
        }
        </div>
    );
}

export default AccountCard;