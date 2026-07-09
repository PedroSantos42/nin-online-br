import React, { useState, useEffect, useMemo } from 'react';
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
  BracketContainer,
  RoundTitle,
  MatchesGrid,
  MatchCard,
  TeamRow,
  Versus,
  WinnerButton,
  VillageTag,
  StatsContainer,
  StatsTitle,
  StatsGrid,
  StatsCard,
} from './Tournament.styles';

// Constantes
const VILLAGES = ['Folha', 'Areia', 'Névoa'];
const MASTERIES = ['Fogo', 'Água', 'Vento', 'Raio', 'Terra', 'Mestre de Armas', 'Médico', 'Taijutsu'];
const MAX_LEVEL = 70;
const DEFAULT_LEVEL = 50;

// ==================== LÓGICA ====================

function createTeams(participants, teamSize) {
  if (teamSize === 1) {
    return participants.map((p, index) => ({
      id: `team-${Date.now()}-${index}`,
      members: [p],
      avgLevel: p.level,
    }));
  } else {
    return participants.map((dupla, index) => ({
      id: `team-${Date.now()}-${index}`,
      members: dupla.members,
      avgLevel: (dupla.members[0].level + dupla.members[1].level) / 2,
    }));
  }
}

function createFirstRound(teams) {
  const matches = [];
  for (let i = 0; i < teams.length; i += 2) {
    matches.push({
      id: `m-${Date.now()}-${i/2}`,
      round: 1,
      team1Id: teams[i].id,
      team2Id: teams[i+1].id,
      winnerId: null,
      finished: false,
    });
  }
  return matches;
}

function advanceRound(matches, teams) {
  const currentRound = Math.max(...matches.map(m => m.round));
  const finishedMatches = matches.filter(m => m.round === currentRound && m.finished && m.winnerId);
  const winners = finishedMatches
    .map(m => teams.find(t => t.id === m.winnerId))
    .filter(Boolean);

  if (winners.length === 0) {
    return { matches: [], finished: true, champion: null };
  }
  if (winners.length === 1) {
    return { matches: [], finished: true, champion: winners[0] };
  }

  const nextRound = currentRound + 1;
  const newMatches = [];
  for (let i = 0; i < winners.length; i += 2) {
    newMatches.push({
      id: `m-${Date.now()}-${i/2}`,
      round: nextRound,
      team1Id: winners[i].id,
      team2Id: winners[i+1].id,
      winnerId: null,
      finished: false,
    });
  }
  return { matches: newMatches, finished: false, champion: null };
}

function isPowerOfTwo(n) {
  return (n & (n - 1)) === 0 && n !== 0;
}

// ==================== COMPONENTE ====================

