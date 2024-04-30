import React from 'react';
import type { EditOffenderQuery } from 'graphql/generated';
import { Button, Col, Form, Input, Row, Select, Skeleton } from 'antd';
import moment from 'moment';
import { useIntl } from 'react-intl';
import type { OffenderSettingsType } from '#/types/DataType';
import OffenderFormDetails from '#/components/form-components/offender/offender/OffenderForm/OffenderFormDetails.view';
import type { FormData } from './useEditOffenderFeed';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  data: EditOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  adminRights: boolean;
  needJustification: boolean;
  offenderSettings: OffenderSettingsType | undefined;
}

const EditOffender = ({
  onSubmit,
  data,
  loading,
  saving,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
  customGalleries,
  customGalleriesLoading,
  onClose,
  adminRights,
  needJustification,
  offenderSettings,
}: Props): JSX.Element => {
  const intl = useIntl();

  const [form] = Form.useForm<FormData>();
  const ageCheck = Form.useWatch('ageCheck', form);
  const idVerified = Form.useWatch('idVerified', form);

  return (
    <div className="list-view">
      {loading ? (
        <Skeleton />
      ) : (
        <Form
          onFinish={onSubmit}
          layout="vertical"
          form={form}
          initialValues={{
            name: data?.offender?.name || null,
            alias: data?.offender?.alias || [],
            age: data?.offender?.age || null,
            gender: data?.offender?.gender || null,
            race: data?.offender?.race || null,
            build: data?.offender?.build || null,
            height: data?.offender?.height || null,
            hair: data?.offender?.hair || null,
            ageCheck: !!data?.offender?.dateOfBirth,
            peculiarities: data?.offender?.peculiarities || null,
            dateOfBirth: data?.offender?.dateOfBirth
              ? moment(data?.offender?.dateOfBirth, 'YYYY-MM-DD')
              : null,
            dateSource: data?.offender?.dateSource || null,
            groups:
              data?.offender?.groups && data?.offender?.groups.length > 0
                ? data?.offender?.groups.map(({ id }) => id)
                : [],
            tags:
              data?.offender?.tags && data?.offender?.tags.length > 0
                ? data?.offender?.tags.map(({ id }) => id)
                : [],
            customGalleries:
              data?.offender?.customGalleries &&
              data.offender.customGalleries.length > 0
                ? data.offender.customGalleries.map(({ id }) => id)
                : [],
            idVerified: data?.offender?.idVerified || undefined,
            idSource: data?.offender?.idSource,
            infoSource: data?.offender?.infoSource || '',
            knownFor: data?.offender?.knownFor || [],
            targetedGoods: data?.offender?.targetedGoods || [],
            justification: data?.offender?.justification || '',
            comment: data?.offender?.comment || '',
          }}
        >
          <OffenderFormDetails
            ageCheck={ageCheck}
            idVerified={idVerified}
            offenderSettings={offenderSettings}
            saving={saving}
          />

          {adminRights && (
            <Row gutter={30}>
              <Col span={12}>
                <Form.Item
                  name="tags"
                  label={intl.formatMessage({
                    defaultMessage: 'Offender Warnings',
                    id: '1jRWJS',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any warning labels that are relevant to this offender or add your own.',
                    id: 'BwoE1F',
                  })}
                >
                  <Select
                    loading={tagsLoading}
                    disabled={saving}
                    mode="multiple"
                    maxTagCount={2}
                    optionFilterProp="label"
                  >
                    {tags.map((tag) => (
                      <Select.Option value={tag.value} label={tag.label}>
                        {tag.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="customGalleries"
                  label={intl.formatMessage({
                    defaultMessage: 'Custom Galleries',
                    id: 'bzpFEk',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any custom galleries that are relevant to this offender or add your own.',
                    id: 'Or8c6M',
                  })}
                >
                  <Select
                    loading={customGalleriesLoading}
                    disabled={saving}
                    mode="multiple"
                    maxTagCount={2}
                    optionFilterProp="label"
                  >
                    {customGalleries.map((el) => (
                      <Select.Option value={el.value} label={el.label}>
                        {el.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          {groups.length > 0 && (
            <Row>
              <Col span={24}>
                <Form.Item
                  name="groups"
                  label={intl.formatMessage({
                    defaultMessage: 'Groups',
                    id: 'hzmswI',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the groups that you would like this offender to be visible to.',
                    id: '/oJY/I',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please select at least one group for the offender.',
                        id: 'hK3zLA',
                      }),
                    },
                  ]}
                >
                  <Select
                    loading={groupsLoading}
                    disabled={saving}
                    mode="multiple"
                    maxTagCount={3}
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
          )}
          {data?.offender.knownFor && data?.offender.knownFor.length > 0 && (
            <Row>
              <Col span={24}>
                <Form.Item
                  name="knownFor"
                  label={intl.formatMessage({
                    defaultMessage: 'Crime Types',
                    id: 'Piba4q',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the relevant crime types for this offender, these help to categorize the offender.',
                    id: 'ly6B/b',
                  })}
                >
                  <Select disabled={saving} mode="multiple" maxTagCount={3}>
                    {data?.offender.knownFor.map((el) => (
                      <Select.Option key={el} value={el}>
                        {el}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          {data?.offender.targetedGoods &&
            data?.offender.targetedGoods.length > 0 && (
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="targetedGoods"
                    label={intl.formatMessage({
                      defaultMessage: 'Goods',
                      id: 'u5dS1t',
                    })}
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select the Goods that this offender stole.',
                      id: 'cjsTZ/',
                    })}
                  >
                    <Select disabled={saving} mode="multiple" maxTagCount={3}>
                      {data?.offender.targetedGoods.map((el) => (
                        <Select.Option key={el} value={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            )}
          <Row gutter={16} wrap>
            {data?.offender?.infoSource && (
              <Col span={24}>
                <Form.Item
                  name="infoSource"
                  label={intl.formatMessage({
                    defaultMessage: 'Information Source',
                    id: 'LUqHSz',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage: `Enter the information source of the offender's name`,
                    id: 'WYJoK2',
                  })}
                >
                  <Input.TextArea disabled={saving} />
                </Form.Item>
              </Col>
            )}

            {(needJustification || data?.offender.justification) && (
              <Col span={24}>
                <Form.Item
                  name="justification"
                  label={intl.formatMessage({
                    defaultMessage: 'Justification',
                    id: 'i0xkcf',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage: `Enter a justification to explain why this offender doesn't connect with an incident.`,
                    id: 'P7rUrU',
                  })}
                  rules={[
                    {
                      required: needJustification,
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a justification for the offender.',
                        id: '11rxZC',
                      }),
                    },
                  ]}
                >
                  <Input.TextArea disabled={saving} />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={10} justify="end">
              <Col>
                <Button disabled={saving} onClick={onClose}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                    id: '47FYwb',
                  })}
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Save',
                    id: 'jvo0vs',
                  })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default EditOffender;
