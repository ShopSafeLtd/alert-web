import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';
import { useCreateSessionMutation } from 'graphql/sessions/create-session.generated';
import { AppType } from 'graphql/types';

const useManageSession = () => {
  const globalStateSchemeId = useStoreState((state) => state.scheme.id);
  const globalStateUserId = useStoreState((state) => state.user.id);
  const setSessionId = useStoreActions((actions) => actions.user.setSession);

  const [pristine, setPristine] = useState(true);
  const [schemeId, setSchemeId] = useState<string | null>(null);

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
            scheme: {
              id: globalStateSchemeId,
            },
            app: AppType.Web,
            user: { id: globalStateUserId },
          },
        },
      });
    }

    if (schemeIdSet && userIdSet && !pristine && schemeIdChanged) {
      void createSession({
        variables: {
          data: {
            scheme: {
              id: globalStateSchemeId,
            },
            app: AppType.Web,
            user: { id: globalStateUserId },
          },
        },
      });
    }
  }, [globalStateSchemeId, globalStateUserId, schemeId]);
};

export default useManageSession;
