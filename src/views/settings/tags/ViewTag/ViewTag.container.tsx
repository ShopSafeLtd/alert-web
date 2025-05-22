import React from 'react';

import View from './ViewTag.view';
import useViewTag from './useViewTag';

const AddCrimeType = (): JSX.Element => {
  const {
    addQuestion,
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
    saveIncidentForm,
    saveQOrder,
    saving,
    selectedQuestion,
    setDraftState,
    setEditIncidentType,
    setIncidentFormLayout,
    setIncidentFormLayoutChanged,
    setParentTag,
    setQuestionLayoutChanged,
    setQuestionsLayout,
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
      saveIncidentForm={saveIncidentForm}
      saveQOrder={saveQOrder}
      saving={saving}
      selectedQuestion={selectedQuestion}
      setDraftState={setDraftState}
      setEditIncidentType={setEditIncidentType}
      setIncidentFormLayout={setIncidentFormLayout}
      setIncidentFormLayoutChanged={setIncidentFormLayoutChanged}
      setParentTag={setParentTag}
      setQuestionLayoutChanged={setQuestionLayoutChanged}
      setQuestionsLayout={setQuestionsLayout}
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
