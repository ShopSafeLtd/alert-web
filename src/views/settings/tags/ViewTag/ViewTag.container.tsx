import React from 'react';
import View from './ViewTag.view';
import useViewTag from './useViewTag';

const AddCrimeType = (): JSX.Element => {
  const {
    toggleAddQuestion,
    addQuestion,
    data,
    setQuestionsLayout,
    questionsLayout,
    setQuestionLayoutChanged,
    saveQOrder,
    questionLayoutChanged,
    parentTag,
    setParentTag,
    updateTagParent,
    deleteQuestion,
    toggleField,
    setIncidentFormLayoutChanged,
    incidentFormFields,
    incidentFormLayout,
    setIncidentFormLayout,
    incidentFormLayoutChanged,
    saveIncidentForm,
    loading,
  } = useViewTag();

  return (
    <View
      loading={loading}
      incidentFormFields={incidentFormFields}
      setIncidentFormLayoutChanged={setIncidentFormLayoutChanged}
      toggleField={toggleField}
      incidentFormLayout={incidentFormLayout}
      setIncidentFormLayout={setIncidentFormLayout}
      deleteQuestion={deleteQuestion}
      parentTag={parentTag}
      setParentTag={setParentTag}
      questionsLayout={questionsLayout}
      setQuestionsLayout={setQuestionsLayout}
      addQuestion={addQuestion}
      toggleAddQuestion={toggleAddQuestion}
      data={data}
      questionLayoutChanged={questionLayoutChanged}
      setQuestionLayoutChanged={setQuestionLayoutChanged}
      saveQOrder={saveQOrder}
      updateTagParent={updateTagParent}
      incidentFormLayoutChanged={incidentFormLayoutChanged}
      saveIncidentForm={saveIncidentForm}
    />
  );
};

export default AddCrimeType;
