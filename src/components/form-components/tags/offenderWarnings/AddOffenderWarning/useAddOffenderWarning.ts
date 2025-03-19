import type { Scheme } from 'state';
import type { TagData } from 'types/DataType';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useAtomValue } from 'jotai/index';
import { useStoreState } from 'state';

interface FormData {
  description: string;
  name: string;
  schemes: string[];
}

interface Props {
  update: (value: TagData) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  schemeId: string;
  userSchemes: Scheme[];
}

const useAddOffenderWarning = ({ update }: Props): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userId = useAtomValue(userIdAtom);

  const userSchemes = useStoreState((state) => state.user.schemes);

  const onSubmit = (data: FormData) => {
    update({
      createdById: userId,
      description: data.description || '',
      id: Math.floor(Math.random() * 1000).toString(),
      name: data.name,
      schemes: data.schemes,
    });
  };

  return {
    onSubmit,
    schemeId,
    userSchemes,
  };
};
export default useAddOffenderWarning;
