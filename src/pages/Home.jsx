import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  height: 100vh;
  background-image: url('/assets/backgrounds/nin-home-background.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(11, 14, 20, 0.5); /* Antes era 0.6 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 900px;

  h1 {
    font-family: 'Naruto', 'Segoe UI', Tahoma, sans-serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 30px rgba(0, 191, 255, 0.5);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #e0e0e0;
    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
    max-width: 600px;
    line-height: 1.6;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Overlay>
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