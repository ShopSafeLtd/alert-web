import React from 'react';

import type { ActiveChecklistSection } from '../active-checklist/useActiveChecklist';

import CompletedChecklistView from './CompletedChecklist.view';

interface Data {
  additionalInfo: string;
  checklistSections: ActiveChecklistSection[];
  completedAt: string;
  completedByUser: string;
  signature: string;
  title: string;
  logo?: string;
  storeName?: string;
}

const generateMg11 = () => {
  const rawdata = localStorage.getItem('data') || '{}';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: Data = JSON.parse(rawdata);

  return (
    <CompletedChecklistView
      additionalInfo={data.additionalInfo}
      checklistSections={data.checklistSections}
      completedAt={data.completedAt}
      completedByUser={data.completedByUser}
      generating
      signature={data.signature}
      theme="light"
      title={data.title}
      logo={data.logo}
      storeName={data.storeName}
    />
  );
};

export default generateMg11;
