import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem 0.5rem 2rem;
  background: rgba(11, 14, 20, 0.92);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(0, 191, 255, 0.2);
  width: 100%;
`;

export const Logo = styled.img`
  height: 70px;
  width: auto;
  margin-bottom: 0.3rem;
  filter: drop-shadow(0 0 10px rgba(0, 191, 255, 0.3));
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.25rem;
`;

// Item do menu com dropdown
export const NavItem = styled.div`
  position: relative;
  display: inline-block;
`;

// Link principal do menu (sem dropdown)
export const NavLink = styled(Link)`
  font-family: 'Naruto', 'Segoe UI', Tahoma, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #c0c0c0;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: all 0.2s;
  letter-spacing: 0.5px;
  border-bottom: 2px solid transparent;
  display: inline-block;
  white-space: nowrap;

  &:hover {
    color: #00bfff;
    border-bottom-color: #00bfff;
  }

  &.active {
    color: #ffd700;
    border-bottom-color: #ffd700;
  }
`;

// Botão que abre o dropdown (sem link, apenas para abrir)
export const NavButton = styled.button`
  font-family: 'Naruto', 'Segoe UI', Tahoma, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #c0c0c0;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: all 0.2s;
  letter-spacing: 0.5px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;

  &:hover {
    color: #00bfff;
    border-bottom-color: #00bfff;
  }

  &.active {
    color: #ffd700;
    border-bottom-color: #ffd700;
  }
`;

// Dropdown container
export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #161C24;
  border: 1px solid #2A3A4A;
  border-radius: 8px;
  padding: 0.5rem 0;
  min-width: 200px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: all 0.25s ease;
  margin-top: 4px;
  z-index: 200;

  ${NavItem}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

// Subitem do dropdown
export const DropdownItem = styled(Link)`
  display: block;
  padding: 0.5rem 1.2rem;
  color: #c0c0c0;
  font-size: 0.95rem;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;

  &:hover {
    background: rgba(0, 191, 255, 0.1);
    color: #00bfff;
  }
`;

// Separador entre grupos de subitens
export const DropdownDivider = styled.div`
  height: 1px;
  background: #2A3A4A;
  margin: 0.3rem 0;
`;