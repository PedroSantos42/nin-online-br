import React from 'react';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import styled from 'styled-components';

// Estilos básicos para o container
const Container = styled.div`
  padding: 2rem;
  background: #0B0E14;
  min-height: 100vh;
  color: #fff;
`;

const Title = styled.h1`
  color: #FFD700;
  text-align: center;
  margin-bottom: 2rem;
`;

// Dados estáticos de exemplo (formato esperado pela biblioteca)
const matchesExample = [
  {
    id: 1,
    nextMatchId: 5,
    tournamentRoundText: 'Quarter Final 1',
    startTime: '2024-01-01',
    state: 'PLAYED',
    participants: [
      {
        id: 'p1',
        name: 'Naruto',
        isWinner: true,
        status: 'PLAYED',
        resultText: 'WON'
      },
      {
        id: 'p2',
        name: 'Sasuke',
        isWinner: false,
        status: 'PLAYED',
        resultText: 'LOST'
      }
    ]
  },
  {
    id: 2,
    nextMatchId: 5,
    tournamentRoundText: 'Quarter Final 2',
    startTime: '2024-01-01',
    state: 'PLAYED',
    participants: [
      {
        id: 'p3',
        name: 'Sakura',
        isWinner: true,
        status: 'PLAYED',
        resultText: 'WON'
      },
      {
        id: 'p4',
        name: 'Kakashi',
        isWinner: false,
        status: 'PLAYED',
        resultText: 'LOST'
      }
    ]
  },
  {
    id: 3,
    nextMatchId: 6,
    tournamentRoundText: 'Quarter Final 3',
    startTime: '2024-01-01',
    state: 'PLAYED',
    participants: [
      {
        id: 'p5',
        name: 'Gaara',
        isWinner: true,
        status: 'PLAYED',
        resultText: 'WON'
      },
      {
        id: 'p6',
        name: 'Rock Lee',
        isWinner: false,
        status: 'PLAYED',
        resultText: 'LOST'
      }
    ]
  },
  {
    id: 4,
    nextMatchId: 6,
    tournamentRoundText: 'Quarter Final 4',
    startTime: '2024-01-01',
    state: 'PLAYED',
    participants: [
      {
        id: 'p7',
        name: 'Shikamaru',
        isWinner: true,
        status: 'PLAYED',
        resultText: 'WON'
      },
      {
        id: 'p8',
        name: 'Neji',
        isWinner: false,
        status: 'PLAYED',
        resultText: 'LOST'
      }
    ]
  },
  {
    id: 5,
    nextMatchId: 7,
    tournamentRoundText: 'Semi Final 1',
    startTime: '2024-01-01',
    state: 'PLAYED',
    participants: [
      {
        id: 'p1',
        name: 'Naruto',
        isWinner: true,
        status: 'PLAYED',
        resultText: 'WON'
      },
      {
        id: 'p3',
        name: 'Sakura',
        isWinner: false,
        status: 'PLAYED',
        resultText: 'LOST'
      }
    ]
  },
  {
    id: 6,
    nextMatchId: 7,
    tournamentRoundText: 'Semi Final 2',
    startTime: '2024-01-01',
    state: 'PLAYED',
    participants: [
      {
        id: 'p5',
        name: 'Gaara',
        isWinner: true,
        status: 'PLAYED',
        resultText: 'WON'
      },
      {
        id: 'p7',
        name: 'Shikamaru',
        isWinner: false,
        status: 'PLAYED',
        resultText: 'LOST'
      }
    ]
  },
  {
    id: 7,
    nextMatchId: null,
    tournamentRoundText: 'Final',
    startTime: '2024-01-01',
    state: 'PLAYED',
    participants: [
      {
        id: 'p1',
        name: 'Naruto',
        isWinner: true,
        status: 'PLAYED',
        resultText: 'WON'
      },
      {
        id: 'p5',
        name: 'Gaara',
        isWinner: false,
        status: 'PLAYED',
        resultText: 'LOST'
      }
    ]
  }
];

const BracketTest = () => {
  return (
    <Container>
      <Title>🏆 Teste de Bracket</Title>
      <SingleEliminationBracket
        matches={matchesExample}
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => (
          <SVGViewer width={900} height={600} {...props}>
            {children}
          </SVGViewer>
        )}
      />
    </Container>
  );
};

export default BracketTest;