import React from 'react';
import type { FormData } from './createEditStatement.view';
import CreateEditStatementView from './createEditStatement.view';
import useCreateEditStatement from './useCreateEditStatement';

interface CreateEditStatementContainerProps {
  initData: FormData | undefined;
  onClose: () => void;
  id?: string;
}

const CreateEditStatementContainer = ({
  initData,
  onClose,
  id,
}: CreateEditStatementContainerProps) => {
  const { data, saving, form, onSubmit, schemes } = useCreateEditStatement({
    initData,
    onClose,
    id,
  });
  return (
    <CreateEditStatementView
      data={data}
      saving={saving}
      form={form}
      onSubmit={onSubmit}
      schemes={schemes}
      onClose={onClose}
    />
  );
};

export default CreateEditStatementContainer;
