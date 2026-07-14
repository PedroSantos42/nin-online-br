import React from 'react';
import CardIndex from '../components/CardIndex';
import { wikiSubitems } from '../data/navigation';

const WikiIndex = () => {
  return <CardIndex title="📚 Wiki" items={wikiSubitems} />;
};

export default WikiIndex;