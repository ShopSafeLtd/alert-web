import type { Scheme } from 'state';
import { useStoreState } from 'state';
import type { TagData } from 'types/DataType';

interface FormData {
  name: string;
  description: string;
  schemes: string[];
}

interface Props {
  update: (value: TagData) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  userSchemes: Scheme[];
  schemeId: string;
}

const useAddOffenderWarning = ({ update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);

  const userSchemes = useStoreState((state) => state.user.schemes);

  const onSubmit = (data: FormData) => {
    update({
      id: Math.floor(Math.random() * 1000).toString(),
      name: data.name,
      description: data.description || '',
      schemes: data.schemes,
      createdById: userId,
    });
  };

  return {
    onSubmit,
    userSchemes,
    schemeId,
  };
};
export default useAddOffenderWarning;
