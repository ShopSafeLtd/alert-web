import type { TagData } from 'types/DataType';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  userIdAtom,
  userSchemesAtom,
} from '#/providers/UserProvider/UserProvider';
import { useAtomValue } from 'jotai/index';

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
  userSchemes: { scheme: { id: string; name: string } }[];
}

const useAddOffenderWarning = ({ update }: Props): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userId = useAtomValue(userIdAtom);

  const userSchemes = useAtomValue(userSchemesAtom);

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