const Tournament = () => {
  // Estados do formulário
  const [teamSize, setTeamSize] = useState(1);
  // 1x1
  const [name, setName] = useState('');
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [village, setVillage] = useState('Folha');
  const [primaryMastery, setPrimaryMastery] = useState(MASTERIES[0]);
  const [secondaryMastery, setSecondaryMastery] = useState('');

  // 2x2
  const [duoName, setDuoName] = useState('');
  const [member1Name, setMember1Name] = useState('');
  const [member1Level, setMember1Level] = useState(DEFAULT_LEVEL);
  const [member1Village, setMember1Village] = useState('Folha');
  const [member1Primary, setMember1Primary] = useState(MASTERIES[0]);
  const [member1Secondary, setMember1Secondary] = useState('');
  const [member2Name, setMember2Name] = useState('');
  const [member2Level, setMember2Level] = useState(DEFAULT_LEVEL);
  const [member2Village, setMember2Village] = useState('Folha');
  const [member2Primary, setMember2Primary] = useState(MASTERIES[0]);
  const [member2Secondary, setMember2Secondary] = useState('');

  const [participants, setParticipants] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [tournamentFinished, setTournamentFinished] = useState(false);
  const [champion, setChampion] = useState(null);
  const [eliminated, setEliminated] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const load = (key) => localStorage.getItem(`tournament_${key}`);
    const p = load('participants');
    const ts = load('teamSize');
    const t = load('teams');
    const m = load('matches');
    const r = load('currentRound');
    const st = load('started');
    const f = load('finished');
    const c = load('champion');
    const e = load('eliminated');

    if (p) setParticipants(JSON.parse(p));
    if (ts) setTeamSize(Number(ts));
    if (t) setTeams(JSON.parse(t));
    if (m) setMatches(JSON.parse(m));
    if (r) setCurrentRound(Number(r));
    if (st) setTournamentStarted(JSON.parse(st));
    if (f) setTournamentFinished(JSON.parse(f));
    if (c) setChampion(JSON.parse(c));
    if (e) setEliminated(JSON.parse(e));
  }, []);

  // Save to localStorage
  useEffect(() => {
    const save = (key, value) => localStorage.setItem(`tournament_${key}`, JSON.stringify(value));
    save('participants', participants);
    save('teamSize', teamSize);
    save('teams', teams);
    save('matches', matches);
    save('currentRound', currentRound);
    save('started', tournamentStarted);
    save('finished', tournamentFinished);
    save('champion', champion);
    save('eliminated', eliminated);
  }, [participants, teamSize, teams, matches, currentRound, tournamentStarted, tournamentFinished, champion, eliminated]);

  const resetTournament = () => {
    setTeams([]);
    setMatches([]);
    setCurrentRound(0);
    setTournamentStarted(false);
    setTournamentFinished(false);
    setChampion(null);
    setEliminated([]);
  };

  const handleTeamSizeChange = (newSize) => {
    if (participants.length > 0) {
      if (window.confirm(`Mudar para ${newSize === 1 ? '1x1' : '2x2'} limpará a lista. Continuar?`)) {
        setParticipants([]);
        resetTournament();
        setTeamSize(newSize);
      }
    } else {
      setTeamSize(newSize);
    }
  };

  // Adicionar individual
  const handleAddIndividual = () => {
    if (!name.trim()) return alert('Digite um nome!');
    if (level < 1 || level > MAX_LEVEL) return alert(`Level deve ser entre 1 e ${MAX_LEVEL}`);
    const newParticipant = {
      id: Date.now().toString(),
      name: name.trim(),
      level: Number(level),
      village,
      primaryMastery,
      secondaryMastery: secondaryMastery || undefined,
    };
    setParticipants([...participants, newParticipant]);
    setName('');
    setLevel(DEFAULT_LEVEL);
    setPrimaryMastery(MASTERIES[0]);
    setSecondaryMastery('');
  };

  // Adicionar dupla
  const handleAddDuo = () => {
    if (!duoName.trim()) return alert('Digite um nome para a dupla!');
    if (!member1Name.trim() || !member2Name.trim()) return alert('Preencha os nomes dos dois membros!');
    if (member1Level < 1 || member1Level > MAX_LEVEL || member2Level < 1 || member2Level > MAX_LEVEL) {
      return alert(`Levels devem estar entre 1 e ${MAX_LEVEL}`);
    }
    const newDuo = {
      id: Date.now().toString(),
      name: duoName.trim(),
      members: [
        {
          name: member1Name.trim(),
          level: Number(member1Level),
          village: member1Village,
          primaryMastery: member1Primary,
          secondaryMastery: member1Secondary || undefined,
        },
        {
          name: member2Name.trim(),
          level: Number(member2Level),
          village: member2Village,
          primaryMastery: member2Primary,
          secondaryMastery: member2Secondary || undefined,
        },
      ],
    };
    setParticipants([...participants, newDuo]);
    // Reset campos dupla
    setDuoName('');
    setMember1Name('');
    setMember1Level(DEFAULT_LEVEL);
    setMember1Primary(MASTERIES[0]);
    setMember1Secondary('');
    setMember2Name('');
    setMember2Level(DEFAULT_LEVEL);
    setMember2Primary(MASTERIES[0]);
    setMember2Secondary('');
  };

  const handleRemoveParticipant = (id) => {
    if (window.confirm('Remover este participante?')) {
      setParticipants(participants.filter(p => p.id !== id));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Limpar toda a lista?')) {
      setParticipants([]);
      resetTournament();
    }
  };

  // Gerar chaveamento
  const handleGenerateBracket = () => {
    const total = participants.length;
    if (total < 2) return alert('Adicione pelo menos 2 participantes.');
    if (!isPowerOfTwo(total)) {
      const nextPower = Math.pow(2, Math.ceil(Math.log2(total)));
      const prevPower = Math.pow(2, Math.floor(Math.log2(total)));
      return alert(
        `❌ O número de ${teamSize === 1 ? 'jogadores' : 'duplas'} (${total}) não é potência de 2.\n\n` +
        `Para um chaveamento equilibrado, o total deve ser 2, 4, 8, 16, 32...\n\n` +
        `💡 Sugestões:\n` +
        `• Adicione ${nextPower - total} participante(s) (total ${nextPower})\n` +
        `• Remova ${total - prevPower} participante(s) (total ${prevPower})`
      );
    }

    const newTeams = createTeams(participants, teamSize);
    newTeams.sort((a, b) => b.avgLevel - a.avgLevel);

    // Snake seeding
    const seeded = [];
    let left = 0, right = newTeams.length - 1;
    while (left <= right) {
      if (left === right) seeded.push(newTeams[left]);
      else {
        seeded.push(newTeams[left]);
        seeded.push(newTeams[right]);
      }
      left++;
      right--;
    }

    const newMatches = createFirstRound(seeded);
    setTeams(seeded);
    setMatches(newMatches);
    setCurrentRound(1);
    setTournamentStarted(true);
    setTournamentFinished(false);
    setChampion(null);
    setEliminated([]);
  };

  // Declarar vencedor
  const handleSetWinner = (matchId, winnerTeamId) => {
    setMatches(prev => {
      const updated = prev.map(m =>
        m.id === matchId ? { ...m, winnerId: winnerTeamId, finished: true } : m
      );

      const currentRoundMatches = updated.filter(m => m.round === currentRound);
      const allFinished = currentRoundMatches.every(m => m.finished);

      if (!allFinished) return updated;

      // Eliminados
      const losers = currentRoundMatches
        .filter(m => m.finished)
        .map(m => {
          const loserId = m.team1Id === m.winnerId ? m.team2Id : m.team1Id;
          return loserId ? teams.find(t => t.id === loserId) : null;
        })
        .filter(Boolean);
      setEliminated(prev => [...prev, ...losers]);

      if (currentRoundMatches.length === 1) {
        const champ = teams.find(t => t.id === currentRoundMatches[0].winnerId);
        setTournamentFinished(true);
        setChampion(champ);
        return updated;
      }

      const { matches: nextMatches, finished, champion: champ } = advanceRound(updated, teams);
      if (finished) {
        setTournamentFinished(true);
        setChampion(champ);
        return updated;
      } else {
        setCurrentRound(currentRound + 1);
        return [...updated, ...nextMatches];
      }
    });
  };

  const getTeam = (teamId) => teams.find(t => t.id === teamId);

  // Função para exibir maestrias formatadas
  const formatMasteries = (member) => {
    const parts = [member.primaryMastery];
    if (member.secondaryMastery) parts.push(member.secondaryMastery);
    return parts.join('/');
  };

  // Renderizar partida
  const renderMatch = (match) => {
    const team1 = match.team1Id ? getTeam(match.team1Id) : null;
    const team2 = match.team2Id ? getTeam(match.team2Id) : null;
    const isFinished = match.finished;
    const winnerId = match.winnerId;

    if (!team1 || !team2) return null;

    const renderTeam = (team) => {
      if (teamSize === 1) {
        const m = team.members[0];
        return (
          <div>
            <span>{m.name}</span>
            <span className="level-badge"> Lv.{m.level}</span>
            <span className="mastery-badge"> {formatMasteries(m)}</span>
            <VillageTag>{m.village}</VillageTag>
          </div>
        );
      } else {
        // Dupla
        return (
          <div>
            {team.members.map((m, idx) => (
              <div key={idx}>
                <span>{m.name}</span>
                <span className="level-badge"> Lv.{m.level}</span>
                <span className="mastery-badge"> {formatMasteries(m)}</span>
                <VillageTag>{m.village}</VillageTag>
              </div>
            ))}
          </div>
        );
      }
    };

    return (
      <MatchCard key={match.id} finished={isFinished}>
        <TeamRow winner={winnerId === team1.id}>
          <div className="team-name">
            {teamSize === 1 ? team1.members[0].name : team1.members.map(m => m.name).join(' & ')}
          </div>
          <div>{renderTeam(team1)}</div>
        </TeamRow>
        <Versus>VS</Versus>
        <TeamRow winner={winnerId === team2.id}>
          <div className="team-name">
            {teamSize === 1 ? team2.members[0].name : team2.members.map(m => m.name).join(' & ')}
          </div>
          <div>{renderTeam(team2)}</div>
        </TeamRow>
        {!isFinished && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <WinnerButton onClick={() => handleSetWinner(match.id, team1.id)}>
              🏆 {teamSize === 1 ? team1.members[0].name : team1.members.map(m => m.name).join(' & ')} vence
            </WinnerButton>
            <WinnerButton onClick={() => handleSetWinner(match.id, team2.id)}>
              🏆 {teamSize === 1 ? team2.members[0].name : team2.members.map(m => m.name).join(' & ')} vence
            </WinnerButton>
          </div>
        )}
        {isFinished && winnerId && (
          <div style={{ color: '#FFD700', textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            ✅ Vencedor: {getTeam(winnerId)?.members.map(m => m.name).join(' & ')}
          </div>
        )}
      </MatchCard>
    );
  };

  const matchesByRound = useMemo(() => {
    const groups = {};
    matches.forEach(m => {
      if (!groups[m.round]) groups[m.round] = [];
      groups[m.round].push(m);
    });
    return groups;
  }, [matches]);

  // Estatísticas
  const renderStats = () => {
    if (!tournamentFinished || !champion) return null;

    const runnerUp = eliminated.length > 0 ? eliminated[eliminated.length - 1] : null;
    const semiFinalists = eliminated.length >= 3 ? eliminated.slice(-3, -1) : [];

    const renderTeamInfo = (team) => {
      if (!team) return '—';
      if (teamSize === 1) {
        const m = team.members[0];
        return `${m.name} (Lv.${m.level}, ${formatMasteries(m)}, ${m.village})`;
      } else {
        return team.members.map(m => 
          `${m.name} (Lv.${m.level}, ${formatMasteries(m)}, ${m.village})`
        ).join(' / ');
      }
    };

    return (
      <StatsContainer>
        <StatsTitle>🏆 Torneio Finalizado!</StatsTitle>
        <StatsGrid>
          <StatsCard>
            <h3>🥇 Campeão</h3>
            <p>{renderTeamInfo(champion)}</p>
          </StatsCard>
          <StatsCard>
            <h3>🥈 Vice-campeão</h3>
            <p>{renderTeamInfo(runnerUp)}</p>
          </StatsCard>
          <StatsCard>
            <h3>🥉 Semifinalistas</h3>
            <p>
              {semiFinalists.length > 0 
                ? semiFinalists.map(t => renderTeamInfo(t)).join(', ')
                : '—'}
            </p>
          </StatsCard>
        </StatsGrid>
        <Button variant="gold" onClick={resetTournament} style={{ marginTop: '2rem' }}>
          🔄 Novo Torneio
        </Button>
      </StatsContainer>
    );
  };

  // Render
  return (
    <PageContainer>
      <Card>
        <Title>⚔️ <span>Chaveamento</span> de Torneios</Title>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <label style={{ color: '#c0c0c0', fontSize: '0.9rem' }}>Formato:</label>
          <Select value={teamSize} onChange={(e) => handleTeamSizeChange(Number(e.target.value))}>
            <option value={1}>1x1 (Individual)</option>
            <option value={2}>2x2 (Duplas)</option>
          </Select>
          <span style={{ color: '#666', fontSize: '0.8rem' }}>
            ({participants.length} {teamSize === 1 ? 'jogadores' : 'duplas'})
          </span>
          {tournamentStarted && (
            <Button variant="gold" onClick={resetTournament} style={{ marginLeft: 'auto' }}>
              🔄 Reiniciar
            </Button>
          )}
        </div>

        {!tournamentStarted && (
          <>
            {teamSize === 1 ? (
              // Formulário 1x1
              <InputGroup>
                <Input
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddIndividual()}
                />
                <Input
                  type="number"
                  placeholder="Level"
                  value={level}
                  onChange={(e) => setLevel(Math.min(Number(e.target.value), MAX_LEVEL))}
                  style={{ maxWidth: '80px' }}
                  min={1}
                  max={MAX_LEVEL}
                />
                <Select value={village} onChange={(e) => setVillage(e.target.value)} style={{ maxWidth: '120px' }}>
                  {VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
                </Select>
                <Select value={primaryMastery} onChange={(e) => setPrimaryMastery(e.target.value)} style={{ maxWidth: '130px' }}>
                  {MASTERIES.map(m => <option key={m} value={m}>{m}</option>)}
                </Select>
                <Select value={secondaryMastery} onChange={(e) => setSecondaryMastery(e.target.value)} style={{ maxWidth: '130px' }}>
                  <option value="">Nenhuma</option>
                  {MASTERIES.map(m => <option key={m} value={m}>{m}</option>)}
                </Select>
                <Button onClick={handleAddIndividual}>Adicionar</Button>
              </InputGroup>
            ) : (
              // Formulário 2x2 – layout em duas linhas
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Nome da Dupla em destaque */}
                <Input
                  placeholder="Nome da Dupla (ex: Dupla Explosiva)"
                  value={duoName}
                  onChange={(e) => setDuoName(e.target.value)}
                  style={{ maxWidth: '300px' }}
                />

                {/* Linha 1: Membro 1 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  <Input
                    placeholder="Membro 1 - Nome"
                    value={member1Name}
                    onChange={(e) => setMember1Name(e.target.value)}
                    style={{ flex: '1 1 120px', minWidth: '100px' }}
                  />
                  <Input
                    type="number"
                    placeholder="Level"
                    value={member1Level}
                    onChange={(e) => setMember1Level(Math.min(Number(e.target.value), MAX_LEVEL))}
                    style={{ width: '70px' }}
                    min={1}
                    max={MAX_LEVEL}
                  />
                  <Select value={member1Village} onChange={(e) => setMember1Village(e.target.value)} style={{ width: '100px' }}>
                    {VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
                  </Select>
                  <Select value={member1Primary} onChange={(e) => setMember1Primary(e.target.value)} style={{ width: '130px' }}>
                    {MASTERIES.map(m => <option key={m} value={m}>{m}</option>)}
                  </Select>
                  <Select value={member1Secondary} onChange={(e) => setMember1Secondary(e.target.value)} style={{ width: '130px' }}>
                    <option value="">Nenhuma</option>
                    {MASTERIES.map(m => <option key={m} value={m}>{m}</option>)}
                  </Select>
                </div>

                {/* Linha 2: Membro 2 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  <Input
                    placeholder="Membro 2 - Nome"
                    value={member2Name}
                    onChange={(e) => setMember2Name(e.target.value)}
                    style={{ flex: '1 1 120px', minWidth: '100px' }}
                  />
                  <Input
                    type="number"
                    placeholder="Level"
                    value={member2Level}
                    onChange={(e) => setMember2Level(Math.min(Number(e.target.value), MAX_LEVEL))}
                    style={{ width: '70px' }}
                    min={1}
                    max={MAX_LEVEL}
                  />
                  <Select value={member2Village} onChange={(e) => setMember2Village(e.target.value)} style={{ width: '100px' }}>
                    {VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
                  </Select>
                  <Select value={member2Primary} onChange={(e) => setMember2Primary(e.target.value)} style={{ width: '130px' }}>
                    {MASTERIES.map(m => <option key={m} value={m}>{m}</option>)}
                  </Select>
                  <Select value={member2Secondary} onChange={(e) => setMember2Secondary(e.target.value)} style={{ width: '130px' }}>
                    <option value="">Nenhuma</option>
                    {MASTERIES.map(m => <option key={m} value={m}>{m}</option>)}
                  </Select>
                </div>

                {/* Botão abaixo das duas linhas */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5rem' }}>
                  <Button onClick={handleAddDuo}>Adicionar Dupla</Button>
                </div>
              </div>
            )}

            {participants.length > 0 && (
              <>
                <ParticipantList>
                  {participants.map((p) => (
                    <ParticipantItem key={p.id}>
                      <div>
                        <span className="name">
                          {teamSize === 1 ? p.name : p.name}
                        </span>
                        {teamSize === 1 ? (
                          <>
                            <span className="level">Lv. {p.level}</span>
                            <span className="village">{p.village}</span>
                            <span className="mastery-tag">{formatMasteries(p)}</span>
                          </>
                        ) : (
                          <>
                            {p.members.map((m, idx) => (
                              <span key={idx} className="member-tag">
                                {m.name} Lv.{m.level} {formatMasteries(m)} {m.village}
                              </span>
                            ))}
                          </>
                        )}
                      </div>
                      <RemoveButton onClick={() => handleRemoveParticipant(p.id)}>✕</RemoveButton>
                    </ParticipantItem>
                  ))}
                </ParticipantList>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>
                    {participants.length} {teamSize === 1 ? 'jogador(es)' : 'dupla(s)'}
                  </span>
                  <Button onClick={handleClearAll} style={{ background: '#ff4444', color: '#fff' }}>
                    Limpar Tudo
                  </Button>
                </div>
              </>
            )}

            {participants.length > 0 && !isPowerOfTwo(participants.length) && (
              <p style={{ color: '#ffaa00', textAlign: 'center', marginTop: '1rem' }}>
                ⚠️ Número de {teamSize === 1 ? 'jogadores' : 'duplas'} ({participants.length}) não é potência de 2.
                Use 2, 4, 8, 16, 32...
              </p>
            )}

            {participants.length >= 2 && isPowerOfTwo(participants.length) && (
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <Button variant="gold" onClick={handleGenerateBracket} style={{ fontSize: '1.2rem', padding: '0.8rem 2rem' }}>
                  🏆 Gerar Chaveamento
                </Button>
              </div>
            )}
          </>
        )}
      </Card>

      {tournamentStarted && (
        <Card>
          {tournamentFinished ? (
            renderStats()
          ) : (
            <>
              <Title>🗂️ <span>Chave</span> do Torneio</Title>
              <BracketContainer>
                {Object.keys(matchesByRound)
                  .sort((a, b) => a - b)
                  .map(round => (
                    <div key={round}>
                      <RoundTitle>Rodada {round}</RoundTitle>
                      <MatchesGrid>
                        {matchesByRound[round].map(m => renderMatch(m))}
                      </MatchesGrid>
                    </div>
                  ))}
              </BracketContainer>
            </>
          )}
        </Card>
      )}
    </PageContainer>
  );
};

export default Tournament;