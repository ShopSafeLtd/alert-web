import React from 'react';

import View from './CopyOffender.view';
import useCopyOffender from './useCopyOffender';

interface Props {
  offenderId: string;
  onClose: () => void;
}

const CopyOffender = ({ offenderId, onClose }: Props): JSX.Element => {
  const {
    form,
    groups,
    groupsLoading,
    onSubmit,
    saving,
    selectSchemeId,
    setSelectSchemeId,
    userSchemes,
  } = useCopyOffender({
    offenderId,
    onClose,
  });

  return (
    <View
      form={form}
      groups={groups}
      groupsLoading={groupsLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving || false}
      selectSchemeId={selectSchemeId}
      setSelectSchemeId={setSelectSchemeId}
      userSchemes={userSchemes}
    />
  );
};

export default CopyOffender;
