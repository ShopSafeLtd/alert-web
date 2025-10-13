import React from 'react';

import type { FormData } from './createEditStatement.view';

import CreateEditStatementView from './createEditStatement.view';
import useCreateEditStatement from './useCreateEditStatement';

interface CreateEditStatementContainerProps {
  id?: string;
  initData: FormData | undefined;
  onClose: () => void;
}

const CreateEditStatementContainer = ({
  id,
  initData,
  onClose,
}: CreateEditStatementContainerProps) => {
  const { data, form, onSubmit, saving, schemes } = useCreateEditStatement({
    id,
    initData,
    onClose,
  });
  return (
    <CreateEditStatementView
      data={data}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      schemes={schemes}
    />
  );
};

export default CreateEditStatementContainer;
