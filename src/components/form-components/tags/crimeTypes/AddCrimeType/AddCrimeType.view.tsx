import type { ListSchemeTagsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/__generated__/list-tags.generated';
import type { Scheme } from 'state';

import RoleSelect from '#/components/form-components/Roles/RoleSelect';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { CrimeType, TagType } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

const { Text } = Typography;

interface FormData {
  crimeType: CrimeType;
  description: string;
  name: string;
  roles: string[];
  schemes: string[];
}

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  schemeId: string;
  tags: ListSchemeTagsQuery | undefined;
  type?: TagType;
  userSchemes: Scheme[];
}

const AddCrimeType = ({
  onClose,
  onSubmit,
  saving,
  schemeId,
  tags,
  type = TagType.IncidentCrimeType,
  userSchemes: _,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form
      initialValues={{
        schemes: [schemeId],
      }}
      layout="vertical"
      onFinish={onSubmit}
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
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a name for the new incident type.',
                }),
                required: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Description',
            })}
            name="description"
          >
            <Input.TextArea disabled={saving} rows={10} />
          </Form.Item>
        </Col>

        {type === TagType.IncidentCrimeType && (
          <>
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Parent Tag',
                })}
                name="parentTagId"
              >
                <Select
                  options={tags?.listTags.tags.map((tag) => ({
                    label: tag.name,
                    value: tag.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Incident Type Category',
                })}
                name="crimeType"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select a category for the new incident type.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Select
                  disabled={saving}
                  options={[
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Burglary',
                      }),
                      value: CrimeType.Burglary,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Criminal Damage',
                      }),
                      value: CrimeType.CriminalDamage,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Drugs',
                      }),
                      value: CrimeType.Drugs,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Fraud & Forgery',
                      }),
                      value: CrimeType.FraudForgery,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Robbery',
                      }),
                      value: CrimeType.Robbery,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Sexual Offences',
                      }),
                      value: CrimeType.SexualOffences,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Theft & Handling',
                      }),
                      value: CrimeType.TheftHandling,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Violence Against The Person',
                      }),
                      value: CrimeType.Violence,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Other',
                      }),
                      value: CrimeType.Other,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Roles',
                })}
                name="roles"
              >
                <RoleSelect multi schemeId={schemeId} />
              </Form.Item>
            </Col>
          </>
        )}
        {/* <Col span={24}>*/}
        {/*  <Form.Item*/}
        {/*    label={intl.formatMessage({*/}
        {/*      defaultMessage: 'Schemes',*/}
        {/*    })}*/}
        {/*    name="schemes"*/}
        {/*    rules={[*/}
        {/*      {*/}
        {/*        message: intl.formatMessage({*/}
        {/*          defaultMessage: 'Please select at least one scheme.',*/}
        {/*        }),*/}
        {/*        required: true,*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*  >*/}
        {/*    <Select*/}
        {/*      disabled={saving}*/}
        {/*      mode="multiple"*/}
        {/*      options={userSchemes.map((scheme) => ({*/}
        {/*        label: scheme.scheme.name,*/}
        {/*        value: scheme.scheme.id,*/}
        {/*      }))}*/}
        {/*    />*/}
        {/*  </Form.Item>*/}
        {/* </Col>*/}
      </Row>

      <Form.Item>
        <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
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
