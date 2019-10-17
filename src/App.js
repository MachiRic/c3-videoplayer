import React from 'react';
import Data from './data'
import './App.css';

import { useAlert } from 'react-alert'

function App() {
  const alert = useAlert()
  return (
    <div className="App">
      <header className="App-header">
        <Data alert={alert}/>
      </header>
    </div>
  );
}

export default App;
