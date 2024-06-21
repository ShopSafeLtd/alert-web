import type { MutationUpdaterFn } from '@apollo/client';

import React, { memo } from 'react';
import View from './AddDocument.view';
import useAddDocument from './useAddDocument';
import type { CreateDocumentMutation } from 'graphql/documents/mutations/create-document.generated';

interface Props {
  onClose: () => void;
  investigationId?: string | null;
  incidentId?: string | null;
  offenderId?: string | null;
  vehicleId?: string | null;
  crimeGroupId?: string | null;
  update?: MutationUpdaterFn<CreateDocumentMutation> | undefined;
  isEvidence?: boolean;
}

const AddDocument = memo(
  ({
    onClose,
    offenderId,
    incidentId,
    investigationId,
    vehicleId,
    crimeGroupId,
    update,
    isEvidence,
  }: Props) => {
    const {
      onSubmit,
      selectedCategories,
      categories,
      categoriesChange,
      categoriesLoading,
      saving,
      documentUploadProps,
    } = useAddDocument({
      onClose,
      offenderId,
      incidentId,
      investigationId,
      vehicleId,
      crimeGroupId,
      update,
      isEvidence,
    });

    return (
      <View
        documentUploadProps={documentUploadProps}
        onSubmit={onSubmit}
        onClose={onClose}
        saving={saving}
        categories={categories}
        selectedCategories={selectedCategories}
        categoriesChange={categoriesChange}
        categoriesLoading={categoriesLoading}
        providedId={
          !!(
            investigationId ||
            offenderId ||
            incidentId ||
            vehicleId ||
            crimeGroupId
          )
        }
      />
    );
  }
);

export default AddDocument;
