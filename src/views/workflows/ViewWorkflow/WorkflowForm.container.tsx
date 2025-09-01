import React from 'react';

import View from './Workflow.view';
import useWorkflowForm from './useWorkflowForm';

const WorkflowFormContainer = () => {
  const {
    activityTemplateForm,
    availableQuestions,
    brandsSelected,
    checklistOption,
    countriesSelected,
    createNewQuestion,
    descriptionCheck,
    divisionsSelected,
    editId,
    form,
    goods,
    goodsTypeCheck,
    groups,
    groupsSelected,
    incidentTimeCountCheck,
    lessThanSelected,
    loading,
    lossValueSelected,
    modelSelected,
    newQuestion,
    onClose,
    onFinish,
    prefix,
    prioritySelected,
    questionGroups,
    questions,
    questionsSelected,
    saving,
    schemeId,
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
    typeWatch,
    updateIncidentCheck,
    updateTemplates,
    valueSelected,
    workflowTypeWatch,
    brandsLoading,
    countries,
    divisions,
    divisionsLoading,
    brands,
  } = useWorkflowForm();

  return (
    <View
      brands={brands}
      brandsLoading={brandsLoading}
      countries={countries}
      divisions={divisions}
      divisionsLoading={divisionsLoading}
      activityTemplateForm={activityTemplateForm}
      availableQuestions={availableQuestions}
      brandsSelected={brandsSelected}
      checklistOption={checklistOption}
      countriesSelected={countriesSelected}
      createNewQuestion={createNewQuestion}
      descriptionCheck={descriptionCheck}
      divisionsSelected={divisionsSelected}
      editId={editId}
      form={form}
      goods={goods}
      goodsTypeCheck={goodsTypeCheck}
      groups={groups}
      groupsSelected={groupsSelected}
      incidentTimeCountCheck={incidentTimeCountCheck}
      lessThanSelected={lessThanSelected}
      loading={loading}
      lossValueSelected={lossValueSelected}
      modelSelected={modelSelected}
      newQuestion={newQuestion}
      onClose={onClose}
      onFinish={onFinish}
      prefix={prefix}
      prioritySelected={prioritySelected}
      questionGroups={questionGroups}
      questions={questions}
      questionsSelected={questionsSelected}
      saving={saving}
      schemeId={schemeId}
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
      typeWatch={typeWatch}
      updateIncidentCheck={updateIncidentCheck}
      updateTemplates={updateTemplates}
      valueSelected={valueSelected}
      workflowTypeWatch={workflowTypeWatch}
    />
  );
};
export default WorkflowFormContainer;
