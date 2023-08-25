import React from 'react';
import View from './Workflow.view';
import useWorkflowForm from './useWorkflowForm';

const WorkflowFormContainer = () => {
  const {
    onFinish,
    form,
    tagsSelected,
    questionGroups,
    taskQuestions,
    questionsSelected,
    questions,
    setSelectedActivity,
    tags,
    valueSelected,
    users,
    setSelectedQuestions,
    selectedQuestions,
    availableQuestions,
    setAvailableQuestions,
    setActivityTemplateForm,
    activityTemplateForm,
    updateTemplates,
    onClose,
    groups,
    newQuestion,
    createNewQuestion,
    loading,
    setNewQuestion,
    saving,
  } = useWorkflowForm();

  return (
    <View
      setNewQuestion={setNewQuestion}
      loading={loading}
      newQuestion={newQuestion}
      createNewQuestion={createNewQuestion}
      groups={groups}
      onFinish={onFinish}
      form={form}
      tagsSelected={tagsSelected}
      questionGroups={questionGroups}
      taskQuestions={taskQuestions}
      questionsSelected={questionsSelected}
      questions={questions}
      setSelectedActivity={setSelectedActivity}
      tags={tags}
      valueSelected={valueSelected}
      users={users}
      setSelectedQuestions={setSelectedQuestions}
      selectedQuestions={selectedQuestions}
      availableQuestions={availableQuestions}
      setAvailableQuestions={setAvailableQuestions}
      setActivityTemplateForm={setActivityTemplateForm}
      activityTemplateForm={activityTemplateForm}
      updateTemplates={updateTemplates}
      onClose={onClose}
      saving={saving}
    />
  );
};
export default WorkflowFormContainer;
