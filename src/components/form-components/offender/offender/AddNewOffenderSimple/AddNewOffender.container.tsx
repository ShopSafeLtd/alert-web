import React from 'react';
import type { MutationUpdaterFn } from '@apollo/client';

import type { AddOffenderData } from 'components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import useAddNewOffender from './useAddNewOffender';
import View from './AddNewOffender.view';
import type { ImageData } from '../../../ImageSelect/ImageSelect.view';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/create-simple-offender.generated';

interface Props {
  onClose: () => void;
  onCompleted?: () => void;
  update?: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  onAddOffender?: (value: AddOffenderData) => void;
  images?: ImageData[] | undefined;
  incidentId?: string;
  investigationId?: string;
  vehicleId?: string;
  crimeGroupId?: string;
  groupsIds?: string[];
  onImagesUploaded?: (values: StateImageData[]) => void;
  incidentBusinessId?: string;
}

const AddNewOffender = ({
  onClose,
  update,
  onAddOffender,
  onCompleted,
  images,
  onImagesUploaded,
  incidentId,
  investigationId,
  vehicleId,
  crimeGroupId,
  groupsIds,
  incidentBusinessId,
}: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    ageCheck,
    idVerified,
    form,
    uploading,
    setUploading,
    offenderSettings,
    loading,
    knowAddress,
  } = useAddNewOffender({
    onClose,
    update,
    onAddOffender,
    onCompleted,
    onImagesUploaded,
    incidentId,
    investigationId,
    vehicleId,
    crimeGroupId,
    groupsIds,
    incidentBusinessId,
  });

  return (
    <div>
      <View
        setUploading={setUploading}
        uploading={uploading}
        onSubmit={onSubmit}
        onClose={onClose}
        saving={saving}
        images={images}
        form={form}
        idVerified={idVerified}
        ageCheck={ageCheck}
        offenderSettings={offenderSettings}
        loading={loading}
        knowAddress={knowAddress}
      />
    </div>
  );
};

export default AddNewOffender;
