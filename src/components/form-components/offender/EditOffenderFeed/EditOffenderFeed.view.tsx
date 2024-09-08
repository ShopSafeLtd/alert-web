import type { EditOffenderQuery } from '#/components/form-components/offender/EditOffenderFeed/graphql/query/__generated__/edit-offender.generated';
import type { OffenderSettingsType } from '#/types/DataType';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import OffenderFormDetails from '#/components/form-components/offender/OffenderForm/OffenderFormDetails.view';
import { Button, Col, Form, Input, Row, Select, Skeleton } from 'antd';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useEditOffenderFeed';

interface Props {
  adminRights: boolean;
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  data: EditOffenderQuery | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  needJustification: boolean;
  offenderSettings: OffenderSettingsType | undefined;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
}

const EditOffender = ({
  adminRights,
  customGalleries,
  customGalleriesLoading,
  data,
  groups,
  loading,
  needJustification,
  offenderSettings,
  onClose,
  onSubmit,
  saving,
  tags,
  tagsLoading,
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
          form={form}
          initialValues={{
            age: data?.offender?.age || null,
            ageCheck: !!data?.offender?.dateOfBirth,
            alias: data?.offender?.alias || [],
            build: data?.offender?.build || null,
            comment: data?.offender?.comment || '',
            customGalleries:
              data?.offender?.customGalleries &&
              data.offender.customGalleries.length > 0
                ? data.offender.customGalleries.map(({ id }) => id)
                : [],
            dateOfBirth: data?.offender?.dateOfBirth
              ? moment(data?.offender?.dateOfBirth, 'YYYY-MM-DD')
              : null,
            dateSource: data?.offender?.dateSource || null,
            gender: data?.offender?.gender || null,
            groups:
              data?.offender?.groups && data?.offender?.groups.length > 0
                ? data?.offender?.groups.map(({ id }) => id)
                : [],
            hair: data?.offender?.hair || null,
            height: data?.offender?.height || null,
            idSource: data?.offender?.idSource,
            idVerified: data?.offender?.idVerified || undefined,
            infoSource: data?.offender?.infoSource || '',
            justification: data?.offender?.justification || '',
            knownFor: data?.offender?.knownFor || [],
            name: data?.offender?.name || null,
            peculiarities: data?.offender?.peculiarities || null,
            race: data?.offender?.race || null,
            tags:
              data?.offender?.tags && data?.offender?.tags.length > 0
                ? data?.offender?.tags.map(({ id }) => id)
                : [],
            targetedGoods: data?.offender?.targetedGoods || [],
          }}
          layout="vertical"
          onFinish={onSubmit}
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
                  label={intl.formatMessage({
                    defaultMessage: 'Offender Warnings',
                  })}
                  name="tags"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any warning labels that are relevant to this offender or add your own.',
                  })}
                >
                  <Select
                    disabled={saving}
                    loading={tagsLoading}
                    maxTagCount={2}
                    mode="multiple"
                    optionFilterProp="label"
                  >
                    {tags.map((tag) => (
                      <Select.Option
                        key={tag.value}
                        label={tag.label}
                        value={tag.value}
                      >
                        {tag.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Custom Galleries',
                  })}
                  name="customGalleries"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any custom galleries that are relevant to this offender or add your own.',
                  })}
                >
                  <Select
                    disabled={saving}
                    loading={customGalleriesLoading}
                    maxTagCount={2}
                    mode="multiple"
                    optionFilterProp="label"
                  >
                    {customGalleries.map((el) => (
                      <Select.Option
                        key={el.value}
                        label={el.label}
                        value={el.value}
                      >
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
                  label={intl.formatMessage({
                    defaultMessage: 'Groups',
                  })}
                  name="groups"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please select at least one group for the offender.',
                      }),
                      required: true,
                    },
                  ]}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the groups that you would like this offender to be visible to.',
                  })}
                >
                  <GroupsSelect
                    disabled={saving}
                    maxTagCount="responsive"
                    mode="multiple"
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
          {data?.offender.knownFor && data?.offender.knownFor.length > 0 && (
            <Row>
              <Col span={24}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Incident Types',
                  })}
                  name="knownFor"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the relevant incident types for this offender, these help to categorize the offender.',
                  })}
                >
                  <Select disabled={saving} maxTagCount={3} mode="multiple">
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
                    label={intl.formatMessage({
                      defaultMessage: 'Goods',
                    })}
                    name="targetedGoods"
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        'Select the Goods that this offender stole.',
                    })}
                  >
                    <Select disabled={saving} maxTagCount={3} mode="multiple">
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
                  label={intl.formatMessage({
                    defaultMessage: 'Information Source',
                  })}
                  name="infoSource"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      // eslint-disable-next-line
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
                  label={intl.formatMessage({
                    defaultMessage: 'Justification',
                  })}
                  name="justification"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a justification for the offender.',
                      }),
                      required: needJustification,
                    },
                  ]}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      // eslint-disable-next-line
                      "Enter a justification to explain why this offender doesn't connect with an incident.",
                  })}
                >
                  <Input.TextArea disabled={saving} />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Form.Item>
            <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
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
                  htmlType="submit"
                  loading={saving}
                  type="primary"
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
