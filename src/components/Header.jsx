import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 2rem 0.5rem 2rem;
  background: rgba(11, 14, 20, 0.85);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(0, 191, 255, 0.2);
  width: 100%;
  position: relative;
  z-index: 10;
`;

const Logo = styled.img`
  height: 80px;
  width: auto;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 10px rgba(0, 191, 255, 0.3));
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.25rem;
`;

const NavLink = styled(Link)`
  font-size: 1.1rem;
  font-weight: 600;
  color: #c0c0c0;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: all 0.2s;
  letter-spacing: 0.5px;
  border-bottom: 2px solid transparent;

  &:hover {
    color: #00bfff;
    border-bottom-color: #00bfff;
  }
`;

const Header = ({ menuItems }) => {
  return (
    <HeaderContainer>
      <Logo src="/nin-logo.png" alt="Nin Online - Vila da Folha" />
      <Nav>
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;