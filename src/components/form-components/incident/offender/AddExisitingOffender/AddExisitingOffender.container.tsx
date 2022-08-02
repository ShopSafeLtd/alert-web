import React from 'react';
import { Age, Gender, Race, Build } from 'graphql/generated';
import View from './AddExisitingOffender.view';
import useViewOffender from './useAddExisitingOffender';

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
  // images?: {
  //   id: string;
  //   optimised?: string | null;
  // }[];
}

interface Props {
  onClose: () => void;
  update: (value: OffenderData[] | undefined) => void;
}
const ViewOffender = ({ onClose, update }: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    data,
    loading,
    search,
    setSearch,
    openLightbox,
    onPaginationChange,
    setCurrentId,
    offenderData,
  } = useViewOffender({ onClose, update });

  return (
    <View
      onSubmit={onSubmit}
      saving={saving}
      data={data}
      search={search}
      setSearch={setSearch}
      loading={loading}
      openLightbox={openLightbox}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      setCurrentId={setCurrentId}
      offenderData={offenderData}
    />
  );
};

export default ViewOffender;
