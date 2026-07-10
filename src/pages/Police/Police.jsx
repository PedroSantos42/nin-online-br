import React, { useState } from 'react';
import {
  PageContainer,
  Overlay,
  Content,
  Title,
  Subtitle,
  Section,
  SectionHeader,
  SectionContent,
} from './Police.styles';

// ========== DADOS ATUALIZADOS ==========
const sectionsData = [
  {
    id: 'conduct',
    title: '📜 Código de Conduta e Deveres',
    content: (
      <>
        <p>
          O policial da Folha é um exemplo de conduta dentro e fora do campo de batalha. 
          Nossas ações refletem a força e a justiça da vila.
        </p>
        <ul>
          <li><strong>Evite Trash Talk:</strong> Nunca provoque ou desrespeite jogadores inimigos no chat. Mantenha a postura profissional.</li>
          <li><strong>Ajude Novatos:</strong> Auxilie jogadores de baixo nível a completar missões de escolta e se ambientar na vila.</li>
          <li><strong>Patrulha Preventiva:</strong> Faça rondas constantes nos arredores da vila para garantir a segurança de jogadores que não jogam PvP ou estão em missões.</li>
          <li><strong>Treinamentos:</strong> Participe dos treinos de combate 1x1 e em grupo para alinhar estilos de luta com outros policiais.</li>
          <li><strong>Postura em Raid:</strong> Em raids, agrupe times por maestria para potencializar a força do grupo (ex: esquadrão de terra com Earth Prison e suporte médico).</li>
        </ul>
      </>
    ),
  },
  {
    id: 'mechanics',
    title: '⛓️ Mecânicas – Algemas e Prisões',
    content: (
      <>
        <p>
          A <strong>vestimenta exclusiva da corporação</strong> não é apenas um adereço estético. Ela concede a habilidade de utilizar o item <strong>Algemas</strong>.
        </p>
        <ul>
          <li><strong>Requisito:</strong> O inimigo deve ter pelo menos <strong>5 crimes</strong> e estar <strong>nocauteado</strong> no chão.</li>
          <li><strong>Execução:</strong> Com a algema equipada, interaja com o corpo do inimigo para enviá-lo à <strong>Prisão Hyoketsu</strong>.</li>
          <li><strong>Consequências:</strong> O preso ficará na prisão por um bom tempo, cumprindo missões para reduzir seus crimes ou pagando fiança de <strong>2.000 ryo</strong>.</li>
          <li><strong>Importância:</strong> Prender inimigos durante raids reduz as defesas do time adversário e mantém a mensagem de que nenhum criminoso sairá impune.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'hunting',
    title: '🏹 Caçadas',
    content: (
      <>
        <p>
          As caçadas são realizadas em grupo, com planejamento e comunicação eficiente.
        </p>
        <ul>
          <li><strong>Reunião:</strong> Nos reunimos na vila, podendo convidar civis para participar, mas <strong>evite envolver novatos</strong> que possam comprometer a missão ou morrer e se frustrar.</li>
          <li><strong>Comunicação:</strong> Todos devem estar em <strong>call no Discord</strong> durante a caçada para facilitar a coordenação.</li>
          <li><strong>Planejamento:</strong> Defina rotas, pontos de emboscada e papéis de cada membro antes de sair.</li>
          <li><strong>Execução:</strong> Mantenha a formação, comunique movimentos e execute a prisão com precisão.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'raid',
    title: '⚡ RAID – Estratégias de Grupo',
    content: (
      <>
        <p>
          Durante raids, a organização é fundamental. Formamos <strong>esquadrões de até 4 ninjas</strong> com maestrias sinérgicas.
        </p>
        <ul>
          <li><strong>Formação de Times:</strong> Agrupe ninjas com maestrias semelhantes para potencializar o controle e o dano em grupo.</li>
          <li><strong>Exemplo:</strong> Esquadrão Terra com 4 ninjas (Terra/Fogo, Terra/Fogo, Terra/Médico, Terra/Água) – oferece controle com <strong>Earth Prison</strong> e suporte de cura.</li>
          <li><strong>Captura de Mapa:</strong> O jogo avisa no chat quando ninjas de uma vila tentam capturar um mapa. Isso revela nossa posição e alerta inimigos.</li>
          <li><strong>Armadilhas:</strong> Ao capturar um mapa, prepare armadilhas e emboscadas para receber os inimigos que vierem nos confrontar.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'map',
    title: '🗺️ Mapa e Navegação',
    content: (
      <>
        <p>
          O mapa do jogo é extenso, mas cada território possui um nome específico. Utilizamos <strong>siglas</strong> para comunicar localizações de inimigos rapidamente.
        </p>
        <ul>
          <li><strong>Nomes de Territórios:</strong> Cada região tem um nome oficial (ex: Floresta da Morte, Vale do Fim, Deserto dos Uivos, etc.).</li>
          <li><strong>Siglas:</strong> Use abreviações para comunicação rápida (ex: CF = Campo de Fuga, PD = Portão Desconhecido, etc.).</li>
          <li><strong>Teclado Numérico:</strong> Em mapas grandes, use os números do teclado (Numpad) como referência para indicar posições (ex: "Inimigo no 7" = canto superior esquerdo).</li>
          <li><strong>Mudança de Posição:</strong> Comunique sempre que o inimigo se mover (ex: "3 ninjas de Névoa na CF estão indo para o 5").</li>
        </ul>
      </>
    ),
  },
  {
    id: 'communication',
    title: '📡 Comunicação Tática',
    content: (
      <>
        <p>
          A comunicação clara e objetiva é o que diferencia uma operação bem-sucedida de um desastre.
        </p>
        <ul>
          <li><strong>Call no Discord:</strong> Todas as caçadas e raids devem ter todos os participantes em canal de voz.</li>
          <li><strong>Alertas Rápidos:</strong> Use mensagens curtas e diretas no chat para situações de emergência (ex: "Preciso de reforço no Portão Sul").</li>
          <li><strong>Confirmação:</strong> Sempre confirme o recebimento das ordens para evitar falhas de comunicação.</li>
          <li><strong>Siglas Padronizadas:</strong> Mantenha um glossário de siglas para que todos entendam as mensagens instantaneamente.</li>
        </ul>
      </>
    ),
  },
];

const Police = () => {
  const [expandedSections, setExpandedSections] = useState(new Set());

  const toggleSection = (id) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <PageContainer>
      <Overlay>
        <Content>
          <Title>
            🍃 <span>Forca Policial</span> da Folha
          </Title>
          <Subtitle>
            Manual de integração para novos policiais. Clique em um tópico para expandir
            e ver os detalhes completos sobre conduta, mecânicas, caçadas, raids, mapa e comunicação.
          </Subtitle>

          {sectionsData.map((section) => {
            const isExpanded = expandedSections.has(section.id);
            return (
              <Section key={section.id}>
                <SectionHeader
                  expanded={isExpanded}
                  onClick={() => toggleSection(section.id)}
                >
                  <span>{section.title}</span>
                  <span className="icon">{isExpanded ? '▲' : '▼'}</span>
                </SectionHeader>
                <SectionContent expanded={isExpanded}>
                  {section.content}
                </SectionContent>
              </Section>
            );
          })}
        </Content>
      </Overlay>
    </PageContainer>
  );
};

export default Police;