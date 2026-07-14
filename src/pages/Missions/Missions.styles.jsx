import styled from 'styled-components';

export const PageContainer = styled.div`
  height: 100vh; /* Fixo na tela, não estica */
  background-image: url('/assets/backgrounds/nin-wiki-background.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Mantém a imagem fixa durante o scroll */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(11, 14, 20, 0.5);
  backdrop-filter: brightness(0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  overflow-y: auto; /* Scroll interno, não afeta a imagem */
`;

export const Content = styled.div`
  max-width: 1000px;
  width: 100%;
`;

export const Title = styled.h1`
  font-family: 'Naruto', 'Segoe UI', sans-serif;
  font-size: 3rem;
  text-align: center;
  color: #fff;
  margin-bottom: 2rem;
  text-shadow: 0 0 30px rgba(0, 191, 255, 0.3);
  span {
    color: #00bfff;
  }
`;

// ========== ACORDEÃO POR TIPO DE MISSÃO ==========
export const TypeAccordion = styled.div`
  background: rgba(22, 28, 36, 0.85);
  backdrop-filter: blur(4px);
  border: 1px solid #2a3a4a;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const TypeHeader = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  padding: 1.2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;

  &:hover {
    background: rgba(0, 191, 255, 0.05);
  }

  .arrow {
    font-size: 1.2rem;
    color: #00bfff;
    transition: transform 0.3s ease;
    transform: ${props => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  .type-label {
    font-family: 'Naruto', 'Segoe UI', sans-serif;
    letter-spacing: 0.5px;
  }
`;

export const TypeDescription = styled.p`
  color: #b0b0b0;
  font-size: 0.95rem;
  padding: 0 1.5rem 0.5rem 1.5rem;
  margin: 0;
`;

export const TypeContent = styled.div`
  max-height: ${props => (props.expanded ? '2000px' : '0')};
  opacity: ${props => (props.expanded ? '1' : '0')};
  overflow: hidden;
  transition: all 0.4s ease;
  padding: ${props => (props.expanded ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem')};
`;

// ========== CARDS DE MISSÃO ==========
export const MissionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

export const MissionCard = styled.div`
  background: #0b0e14;
  border: 1px solid #2a3a4a;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #00bfff;
    transform: translateY(-2px);
  }

  .mission-name {
    font-family: 'Naruto', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    color: #fff;
    letter-spacing: 0.5px;
    margin-bottom: 0.3rem;
  }

  .mission-level {
    font-size: 0.8rem;
    color: #ffd700;
    margin-bottom: 0.5rem;
  }

  .mission-preview {
    font-size: 0.9rem;
    color: #b0b0b0;
    line-height: 1.5;
  }

  .mission-details {
    max-height: ${props => (props.expanded ? '500px' : '0')};
    opacity: ${props => (props.expanded ? '1' : '0')};
    overflow: hidden;
    transition: all 0.3s ease;
    margin-top: ${props => (props.expanded ? '0.8rem' : '0')};
    border-top: ${props => (props.expanded ? '1px solid #2a3a4a' : 'none')};
    padding-top: ${props => (props.expanded ? '0.8rem' : '0')};

    p {
      color: #d0d0d0;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 0.4rem;
    }

    strong {
      color: #ffd700;
    }

    .tag {
      display: inline-block;
      background: rgba(0, 191, 255, 0.15);
      color: #00bfff;
      font-size: 0.7rem;
      font-weight: bold;
      padding: 0.15rem 0.6rem;
      border-radius: 12px;
      margin-right: 0.4rem;
      text-transform: uppercase;
    }
  }

  .expand-icon {
    color: #00bfff;
    font-size: 0.8rem;
    margin-left: 0.5rem;
  }
`;