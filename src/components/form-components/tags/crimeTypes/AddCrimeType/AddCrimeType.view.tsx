import React from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import type { ListSchemeTagsQuery } from 'graphql/generated';
import { CrimeType, TagType } from 'graphql/generated';
import type { Scheme } from 'state';
import { useIntl } from 'react-intl';

const { Text } = Typography;

interface FormData {
  name: string;
  description: string;
  crimeType: CrimeType;
  schemes: string[];
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  type?: TagType;
  userSchemes: Scheme[];
  schemeId: string;
  tags: ListSchemeTagsQuery | undefined;
}

const AddCrimeType = ({
  onSubmit,
  onClose,
  saving,
  type = TagType.IncidentCrimeType,
  schemeId,
  userSchemes,
  tags,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        schemes: [schemeId],
      }}
    >
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <Text type="secondary">
            {intl.formatMessage({
              defaultMessage:
                'Crime types are used to categorize incidents that are submitted by members.',
              id: 'd4sshx',
            })}
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label={intl.formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the new crime type.',
                  id: 'GnoNcT',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="description"
            label={intl.formatMessage({
              defaultMessage: 'Description',
              id: 'Q8Qw5B',
            })}
          >
            <Input.TextArea rows={10} disabled={saving} />
          </Form.Item>
        </Col>

        {type === TagType.IncidentCrimeType && (
          <>
            <Col span={24}>
              <Form.Item
                name="parentTagId"
                label={intl.formatMessage({
                  defaultMessage: 'Parent Tag',
                  id: 'wlAaAz',
                })}
              >
                <Select
                  options={tags?.listTags.tags.map((tag) => ({
                    value: tag.id,
                    label: tag.name,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="crimeType"
                label={intl.formatMessage({
                  defaultMessage: 'Crime Type Category',
                  id: 'vXvK25',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select a category for the new crime type.',
                      id: 'bav6vT',
                    }),
                  },
                ]}
              >
                <Select
                  disabled={saving}
                  options={[
                    {
                      value: CrimeType.Burglary,
                      label: intl.formatMessage({
                        defaultMessage: 'Burglary',
                        id: 'f2A9g8',
                      }),
                    },
                    {
                      value: CrimeType.CriminalDamage,
                      label: intl.formatMessage({
                        defaultMessage: 'Criminal Damage',
                        id: 'FAQLEy',
                      }),
                    },
                    {
                      value: CrimeType.Drugs,
                      label: intl.formatMessage({
                        defaultMessage: 'Drugs',
                        id: '8xjLZ0',
                      }),
                    },
                    {
                      value: CrimeType.FraudForgery,
                      label: intl.formatMessage({
                        defaultMessage: 'Fraud & Forgery',
                        id: 'zAWiMb',
                      }),
                    },
                    {
                      value: CrimeType.Robbery,
                      label: intl.formatMessage({
                        defaultMessage: 'Robbery',
                        id: 'wHRKby',
                      }),
                    },
                    {
                      value: CrimeType.SexualOffences,
                      label: intl.formatMessage({
                        defaultMessage: 'Sexual Offences',
                        id: 'znM5dX',
                      }),
                    },
                    {
                      value: CrimeType.TheftHandling,
                      label: intl.formatMessage({
                        defaultMessage: 'Theft & Handling',
                        id: 'WD3oHm',
                      }),
                    },
                    {
                      value: CrimeType.Violence,
                      label: intl.formatMessage({
                        defaultMessage: 'Violence Against The Person',
                        id: 'oOGhLO',
                      }),
                    },
                    {
                      value: CrimeType.Other,
                      label: intl.formatMessage({
                        defaultMessage: 'Other',
                        id: '/VnDMl',
                      }),
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </>
        )}
        <Col span={24}>
          <Form.Item
            name="schemes"
            label={intl.formatMessage({
              defaultMessage: 'Schemes',
              id: 'QgGevU',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please select at least one scheme.',
                  id: 'iiG8RT',
                }),
              },
            ]}
          >
            <Select
              disabled={saving}
              mode="multiple"
              options={userSchemes.map((scheme) => ({
                value: scheme.scheme.id,
                label: scheme.scheme.name,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              {intl.formatMessage({ defaultMessage: 'Create', id: 'VzzYJk' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddCrimeType;
