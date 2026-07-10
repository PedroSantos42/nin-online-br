import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Tournament from './pages/Tournament/Tournament';
import Police from './pages/Police/Police'; // <-- Importe

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/torneios" element={<Tournament />} />
        <Route path="/organizacoes/policia" element={<Police />} />
      </Routes>
    </>
  );
}

export default App;