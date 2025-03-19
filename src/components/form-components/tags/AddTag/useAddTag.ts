import type { TagData } from 'types/DataType';

import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useAtomValue } from 'jotai/index';
import { useStoreState } from 'state';

export interface FormData {
  description: string;
  name: string;
  schemes: string[];
}

interface Props {
  data?: TagData;
  update: (value: TagData) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
}

const useAddTag = ({ data, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useAtomValue(userIdAtom);

  const onSubmit = (value: FormData) => {
    update({
      createdById: userId,
      description: value.description || '',
      id: data?.id || Math.floor(Math.random() * 1000).toString(),
      name: value.name,
      schemes: value.schemes || [schemeId],
    });
  };

  return {
    onSubmit,
  };
};
export default useAddTag;
