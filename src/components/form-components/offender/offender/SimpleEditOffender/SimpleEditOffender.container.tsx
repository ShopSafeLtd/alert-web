import React from 'react';
import type { ImageValue } from 'components/form-components/ImageSelect/ImageSelect.view';
import type { MutationUpdaterFn } from '@apollo/client';
import type { UpdateSimpleOffenderMutation } from 'graphql/generated';
import type { AddOffenderData } from 'components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import View from './SimpleEditOffender.view';
import type { OffenderData } from './useSimpleEditOffender';
import useEditOffender from './useSimpleEditOffender';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';

interface Props {
  data: OffenderData;
  onClose: () => void;
  onCompleted?: () => void;
  update?: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  onEditOffender?: (value: AddOffenderData) => void;
  images?: ImageValue[];
  onImagesUploaded?: (values: StateImageData[]) => void;
  incidentBusinessId?: string;
  showAddress?: boolean;
}

const EditOffender = ({
  data,
  onClose,
  update,
  onEditOffender,
  onCompleted,
  images,
  onImagesUploaded,
  incidentBusinessId,
  showAddress,
}: Props): JSX.Element => {
  const {
    onSubmit,
    ageCheck,
    saving,
    needJustification,
    form,
    idVerified,
    offenderSettings,
    loading,
    uploading,
    setUploading,
    knowAddress,
  } = useEditOffender({
    data,
    onClose,
    update,
    onEditOffender,
    onImagesUploaded,
    onCompleted,
    incidentBusinessId,
  });
  return (
    <div>
      <View
        form={form}
        onSubmit={onSubmit}
        data={data}
        ageCheck={ageCheck}
        onClose={onClose}
        idVerified={idVerified}
        images={images?.map((el) => ({
          ...el,
          uid: el.id,
          isFace: el.isFace || false,
        }))}
        offenderSettings={offenderSettings}
        loading={loading}
        needJustification={needJustification}
        saving={saving}
        setUploading={setUploading}
        uploading={uploading}
        knowAddress={knowAddress}
        showAddress={showAddress}
      />
    </div>
  );
};

export default EditOffender;
