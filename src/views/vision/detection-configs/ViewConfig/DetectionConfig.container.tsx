import React from 'react';

import View from './DetectionConfigView';
import useDetectionConfigForm from './useDetectionConfigForm';

const DetectionConfigContainer = () => {
  const {
    activityTemplateForm,
    availableQuestions,
    createNewQuestion,
    editId,
    form,
    loading,
    newQuestion,
    onClose,
    onFinish,
    questionGroups,
    saving,
    schemeId,
    selectedQuestions,
    setActivityTemplateForm,
    setAvailableQuestions,
    setNewQuestion,
    setSelectedActivity,
    setSelectedQuestions,
    taskQuestions,
    updateTemplates,
  } = useDetectionConfigForm();

  return (
    <View
      activityTemplateForm={activityTemplateForm}
      availableQuestions={availableQuestions}
      createNewQuestion={createNewQuestion}
      editId={editId}
      form={form}
      loading={loading}
      newQuestion={newQuestion}
      onClose={onClose}
      onFinish={onFinish}
      questionGroups={questionGroups}
      saving={saving}
      schemeId={schemeId}
      selectedQuestions={selectedQuestions}
      setActivityTemplateForm={setActivityTemplateForm}
      setAvailableQuestions={setAvailableQuestions}
      setNewQuestion={setNewQuestion}
      setSelectedActivity={setSelectedActivity}
      setSelectedQuestions={setSelectedQuestions}
      taskQuestions={taskQuestions}
      updateTemplates={updateTemplates}
    />
  );
};
export default DetectionConfigContainer;
