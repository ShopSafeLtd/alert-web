import type { MutationUpdaterFn } from '@apollo/client';
import type { ImageValue } from 'components/form-components/ImageSelect/ImageSelect.view';
import type { AddOffenderData } from 'components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';

import React from 'react';

import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { OffenderData } from './useSimpleEditOffender';

import View from './SimpleEditOffender.view';
import useEditOffender from './useSimpleEditOffender';

interface Props {
  data: OffenderData;
  images?: ImageValue[];
  incidentBusinessId?: string;
  onClose: () => void;
  onCompleted?: () => void;
  onEditOffender?: (value: AddOffenderData) => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
  showAddress?: boolean;
  update?: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
}

const EditOffender = ({
  data,
  images,
  incidentBusinessId,
  onClose,
  onCompleted,
  onEditOffender,
  onImagesUploaded,
  showAddress,
  update,
}: Props): JSX.Element => {
  const {
    ageCheck,
    form,
    idVerified,
    knowAddress,
    loading,
    needJustification,
    offenderSettings,
    onSubmit,
    saving,
    setUploading,
    uploading,
  } = useEditOffender({
    data,
    incidentBusinessId,
    onClose,
    onCompleted,
    onEditOffender,
    onImagesUploaded,
    update,
  });
  return (
    <div>
      <View
        ageCheck={ageCheck}
        data={data}
        form={form}
        idVerified={idVerified}
        images={images?.map((el) => ({
          ...el,
          isFace: el.isFace || false,
          uid: el.id,
        }))}
        knowAddress={knowAddress}
        loading={loading}
        needJustification={needJustification}
        offenderSettings={offenderSettings}
        onClose={onClose}
        onSubmit={onSubmit}
        saving={saving}
        setUploading={setUploading}
        showAddress={showAddress}
        uploading={uploading}
      />
    </div>
  );
};

export default EditOffender;
