import { useDrawerState } from 'hooks';
import React from 'react';
import View from './CreateEditArticle.view';
import useCreateEditArticle from './hooks/useCreateEditArticle';
import type { AddIncident, AddOffender } from './hooks/Forms';

const CreateEditArticleContainer = () => {
  const {
    log,
    editorRef,
    // eslint-disable-next-line @typescript-eslint/unbound-method
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
    id,
  } = useCreateEditArticle();

  const { drawer } = useDrawerState<AddOffender | AddIncident>();

  return (
    <View
      id={id}
      selectedSchemes={selectedSchemes}
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
    />
  );
};

export default CreateEditArticleContainer;
