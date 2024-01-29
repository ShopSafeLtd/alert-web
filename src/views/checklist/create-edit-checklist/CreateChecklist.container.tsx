import View from './CreateChecklist.view';
import { useCreateChecklist } from './useCreateChecklist';

const CreateChecklistContainer = () => {
  const {
    form,
    onFinish,
    handleAddSection,
    handleRemoveSection,
    handleSectionChange,
    handleAddSubsection,
    handleRemoveSubsection,
    handleAddQuestion,
    handleRemoveQuestion,
    loading,
  } = useCreateChecklist();
  return (
    <View
      loading={loading}
      form={form}
      onFinish={onFinish}
      handleAddSection={handleAddSection}
      handleRemoveSection={handleRemoveSection}
      handleSectionChange={handleSectionChange}
      handleAddSubsection={handleAddSubsection}
      handleRemoveSubsection={handleRemoveSubsection}
      handleAddQuestion={handleAddQuestion}
      handleRemoveQuestion={handleRemoveQuestion}
    />
  );
};

export default CreateChecklistContainer;
