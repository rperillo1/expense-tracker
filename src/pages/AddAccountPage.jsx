import React from 'react';
import AccountCard from '../components/AccountCard';
import AccountForm from '../components/AccountForm';



function AddAccountPage({ createAccount }) {

    return (
        <div>
            <AccountCard />
            <AccountForm createAccount={createAccount} />
        </div>
    )
}



export default AddAccountPage;