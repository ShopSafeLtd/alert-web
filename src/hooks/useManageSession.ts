import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useCreateSessionMutation } from 'graphql/sessions/__generated__/create-session.generated';
import { AppType } from 'graphql/types';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

export const sessionIdAtom = atom<null | string>(null);

const useManageSession = () => {
  const setSessionId = useSetAtom(sessionIdAtom);
  const globalStateSchemeId = useAtomValue(currentSchemeIdAtom);
  const globalStateUserId = useAtomValue(userIdAtom);

  const [pristine, setPristine] = useState(true);
  const [schemeId, setSchemeId] = useState<null | string>(null);

  const [createSession] = useCreateSessionMutation({
    onCompleted: (data) => {
      setSessionId(data.createSession.id);
    },
  });

  useEffect(() => {
    if (globalStateSchemeId) setSchemeId(globalStateSchemeId);

    const schemeIdSet = schemeId !== null;
    const userIdSet = !!globalStateUserId;
    const schemeIdChanged = globalStateSchemeId !== schemeId;

    if (schemeIdSet && userIdSet && pristine) {
      setPristine(false);
      void createSession({
        variables: {
          data: {
            app: AppType.Web,
            scheme: {
              id: globalStateSchemeId,
            },
            user: { id: globalStateUserId },
          },
        },
      });
    }

    if (schemeIdSet && userIdSet && !pristine && schemeIdChanged) {
      void createSession({
        variables: {
          data: {
            app: AppType.Web,
            scheme: {
              id: globalStateSchemeId,
            },
            user: { id: globalStateUserId },
          },
        },
      });
    }
  }, [globalStateSchemeId, globalStateUserId, schemeId]);
};

export default useManageSession;
