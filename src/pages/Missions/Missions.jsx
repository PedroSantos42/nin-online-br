import React, { useState } from 'react';
import {
  PageContainer,
  Overlay,
  Content,
  Title,
  TypeAccordion,
  TypeHeader,
  TypeDescription,
  TypeContent,
  MissionsGrid,
  MissionCard,
} from './Missions.styles';
import { missionTypes } from '../../data/missions';

const Missions = () => {
  const [expandedTypes, setExpandedTypes] = useState({});
  const [expandedMissions, setExpandedMissions] = useState({});

  const toggleType = (id) => {
    setExpandedTypes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMission = (id) => {
    setExpandedMissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PageContainer>
      <Overlay>
        <Content>
          <Title>
            <span>Missoes</span>
          </Title>

          {missionTypes.map((type) => {
            const isTypeExpanded = expandedTypes[type.id] || false;
            return (
              <TypeAccordion key={type.id}>
                <TypeHeader
                  expanded={isTypeExpanded}
                  onClick={() => toggleType(type.id)}
                >
                  <span className="type-label">{type.label}</span>
                  <span className="arrow">{isTypeExpanded ? '▲' : '▼'}</span>
                </TypeHeader>
                <TypeDescription>{type.description}</TypeDescription>
                <TypeContent expanded={isTypeExpanded}>
                  <MissionsGrid>
                    {type.missions.map((mission) => {
                      const isMissionExpanded = expandedMissions[mission.id] || false;
                      return (
                        <MissionCard
                          key={mission.id}
                          expanded={isMissionExpanded}
                          onClick={() => toggleMission(mission.id)}
                        >
                          <div className="mission-name">
                            {mission.name}
                            <span className="expand-icon">
                              {isMissionExpanded ? '▲' : '▼'}
                            </span>
                          </div>
                          <div className="mission-level">
                            Nivel: {mission.level}
                          </div>
                          <div className="mission-preview">
                            {mission.description.substring(0, 60)}...
                          </div>
                          <div className="mission-details">
                            <p>
                              <strong>Descricao:</strong> {mission.description}
                            </p>
                            <p>
                              <strong>Local:</strong> {mission.location}
                            </p>
                            <p>
                              <strong>Recompensas:</strong> {mission.rewards}
                            </p>
                            <p>
                              <strong>Dica:</strong> {mission.tips}
                            </p>
                          </div>
                        </MissionCard>
                      );
                    })}
                  </MissionsGrid>
                </TypeContent>
              </TypeAccordion>
            );
          })}
        </Content>
      </Overlay>
    </PageContainer>
  );
};

export default Missions;