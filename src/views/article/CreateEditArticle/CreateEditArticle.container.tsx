import { useDrawerState } from 'hooks';
import React from 'react';

import type { AddIncident, AddOffender } from './hooks/Forms';

import View from './CreateEditArticle.view';
import useCreateEditArticle from './hooks/useCreateEditArticle';

const CreateEditArticleContainer = () => {
  const {
    categories,
    categoriesChange,
    categoriesLoading,
    data,
    documentUploadProps,
    editorRef,
    fileList,
    filePickerCallback,

    form,
    groups,
    groupsLoading,
    id,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    imagesUploadHandler,
    incidents,
    initData,
    insertIncident,
    insertOffender,
    loading,
    log,
    offenders,
    onGroupsChange,
    onSubmit,
    preview,
    previewImage,
    previewText,
    removeIncident,
    removeOffender,
    saveDraft,
    selectedCategories,
    selectedGroups,
    selectedSchemes,
    setPreviewImage,
    setPreviewText,
  } = useCreateEditArticle();

  const { drawer } = useDrawerState<AddIncident | AddOffender>();

  return (
    <View
      categories={categories}
      categoriesChange={categoriesChange}
      categoriesLoading={categoriesLoading}
      data={data}
      documentUploadProps={documentUploadProps}
      drawer={drawer}
      editorRef={editorRef}
      fileList={fileList}
      filePickerCallback={filePickerCallback}
      form={form}
      groups={groups}
      groupsLoading={groupsLoading}
      id={id}
      imagesUploadHandler={imagesUploadHandler}
      incidents={incidents}
      initData={initData}
      insertIncident={insertIncident}
      insertOffender={insertOffender}
      loading={loading}
      log={log}
      offenders={offenders}
      onGroupsChange={onGroupsChange}
      onSubmit={onSubmit}
      preview={preview}
      previewImage={previewImage}
      previewText={previewText}
      removeIncident={removeIncident}
      removeOffender={removeOffender}
      saveDraft={saveDraft}
      selectedCategories={selectedCategories}
      selectedGroups={selectedGroups}
      selectedSchemes={selectedSchemes}
      setPreviewImage={setPreviewImage}
      setPreviewText={setPreviewText}
    />
  );
};

export default CreateEditArticleContainer;
