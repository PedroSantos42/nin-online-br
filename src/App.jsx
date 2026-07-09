import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Tournament from './pages/Tournament/Tournament';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/torneios" element={<Tournament />} />
        {/* Adicione outras rotas aqui: Wiki, Policia, Medicos */}
      </Routes>
    </>
  );
}

export default App;