import React from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateSimpleOffenderMutation } from 'graphql/generated';
import useAddNewOffender from './useAddNewOffender';
import View from './AddNewOffender.view';
import type { ImageData } from '../../../ImageSelect/ImageSelect.view';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';

interface Props {
  onClose: () => void;
  onCompleted?: () => void;
  update: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  images?: ImageData[] | undefined;
  incidentId?: string;
  investigationId?: string;
  vehicleId?: string;
  groupsIds?: string[];
  onImagesUploaded?: (values: StateImageData[]) => void;
}
const AddNewOffender = ({
  onClose,
  update,
  onCompleted,
  images,
  onImagesUploaded,
  incidentId,
  investigationId,
  vehicleId,
  groupsIds,
}: Props): JSX.Element => {
  const { onSubmit, saving, ageCheck, idVerified, form } = useAddNewOffender({
    onClose,
    update,
    onCompleted,
    onImagesUploaded,
    incidentId,
    investigationId,
    vehicleId,
    groupsIds,
  });
  return (
    <div>
      <View
        onSubmit={onSubmit}
        onClose={onClose}
        saving={saving}
        images={images}
        form={form}
        idVerified={idVerified}
        ageCheck={ageCheck}
      />
    </div>
  );
};

export default AddNewOffender;
