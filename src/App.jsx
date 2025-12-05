import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollPortfolio from './components/ScrollPortfolio';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <ScrollPortfolio />
      </main>
      <Footer />
    </div>
  );
}

export default App;
