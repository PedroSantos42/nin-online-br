import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-image: url('/assets/backgrounds/nin-police-background.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* REMOVA O PADDING DAQUI */
  padding: 0;
`;

export const Overlay = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgba(11, 14, 20, 0.7);
  backdrop-filter: brightness(0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* REMOVA O PADDING DAQUI */
  padding: 0;
`;

export const Content = styled.main`
  max-width: 1200px;
  width: 100%;
  /* ADICIONE O PADDING AQUI */
  padding: 2rem 1rem;
`;

// O restante dos estilos permanece igual:
export const Title = styled.h1`
  font-family: 'Naruto', 'Segoe UI', Tahoma, sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  text-shadow: 0 0 30px rgba(0, 191, 255, 0.4);
  margin-bottom: 0.5rem;

  span {
    color: #00bfff;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #c0c0c0;
  text-align: center;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

export const Section = styled.div`
  background: rgba(22, 28, 36, 0.85);
  backdrop-filter: blur(4px);
  border: 1px solid #2a3a4a;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const SectionHeader = styled.button`
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
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;

  &:hover {
    background: rgba(0, 191, 255, 0.05);
  }

  .icon {
    font-size: 1.4rem;
    transition: transform 0.3s ease;
    transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    color: #00bfff;
  }
`;

export const SectionContent = styled.div`
  padding: ${props => props.expanded ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem'};
  max-height: ${props => props.expanded ? '2000px' : '0'};
  opacity: ${props => props.expanded ? '1' : '0'};
  overflow: hidden;
  transition: all 0.4s ease;

  p {
    color: #d0d0d0;
    line-height: 1.7;
    margin-bottom: 0.8rem;
    font-size: 1rem;
  }

  ul {
    color: #d0d0d0;
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 1rem 0;
  }

  li {
    padding: 0.3rem 0 0.3rem 1.5rem;
    position: relative;
    line-height: 1.6;
    font-size: 0.95rem;

    &::before {
      content: '▸';
      color: #00bfff;
      position: absolute;
      left: 0;
      font-weight: bold;
    }
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
`;