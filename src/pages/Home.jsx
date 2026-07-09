import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const HomeContainer = styled.div`
  min-height: 100vh;
  background-image: url('/nin-leaf-background.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Overlay = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgba(11, 14, 20, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  max-width: 900px;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 30px rgba(0, 191, 255, 0.5);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #e0e0e0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
    max-width: 600px;
    line-height: 1.6;
  }
`;

const Home = () => {
  const menuItems = [
    { label: 'Wiki', path: '/wiki' },
    { label: 'Polícia', path: '/organizacoes/policia' },
    { label: 'Médicos', path: '/organizacoes/medicos' },
    { label: '🏆 Torneios', path: '/torneios' },
  ];

  return (
    <HomeContainer>
      <Overlay>
        <Header menuItems={menuItems} />
        <Content>
          <h1>Bem-vindo, Shinobi!</h1>
          <p>
            Portal de informações da Vila da Folha. Aqui você encontra guias,
            manuais e tudo que precisa para servir e proteger nossa aldeia.
          </p>
        </Content>
      </Overlay>
    </HomeContainer>
  );
};

export default Home;