import React, { useContext } from 'react';
import UseFormState from "../hooks/UseFormState";
import { UserContext } from '../contexts/UserContext';



function AddAccountPage({ createAccount }) {
    const [acctValues, handleChange, reset] = UseFormState({ name: '', balance: 0 })
    const { user, setUser } = useContext(UserContext);



    const handleSubmit = (e) => {
        createAccount(acctValues);
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                reset();
            }}>
                <label>Account Name:</label>
                <input type='text' value={acctValues.name} onChange={handleChange} name='name'></input>
                <label>Starting Balance:</label>
                <input type='number' value={acctValues.balance} onChange={handleChange} name='balance' placeholder='4200'></input>
                {/* <label>Income:</label>
                <input type='number' value={acctValues.income} onChange={handleChange} name='income' placeholder='3000'></input> */}
                <button type='submit'>Create Account</button>
            </form>
            {Object.keys(user).length > 0 ? 
                // <div>User</div>
                <h3>{user.accounts.length}</h3>
                // user.accounts.map((acc) => 
                //     <div>{acc}</div>
                // )
                :
                <div>No User</div>
            }
        </div>
    )
}



export default AddAccountPage;