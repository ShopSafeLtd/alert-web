/* eslint-disable @typescript-eslint/no-misused-promises */
import type {
  SchemeSharingQuery,
  SchemeSharingQueryVariables,
} from '#/views/settings/schemes/SchemeSharing/graphql/__generated__/scheme-sharing.generated';
import type { Theme } from 'configs/ThemeConfig';

import { useSetSchemeSharingMutation } from '#/components/form-components/ConnectScheme/conenct-scheme-mutation.generated';
import { useConnectSchemesQuery } from '#/components/form-components/ConnectScheme/connect-schemes-query.generated';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { SchemeSharingDocument } from '#/views/settings/schemes/SchemeSharing/graphql/__generated__/scheme-sharing.generated';
import { Button, Col, Row, Skeleton, Typography } from 'antd';
import { Role, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useStoreState } from 'state';

const useStyles = createUseStyles((theme: Theme) => ({
  name: {
    flex: 1,
    width: '100%',
  },
  scheme: {
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: '10px 20px',
  },
}));

const { Text } = Typography;

interface Props {
  connectedScheme: string[];
  onClose: () => void;
}

const ConnectScheme = ({ connectedScheme, onClose }: Props) => {
  const userId = useAtomValue(userIdAtom);
  const schemeId = useStoreState((state) => state.scheme.id);
  const classes = useStyles();

  const { data, loading } = useConnectSchemesQuery({
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        id: {
          notIn: connectedScheme,
        },
        members: {
          some: {
            role: {
              equals: Role.SchemeAdmin,
            },
            user: {
              id: {
                equals: userId,
              },
            },
          },
        },
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
  const connectScheme = async (id: string) => {
    onClose();
    await setSchemeSharing({
      variables: {
        data: {
          connectSchemes: [
            {
              id,
            },
          ],
          currentScheme: {
            id: schemeId,
          },
        },
      },
    });
  };

  return (
    <div>
      {loading && <Skeleton />}
      {!loading &&
        data?.schemes.map((scheme) => (
          <Row align="middle" className={classes.scheme} key={scheme.id}>
            <Col flex={1}>
              <Text className={classes.name} ellipsis>
                {scheme.name}
              </Text>
            </Col>
            <Col>
              <Button onClick={() => connectScheme(scheme.id)}>
                <FormattedMessage defaultMessage="Connect" />
              </Button>
            </Col>
          </Row>
        ))}
    </div>
  );
};

export default ConnectScheme;
