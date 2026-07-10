import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeaderContainer, Logo, Nav, NavLink } from './Header.styles';

const menuItems = [
  { label: 'Wiki', path: '/wiki' },
  { label: 'Policia', path: '/organizacoes/policia' },
  { label: 'Medicos', path: '/organizacoes/medicos' },
  { label: 'Torneios', path: '/torneios' },
];

const Header = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src="/assets/logo/nin-logo.png" alt="Nin Online - Vila da Folha" />
      </Link>
      <Nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </NavLink>
        ))}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;