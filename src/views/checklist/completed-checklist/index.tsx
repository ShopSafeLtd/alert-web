import React from 'react';
import CompletedChecklistView from './CompletedChecklist.view';
import type { ActiveChecklistSection } from '../active-checklist/useActiveChecklist';

interface Data {
  checklistSections: ActiveChecklistSection[];
  title: string;
  additionalInfo: string;
  signature: string;
  completedByUser: string;
  completedAt: string;
}

const generateMg11 = () => {
  const rawdata = localStorage.getItem('data') || '{}';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: Data = JSON.parse(rawdata);

  return (
    <CompletedChecklistView
      checklistSections={data.checklistSections}
      title={data.title}
      completedAt={data.completedAt}
      completedByUser={data.completedByUser}
      additionalInfo={data.additionalInfo}
      signature={data.signature}
      theme="light"
      generating
    />
  );
};

export default generateMg11;
