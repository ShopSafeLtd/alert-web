import React from 'react';

import View from './Workflow.view';
import useWorkflowForm from './useWorkflowForm';

const WorkflowFormContainer = () => {
  const {
    activityTemplateForm,
    availableQuestions,
    createNewQuestion,
    descriptionCheck,
    form,
    goods,
    goodsTypeCheck,
    groups,
    incidentTimeCountCheck,
    lessThanSelected,
    loading,
    modelSelected,
    newQuestion,
    onClose,
    onFinish,
    questionGroups,
    questions,
    questionsSelected,
    saving,
    selectedQuestions,
    sendEmailCheck,
    sendNotificationCheck,
    setActivityTemplateForm,
    setAvailableQuestions,
    setNewQuestion,
    setSelectedActivity,
    setSelectedQuestions,
    tags,
    tagsSelected,
    taskOutcome,
    taskQuestions,
    updateTemplates,
    valueSelected,
  } = useWorkflowForm();

  return (
    <View
      activityTemplateForm={activityTemplateForm}
      availableQuestions={availableQuestions}
      createNewQuestion={createNewQuestion}
      descriptionCheck={descriptionCheck}
      form={form}
      goods={goods}
      goodsTypeCheck={goodsTypeCheck}
      groups={groups}
      incidentTimeCountCheck={incidentTimeCountCheck}
      lessThanSelected={lessThanSelected}
      loading={loading}
      modelSelected={modelSelected}
      newQuestion={newQuestion}
      onClose={onClose}
      onFinish={onFinish}
      questionGroups={questionGroups}
      questions={questions}
      questionsSelected={questionsSelected}
      saving={saving}
      selectedQuestions={selectedQuestions}
      sendEmailCheck={sendEmailCheck}
      sendNotificationCheck={sendNotificationCheck}
      setActivityTemplateForm={setActivityTemplateForm}
      setAvailableQuestions={setAvailableQuestions}
      setNewQuestion={setNewQuestion}
      setSelectedActivity={setSelectedActivity}
      setSelectedQuestions={setSelectedQuestions}
      tags={tags}
      tagsSelected={tagsSelected}
      taskOutcome={taskOutcome}
      taskQuestions={taskQuestions}
      updateTemplates={updateTemplates}
      valueSelected={valueSelected}
    />
  );
};
export default WorkflowFormContainer;
