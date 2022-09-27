import React from 'react';
import logo from './logo.svg';
import './App.css';
import Message from './Messages';

const initialState = {
  name: 'Many',
  message: 'TypeScript is cool!'
}

type State = Readonly<typeof initialState>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Message name='Manny 'message="this is my first Typescript/React Application" />
      </header>
    </div>
  );
}

export default App;
