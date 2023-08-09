import React from 'react';
import type { ImageValue } from 'components/form-components/ImageSelect/ImageSelect.view';
import View from './SimpleEditOffender.view';
import type { OffenderData } from './useEditOffender';
import useEditOffender from './useEditOffender';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';

interface Props {
  data: OffenderData;
  onClose: () => void;
  update: (value: OffenderData) => void;
  images?: ImageValue[];
  onImagesUploaded?: (values: StateImageData[]) => void;
}

const EditOffender = ({
  data,
  onClose,
  update,
  images,
  onImagesUploaded,
}: Props): JSX.Element => {
  const { onSubmit, ageCheck, form, idVerified } = useEditOffender({
    data,
    onClose,
    update,
    onImagesUploaded,
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
        images={images?.map((el) => ({ ...el, uid: el.id }))}
      />
    </div>
  );
};

export default EditOffender;
