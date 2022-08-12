import React from 'react';

import { Age, Gender, Race, Build } from 'graphql/generated';

import View from './AssignImageToOffender.view';
import useViewOffender from './useAssignImageToOffender';

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
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
  }[];
  imageUid?: string[] | undefined;
}
interface Props {
  onClose: () => void;
  update: (value: string[] | undefined) => void;
  data: OffenderData[] | undefined;
}
const ViewOffender = ({ onClose, data, update }: Props): JSX.Element => {
  const { onSubmit, saving } = useViewOffender({
    onClose,
    update,
  });

  return (
    <View onSubmit={onSubmit} onClose={onClose} saving={saving} data={data} />
  );
};

export default ViewOffender;
