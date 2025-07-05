import useQuestions from '#/views/settings/questions/useQuestions';
import React from 'react';

import QuestionsView from './Questions.view';

const QuestionsContainer = () => {
  const {
    answerTypeLabels,
    closeDrawer,
    deleteQuestion,
    filters,
    isDrawerOpen,
    isModalOpen,
    loading,
    modelTypeLabels,
    openDrawer,
    page,
    pageSize,
    questions,
    selectedQuestionId,
    selectedQuestionModes,
    setActivityQuestionsFilter,
    setPage,
    setPageSize,
    setSearchFilter,
    setTagQuestionsFilter,
    setTypeFilter,
    toggleModal,
    total,
  } = useQuestions();

  return (
    <QuestionsView
      answerTypeLabels={answerTypeLabels}
      closeDrawer={closeDrawer}
      deleteQuestion={deleteQuestion}
      filters={filters}
      isDrawerOpen={isDrawerOpen}
      isModalOpen={isModalOpen}
      loading={loading}
      modelTypeLabels={modelTypeLabels}
      openDrawer={openDrawer}
      page={page}
      pageSize={pageSize}
      questions={questions}
      selectedQuestionId={selectedQuestionId}
      selectedQuestionModes={selectedQuestionModes}
      setActivityQuestionsFilter={setActivityQuestionsFilter}
      setPage={setPage}
      setPageSize={setPageSize}
      setSearchFilter={setSearchFilter}
      setTagQuestionsFilter={setTagQuestionsFilter}
      setTypeFilter={setTypeFilter}
      toggleModal={toggleModal}
      total={total}
    />
  );
};

export default QuestionsContainer;
