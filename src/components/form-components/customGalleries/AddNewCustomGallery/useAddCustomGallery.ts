import type { CustomGalleryData } from 'types/DataType';
import { useGroupsContext } from '#/context/groups-context';

export interface FormData {
  name: string;
  description: string;
  groups: string[];
}

interface Props {
  update: (value: CustomGalleryData) => void;
  data?: CustomGalleryData;
}

interface Return {
  onSubmit: (value: FormData) => void;
  groupsData:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
  groupsLoading: boolean;
}

const useAddCustomGallery = ({ update, data }: Props): Return => {
  const { groups, groupsLoading } = useGroupsContext();

  const onSubmit = (value: FormData) => {
    update({
      id: data?.id || Math.floor(Math.random() * 1000).toString(),
      name: value.name,
      description: value.description || '',
      groups: value.groups,
    });
  };

  return {
    onSubmit,
    groupsData: groups,
    groupsLoading,
  };
};
export default useAddCustomGallery;
