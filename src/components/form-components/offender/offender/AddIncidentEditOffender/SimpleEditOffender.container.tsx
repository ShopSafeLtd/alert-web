import React from 'react';
import type { ImageValue } from 'components/form-components/ImageSelect/ImageSelect.view';
import type { MutationUpdaterFn } from '@apollo/client';
import type { AddOffenderData } from 'components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import View from './SimpleEditOffender.view';
import type { OffenderData } from './useEditOffender';
import useEditOffender from './useEditOffender';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/update-simple-offender.generated';

interface Props {
  data: OffenderData;
  onClose: () => void;
  onCompleted?: () => void;
  update?: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  onEditOffender?: (value: AddOffenderData) => void;
  images?: ImageValue[];
  onImagesUploaded?: (values: StateImageData[]) => void;
}

const EditOffender = ({
  data,
  onClose,
  update,
  onEditOffender,
  onCompleted,
  images,
  onImagesUploaded,
}: Props): JSX.Element => {
  const { onSubmit, ageCheck, form, idVerified, uploading, setUploading } =
    useEditOffender({
      data,
      onClose,
      update,
      onEditOffender,
      onImagesUploaded,
      onCompleted,
    });
  return (
    <div>
      <View
        setUploading={setUploading}
        uploading={uploading}
        form={form}
        onSubmit={onSubmit}
        data={data}
        ageCheck={ageCheck}
        onClose={onClose}
        idVerified={idVerified}
        images={images?.map((el) => ({
          ...el,
          uid: el.id,
          isFace: !!el.isFace,
        }))}
      />
    </div>
  );
};

export default EditOffender;
