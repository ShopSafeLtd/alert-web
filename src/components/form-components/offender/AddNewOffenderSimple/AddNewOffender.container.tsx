import type { AddOffenderData } from '#/components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';

import React from 'react';

import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageData } from '../../ImageSelect/ImageSelect.view';

import View from './AddNewOffender.view';
import useAddNewOffender from './useAddNewOffender';

interface Props {
  addOverride?: string;
  crimeGroupId?: string;
  groupsIds?: string[];
  images?: ImageData[];
  imagesProp?: ImageData[] | undefined;
  incidentBusinessId?: string;
  incidentId?: string;
  investigationId?: string;
  onAddOffender?: (value: AddOffenderData) => void;
  onClose: () => void;
  onCompleted?: () => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
  update?: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  vehicleId?: string;
}

const AddNewOffender = ({
  addOverride,
  crimeGroupId,
  groupsIds,
  images,
  incidentBusinessId,
  incidentId,
  investigationId,
  onAddOffender,
  onClose,
  onCompleted,
  onImagesUploaded,
  update,
  vehicleId,
}: Props): JSX.Element => {
  const {
    ageCheck,
    form,
    idVerified,
    knowAddress,
    loading,
    offenderSettings,
    onSubmit,
    saving,
    setUploading,
    uploading,
  } = useAddNewOffender({
    crimeGroupId,
    groupsIds,
    incidentBusinessId,
    incidentId,
    investigationId,
    onAddOffender,
    onClose,
    onCompleted,
    onImagesUploaded,
    update,
    vehicleId,
  });

  return (
    <div>
      <View
        addOverride={addOverride}
        ageCheck={ageCheck}
        form={form}
        idVerified={idVerified}
        images={images}
        knowAddress={knowAddress}
        loading={loading}
        offenderSettings={offenderSettings}
        onClose={onClose}
        onSubmit={onSubmit}
        saving={saving}
        setUploading={setUploading}
        uploading={uploading}
      />
    </div>
  );
};

export default AddNewOffender;
