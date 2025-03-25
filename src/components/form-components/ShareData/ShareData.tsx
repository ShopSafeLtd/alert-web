/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Theme } from 'configs/ThemeConfig';

import { useShareDataMutation } from '#/components/form-components/ShareData/__generated__/share-data-mutation.generated';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Row,
  Typography,
  notification,
} from 'antd';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  name: {
    flex: 1,
    width: '100%',
  },
  page: {
    padding: 20,
    width: '100%',
  },
  scheme: {
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: '10px 20px',
  },
}));

const { Text } = Typography;

interface FormData {
  groups: string[];
}

interface Props {
  incidentId?: string;
  offenderId?: string;
  onClose: () => void;
}

const ShareData = ({ incidentId, offenderId, onClose }: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  const connectedToSchemes =
    useAtomValue(currentSchemeAtom)?.connectedToSchemes ?? [];

  const [selectedScheme, setSelectedScheme] = useState<null | string>(null);

  const { data } = useSchemeGroupsQuery({
    skip: selectedScheme === null,
    variables: {
      orderBy: {
        name: SortOrder.Desc,
      },
      where: {
        scheme: {
          id: {
            equals: selectedScheme,
          },
        },
      },
    },
  });

  const [shareData] = useShareDataMutation({
    onCompleted: () =>
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'Item has been successfully shared with the other scheme.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Item Shared',
        }),
        placement: 'bottomRight',
      }),
  });

  const onSubmitShare = async (formData: FormData) => {
    onClose();
    if (selectedScheme)
      await shareData({
        variables: {
          data: {
            connectGroups: formData.groups.map((id) => ({ id })),
            connectSchemes: [
              {
                id: selectedScheme,
              },
            ],
            incident: incidentId
              ? {
                  id: incidentId,
                }
              : undefined,
            offender: offenderId
              ? {
                  id: offenderId,
                }
              : undefined,
          },
        },
      });
  };

  return (
    <div>
      {selectedScheme === null &&
        connectedToSchemes.map((scheme) => (
          <Row align="middle" className={classes.scheme} key={scheme.id}>
            <Col flex={1}>
              <Text className={classes.name} ellipsis>
                {scheme.name}
              </Text>
            </Col>
            <Col>
              <Button onClick={() => setSelectedScheme(scheme.id)}>
                <FormattedMessage defaultMessage="Select" />
              </Button>
            </Col>
          </Row>
        ))}
      {selectedScheme && (
        <div className={classes.page}>
          <Form layout="vertical" onFinish={onSubmitShare}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Select the groups to share the incident with',
              })}
              name="groups"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Select at least one group',
                  }),
                  required: true,
                },
              ]}
            >
              <Checkbox.Group
                options={
                  data?.groups.map((group) => ({
                    label: group.name,
                    value: group.id,
                  })) || []
                }
              />
            </Form.Item>
            <Form.Item>
              <Row gutter={16} justify="end">
                <Col>
                  <Button onClick={onClose}>
                    <FormattedMessage defaultMessage="Close" />
                  </Button>
                </Col>
                <Col>
                  <Button htmlType="submit" type="primary">
                    <FormattedMessage defaultMessage="Share" />
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ShareData;
