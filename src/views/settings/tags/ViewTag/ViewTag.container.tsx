import React from 'react';

import View from './ViewTag.view';
import useViewTag from './useViewTag';

const AddCrimeType = (): JSX.Element => {
  const {
    addQuestion,
    availableBusinessGroups,
    availableRoles,
    conditionsModalOpen,
    currentModuleConditions,
    data,
    deleteConfirm,
    deleteQuestion,
    draftState,
    editIncidentType,
    incidentFormFields,
    incidentFormLayout,
    incidentFormLayoutChanged,
    involvedMode,
    loading,
    parentTag,
    questionLayoutChanged,
    questionsLayout,
    saveAllChanges,
    saveModuleConditions,
    saving,
    selectedModule,
    selectedQuestion,
    setConditionsModalOpen,
    setDraftState,
    setEditIncidentType,
    setIncidentFormLayout,
    setIncidentFormLayoutChanged,
    setParentTag,
    setQuestionLayoutChanged,
    setQuestionsLayout,
    setSelectedModule,
    setSelectedQuestion,
    showDraft,
    toggleAddQuestion,
    toggleField,
    toggleInvolvedMode,
    updateQuestionOnTag,
    updateTagParent,
  } = useViewTag();

  return (
    <View
      addQuestion={addQuestion}
      availableBusinessGroups={availableBusinessGroups}
      availableRoles={availableRoles}
      conditionsModalOpen={conditionsModalOpen}
      currentModuleConditions={currentModuleConditions}
      data={data}
      deleteConfirm={deleteConfirm}
      deleteQuestion={deleteQuestion}
      draftState={draftState}
      editIncidentType={editIncidentType}
      incidentFormFields={incidentFormFields}
      incidentFormLayout={incidentFormLayout}
      incidentFormLayoutChanged={incidentFormLayoutChanged}
      involvedMode={involvedMode}
      loading={loading}
      parentTag={parentTag}
      questionLayoutChanged={questionLayoutChanged}
      questionsLayout={questionsLayout}
      saveAllChanges={saveAllChanges}
      saveModuleConditions={saveModuleConditions}
      saving={saving}
      selectedModule={selectedModule}
      selectedQuestion={selectedQuestion}
      setConditionsModalOpen={setConditionsModalOpen}
      setDraftState={setDraftState}
      setEditIncidentType={setEditIncidentType}
      setIncidentFormLayout={setIncidentFormLayout}
      setIncidentFormLayoutChanged={setIncidentFormLayoutChanged}
      setParentTag={setParentTag}
      setQuestionLayoutChanged={setQuestionLayoutChanged}
      setQuestionsLayout={setQuestionsLayout}
      setSelectedModule={setSelectedModule}
      setSelectedQuestion={setSelectedQuestion}
      showDraft={showDraft}
      toggleAddQuestion={toggleAddQuestion}
      toggleField={toggleField}
      toggleInvolvedMode={toggleInvolvedMode}
      updateQuestionOnTag={updateQuestionOnTag}
      updateTagParent={updateTagParent}
    />
  );
};

export default AddCrimeType;
