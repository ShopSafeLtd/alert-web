import { SortOrder, useSchemeGroupsQuery } from 'graphql/generated';
import { useStoreState } from 'state';
import type { CustomGalleryData } from 'types/DataType';

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
  const schemeId = useStoreState((state) => state.scheme.id);

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        name: SortOrder.Asc,
      },
    },
  });
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
    groupsData: groupsData?.groups.map((group) => ({
      value: group.id,
      label: group.name,
    })),
    groupsLoading,
  };
};
export default useAddCustomGallery;
