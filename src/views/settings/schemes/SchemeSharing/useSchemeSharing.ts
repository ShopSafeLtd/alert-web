/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-floating-promises,@typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import { useStoreState } from 'state';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';
import type {
  SchemeSharingQuery,
  SchemeSharingQueryVariables,
} from '#/views/settings/schemes/SchemeSharing/graphql/scheme-sharing.generated';
import {
  SchemeSharingDocument,
  useSchemeSharingQuery,
} from '#/views/settings/schemes/SchemeSharing/graphql/scheme-sharing.generated';
import { useSetSchemeSharingMutation } from '#/components/form-components/ConnectScheme/conenct-scheme-mutation.generated';

const { confirm } = Modal;

interface Return {
  data: SchemeSharingQuery | undefined;
  loading: boolean;
  connectOpen: boolean;
  toggleDrawerOpen: () => void;
  onUnlink: (id: string) => void;
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
          query: SchemeSharingDocument,
          variables: {
            where: {
              id: schemeId,
            },
          },
          data: {
            ...existingData,
            scheme: {
              ...existingData.scheme,
              connectedToSchemes:
                result.data.setSchemeSharing.connectedToSchemes,
            },
          },
        });
    },
  });

  const toggleDrawerOpen = () => setConnectOpen(!connectOpen);

  const onUnlink = (id: string) => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
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
    });
  };

  return {
    data,
    loading,
    connectOpen,
    toggleDrawerOpen,
    onUnlink,
  };
};

export default useSchemeSharing;
