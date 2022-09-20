import React from 'react';
import { Age, Gender, Race, Build } from 'graphql/generated';
import useAddOffender from './useAddOffender';
import View from './AddOffender.view';

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
  update: (value: OffenderData[] | undefined) => void;
}
function AddOffender({ onClose, update }: Props): JSX.Element {
  const { onSubmit, saving, ageCheck, setAgeCheck } = useAddOffender({
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
      />
    </div>
  );
}

export default AddOffender;
