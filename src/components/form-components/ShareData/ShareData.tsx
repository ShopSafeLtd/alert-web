/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStoreState } from 'state';
import {
  Button,
  Checkbox,
  Col,
  Form,
  notification,
  Row,
  Typography,
} from 'antd';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import {
  SortOrder,
  useSchemeGroupsQuery,
  useShareDataMutation,
} from 'graphql/generated';

const useStyles = createUseStyles((theme: Theme) => ({
  scheme: {
    padding: '10px 20px',
    borderBottom: `1px solid ${theme.borderColor}`,
  },
  name: {
    width: '100%',
    flex: 1,
  },
  page: {
    padding: 20,
    width: '100%',
  },
}));

const { Text } = Typography;

interface FormData {
  groups: string[];
}

interface Props {
  onClose: () => void;
  incidentId?: string;
  offenderId?: string;
}

const ShareData = ({ onClose, offenderId, incidentId }: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  const connectedToSchemes = useStoreState(
    (state) => state.scheme.connectedToSchemes
  );

  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);

  const { data } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: selectedScheme,
          },
        },
      },
      orderBy: {
        name: SortOrder.Desc,
      },
    },
    skip: selectedScheme === null,
  });

  const [shareData] = useShareDataMutation({
    onCompleted: () =>
      notification.success({
        message: intl.formatMessage({
          id: 'R2O2MA',
          defaultMessage: 'Item Shared',
        }),
        description: intl.formatMessage({
          id: '1s8byF',
          defaultMessage:
            'Item has been successfully shared with the other scheme.',
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
          <Row align="middle" key={scheme.id} className={classes.scheme}>
            <Col flex={1}>
              <Text className={classes.name} ellipsis>
                {scheme.name}
              </Text>
            </Col>
            <Col>
              <Button onClick={() => setSelectedScheme(scheme.id)}>
                <FormattedMessage id="kQAf2d" defaultMessage="Select" />
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
                id: 'Xis7st',
              })}
              name="groups"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'kylRsq',
                    defaultMessage: 'Select at least one group',
                  }),
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
              <Row justify="end" gutter={16}>
                <Col>
                  <Button onClick={onClose}>
                    <FormattedMessage id="rbrahO" defaultMessage="Close" />
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
                    <FormattedMessage id="OKhRC6" defaultMessage="Share" />
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
