import { Card, Col, Form, Row, Select, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import useStyles from '../../AddIncident.styles';

const { Title, Paragraph } = Typography;

interface Props {
  formStages: {
    crimeTypes: boolean;
    where: boolean;
    goods: boolean;
    profiles: boolean;
    images: boolean;
    police: boolean;
    details: boolean;
    groups: boolean;
  };
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  saving: boolean;
}

const IncidentGroups = ({
  groupsLoading,
  groups,
  formStages,
  saving,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    groups.length > 1 && (
      <Card
        className={classes.card}
        style={{ opacity: formStages.groups ? 1 : 0.7 }}
      >
        {!formStages.groups && <div className={classes.cardOverlay} />}
        <>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                {intl.formatMessage({
                  defaultMessage: 'Who is this incident relevant to?',
                  id: 'EeN7DX',
                })}
              </Title>
            </Col>
            <Col>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
              >
                {intl.formatMessage({
                  defaultMessage:
                    '- Please select the groups that this incident is for.',
                  id: 'gVNXsT',
                })}
              </Paragraph>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="groups"
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Please select the relevant groups to report this incident to, for GDPR it is important that the data is relevant to the groups.',
                  id: 'vi+XKb',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please add at least one group that you would like this incident to be visible to.',
                      id: 'ukeLzq',
                    }),
                  },
                ]}
              >
                <Select
                  loading={groupsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select groups...',
                    id: 'aVKXev',
                  })}
                >
                  {groups.map((group) => (
                    <Select.Option key={group.value} value={group.value}>
                      {group.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </>
      </Card>
    )
  );
};

export default IncidentGroups;
