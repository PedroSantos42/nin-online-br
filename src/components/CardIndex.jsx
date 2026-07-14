import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  height: 100vh;
  background-image: url('/assets/backgrounds/nin-wiki-background.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(11, 14, 20, 0.5); /* Antes era 0.78 */
  backdrop-filter: brightness(0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const Title = styled.h1`
  font-family: 'Naruto', 'Segoe UI', sans-serif;
  font-size: 3rem;
  text-align: center;
  color: #fff;
  margin-bottom: 2.5rem;
  text-shadow: 0 0 30px rgba(0, 191, 255, 0.3);
  span { color: #00bfff; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2rem;
`;

const Card = styled(Link)`
  background: rgba(22, 28, 36, 0.85);
  backdrop-filter: blur(4px);
  border: 1px solid #2a3a4a;
  border-radius: 12px;
  padding: 1.8rem 1rem;
  text-align: center;
  transition: all 0.25s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-8px);
    border-color: #00bfff;
    box-shadow: 0 8px 30px rgba(0, 191, 255, 0.2);
    background: rgba(22, 28, 36, 0.95);
  }

  .icon { font-size: 3.5rem; display: block; margin-bottom: 0.75rem; }
  .label { font-family: 'Naruto', 'Segoe UI', sans-serif; font-size: 1.2rem; color: #fff; letter-spacing: 0.5px; }
`;

const CardIndex = ({ title, items }) => {
  return (
    <PageContainer>
      <Overlay>
        <Content>
          <Title><span>{title}</span></Title>
          <Grid>
            {items.map((item) => (
              <Card key={item.path} to={item.path}>
                <span className="icon">{item.icon}</span>
                <div className="label">{item.label}</div>
              </Card>
            ))}
          </Grid>
        </Content>
      </Overlay>
    </PageContainer>
  );
};

export default CardIndex;