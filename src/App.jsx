import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Tournament from './pages/Tournament/Tournament';
import Police from './pages/Police/Police';
import Medics from './pages/Medics';
import InteractiveMap from './pages/InteractiveMap';
import UnderConstruction from './components/UnderConstruction/UnderConstruction';
import WikiIndex from './pages/WikiIndex';
import OrganizationsIndex from './pages/OrganizationsIndex';

// Páginas específicas de Organizações (em construção)
const Anbu = () => <UnderConstruction pageName="ANBU" />;
const Guard12 = () => <UnderConstruction pageName="12G" />;
const SevenSwords = () => <UnderConstruction pageName="7 Espadachins" />;
const PuppetBrigade = () => <UnderConstruction pageName="Esquadrão de Marionetes" />;

// Páginas da Wiki (em construção)
const WikiDiarias = () => <UnderConstruction pageName="Missões Diárias" />;
const WikiArcos = () => <UnderConstruction pageName="Arcos" />;
const WikiSelos = () => <UnderConstruction pageName="Selos" />;
const WikiMundoAberto = () => <UnderConstruction pageName="Mundo Aberto" />;
const WikiCriaturas = () => <UnderConstruction pageName="Criaturas" />;
const WikiEquipamentos = () => <UnderConstruction pageName="Equipamentos" />;
const WikiItens = () => <UnderConstruction pageName="Itens" />;

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Wiki */}
        <Route path="/wiki" element={<WikiIndex />} />
        <Route path="/wiki/missoes/diarias" element={<WikiDiarias />} />
        <Route path="/wiki/missoes/arcos" element={<WikiArcos />} />
        <Route path="/wiki/missoes/selos" element={<WikiSelos />} />
        <Route path="/wiki/missoes/mundo-aberto" element={<WikiMundoAberto />} />
        <Route path="/wiki/criaturas" element={<WikiCriaturas />} />
        <Route path="/wiki/equipamentos" element={<WikiEquipamentos />} />
        <Route path="/wiki/itens" element={<WikiItens />} />

        {/* Mapa */}
        <Route path="/mapa" element={<InteractiveMap />} />

        {/* Organizações */}
        <Route path="/organizacoes" element={<OrganizationsIndex />} />
        <Route path="/organizacoes/policia" element={<Police />} />
        <Route path="/organizacoes/medicos" element={<Medics />} />
        <Route path="/organizacoes/anbu" element={<Anbu />} />
        <Route path="/organizacoes/12g" element={<Guard12 />} />
        <Route path="/organizacoes/7-espadachins" element={<SevenSwords />} />
        <Route path="/organizacoes/marionetes" element={<PuppetBrigade />} />

        {/* Torneios */}
        <Route path="/torneios" element={<Tournament />} />
      </Routes>
    </>
  );
}

export default App;