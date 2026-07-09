import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #0B0E14;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Card = styled.div`
  background: #161C24;
  border: 1px solid #2A3A4A;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 100%;
  margin-bottom: 2rem;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-bottom: 1.5rem;
  span { color: #FFD700; }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 120px;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #2A3A4A;
  background: #0B0E14;
  color: #fff;
  &:focus { border-color: #00BFFF; outline: none; }
`;

export const Select = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #2A3A4A;
  background: #0B0E14;
  color: #fff;
  &:focus { border-color: #00BFFF; outline: none; }
`;

export const Button = styled.button`
  padding: 0.6rem 1.5rem;
  background: ${props => props.variant === 'gold' ? '#FFD700' : '#00BFFF'};
  color: #0B0E14;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  &:hover { filter: brightness(1.2); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const RemoveButton = styled.button`
  background: transparent;
  color: #ff4444;
  border: 1px solid #ff4444;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: #ff4444; color: #fff; }
`;

export const ParticipantList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

export const ParticipantItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #1a2530;
  color: #c0c0c0;
  .name { font-weight: bold; color: #fff; }
  .level { color: #888; margin-left: 0.5rem; }
  .mastery { color: #00BFFF; margin-left: 0.5rem; font-size: 0.8rem; }
  .village { color: #FFD700; margin-left: 0.5rem; font-size: 0.8rem; }
`;

// Estilos do Popup
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
`;

export const Modal = styled.div`
  background: #161C24;
  border: 1px solid #2A3A4A;
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

export const ModalTitle = styled.h3`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  span { color: #FFD700; }
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

export const ParticipantCard = styled.div`
  background: #0B0E14;
  border: 2px solid #2A3A4A;
  border-radius: 12px;
  padding: 1.5rem;
  min-width: 140px;
  flex: 1;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: #00BFFF;
    transform: scale(1.03);
  }
  .name {
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
  }
  .sub {
    color: #888;
    font-size: 0.8rem;
    margin-top: 0.3rem;
  }
`;

export const CancelButton = styled.button`
  background: transparent;
  color: #aaa;
  border: 1px solid #2A3A4A;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover { background: #1a2530; color: #fff; }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;