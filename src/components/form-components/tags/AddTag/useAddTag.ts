import { useStoreState } from 'state';
import type { TagData } from 'types/DataType';

export interface FormData {
  name: string;
  description: string;
  schemes: string[];
}

interface Props {
  update: (value: TagData) => void;
  data?: TagData;
}

interface Return {
  onSubmit: (value: FormData) => void;
}

const useAddTag = ({ update, data }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);

  const onSubmit = (value: FormData) => {
    update({
      id: data?.id || Math.floor(Math.random() * 1000).toString(),
      name: value.name,
      description: value.description || '',
      schemes: value.schemes || [schemeId],
      createdById: userId,
    });
  };

  return {
    onSubmit,
  };
};
export default useAddTag;
