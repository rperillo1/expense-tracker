import React from 'react';
import AccountCard from '../components/AccountCard';
import AccountForm from '../components/AccountForm';



function AddAccountPage({ createAccount, getAllAccounts }) {

    return (
        <div>
            <AccountCard getAllAcconts={getAllAccounts}/>
            <AccountForm createAccount={createAccount} />
        </div>
    )
}



export default AddAccountPage;