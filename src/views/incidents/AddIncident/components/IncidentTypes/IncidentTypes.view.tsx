import type { IncidentFormState } from '#/views/incidents/AddIncident/useAddIncident';
import type { ListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';

import { Card, Col, Form, Row, Typography } from 'antd';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import { IncidentFormField, TagType } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from '../../AddIncident.styles';

const { Paragraph, Title } = Typography;

interface Props {
  incidentForm: IncidentFormState;
  incidentTagsData: ListIncidentTagsQuery | undefined;
  incidentTagsLoading: boolean;
  incidentTypeTooltip?: null | string;
  involvedMetadata?: { [key: string]: string }[];
  oneSelectedIncidentTypeOnly: boolean;
  tags: { label: string; tooltip: string; type: TagType; value: string }[];
  tagsLoading: boolean;
}

const IncidentTypes = ({
  incidentForm,
  incidentTagsData,
  incidentTagsLoading,
  incidentTypeTooltip,
  involvedMetadata,
  oneSelectedIncidentTypeOnly,
  tags,
  tagsLoading,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card className={classes.card}>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'What incident are you reporting?',
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
              defaultMessage: '- Select the types that apply to this incident.',
            })}
          </Paragraph>
        </Col>
      </Row>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Incident Type',
        })}
        name="tags"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please add at least one incident type.',
            }),
            required: true,
          },
        ]}
        shouldUpdate
        tooltip={
          incidentTypeTooltip ||
          intl.formatMessage({
            defaultMessage:
              'Select the relevant incident type; this helps to categorise the incident',
          })
        }
      >
        <CheckTags
          loading={incidentTagsLoading}
          mode={oneSelectedIncidentTypeOnly ? 'radio' : 'check'}
          options={incidentTagsData?.listIncidentTags || []}
        />
      </Form.Item>
      {incidentForm.map((f) => f.type).includes(IncidentFormField.Involved) && (
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Did this incident involve any of the following?',
          })}
          name="involvedTags"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Please select an option for this field',
              }),
              required: true,
            },
          ]}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Select the relevant incident types for this incident, these help to categorize the incident.',
          })}
        >
          <CheckTags
            loading={tagsLoading}
            mode={
              involvedMetadata?.at(0)?.mode === 'SINGLE_SELECT'
                ? 'radio'
                : 'check'
            }
            options={tags.filter(
              (item) => item.type === TagType.IncidentInvolved
            )}
          />
        </Form.Item>
      )}
      {incidentForm.map((f) => f.type).includes(IncidentFormField.Impact) && (
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'How did this make you feel?',
          })}
          name="fellingTags"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Please select an option for this field',
              }),
              required: true,
            },
          ]}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Select the relevant incident types for this incident, these help to categorize the incident.',
          })}
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
