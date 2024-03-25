import React, { Component } from 'react';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// http://localhost:5173/news/id=https://chicago.suntimes.com/horoscopes/2024/03/21/horoscopes-today-saturday-march-23-2024
export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<News />} />

        </Routes>
      </Router>
    );
  }
}
