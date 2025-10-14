import type { CustomGalleryData } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';

export interface FormData {
  description: string;
  groups: string[];
  name: string;
}

interface Props {
  data?: CustomGalleryData;
  update: (value: CustomGalleryData) => void;
}

interface Return {
  groupsData:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
  groupsLoading: boolean;
  onSubmit: (value: FormData) => void;
}

const useAddCustomGallery = ({ data, update }: Props): Return => {
  const { groups, groupsLoading } = useGroupsContext();

  const onSubmit = (value: FormData) => {
    update({
      description: value.description || '',
      groups: value.groups,
      id: data?.id || Math.floor(Math.random() * 1000).toString(),
      name: value.name,
    });
  };

  return {
    groupsData: groups,
    groupsLoading,
    onSubmit,
  };
};
export default useAddCustomGallery;
