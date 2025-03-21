import React from 'react';

import View from './CreateChecklist.view';
import { useCreateChecklist } from './useCreateChecklist';

const CreateChecklistContainer = () => {
  const {
    brands,

    form,
    handleAddQuestion,
    handleAddSection,
    handleAddSubsection,
    handleRemoveQuestion,
    handleRemoveSection,
    handleRemoveSubsection,
    handleSectionChange,
    loading,
    onFinish,
    users,
  } = useCreateChecklist();

  return (
    <View
      brands={brands}
      form={form}
      handleAddQuestion={handleAddQuestion}
      handleAddSection={handleAddSection}
      handleAddSubsection={handleAddSubsection}
      handleRemoveQuestion={handleRemoveQuestion}
      handleRemoveSection={handleRemoveSection}
      handleRemoveSubsection={handleRemoveSubsection}
      handleSectionChange={handleSectionChange}
      loading={loading}
      onFinish={onFinish}
      users={users}
    />
  );
};

export default CreateChecklistContainer;
