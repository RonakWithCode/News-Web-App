import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  api = import.meta.env.VITE_API;

  render() {
    return (
      <div>
        <Navbar />
        <News />
        
      </div> 
    )
  }
}
