import React from 'react';
import AccountCard from '../components/AccountCard';
import AccountForm from '../components/AccountForm';



function AddAccountPage({ createAccount, getAllAccounts, deleteOneAccount }) {

    return (
        <div>
            <AccountCard getAllAcconts={getAllAccounts} deleteOneAccount={deleteOneAccount}/>
            <AccountForm createAccount={createAccount} />
        </div>
    )
}



export default AddAccountPage;