import React from 'react';
import AccountCard from '../components/AccountCard';
import AccountForm from '../components/AccountForm';



function AccountPage({ createAccount, deleteOneAccount }) {

    return (
        <div>
            <AccountCard deleteOneAccount={deleteOneAccount}/>
            <AccountForm createAccount={createAccount} />
        </div>
    )
}



export default AccountPage;