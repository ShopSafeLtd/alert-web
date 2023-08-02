import React from 'react';
import type { ImageData } from 'components/form-components/ImageSelect/ImageSelect.view';
import View from './SimpleEditOffender.view';
import type { OffenderData } from './useEditOffender';
import useEditOffender from './useEditOffender';

interface Props {
  data: OffenderData;
  onClose: () => void;
  update: (value: OffenderData) => void;
  images?: ImageData[];
}

const EditOffender = ({
  data,
  onClose,
  update,
  images,
}: Props): JSX.Element => {
  const { onSubmit, ageCheck, form, idVerified } = useEditOffender({
    data,
    onClose,
    update,
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
        images={images}
      />
    </div>
  );
};

export default EditOffender;
