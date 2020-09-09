import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <p>Expense Tracker</p>
        <a href="/logout">Log Out</a>
        <a href="/auth/google">Login with Google</a>
      </header>
    </div>
  );
}

export default App;
