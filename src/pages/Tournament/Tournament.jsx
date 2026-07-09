import React, { useState, useCallback, useMemo } from 'react';
import { SingleEliminationBracket, SVGViewer } from '@g-loot/react-tournament-brackets';
import {
  PageContainer,
  Card,
  Title,
  InputGroup,
  Input,
  Select,
  Button,
  RemoveButton,
  ParticipantList,
  ParticipantItem,
  Overlay,
  Modal,
  ModalTitle,
  ModalSubtitle,
  CardsContainer,
  FinalistCard,
  ButtonGroup,
  CancelButton,
  OkButton,
  ModalMessage,
  ParticipantCard,
  BracketContainer,
  getVillageIcon,
  getMasteryIcon,
} from './Tournament.styles';

// ==================== CONSTANTES ====================
const MASTERIES = ['Fogo', 'Água', 'Vento', 'Raio', 'Terra', 'Mestre de Armas', 'Médico', 'Taijutsu'];
const VILLAGES = ['Folha', 'Areia', 'Névoa'];
const MAX_LEVEL = 70;
const MOCK_NAMES = ['Naruto', 'Sasuke', 'Sakura', 'Kakashi', 'Shikamaru', 'Hinata', 'Sai', 'Lee'];

// ==================== FUNÇÕES AUXILIARES ====================
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
        finished: false,
      });
    }

    if (currentRoundMatches.length === 1) {
      return currentRoundMatches;
    }

    const nextRoundPlayers = currentRoundMatches.map(() => ({ id: null, name: 'TBD' }));
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
    if (round === totalRounds) roundText = 'Final';
    else if (round === totalRounds - 1) roundText = 'Semifinal';
    else if (round === totalRounds - 2) roundText = 'Quartas de Final';
    else if (round === 1 && totalRounds > 2) roundText = 'Primeira Rodada';
    m.tournamentRoundText = roundText;
  });

  return allMatches;
}

