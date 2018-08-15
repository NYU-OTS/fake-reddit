import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Cool Admin Panel with a Spinning Logo</h1>
        </header>
        <p className="App-intro">
          
        </p>
      </div>
    );
  }
}

export default App;