/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import type {
  SchemeSharingQuery,
  SchemeSharingQueryVariables,
} from 'graphql/generated';
import {
  Role,
  SchemeSharingDocument,
  SortOrder,
  useConnectSchemesQuery,
  useSetSchemeSharingMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { Button, Col, Row, Skeleton, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  scheme: {
    padding: '10px 20px',
    borderBottom: `1px solid ${theme.borderColor}`,
  },
  name: {
    width: '100%',
    flex: 1,
  },
}));

const { Text } = Typography;

interface Props {
  connectedScheme: string[];
  onClose: () => void;
}

const ConnectScheme = ({ connectedScheme, onClose }: Props) => {
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const classes = useStyles();

  const { data, loading } = useConnectSchemesQuery({
    variables: {
      where: {
        id: {
          notIn: connectedScheme,
        },
        members: {
          some: {
            user: {
              id: {
                equals: userId,
              },
            },
            role: {
              equals: Role.SchemeAdmin,
            },
          },
        },
      },
      orderBy: {
        name: SortOrder.Asc,
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
          <Row align="middle" key={scheme.id} className={classes.scheme}>
            <Col flex={1}>
              <Text className={classes.name} ellipsis>
                {scheme.name}
              </Text>
            </Col>
            <Col>
              <Button onClick={() => connectScheme(scheme.id)}>
                <FormattedMessage id="+vVZ/G" defaultMessage="Connect" />
              </Button>
            </Col>
          </Row>
        ))}
    </div>
  );
};

export default ConnectScheme;
