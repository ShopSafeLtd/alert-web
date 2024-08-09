/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-floating-promises,@typescript-eslint/no-unsafe-assignment */
import type {
  SchemeSharingQuery,
  SchemeSharingQueryVariables,
} from '#/views/settings/schemes/SchemeSharing/graphql/__generated__/scheme-sharing.generated';

import { useSetSchemeSharingMutation } from '#/components/form-components/ConnectScheme/__generated__/conenct-scheme-mutation.generated';
import {
  SchemeSharingDocument,
  useSchemeSharingQuery,
} from '#/views/settings/schemes/SchemeSharing/graphql/__generated__/scheme-sharing.generated';
import { Modal } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';

const { confirm } = Modal;

interface Return {
  connectOpen: boolean;
  data: SchemeSharingQuery | undefined;
  loading: boolean;
  onUnlink: (id: string) => void;
  toggleDrawerOpen: () => void;
}

const useSchemeSharing = (): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [connectOpen, setConnectOpen] = useState(false);

  const { data, loading } = useSchemeSharingQuery({
    variables: {
      where: {
        id: schemeId,
      },
    },
  });

  const [setSchemeSharing] = useSetSchemeSharingMutation({
    update: (store, result) => {
      const existingData = store.readQuery<
        SchemeSharingQuery,
        SchemeSharingQueryVariables
      >({
        query: SchemeSharingDocument,
        variables: {
          where: {
            id: schemeId,
          },
        },
      });

      if (existingData && result.data)
        store.writeQuery<SchemeSharingQuery, SchemeSharingQueryVariables>({
          data: {
            ...existingData,
            scheme: {
              ...existingData.scheme,
              connectedToSchemes:
                result.data.setSchemeSharing.connectedToSchemes,
            },
          },
          query: SchemeSharingDocument,
          variables: {
            where: {
              id: schemeId,
            },
          },
        });
    },
  });

  const toggleDrawerOpen = () => setConnectOpen(!connectOpen);

  const onUnlink = (id: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage:
          'This will unlink the scheme and no more offender or incidents will be able to be shared. Any previously shared data will remained shared.',
      }),
      onOk: () => {
        setSchemeSharing({
          variables: {
            data: {
              currentScheme: { id: schemeId },
              disconnectSchemes: [
                {
                  id,
                },
              ],
            },
          },
        });
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
  };

  return {
    connectOpen,
    data,
    loading,
    onUnlink,
    toggleDrawerOpen,
  };
};

export default useSchemeSharing;
