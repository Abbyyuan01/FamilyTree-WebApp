import React, { Component } from 'react';
import Main from './Main'
import Login from './components/authentication/login.component'

function App() {
  return (
    <div className="container">
      <Login />
      <Main />
    </div>
  );
}

export default App;
