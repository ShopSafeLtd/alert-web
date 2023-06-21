import { useDrawerState } from 'hooks';
import React from 'react';
import View from './EditArticle.view';
import useEditArticle from './hooks/useEditArticle';
import type { AddIncident, AddOffender } from './hooks/Forms';

const EditArticleContainer = () => {
  const {
    log,
    editorRef,
    exampleImageUploadHandler,
    preview,
    previewText,
    setPreviewText,
    previewImage,
    setPreviewImage,
    groups,
    groupsLoading,
    onGroupsChange,
    categories,
    categoriesLoading,
    categoriesChange,
    selectedCategories,
    selectedGroups,
    filePickerCallback,
    form,
    onSubmit,
    data,
    loading,
    fileList,
    documentUploadProps,
    insertOffender,
    insertIncident,
    removeOffender,
    removeIncident,
    offenders,
    incidents,
    selectedSchemes,
  } = useEditArticle();

  const { drawer } = useDrawerState<AddOffender | AddIncident>();

  return (
    <View
      incidents={incidents}
      removeIncident={removeIncident}
      offenders={offenders}
      removeOffender={removeOffender}
      insertOffender={insertOffender}
      documentUploadProps={documentUploadProps}
      fileList={fileList}
      loading={loading}
      data={data}
      form={form}
      onSubmit={onSubmit}
      filePickerCallback={filePickerCallback}
      selectedCategories={selectedCategories}
      selectedGroups={selectedGroups}
      categories={categories}
      categoriesChange={categoriesChange}
      groups={groups}
      categoriesLoading={categoriesLoading}
      groupsLoading={groupsLoading}
      onGroupsChange={onGroupsChange}
      log={log}
      editorRef={editorRef}
      exampleImageUploadHandler={exampleImageUploadHandler}
      preview={preview}
      previewText={previewText}
      setPreviewText={setPreviewText}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      drawer={drawer}
      insertIncident={insertIncident}
      selectedSchemes={selectedSchemes}
    />
  );
};

export default EditArticleContainer;
