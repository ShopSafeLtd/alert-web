import React from 'react';
import View from './CopyOffender.view';
import useCopyOffender from './useCopyOffender';

interface Props {
  offenderId: string;
  onClose: () => void;
}

const CopyOffender = ({ onClose, offenderId }: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    userSchemes,
    groupsLoading,
    groups,
    selectSchemeId,
    setSelectSchemeId,
    form,
  } = useCopyOffender({
    onClose,
    offenderId,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving || false}
      userSchemes={userSchemes}
      groupsLoading={groupsLoading}
      groups={groups}
      selectSchemeId={selectSchemeId}
      setSelectSchemeId={setSelectSchemeId}
      form={form}
    />
  );
};

export default CopyOffender;
