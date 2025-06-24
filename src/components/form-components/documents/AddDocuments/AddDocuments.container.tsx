import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import React, { memo } from 'react';

import View from './AddDocuments.view';
import useAddDocument from './useAddDocuments';

interface Props {
  crimeGroupId?: null | string;
  folderId?: string;
  incidentId?: null | string;
  investigationId?: null | string;
  isEvidence?: boolean;
  offenderId?: null | string;
  onClose: () => void;
  update?: MutationUpdaterFn<CreateDocumentsMutation>;
  vehicleId?: null | string;
}

const AddDocument = memo(
  ({
    crimeGroupId,
    folderId,
    incidentId,
    investigationId,
    isEvidence,
    offenderId,
    onClose,
    update,
    vehicleId,
  }: Props) => {
    const {
      categories,
      categoriesChange,
      categoriesLoading,
      documentUploadProps,
      form,
      onAddNewFolder,
      onSelectFolder,
      onSubmit,
      saving,
      selectedCategories,
    } = useAddDocument({
      crimeGroupId,
      folderId,
      incidentId,
      investigationId,
      isEvidence,
      offenderId,
      onClose,
      update,
      vehicleId,
    });

    return (
      <View
        categories={categories}
        categoriesChange={categoriesChange}
        categoriesLoading={categoriesLoading}
        documentUploadProps={documentUploadProps}
        folderId={folderId}
        form={form}
        onAddNewFolder={onAddNewFolder}
        onClose={onClose}
        onSelectFolder={onSelectFolder}
        onSubmit={onSubmit}
        providedId={
          !!(
            investigationId ||
            offenderId ||
            incidentId ||
            vehicleId ||
            crimeGroupId
          )
        }
        saving={saving}
        selectedCategories={selectedCategories}
      />
    );
  }
);

export default AddDocument;
