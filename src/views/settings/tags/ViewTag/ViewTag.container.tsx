import React from 'react';

import View from './ViewTag.view';
import useViewTag from './useViewTag';

const AddCrimeType = (): JSX.Element => {
  const {
    addQuestion,
    data,
    deleteConfirm,
    deleteQuestion,
    editIncidentType,
    incidentFormFields,
    incidentFormLayout,
    incidentFormLayoutChanged,
    loading,
    parentTag,
    questionLayoutChanged,
    questionsLayout,
    saveIncidentForm,
    saveQOrder,
    saving,
    selectedQuestion,
    setEditIncidentType,
    setIncidentFormLayout,
    setIncidentFormLayoutChanged,
    setParentTag,
    setQuestionLayoutChanged,
    setQuestionsLayout,
    setSelectedQuestion,
    toggleAddQuestion,
    toggleField,
    updateQuestionOnTag,
    updateTagParent,
  } = useViewTag();

  return (
    <View
      addQuestion={addQuestion}
      data={data}
      deleteConfirm={deleteConfirm}
      deleteQuestion={deleteQuestion}
      editIncidentType={editIncidentType}
      incidentFormFields={incidentFormFields}
      incidentFormLayout={incidentFormLayout}
      incidentFormLayoutChanged={incidentFormLayoutChanged}
      loading={loading}
      parentTag={parentTag}
      questionLayoutChanged={questionLayoutChanged}
      questionsLayout={questionsLayout}
      saveIncidentForm={saveIncidentForm}
      saveQOrder={saveQOrder}
      saving={saving}
      selectedQuestion={selectedQuestion}
      setEditIncidentType={setEditIncidentType}
      setIncidentFormLayout={setIncidentFormLayout}
      setIncidentFormLayoutChanged={setIncidentFormLayoutChanged}
      setParentTag={setParentTag}
      setQuestionLayoutChanged={setQuestionLayoutChanged}
      setQuestionsLayout={setQuestionsLayout}
      setSelectedQuestion={setSelectedQuestion}
      toggleAddQuestion={toggleAddQuestion}
      toggleField={toggleField}
      updateQuestionOnTag={updateQuestionOnTag}
      updateTagParent={updateTagParent}
    />
  );
};

export default AddCrimeType;
