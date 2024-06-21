import React from 'react';

import { Button, Col, Form, Input, Row, Select, Skeleton } from 'antd';
import moment from 'moment';
import { useIntl } from 'react-intl';
import type { OffenderSettingsType } from '#/types/DataType';
import OffenderFormDetails from '#/components/form-components/offender/offender/OffenderForm/OffenderFormDetails.view';
import type { FormData } from './useEditOffenderFeed';
import type { EditOffenderQuery } from '#/components/form-components/offender/EditOffenderFeed/graphql/query/edit-offender.generated';

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
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any warning labels that are relevant to this offender or add your own.',
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
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any custom galleries that are relevant to this offender or add your own.',
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
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the groups that you would like this offender to be visible to.',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please select at least one group for the offender.',
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
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the relevant crime types for this offender, these help to categorize the offender.',
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
                    })}
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select the Goods that this offender stole.',
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
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      "Enter the information source of the offender's name",
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
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      "Enter a justification to explain why this offender doesn't connect with an incident.",
                  })}
                  rules={[
                    {
                      required: needJustification,
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a justification for the offender.',
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
