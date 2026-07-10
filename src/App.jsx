import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Tournament from './pages/Tournament/Tournament';
import Police from './pages/Police/Police';
import Wiki from './pages/Wiki';
import Medics from './pages/Medics';
import InteractiveMap from './pages/InteractiveMap';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/mapa" element={<InteractiveMap />} />
        <Route path="/organizacoes/policia" element={<Police />} />
        <Route path="/organizacoes/medicos" element={<Medics />} />
        <Route path="/torneios" element={<Tournament />} />
      </Routes>
    </>
  );
}

export default App;