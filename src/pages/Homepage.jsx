import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';



function Homepage() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            {Object.keys(user).length > 0  ?
                user.accounts.length > 0 ?
                    <Link to='/accounts'>Your Accounts</Link>
                    :
                    <Link to='/accounts'>Create An Account</Link>
                :
                <div>Please Log In To Create An Account</div>
            }
        </div>
    )
}


export default Homepage;