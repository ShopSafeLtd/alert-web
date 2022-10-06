import React from 'react';
import { Age, Gender, Race, Build } from 'graphql/generated';
import useAddNewOffender from './useAddNewOffender';
import View from './AddNewOffender.view';

interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
}
interface Props {
  onClose: () => void;
  update: (value: OffenderData) => void;
}
function AddNewOffender({ onClose, update }: Props): JSX.Element {
  const {
    onSubmit,
    saving,
    ageCheck,
    setAgeCheck,
    imgChange,
    beforeUpload,
    fileList,
  } = useAddNewOffender({
    onClose,
    update,
  });
  return (
    <div>
      <View
        onSubmit={onSubmit}
        onClose={onClose}
        saving={saving}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        imgChange={imgChange}
        beforeUpload={beforeUpload}
        fileList={fileList}
      />
    </div>
  );
}

export default AddNewOffender;
