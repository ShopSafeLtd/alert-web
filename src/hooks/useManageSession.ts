import { useCreateSessionMutation } from 'graphql/sessions/__generated__/create-session.generated';
import { AppType } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

const useManageSession = () => {
  const globalStateSchemeId = useStoreState((state) => state.scheme.id);
  const globalStateUserId = useStoreState((state) => state.user.id);
  const setSessionId = useStoreActions((actions) => actions.user.setSession);

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
