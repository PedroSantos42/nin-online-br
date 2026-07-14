import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from './Header.styles';

const menuStructure = [
  { label: '🏠 Home', path: '/', type: 'link' },
  {
    label: '📚 Wiki',
    path: '/wiki',
    type: 'dropdown',
    subitems: [
      {
        label: 'Missoes',
        subitems: [
          { label: 'Diárias', path: '/wiki/missoes/diarias' },
          { label: 'Arcos', path: '/wiki/missoes/arcos' },
          { label: 'Selos', path: '/wiki/missoes/selos' },
          { label: 'Mundo Aberto', path: '/wiki/missoes/mundo-aberto' },
        ],
      },
      { label: 'Criaturas', path: '/wiki/criaturas' },
      { label: 'Equipamentos', path: '/wiki/equipamentos' },
      { label: 'Itens', path: '/wiki/itens' },
    ],
  },
  { label: '🗺️ Mapa', path: '/mapa', type: 'link' },
  {
    label: '🏛️ Organizacoes',
    path: '/organizacoes',
    type: 'dropdown',
    subitems: [
      { label: '👮 Policia', path: '/organizacoes/policia' },
      { label: '🩺 Corporacao Medica', path: '/organizacoes/medicos' },
      { label: '🎭 ANBU', path: '/organizacoes/anbu' },
      { label: '⚔️ 12G', path: '/organizacoes/12g' },
      { label: '🗡️ 7 Espadachins', path: '/organizacoes/7-espadachins' },
      { label: '🎎 Esquadrao de Marionetes', path: '/organizacoes/marionetes' },
    ],
  },
  { label: '🏆 Torneios', path: '/torneios', type: 'link' },
];

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderDropdownItems = (subitems) => {
    return subitems.map((item, index) => {
      if (item.subitems) {
        return (
          <React.Fragment key={index}>
            <DropdownItem
              as="div"
              style={{
                fontWeight: 'bold',
                color: '#FFD700',
                padding: '0.5rem 1.2rem 0.2rem 1.2rem',
                fontSize: '0.85rem',
                pointerEvents: 'none',
                borderBottom: '1px solid #2A3A4A',
                marginBottom: '0.2rem',
              }}
            >
              {item.label}
            </DropdownItem>
            {item.subitems.map((sub, idx) => (
              <DropdownItem key={idx} to={sub.path} style={{ paddingLeft: '2rem' }}>
                {sub.label}
              </DropdownItem>
            ))}
            {index < subitems.length - 1 && <DropdownDivider />}
          </React.Fragment>
        );
      }
      return (
        <DropdownItem key={index} to={item.path}>
          {item.label}
        </DropdownItem>
      );
    });
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src="/assets/logo/nin-logo.png" alt="Nin Online - Vila da Folha" />
      </Link>
      <Nav>
        {menuStructure.map((item, index) => {
          if (item.type === 'link') {
            return (
              <NavLink
                key={index}
                to={item.path}
                className={isActive(item.path) ? 'active' : ''}
              >
                {item.label}
              </NavLink>
            );
          }

          if (item.type === 'dropdown') {
            return (
              <NavItem key={index}>
                <NavLink
                  to={item.path}
                  className={isActive(item.path) ? 'active' : ''}
                >
                  {item.label}
                </NavLink>
                <Dropdown>
                  {renderDropdownItems(item.subitems)}
                </Dropdown>
              </NavItem>
            );
          }

          return null;
        })}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;