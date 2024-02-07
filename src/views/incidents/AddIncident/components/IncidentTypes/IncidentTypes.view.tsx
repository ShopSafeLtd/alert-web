import React from 'react';
import { Card, Col, Form, Row, Typography } from 'antd';
import { useIntl } from 'react-intl';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import type { ListIncidentTagsQuery } from 'graphql/generated';
import { IncidentFormField, TagType } from 'graphql/generated';
import useStyles from '../../AddIncident.styles';

const { Paragraph, Title } = Typography;

interface Props {
  incidentTagsLoading: boolean;
  incidentTagsData: ListIncidentTagsQuery | undefined;
  tagsLoading: boolean;
  tags: { value: string; label: string; tooltip: string; type: TagType }[];
  incidentForm: IncidentFormField[];
  oneSelectedIncidentTypeOnly: boolean;
}

const IncidentTypes = ({
  incidentTagsLoading,
  incidentTagsData,
  tagsLoading,
  tags,
  incidentForm,
  oneSelectedIncidentTypeOnly,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card className={classes.card}>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            {intl.formatMessage({
              defaultMessage: 'What incident are you reporting?',
              id: 'hyvrCv',
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
              defaultMessage: '- Select the types that apply to this incident.',
              id: '1VKite',
            })}
          </Paragraph>
        </Col>
      </Row>
      <Form.Item
        name="tags"
        tooltip={intl.formatMessage({
          defaultMessage:
            'Select the relevant crime types for this incident, these help to categorize the incident.',
          id: 'KxHHjU',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              defaultMessage: 'Please add at least one crime type.',
              id: 'eSRsUW',
            }),
          },
        ]}
        label={intl.formatMessage({
          defaultMessage: 'Incident Type',
          id: '3OwM2P',
        })}
      >
        <CheckTags
          loading={incidentTagsLoading}
          mode={oneSelectedIncidentTypeOnly ? 'radio' : 'check'}
          options={incidentTagsData?.listIncidentTags || []}
        />
      </Form.Item>
      {incidentForm.includes(IncidentFormField.Involved) && (
        <Form.Item
          name="involvedTags"
          tooltip={intl.formatMessage({
            defaultMessage:
              'Select the relevant crime types for this incident, these help to categorize the incident.',
            id: 'KxHHjU',
          })}
          label={intl.formatMessage({
            defaultMessage: 'Did this incident involve any of the following?',
            id: 'cSg8/M',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                defaultMessage: 'Please select an option for this field',
                id: '1f5eBz',
              }),
            },
          ]}
        >
          <CheckTags
            loading={tagsLoading}
            options={tags.filter(
              (item) => item.type === TagType.IncidentInvolved
            )}
          />
        </Form.Item>
      )}
      {incidentForm.includes(IncidentFormField.Impact) && (
        <Form.Item
          name="fellingTags"
          tooltip={intl.formatMessage({
            defaultMessage:
              'Select the relevant crime types for this incident, these help to categorize the incident.',
            id: 'KxHHjU',
          })}
          label={intl.formatMessage({
            defaultMessage: 'How did this make you feel?',
            id: '05xT64',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                defaultMessage: 'Please select an option for this field',
                id: '1f5eBz',
              }),
            },
          ]}
        >
          <CheckTags
            loading={tagsLoading}
            options={tags.filter(
              (item) => item.type === TagType.IncidentImpact
            )}
          />
        </Form.Item>
      )}
    </Card>
  );
};

export default IncidentTypes;
