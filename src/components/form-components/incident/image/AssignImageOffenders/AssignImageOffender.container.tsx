import type { UploadFile } from 'antd/lib/upload/interface';
import type { OffenderData } from 'types/DataType';

import React from 'react';

import View from './AssignImageOffender.view';
import useAssignImageOffender from './useAssignImageOffender';

// interface OffenderData {
//   id: string;
//   name?: string | null;
//   age?: Age | null;
//   gender?: Gender | null;
//   race?: Race | null;
//   build?: Build | null;
//   dateOfBirth?: Date | null;
//   hair?: string | null;
//   dateSource?: string | null;
//   peculiarities?: string | null;
//   approved?: boolean | null;
//   groups?:
//     | {
//         id: string;
//         name: string;
//       }[]
//     | undefined;
//   images?:
//     | {
//         id: string;
//         optimised?: string | null;
//         url?: string | null;
//         new?: boolean;
//       }[]
//     | null;
//   imageUid?: string[] | undefined;
//   new: boolean;
//   existing: boolean;
//   edited: boolean;
// }

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: null | string | undefined;
  }[];
}

interface Props {
  image: Image | undefined;
  offenderData: OffenderData[];
  onCancel: () => void;
  onSubmit: (data: { image: Image; offenders: OffenderData[] }) => void;
}

const AssignImageOffender = ({
  image,
  offenderData,
  onCancel,
  onSubmit,
}: Props): JSX.Element => {
  const {
    addExistingOffender,
    addOffender,
    offendersData,
    onAddOffender,
    selected,
    submitImage,
    toggleAddExistingOffender,
    toggleAddOffender,
    toggleOffender,
  } = useAssignImageOffender({
    image,
    offenderData,
    onSubmit,
  });

  return (
    <View
      addExistingOffender={addExistingOffender}
      addOffender={addOffender}
      image={image}
      offendersData={offendersData}
      onAddOffender={onAddOffender}
      onCancel={onCancel}
      onSubmit={submitImage}
      selected={selected}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddOffender={toggleAddOffender}
      toggleOffender={toggleOffender}
    />
  );
};

export default AssignImageOffender;
