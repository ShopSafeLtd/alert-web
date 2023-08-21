import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateDocumentMutation } from 'graphql/generated';
import React, { memo } from 'react';
import View from './AddDocument.view';
import useAddDocument from './useAddDocument';

interface Props {
  onClose: () => void;
  investigationId?: string | null;
  incidentId?: string | null;
  offenderId?: string | null;
  vehicleId?: string | null;
  crimeGroupId?: string | null;
  update?: MutationUpdaterFn<CreateDocumentMutation> | undefined;
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
