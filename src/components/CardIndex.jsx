import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #0B0E14;
  padding: 2rem;
`;

const Title = styled.h1`
  font-family: 'Naruto', 'Segoe UI', sans-serif;
  font-size: 2.8rem;
  text-align: center;
  color: #fff;
  margin-bottom: 2.5rem;
  span { color: #00BFFF; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled(Link)`
  background: #161C24;
  border: 1px solid #2A3A4A;
  border-radius: 12px;
  padding: 1.8rem 1rem;
  text-align: center;
  transition: all 0.25s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-8px);
    border-color: #00BFFF;
    box-shadow: 0 8px 30px rgba(0, 191, 255, 0.15);
  }

  .icon {
    font-size: 3.5rem;
    display: block;
    margin-bottom: 0.75rem;
  }

  .label {
    font-family: 'Naruto', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    color: #fff;
    letter-spacing: 0.5px;
  }
`;

const CardIndex = ({ title, items }) => {
  return (
    <Container>
      <Title>
        <span>{title}</span>
      </Title>
      <Grid>
        {items.map((item) => (
          <Card key={item.path} to={item.path}>
            <span className="icon">{item.icon}</span>
            <div className="label">{item.label}</div>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default CardIndex;