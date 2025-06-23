import type { ChecklistData } from 'types/DataType';

import React from 'react';

import View from './LinkChecklist.view';
import useLinkChecklist from './useLinkChecklist';

interface Props {
  checklistIds: string[] | undefined;
  getChecklist?: (value: { checklist: ChecklistData }) => void;
  onClose: () => void;
  update?: (value: ChecklistData) => void;
}
const LinkChecklist = ({
  checklistIds,
  getChecklist,
  onClose,
  update,
}: Props): JSX.Element => {
  const {
    activeChecklistSort,
    checklistFilter,
    data,
    loading,
    onSelect,
    onSubmit,
    saving,
  } = useLinkChecklist({
    checklistIds,
    getChecklist,
    onClose,
    update,
  });

  return (
    <View
      activeChecklistSort={activeChecklistSort}
      checklistFilter={checklistFilter}
      data={data}
      loading={loading}
      onClose={onClose}
      onSelect={onSelect}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default LinkChecklist;
