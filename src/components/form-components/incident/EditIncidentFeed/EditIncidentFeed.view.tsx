import type { FormData as AddIncidentFormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';
import type { Dayjs } from 'dayjs';
import type { EditIncidentFeedQuery } from 'graphql/incidents/queries/__generated__/edit-incident-feed.generated';
import type { CustomQuestion } from 'types/DataType/data_type';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import IncidentTypesSelect from '#/components/form-components/IncidentTypesSelect/IncidentTypesSelect.view';
import { Button, Col, Form, Input, Radio, Row, Select, Skeleton } from 'antd';
import DatePicker from 'components/util-components/DatePicker';
import { IncidentPriority } from 'graphql/types';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import IncidentCustom from 'views/incidents/AddIncident/components/IncidentCustom/IncidentCustom.view';

import type { FormData } from './useEditIncidentFeed';

import IncidentTypeChangeModal from './IncidentTypeChangeModal';

interface Props {
  customQuestions: CustomQuestion[];
  data:
    | Exclude<EditIncidentFeedQuery['incident'], null | undefined>
    | null
    | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  impactTags: { label: string; value: string }[];
  involvedTags: { label: string; value: string }[];
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  onTypesChanged: (typeIds: string[]) => void;
  saving: boolean;
  tagsLoading: boolean;
  usPoliceData?: boolean;
  // onSearchBusiness: (
  //   value: string
  // ) => Promise<{ label: React.ReactNode; value: string }[]>;
}

const EditGroup = ({
  customQuestions,
  data,
  groups,
  groupsLoading,
  impactTags,
  involvedTags,
  loading,
  onClose,
  onSubmit,
  onTypesChanged,
  saving,
  tagsLoading,
  usPoliceData,
}: // onSearchBusiness,
Props): JSX.Element => {
  const intl = useIntl();
  const [showModal, setShowModal] = useState(false);
  const [pendingIncidentTypes, setPendingIncidentTypes] = useState<string[]>(
    []
  );
  const [form] = Form.useForm();
  const [hasShownModal, setHasShownModal] = useState(false);
  const policeReported = Form.useWatch('policeReported', form) as
    | boolean
    | undefined;

  const handleIncidentTypeChange = (newValues: string | string[]) => {
    const currentValues = data?.crimeTypes?.map(({ id }) => id) || [];

    // Normalize to array for comparison
    const newValuesArray = Array.isArray(newValues)
      ? newValues
      : [newValues].filter(Boolean);

    // Check if values have actually changed
    const hasChanged =
      newValuesArray.length !== currentValues.length ||
      !newValuesArray.every((value) => currentValues.includes(value));

    if (hasChanged && currentValues.length > 0 && !hasShownModal) {
      // Show confirmation modal only if it hasn't been shown yet
      setPendingIncidentTypes(newValuesArray);
      setShowModal(true);
    } else {
      // No existing types, no change, or modal already shown - apply directly
      form.setFieldsValue({ tagsCrimeTypes: newValuesArray });
      onTypesChanged(newValuesArray);
    }
  };

  const handleModalConfirm = () => {
    form.setFieldsValue({ tagsCrimeTypes: pendingIncidentTypes });
    setShowModal(false);
    setPendingIncidentTypes([]);
    setHasShownModal(true);
    onTypesChanged(pendingIncidentTypes);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setPendingIncidentTypes([]);
  };

  return !data && loading ? (
    <Skeleton />
  ) : (
    <>
      <Form
        form={form}
        initialValues={{
          activityAuthorised: data?.activityAuthorised || false,
          business: data?.business?.id ? [data?.business?.id] : [],
          customerRef: data?.customerRef,
          date: data?.date ? new Date(data?.date) : '',

          description: data?.description,
          groups:
            data?.groups && data?.groups.length > 0
              ? data?.groups.map(({ id }) => id)
              : [],
          policeInvolved: data?.policeInvolved || false,
          policeNo: data?.policeNo,
          policeRef: data?.policeRef,
          policeReported: data?.policeReported || false,
          priority: data?.priority || false,
          subject: data?.subject,
          tagsCrimeTypes:
            data?.crimeTypes && data?.crimeTypes.length > 0
              ? data?.crimeTypes.map(({ id }) => id)
              : [],
          tagsImpact:
            data?.impactTags && data?.impactTags.length > 0
              ? data?.impactTags.map(({ id }) => id)
              : [],
          tagsInvolved:
            data?.involvedTags && data?.involvedTags.length > 0
              ? data?.involvedTags.map(({ id }) => id)
              : [],
        }}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Incident Type',
              })}
              name="tagsCrimeTypes"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please add at least one incident type.',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Select the relevant incident types for this incident, these help to categorise the incident.',
              })}
            >
              <IncidentTypesSelect
                disabled={saving}
                maxTagCount={2}
                onChange={handleIncidentTypeChange}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a incident type...',
                })}
                treeCheckable
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Aggravating Factors',
              })}
              name="tagsInvolved"
            >
              <Select
                disabled={saving}
                loading={tagsLoading}
                maxTagCount={2}
                mode="multiple"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a incident type...',
                })}
              >
                {involvedTags.map((tag) => (
                  <Select.Option key={tag.value} value={tag.value}>
                    {tag.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Incident Impact',
              })}
              name="tagsImpact"
            >
              <Select
                disabled={saving}
                loading={tagsLoading}
                maxTagCount={2}
                mode="multiple"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a incident type...',
                })}
              >
                {impactTags.map((tag) => (
                  <Select.Option key={tag.value} value={tag.value}>
                    {tag.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Priority',
              })}
              name="priority"
            >
              <Select disabled={saving}>
                <Select.Option value={IncidentPriority.Low}>
                  <FormattedMessage defaultMessage="Low" />
                </Select.Option>
                <Select.Option value={IncidentPriority.Normal}>
                  <FormattedMessage defaultMessage="Normal" />
                </Select.Option>
                <Select.Option value={IncidentPriority.Medium}>
                  <FormattedMessage defaultMessage="Medium" />
                </Select.Option>
                <Select.Option value={IncidentPriority.High}>
                  <FormattedMessage defaultMessage="High" />
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Time & Date',
              })}
              name="date"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select a date for the incident.',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The date and time that the incident occurred.',
              })}
            >
              <DatePicker
                disabled={saving}
                disabledDate={(current: Dayjs) =>
                  current && current.toDate().getTime() > Date.now()
                }
                format="HH:mm - DD/MM/YY"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Set Date & Time',
                })}
                showTime={{ showNow: true, showSecond: false }}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Subject',
              })}
              name="subject"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Customer Reference',
              })}
              name="customerRef"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Description',
          })}
          name="description"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Please enter a description for the incident.',
              }),
              required: true,
            },
          ]}
          tooltip={intl.formatMessage({
            defaultMessage: 'A more detailed description of the incident.',
          })}
        >
          <Input.TextArea disabled={saving} />
        </Form.Item>

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
                filterOption={(input, option) => {
                  const value = (option?.children ?? '') as string;
                  return value.toLowerCase().includes(input.toLowerCase());
                }}
                loading={groupsLoading}
                maxTagCount={3}
                mode="multiple"
                placeholder={intl.formatMessage({
                  defaultMessage:
                    'Select the groups that you would like this incident to be visible to.',
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

        <Row>
          <Col flex={1}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Business',
              })}
              name="business"
            >
              <BusinessesSelect
                allowClear
                disabled={saving}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a business...',
                })}
                showSearch
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Was this incident reported to the police?',
              })}
              name="policeReported"
              tooltip={intl.formatMessage({
                defaultMessage: 'The incident has been reported to the police',
              })}
            >
              <Radio.Group
                disabled={saving}
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Yes',
                    }),
                    value: true,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'No',
                    }),
                    value: false,
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={11}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Crime Ref No.',
              })}
              name="policeRef"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The crime reference number provided by the police.',
              })}
            >
              <Input disabled={saving} style={{ width: 200 }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Were the police involved in this incident?',
              })}
              name="policeInvolved"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The police have been involved in the incident.',
              })}
            >
              <Radio.Group
                disabled={saving}
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Yes',
                    }),
                    value: true,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'No',
                    }),
                    value: false,
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={11}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Officer Collar No.',
              })}
              name="policeNo"
              tooltip={intl.formatMessage({
                defaultMessage: 'The collar number of the officer(s) involved.',
              })}
            >
              <Input disabled={saving} style={{ width: 200 }} />
            </Form.Item>
          </Col>
          {policeReported && usPoliceData && (
            <>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Police Department',
                  })}
                  name="policeDepartment"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The police department handling this incident.',
                  })}
                >
                  <Input.TextArea
                    disabled={saving}
                    rows={2}
                    style={{ width: 400 }}
                  />
                </Form.Item>
              </Col>
              <Col span={1} />
              <Col span={11}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Police Officer Name',
                  })}
                  name="policeOfficerName"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The name of the police officer assigned to this case.',
                  })}
                >
                  <Input disabled={saving} style={{ width: 200 }} />
                </Form.Item>
              </Col>
            </>
          )}
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Completing activities requires authorization?',
              })}
              name="activityAuthorised"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Completing activities linked to this incident requires authorization.',
              })}
            >
              <Radio.Group
                disabled={saving}
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Yes',
                    }),
                    value: true,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'No',
                    }),
                    value: false,
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        {customQuestions.length > 0 && (
          <IncidentCustom
            form={form as unknown as FormInstance<AddIncidentFormData>}
            questions={customQuestions}
            saving={saving}
          />
        )}
        <Form.Item>
          <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
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
      <IncidentTypeChangeModal
        onCancel={handleModalCancel}
        onConfirm={handleModalConfirm}
        visible={showModal}
      />
    </>
  );
};

export default EditGroup;
