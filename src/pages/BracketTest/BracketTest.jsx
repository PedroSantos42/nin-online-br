import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { SingleEliminationBracket, SVGViewer } from '@g-loot/react-tournament-brackets';

// ==================== ESTILOS ====================
const PageContainer = styled.div`
  min-height: 100vh;
  background: #0B0E14;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background: #161C24;
  border: 1px solid #2A3A4A;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 100%;
  margin-bottom: 2rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-bottom: 1.5rem;
  span { color: #FFD700; }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 120px;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #2A3A4A;
  background: #0B0E14;
  color: #fff;
  &:focus { border-color: #00BFFF; outline: none; }
`;

const Select = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #2A3A4A;
  background: #0B0E14;
  color: #fff;
  &:focus { border-color: #00BFFF; outline: none; }
`;

const Button = styled.button`
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

const RemoveButton = styled.button`
  background: transparent;
  color: #ff4444;
  border: 1px solid #ff4444;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: #ff4444; color: #fff; }
`;

const ParticipantList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const ParticipantItem = styled.li`
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

// ==================== ESTILOS DO POPUP ====================
const Overlay = styled.div`
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

const Modal = styled.div`
  background: #161C24;
  border: 1px solid #2A3A4A;
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const ModalTitle = styled.h3`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  span { color: #FFD700; }
`;

const ModalMessage = styled.p`
  color: #c0c0c0;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const ParticipantCard = styled.div`
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

const CancelButton = styled.button`
  background: transparent;
  color: #aaa;
  border: 1px solid #2A3A4A;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover { background: #1a2530; color: #fff; }
`;

const OkButton = styled.button`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

// ==================== CONSTANTES ====================
const MASTERIES = ['Fogo', 'Água', 'Vento', 'Raio', 'Terra', 'Mestre de Armas', 'Médico', 'Taijutsu'];
const VILLAGES = ['Folha', 'Areia', 'Névoa'];
const MAX_LEVEL = 70;

// ==================== LÓGICA DE TRANSFORMAÇÃO ====================

function isPowerOfTwo(n) {
  return (n & (n - 1)) === 0 && n !== 0;
}

function generateBracket(participants) {
  const total = participants.length;
  if (total < 2 || !isPowerOfTwo(total)) return [];

  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  let matchId = 0;
  const matches = [];

  function buildRound(players, round = 1) {
    const currentRoundMatches = [];
    for (let i = 0; i < players.length; i += 2) {
      const p1 = players[i];
      const p2 = players[i + 1];
      const id = `m-${matchId++}`;
      currentRoundMatches.push({
        id,
        participants: [
          { id: p1?.id || null, name: p1?.name || 'TBD', isWinner: false },
          { id: p2?.id || null, name: p2?.name || 'TBD', isWinner: false },
        ],
        state: 'SCHEDULED',
        round,
        nextMatchId: null,
      });
    }

    if (currentRoundMatches.length === 1) {
      return currentRoundMatches;
    }

    const nextRoundPlayers = currentRoundMatches.map(() => ({
      id: null,
      name: 'TBD',
    }));
    const nextMatches = buildRound(nextRoundPlayers, round + 1);

    currentRoundMatches.forEach((m, idx) => {
      const nextIndex = Math.floor(idx / 2);
      if (nextMatches[nextIndex]) {
        m.nextMatchId = nextMatches[nextIndex].id;
      }
    });

    return [...currentRoundMatches, ...nextMatches];
  }

  const allMatches = buildRound(shuffled);
  
  const totalRounds = Math.log2(total);
  allMatches.forEach(m => {
    const round = m.round;
    let roundText = `Rodada ${round}`;
    if (round === totalRounds) {
      roundText = 'Final';
    } else if (round === totalRounds - 1) {
      roundText = 'Semifinal';
    } else if (round === totalRounds - 2) {
      roundText = 'Quartas de Final';
    } else if (round === 1 && totalRounds > 2) {
      roundText = 'Primeira Rodada';
    }
    m.tournamentRoundText = roundText;
  });

  return allMatches;
}

// ==================== COMPONENTE ====================

const MOCK_NAMES = ['Naruto', 'Sasuke', 'Sakura', 'Kakashi', 'Shikamaru', 'Hinata', 'Sai', 'Lee'];

const BracketTest = () => {
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(50);
  const [village, setVillage] = useState('Folha');
  const [primaryMastery, setPrimaryMastery] = useState(MASTERIES[0]);
  const [secondaryMastery, setSecondaryMastery] = useState('');

  const [matches, setMatches] = useState([]);
  const [bracketGenerated, setBracketGenerated] = useState(false);
  const [popupMatch, setPopupMatch] = useState(null);
  const [infoPopup, setInfoPopup] = useState(null);

  // Memoizar funções para evitar recriação desnecessária
  const handleAddParticipant = useCallback(() => {
    if (!name.trim()) return alert('Digite um nome!');
    if (level < 1 || level > MAX_LEVEL) return alert(`Level deve estar entre 1 e ${MAX_LEVEL}`);
    const newParticipant = {
      id: Date.now().toString(),
      name: name.trim(),
      level: Number(level),
      village,
      primaryMastery,
      secondaryMastery: secondaryMastery || undefined,
    };
    setParticipants(prev => [...prev, newParticipant]);
    setName('');
    setLevel(50);
    setPrimaryMastery(MASTERIES[0]);
    setSecondaryMastery('');
  }, [name, level, village, primaryMastery, secondaryMastery]);

  const handleRemoveParticipant = useCallback((id) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleAddMock = useCallback(() => {
    const newMocks = [];
    const baseIndex = participants.length;
    for (let i = 0; i < 4; i++) {
      const idx = baseIndex + i;
      const name = MOCK_NAMES[idx % MOCK_NAMES.length];
      newMocks.push({
        id: `mock-${Date.now()}-${idx}`,
        name: name,
        level: Math.floor(Math.random() * 60) + 10,
        village: VILLAGES[idx % VILLAGES.length],
        primaryMastery: MASTERIES[idx % MASTERIES.length],
        secondaryMastery: idx % 2 === 0 ? MASTERIES[(idx + 3) % MASTERIES.length] : undefined,
      });
    }
    setParticipants(prev => [...prev, ...newMocks]);
  }, [participants.length]);

  const handleGenerate = useCallback(() => {
    const total = participants.length;
    if (total < 2) return alert('Adicione pelo menos 2 participantes.');
    if (!isPowerOfTwo(total)) {
      const nextPower = Math.pow(2, Math.ceil(Math.log2(total)));
      return alert(`O número de participantes (${total}) não é potência de 2. Adicione mais ${nextPower - total} participantes.`);
    }
    const generated = generateBracket(participants);
    if (generated.length === 0) return alert('Erro ao gerar bracket.');
    setMatches(generated);
    setBracketGenerated(true);
  }, [participants]);

  const handleMatchClick = useCallback((match) => {
    if (match.state === 'PLAYED') return;
    const p1 = match.participants[0];
    const p2 = match.participants[1];
    if (!p1 || !p2 || p1.name === 'TBD' || p2.name === 'TBD') {
      setInfoPopup('Esta partida ainda não tem participantes definidos. Aguarde os vencedores das partidas anteriores.');
      return;
    }
    setPopupMatch(match);
  }, []);

  const handleSetWinner = useCallback((winnerId) => {
    if (!popupMatch) return;

    const matchId = popupMatch.id;
    const nextMatchId = popupMatch.nextMatchId;
    const winner = popupMatch.participants.find(p => p.id === winnerId);

    if (!winner) return;

    setMatches(prev => {
      const updated = prev.map(m => {
        if (m.id === matchId) {
          const newParticipants = m.participants.map(p => ({
            ...p,
            isWinner: p.id === winnerId,
          }));
          return { ...m, state: 'PLAYED', participants: newParticipants };
        }

        if (nextMatchId && m.id === nextMatchId) {
          const alreadyHasWinner = m.participants.some(p => p.id === winner.id);
          if (alreadyHasWinner) return m;

          const emptyIndex = m.participants.findIndex(p => !p.id || p.name === 'TBD');
          if (emptyIndex === -1) return m;

          const updatedParticipants = m.participants.map((p, idx) => {
            if (idx === emptyIndex) {
              return { ...p, id: winner.id, name: winner.name };
            }
            return p;
          });
          return { ...m, participants: updatedParticipants };
        }

        return m;
      });

      return updated;
    });

    setPopupMatch(null);
  }, [popupMatch]);

  const handleCancel = useCallback(() => setPopupMatch(null), []);
  const handleCloseInfoPopup = useCallback(() => setInfoPopup(null), []);

  const handleReset = useCallback(() => {
    setParticipants([]);
    setMatches([]);
    setBracketGenerated(false);
    setPopupMatch(null);
    setInfoPopup(null);
    setSvgViewerValue(null); // Resetar posição do SVG
  }, []);

  // ========== COMPONENTE DE MATCH ==========
  const MatchComponent = React.memo(({ match }) => {
    return (
      <div
        style={{
          background: '#0B0E14',
          border: '1px solid #2A3A4A',
          borderRadius: '8px',
          padding: '8px',
          minWidth: '180px',
          cursor: 'pointer',
          transition: '0.2s',
          margin: '4px 0',
        }}
        onClick={() => handleMatchClick(match)}
      >
        {match.participants.map((p, idx) => (
          <div key={idx} style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: p.isWinner ? '#FFD700' : '#c0c0c0',
            fontWeight: p.isWinner ? 'bold' : 'normal',
            padding: '2px 0',
          }}>
            <span>{p.name}</span>
            {p.isWinner && <span>🏆</span>}
          </div>
        ))}
        {match.state === 'SCHEDULED' && (
          <div style={{ color: '#666', fontSize: '0.7rem', marginTop: '4px' }}>
            Clique para declarar vencedor
          </div>
        )}
        {match.state === 'PLAYED' && (
          <div style={{ color: '#FFD700', fontSize: '0.7rem', marginTop: '4px' }}>
            Finalizado
          </div>
        )}
      </div>
    );
  });

  // ========== WRAPPER DO SVG (controlado) ==========
  const SvgWrapper = useCallback(({ children, ...props }) => {
    return (
      <SVGViewer
        width={1200}
        height={600}
        {...props}
        style={{
          background: '#0B0E14',
          width: '100%',
          height: '100%',
          minHeight: '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        svgStyle={{
          background: '#0B0E14',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </SVGViewer>
    );
  }, []); // dependências vazias para nunca recriar

  // ========== OPCIONAIS DA LIB ==========
  const bracketOptions = useMemo(() => ({
    roundHeader: {
      isShown: true,
      fontColor: '#00BFFF',
      backgroundColor: '#161C24',
      borderColor: '#2A3A4A',
      fontSize: '14px',
      padding: '8px 12px',
    },
    match: {
      background: '#0B0E14',
      borderColor: '#2A3A4A',
      fontColor: '#c0c0c0',
      winnerBackground: '#1a2a1a',
      winnerBorderColor: '#FFD700',
      loserBackground: '#2a1a1a',
      padding: '8px 12px',
      width: '180px',
    },
  }), []);

  return (
    <PageContainer>
      <Card>
        <Title>🧪 <span>Teste</span> da Lib de Brackets</Title>

        {!bracketGenerated && (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              <Input
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ flex: '1 1 150px' }}
                onKeyDown={(e) => e.key === 'Enter' && handleAddParticipant()}
              />
              <Input
                type="number"
                placeholder="Level"
                value={level}
                onChange={(e) => setLevel(Math.min(Number(e.target.value), MAX_LEVEL))}
                style={{ width: '80px' }}
                min={1}
                max={MAX_LEVEL}
              />
              <Select value={village} onChange={(e) => setVillage(e.target.value)} style={{ width: '110px' }}>
                {VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
              </Select>
              <Select value={primaryMastery} onChange={(e) => setPrimaryMastery(e.target.value)} style={{ width: '130px' }}>
                {MASTERIES.map(m => <option key={m} value={m}>{m}</option>)}
              </Select>
              <Select value={secondaryMastery} onChange={(e) => setSecondaryMastery(e.target.value)} style={{ width: '130px' }}>
                <option value="">Nenhuma</option>
                {MASTERIES.map(m => <option key={m} value={m}>{m}</option>)}
              </Select>
              <Button onClick={handleAddParticipant}>Adicionar</Button>
              <Button variant="gold" onClick={handleAddMock}>+4 Mock</Button>
            </div>

            {participants.length > 0 && (
              <ParticipantList>
                {participants.map(p => (
                  <ParticipantItem key={p.id}>
                    <span>
                      <span className="name">{p.name}</span>
                      <span className="level">Lv.{p.level}</span>
                      <span className="mastery">{p.primaryMastery}{p.secondaryMastery ? `/${p.secondaryMastery}` : ''}</span>
                      <span className="village">{p.village}</span>
                    </span>
                    <RemoveButton onClick={() => handleRemoveParticipant(p.id)}>✕</RemoveButton>
                  </ParticipantItem>
                ))}
              </ParticipantList>
            )}

            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <Button variant="gold" onClick={handleGenerate} disabled={participants.length < 2}>
                Gerar Chaveamento
              </Button>
              <Button onClick={handleReset}>Limpar Tudo</Button>
            </div>

            {participants.length > 0 && !isPowerOfTwo(participants.length) && (
              <p style={{ color: '#ffaa00', marginTop: '1rem' }}>
                ⚠️ Número de participantes ({participants.length}) não é potência de 2.
              </p>
            )}
          </>
        )}

        {bracketGenerated && (
          <div>
            <Button variant="gold" onClick={handleReset} style={{ marginBottom: '1.5rem' }}>
              🔄 Voltar e recomeçar
            </Button>
            <div style={{
              width: '100%',
              height: '750px',
              overflow: 'auto',
              background: '#0B0E14',
              borderRadius: '8px',
              border: '1px solid #1a2530',
              padding: '0.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}>
              <SingleEliminationBracket
                matches={matches}
                matchComponent={MatchComponent}
                svgWrapper={SvgWrapper}
                options={bracketOptions}
              />
            </div>
          </div>
        )}
      </Card>

      {/* Popup para escolher vencedor */}
      {popupMatch && (
        <Overlay onClick={handleCancel}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>🏆 <span>Escolha o Vencedor</span></ModalTitle>
            <CardsContainer>
              {popupMatch.participants.map((p, idx) => (
                <ParticipantCard key={idx} onClick={() => handleSetWinner(p.id)}>
                  <div className="name">{p.name}</div>
                  <div className="sub">Clique para vencer</div>
                </ParticipantCard>
              ))}
            </CardsContainer>
            <ButtonGroup>
              <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
            </ButtonGroup>
          </Modal>
        </Overlay>
      )}

      {/* Popup de informação */}
      {infoPopup && (
        <Overlay onClick={handleCloseInfoPopup}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>ℹ️ <span>Informação</span></ModalTitle>
            <ModalMessage>{infoPopup}</ModalMessage>
            <ButtonGroup>
              <OkButton onClick={handleCloseInfoPopup}>OK</OkButton>
            </ButtonGroup>
          </Modal>
        </Overlay>
      )}
    </PageContainer>
  );
};

export default BracketTest;