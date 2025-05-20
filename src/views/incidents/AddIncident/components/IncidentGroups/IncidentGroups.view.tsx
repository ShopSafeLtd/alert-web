import { Card, Col, Form, Row, Select, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from '../../AddIncident.styles';

const { Paragraph, Title } = Typography;

interface Props {
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  saving: boolean;
}

const IncidentGroups = ({ groups, groupsLoading, saving }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return groups.length > 1 ? (
    <Card className={classes.card}>
      <>
        <Row align="bottom" style={{ marginBottom: 20 }}>
          <Col>
            <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
              {intl.formatMessage({
                defaultMessage: 'Who is this incident relevant to?',
              })}
            </Title>
          </Col>
          <Col>
            <Paragraph
              italic
              style={{ marginBottom: 1, marginLeft: 5 }}
              type="secondary"
            >
              {intl.formatMessage({
                defaultMessage:
                  '- Please select the groups that this incident is for.',
              })}
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              name="groups"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please add at least one group that you would like this incident to be visible to.',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Please select the relevant groups to report this incident to, for GDPR it is important that the data is relevant to the groups.',
              })}
            >
              <Select
                disabled={saving}
                loading={groupsLoading}
                maxTagCount={3}
                mode="multiple"
                optionFilterProp={'label'}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select groups...',
                })}
              >
                {groups.map((group) => (
                  <Select.Option
                    key={group.value}
                    label={group.label}
                    value={group.value}
                  >
                    {group.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </>
    </Card>
  ) : null;
};

export default IncidentGroups;
