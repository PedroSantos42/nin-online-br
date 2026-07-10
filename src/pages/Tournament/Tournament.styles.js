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
  font-family: 'Naruto', 'Segoe UI', Tahoma, sans-serif;
  font-size: 2.8rem;
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

// ========== ESTILOS DOS MODAIS ==========
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
  max-width: 900px;
  width: 100%;
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalTitle = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  span { color: #FFD700; }
`;

export const ModalSubtitle = styled.p`
  color: #aaa;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

export const VillageColors = {
  Folha: { bg: 'rgba(34, 139, 34, 0.2)', border: '#2E8B57', text: '#7CFC00' },
  Areia: { bg: 'rgba(218, 165, 32, 0.2)', border: '#DAA520', text: '#FFD700' },
  Névoa: { bg: 'rgba(70, 130, 180, 0.2)', border: '#4682B4', text: '#87CEEB' },
};

export const FinalistCard = styled.div`
  background: ${props => VillageColors[props.village]?.bg || 'rgba(255,255,255,0.05)'};
  border: 2px solid ${props => VillageColors[props.village]?.border || '#2A3A4A'};
  border-radius: 12px;
  padding: 1.5rem;
  min-width: 200px;
  flex: 1;
  max-width: 280px;
  text-align: center;
  transition: 0.2s;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 20px ${props => VillageColors[props.village]?.border || '#2A3A4A'}40;
  }
  .position {
    font-size: 0.8rem;
    color: ${props => VillageColors[props.village]?.text || '#aaa'};
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
  .village-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 0.5rem;
    display: block;
    object-fit: contain;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    padding: 6px;
    border: 2px solid ${props => VillageColors[props.village]?.border || '#2A3A4A'};
  }
  .name {
    font-size: 1.4rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 0.3rem;
  }
  .level {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 0.5rem;
  }
  .mastery-icons {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
      background: rgba(0,0,0,0.3);
      border-radius: 8px;
      padding: 4px;
    }
  }
  .mastery-label {
    font-size: 0.7rem;
    color: #888;
    margin-top: 0.3rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
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

export const OkButton = styled.button`
  background: #00BFFF;
  color: #0B0E14;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 2rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover { filter: brightness(1.2); }
`;

export const ModalMessage = styled.p`
  color: #c0c0c0;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
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

export const BracketContainer = styled.div`
  width: 100%;
  height: 750px;
  overflow: auto;
  background: #0B0E14;
  border-radius: 8px;
  border: 1px solid #1a2530;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

// ========== ÍCONES ==========
export const ElementIcons = {
  Fogo: '/assets/icons/nin-fire-icon.webp',
  Água: '/assets/icons/nin-water-icon.webp',
  Vento: '/assets/icons/nin-wind-icon.webp',
  Raio: '/assets/icons/nin-light-icon.webp',
  Terra: '/assets/icons/nin-earth-icon.webp',
  'Mestre de Armas': '/assets/icons/nin-weapon-icon.webp',
  Médico: '/assets/icons/nin-medical-icon.webp',
  Taijutsu: '/assets/icons/nin-taijutsu-icon.webp',
};

// Ícones de vilas (use os arquivos que você gerou)
export const VillageIcons = {
  Folha: '/assets/icons/nin-leaf-icon.webp',
  Areia: '/assets/icons/nin-sand-icon.webp',
  Névoa: '/assets/icons/nin-mist-icon.webp',
};

// Fallback: vilas → elementos (caso os ícones de vilas não existam)
const VillageToElement = {
  Folha: 'Vento',
  Areia: 'Terra',
  Névoa: 'Água',
};

export const getMasteryIcon = (mastery) => {
  if (!mastery) return null;
  return ElementIcons[mastery] || null;
};

export const getVillageIcon = (village) => {
  // Primeiro, tenta o ícone específico da vila
  if (VillageIcons[village]) {
    return VillageIcons[village];
  }
  // Fallback: usa o ícone do elemento correspondente
  const element = VillageToElement[village];
  return element ? ElementIcons[element] : null;
};