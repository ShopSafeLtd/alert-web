import { useDrawerState } from 'hooks';
import React from 'react';
import View from './CreateArticle.view';
import useCreateArticle from './hooks/useCreateArticle';
import { AddIncident, AddOffender } from './hooks/Forms';

const CreateArticleContainer = () => {
  const {
    log,
    editorRef,
    exampleImageUploadHandler,
    preview,
    previewText,
    setPreviewText,
    previewImage,
    setPreviewImage,
    imgSrcs,
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
  } = useCreateArticle();

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
      imgSrcs={imgSrcs}
      drawer={drawer}
      insertIncident={insertIncident}
    />
  );
};

export default CreateArticleContainer;
