import React from 'react';
import CardIndex from '../components/CardIndex';
import { organizationsSubitems } from '../data/navigation';

const OrganizationsIndex = () => {
  return <CardIndex title="🏛️ Organizacoes" items={organizationsSubitems} />;
};

export default OrganizationsIndex;