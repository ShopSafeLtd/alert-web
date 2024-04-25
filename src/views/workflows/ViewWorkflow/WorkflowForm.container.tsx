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
    modelSelected,
    lessThanSelected,
    goodsTypeCheck,
    goods,
    descriptionCheck,
    incidentTimeCountCheck,
    taskOutcome,
    sendEmailCheck,
    sendNotificationCheck,
  } = useWorkflowForm();

  return (
    <View
      sendNotificationCheck={sendNotificationCheck}
      sendEmailCheck={sendEmailCheck}
      taskOutcome={taskOutcome}
      incidentTimeCountCheck={incidentTimeCountCheck}
      descriptionCheck={descriptionCheck}
      goodsTypeCheck={goodsTypeCheck}
      goods={goods}
      lessThanSelected={lessThanSelected}
      modelSelected={modelSelected}
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
