import type { ImageValue } from '#/components/form-components/ImageSelect/ImageSelect.view';
import type { AddOffenderData } from '#/components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type { MutationUpdaterFn } from '@apollo/client';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';

import React from 'react';

import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { OffenderData } from './useEditOffender';

import View from './SimpleEditOffender.view';
import useEditOffender from './useEditOffender';

interface Props {
  data: OffenderData;
  images?: ImageValue[];
  onClose: () => void;
  onCompleted?: () => void;
  onEditOffender?: (value: AddOffenderData) => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
  update?: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
}

const EditOffender = ({
  data,
  images,
  onClose,
  onCompleted,
  onEditOffender,
  onImagesUploaded,
  update,
}: Props): JSX.Element => {
  const { ageCheck, form, idVerified, onSubmit, setUploading, uploading } =
    useEditOffender({
      data,
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
          isFace: !!el.isFace,
          uid: el.id,
        }))}
        onClose={onClose}
        onSubmit={onSubmit}
        setUploading={setUploading}
        uploading={uploading}
      />
    </div>
  );
};

export default EditOffender;
