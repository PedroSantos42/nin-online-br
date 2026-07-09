import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #0B0E14;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Card = styled.div`
  background: #161C24;
  border: 1px solid #2A3A4A;
  border-radius: 12px;
  padding: 2rem;
  max-width: 1000px;
  width: 100%;
  margin-bottom: 2rem;
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
  .village { 
    font-size: 0.75rem; 
    background: #1a2530; 
    padding: 0.2rem 0.6rem; 
    border-radius: 12px; 
    color: #FFD700;
    margin-left: 0.75rem;
  }
  .member-tag {
    font-size: 0.7rem;
    color: #aaa;
    margin-left: 0.5rem;
  }
  .mastery-tag {
    font-size: 0.65rem;
    background: #1a2530;
    padding: 0.1rem 0.4rem;
    border-radius: 10px;
    color: #00BFFF;
    margin-left: 0.3rem;
  }
`;

// Bracket
export const BracketContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1.5rem;
`;

export const RoundTitle = styled.h3`
  color: #00BFFF;
  font-size: 1.2rem;
  border-bottom: 1px solid #2A3A4A;
  padding-bottom: 0.5rem;
`;

export const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const MatchCard = styled.div`
  background: #0B0E14;
  border: 1px solid ${props => props.finished ? '#FFD700' : '#2A3A4A'};
  border-radius: 8px;
  padding: 1rem;
  transition: 0.2s;
  &:hover { border-color: #00BFFF; }
`;

export const TeamRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  color: ${props => props.winner ? '#FFD700' : '#c0c0c0'};
  font-weight: ${props => props.winner ? 'bold' : 'normal'};
  .team-name { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
  .level-badge { font-size: 0.7rem; color: #666; }
  .mastery-badge { font-size: 0.6rem; color: #aaa; margin-left: 0.3rem; }
`;

export const Versus = styled.div`
  text-align: center;
  color: #555;
  font-size: 0.8rem;
  margin: 0.2rem 0;
`;

export const WinnerButton = styled.button`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.3rem;
  background: transparent;
  border: 1px solid #2A3A4A;
  color: #aaa;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover { background: #1a2530; border-color: #00BFFF; }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

export const VillageTag = styled.span`
  font-size: 0.65rem;
  background: #1a2530;
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
  color: #FFD700;
`;

// Stats
export const StatsContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: #0B0E14;
  border-radius: 12px;
  border: 2px solid #FFD700;
`;

export const StatsTitle = styled.h2`
  color: #FFD700;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const StatsCard = styled.div`
  background: #161C24;
  border: 1px solid #2A3A4A;
  border-radius: 8px;
  padding: 1rem;
  h3 { color: #00BFFF; font-size: 0.9rem; margin-bottom: 0.5rem; }
  p { color: #fff; font-size: 1.1rem; font-weight: bold; }
  .sub { color: #888; font-size: 0.8rem; font-weight: normal; }
  .mastery-list { font-size: 0.8rem; color: #aaa; }
`;