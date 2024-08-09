import React from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import type { Scheme } from 'state';
import { useIntl } from 'react-intl';
import { CrimeType, TagType } from 'graphql/types';
import { ListSchemeTagsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/__generated__/list-tags.generated';


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
                'Incident types are used to categorize incidents that are submitted by members.',
            })}
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the new incident type.',
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
                  defaultMessage: 'Incident Type Category',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select a category for the new incident type.',
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
                      }),
                    },
                    {
                      value: CrimeType.CriminalDamage,
                      label: intl.formatMessage({
                        defaultMessage: 'Criminal Damage',
                      }),
                    },
                    {
                      value: CrimeType.Drugs,
                      label: intl.formatMessage({
                        defaultMessage: 'Drugs',
                      }),
                    },
                    {
                      value: CrimeType.FraudForgery,
                      label: intl.formatMessage({
                        defaultMessage: 'Fraud & Forgery',
                      }),
                    },
                    {
                      value: CrimeType.Robbery,
                      label: intl.formatMessage({
                        defaultMessage: 'Robbery',
                      }),
                    },
                    {
                      value: CrimeType.SexualOffences,
                      label: intl.formatMessage({
                        defaultMessage: 'Sexual Offences',
                      }),
                    },
                    {
                      value: CrimeType.TheftHandling,
                      label: intl.formatMessage({
                        defaultMessage: 'Theft & Handling',
                      }),
                    },
                    {
                      value: CrimeType.Violence,
                      label: intl.formatMessage({
                        defaultMessage: 'Violence Against The Person',
                      }),
                    },
                    {
                      value: CrimeType.Other,
                      label: intl.formatMessage({
                        defaultMessage: 'Other',
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
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please select at least one scheme.',
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
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              {intl.formatMessage({ defaultMessage: 'Create' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddCrimeType;
