import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tournament from './pages/Tournament/Tournament'; // <-- caminho atualizado

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/torneios" element={<Tournament />} />
    </Routes>
  );
}

export default App;