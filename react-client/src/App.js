import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Navbar />
        <Body />
      </div>
    );
  }
}

export default App;
