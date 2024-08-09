import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateDocumentMutation } from 'graphql/documents/mutations/__generated__/create-document.generated';

import React, { memo } from 'react';

import View from './AddDocument.view';
import useAddDocument from './useAddDocument';

interface Props {
  crimeGroupId?: null | string;
  incidentId?: null | string;
  investigationId?: null | string;
  isEvidence?: boolean;
  offenderId?: null | string;
  onClose: () => void;
  update?: MutationUpdaterFn<CreateDocumentMutation> | undefined;
  vehicleId?: null | string;
}

const AddDocument = memo(
  ({
    crimeGroupId,
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
      onSubmit,
      saving,
      selectedCategories,
    } = useAddDocument({
      crimeGroupId,
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
        onClose={onClose}
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