// ==================== COMPONENTE PRINCIPAL ====================
const Tournament = () => {
  // Estados
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [bracketGenerated, setBracketGenerated] = useState(false);
  const [popupMatch, setPopupMatch] = useState(null);
  const [infoPopup, setInfoPopup] = useState(null);
  const [champion, setChampion] = useState(null);
  const [runnerUp, setRunnerUp] = useState(null);
  const [semifinalists, setSemifinalists] = useState([]);
  const [showFinalStats, setShowFinalStats] = useState(false);

  // Formulário 1x1
  const [name, setName] = useState('');
  const [level, setLevel] = useState(50);
  const [village, setVillage] = useState('Folha');
  const [primaryMastery, setPrimaryMastery] = useState(MASTERIES[0]);
  const [secondaryMastery, setSecondaryMastery] = useState('');

  // ========== HANDLERS ==========
  const addParticipant = useCallback(() => {
    if (!name.trim()) return alert('Digite um nome!');
    if (level < 1 || level > MAX_LEVEL) return alert(`Level entre 1 e ${MAX_LEVEL}`);
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

  const removeParticipant = useCallback((id) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  }, []);

  const addMock = useCallback(() => {
    const newMocks = [];
    const baseIndex = participants.length;
    for (let i = 0; i < 4; i++) {
      const idx = baseIndex + i;
      newMocks.push({
        id: `mock-${Date.now()}-${idx}`,
        name: MOCK_NAMES[idx % MOCK_NAMES.length],
        level: Math.floor(Math.random() * 60) + 10,
        village: VILLAGES[idx % VILLAGES.length],
        primaryMastery: MASTERIES[idx % MASTERIES.length],
        secondaryMastery: idx % 2 === 0 ? MASTERIES[(idx + 3) % MASTERIES.length] : undefined,
      });
    }
    setParticipants(prev => [...prev, ...newMocks]);
  }, [participants.length]);

  const generate = useCallback(() => {
    const total = participants.length;
    if (total < 2) return alert('Mínimo 2 participantes.');
    if (!isPowerOfTwo(total)) {
      const nextPower = Math.pow(2, Math.ceil(Math.log2(total)));
      return alert(`Total (${total}) não é potência de 2. Adicione ${nextPower - total} participantes.`);
    }
    const generated = generateBracket(participants);
    if (!generated.length) return alert('Erro ao gerar bracket.');
    setMatches(generated);
    setBracketGenerated(true);
    setChampion(null);
    setRunnerUp(null);
    setSemifinalists([]);
    setShowFinalStats(false);
  }, [participants]);

  const reset = useCallback(() => {
    setParticipants([]);
    setMatches([]);
    setBracketGenerated(false);
    setPopupMatch(null);
    setInfoPopup(null);
    setChampion(null);
    setRunnerUp(null);
    setSemifinalists([]);
    setShowFinalStats(false);
  }, []);

  const handleMatchClick = useCallback((match) => {
    if (match.state === 'PLAYED') return;
    const p1 = match.participants[0];
    const p2 = match.participants[1];
    if (!p1 || !p2 || p1.name === 'TBD' || p2.name === 'TBD') {
      setInfoPopup('Esta partida ainda não tem participantes definidos.');
      return;
    }
    setPopupMatch(match);
  }, []);

  // ========== SET WINNER COM DETECÇÃO DE FINAL ==========
  const setWinner = useCallback((winnerId) => {
    if (!popupMatch) return;
    const matchId = popupMatch.id;
    const nextMatchId = popupMatch.nextMatchId;
    const winner = popupMatch.participants.find(p => p.id === winnerId);
    if (!winner) return;

    setMatches(prev => {
      const updated = prev.map(m => {
        if (m.id === matchId) {
          return {
            ...m,
            state: 'PLAYED',
            finished: true,
            participants: m.participants.map(p => ({
              ...p,
              isWinner: p.id === winnerId,
            })),
            winnerId: winnerId,
          };
        }
        if (nextMatchId && m.id === nextMatchId) {
          const emptyIndex = m.participants.findIndex(p => !p.id || p.name === 'TBD');
          if (emptyIndex === -1) return m;
          const updatedParticipants = m.participants.map((p, idx) =>
            idx === emptyIndex ? { ...p, id: winner.id, name: winner.name } : p
          );
          return { ...m, participants: updatedParticipants };
        }
        return m;
      });

      const allFinished = updated.every(m => m.finished);
      if (allFinished && !showFinalStats) {
        const maxRound = Math.max(...updated.map(m => m.round));
        const finalMatches = updated.filter(m => m.round === maxRound && m.finished);
        if (finalMatches.length === 1) {
          const finalMatch = finalMatches[0];
          if (finalMatch.winnerId) {
            const champ = participants.find(p => p.id === finalMatch.winnerId);
            if (champ) {
              const runnerId = finalMatch.team1Id === finalMatch.winnerId ? finalMatch.team2Id : finalMatch.team1Id;
              const runner = participants.find(p => p.id === runnerId);
              const semiRound = maxRound - 1;
              const semiMatches = updated.filter(m => m.round === semiRound && m.finished);
              const semiLosers = semiMatches
                .filter(m => m.winnerId)
                .map(m => {
                  const loserId = m.team1Id === m.winnerId ? m.team2Id : m.team1Id;
                  return participants.find(p => p.id === loserId);
                })
                .filter(Boolean);
              setChampion(champ);
              setRunnerUp(runner || null);
              setSemifinalists(semiLosers);
              setShowFinalStats(true);
            }
          }
        }
      }
      return updated;
    });
    setPopupMatch(null);
  }, [popupMatch, participants, showFinalStats]);

  // ========== COMPONENTE DE MATCH ==========
  const MatchComponent = React.memo(({ match }) => (
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
  ));

  const SvgWrapper = useCallback(({ children, ...props }) => (
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
  ), []);

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

  // ========== RENDERIZA MODAL FINAL ==========
  const renderFinalStats = () => {
    if (!showFinalStats || !champion) return null;

    const formatPlayer = (player, position) => {
      if (!player) return null;
      const village = player.village || 'Folha';
      const villageIcon = getVillageIcon(village);
      const primaryIcon = getMasteryIcon(player.primaryMastery);
      const secondaryIcon = player.secondaryMastery ? getMasteryIcon(player.secondaryMastery) : null;

      return (
        <FinalistCard key={player.id} village={village}>
          <div className="position">{position}</div>
          {villageIcon && <img src={villageIcon} alt={village} className="village-icon" />}
          <div className="name">{player.name}</div>
          <div className="level">Nível: {player.level}</div>
          <div className="mastery-icons">
            {primaryIcon && <img src={primaryIcon} alt={player.primaryMastery} title={player.primaryMastery} />}
            {secondaryIcon && <img src={secondaryIcon} alt={player.secondaryMastery} title={player.secondaryMastery} />}
          </div>
          <div className="mastery-label">
            {player.primaryMastery}{player.secondaryMastery ? ` + ${player.secondaryMastery}` : ''}
          </div>
          <div style={{ color: '#888', fontSize: '0.7rem', marginTop: '0.3rem' }}>{village}</div>
        </FinalistCard>
      );
    };

    return (
      <Overlay>
        <Modal>
          <ModalTitle>🏆 <span>Torneio Finalizado!</span></ModalTitle>
          <ModalSubtitle>Parabéns ao campeão e a todos os participantes!</ModalSubtitle>
          <CardsContainer>
            {formatPlayer(champion, '🥇 Campeão')}
            {runnerUp && formatPlayer(runnerUp, '🥈 Vice-campeão')}
            {semifinalists.map((p, idx) => formatPlayer(p, `🥉 ${idx === 0 ? '3º Lugar' : 'Semifinalista'}`))}
          </CardsContainer>
          <ButtonGroup>
            <Button variant="gold" onClick={reset}>🔄 Novo Torneio</Button>
            <CancelButton onClick={() => setShowFinalStats(false)}>Fechar</CancelButton>
          </ButtonGroup>
        </Modal>
      </Overlay>
    );
  };

  // ========== RENDER ==========
  return (
    <PageContainer>
      <Card>
        <Title>🏆 <span>Torneios</span></Title>

        {!bracketGenerated ? (
          <>
            <InputGroup>
              <Input
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addParticipant()}
                style={{ flex: '1 1 150px' }}
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
              <Button onClick={addParticipant}>Adicionar</Button>
              <Button variant="gold" onClick={addMock}>+4 Mock</Button>
            </InputGroup>

            {participants.length > 0 && (
              <ParticipantList>
                {participants.map(p => (
                  <ParticipantItem key={p.id}>
                    <span>
                      <span className="name">{p.name}</span>
                      <span className="level">Lv.{p.level}</span>
                      <span className="mastery">
                        {p.primaryMastery}{p.secondaryMastery ? `/${p.secondaryMastery}` : ''}
                      </span>
                      <span className="village">{p.village}</span>
                    </span>
                    <RemoveButton onClick={() => removeParticipant(p.id)}>✕</RemoveButton>
                  </ParticipantItem>
                ))}
              </ParticipantList>
            )}

            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <Button variant="gold" onClick={generate} disabled={participants.length < 2}>
                Gerar Chaveamento
              </Button>
              <Button onClick={reset}>Limpar Tudo</Button>
            </div>

            {participants.length > 0 && !isPowerOfTwo(participants.length) && (
              <p style={{ color: '#ffaa00', marginTop: '1rem' }}>
                ⚠️ Número de participantes ({participants.length}) não é potência de 2.
              </p>
            )}
          </>
        ) : (
          !showFinalStats && (
            <>
              <Button variant="gold" onClick={reset} style={{ marginBottom: '1.5rem' }}>
                🔄 Voltar e recomeçar
              </Button>
              <BracketContainer>
                <SingleEliminationBracket
                  matches={matches}
                  matchComponent={MatchComponent}
                  svgWrapper={SvgWrapper}
                  options={bracketOptions}
                />
              </BracketContainer>
            </>
          )
        )}
      </Card>

      {/* Popups e modais */}
      {popupMatch && (
        <Overlay onClick={() => setPopupMatch(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>🏆 <span>Escolha o Vencedor</span></ModalTitle>
            <CardsContainer>
              {popupMatch.participants.map((p) => (
                <ParticipantCard key={p.id} onClick={() => setWinner(p.id)}>
                  <div className="name">{p.name}</div>
                  <div className="sub">Clique para vencer</div>
                </ParticipantCard>
              ))}
            </CardsContainer>
            <ButtonGroup>
              <CancelButton onClick={() => setPopupMatch(null)}>Cancelar</CancelButton>
            </ButtonGroup>
          </Modal>
        </Overlay>
      )}

      {infoPopup && (
        <Overlay onClick={() => setInfoPopup(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>ℹ️ <span>Informação</span></ModalTitle>
            <ModalMessage>{infoPopup}</ModalMessage>
            <ButtonGroup>
              <OkButton onClick={() => setInfoPopup(null)}>OK</OkButton>
            </ButtonGroup>
          </Modal>
        </Overlay>
      )}

      {renderFinalStats()}
    </PageContainer>
  );
};

export default Tournament;