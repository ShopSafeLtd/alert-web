import React from 'react';
import { Age, Build, Gender, Race } from 'graphql/generated';
import { UploadFile } from 'antd/lib/upload/interface';
import View from './AssignImageOffender.view';
import useAssignImageOffender from './useAssignImageOffender';

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
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
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
    toggleAddExistingOffender,
    toggleAddOffender,
    updateOffendersList,
    selected,
    toggleOffender,
    submitImage,
  } = useAssignImageOffender({
    image,
    offenderData,
    onSubmit,
  });

  return (
    <View
      image={image}
      offendersData={offendersData}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddOffender={toggleAddOffender}
      addExistingOffender={addExistingOffender}
      addOffender={addOffender}
      updateOffendersList={updateOffendersList}
      selected={selected}
      toggleOffender={toggleOffender}
      onCancel={onCancel}
      onSubmit={submitImage}
    />
  );
};

export default AssignImageOffender;
