import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tournament from './pages/Tournament/Tournament';
import BracketTest from './pages/BracketTest';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/torneios" element={<Tournament />} />
      <Route path="/teste-bracket" element={<BracketTest />} />
    </Routes>
  );
}

export default App;