import React from 'react';
import { Button, Col, Form, Input, Radio, Row, Select, Skeleton } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import DebounceSelect from 'components/form-components/DebounceSelect';
import DatePicker from 'components/util-components/DatePicker';
import type { FormData } from './useEditIncidentFeed';
import type { EditIncidentFeedQuery } from 'graphql/incidents/queries/edit-incident-feed.generated';
import { IncidentPriority } from 'graphql/types';

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data:
    | Exclude<EditIncidentFeedQuery['incident'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  crimeTypes: { value: string; label: string }[];
  involvedTags: { value: string; label: string }[];
  impactTags: { value: string; label: string }[];
  tagsLoading: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
}

const EditGroup = ({
  onSubmit,
  onClose,
  data,
  loading,
  crimeTypes,
  impactTags,
  involvedTags,
  tagsLoading,
  groups,
  groupsLoading,
  saving,
  onSearchBusiness,
}: Props): JSX.Element => {
  const intl = useIntl();

  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        subject: data?.subject,
        customerRef: data?.customerRef,
        description: data?.description,
        date: data?.date ? new Date(data?.date) : '',

        // moment(data?.date, 'YYYY-MM-DD,HH:mm:ss'),
        business: {
          label: data?.business?.name,
          value: data?.business?.id,
        },
        policeInvolved: data?.policeInvolved || false,
        policeRef: data?.policeRef,
        policeNo: data?.policeNo,
        policeReported: data?.policeReported || false,
        priority: data?.priority || false,
        groups:
          data?.groups && data?.groups.length > 0
            ? data?.groups.map(({ id }) => id)
            : [],
        tagsCrimeTypes:
          data?.crimeTypes && data?.crimeTypes.length > 0
            ? data?.crimeTypes.map(({ id }) => id)
            : [],
        tagsInvolved:
          data?.involvedTags && data?.involvedTags.length > 0
            ? data?.involvedTags.map(({ id }) => id)
            : [],
        tagsImpact:
          data?.impactTags && data?.impactTags.length > 0
            ? data?.impactTags.map(({ id }) => id)
            : [],
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="tagsCrimeTypes"
            label={intl.formatMessage({
              defaultMessage: 'Incident Type',
            })}
            tooltip={intl.formatMessage({
              defaultMessage:
                'Select the relevant crime types for this incident, these help to categorise the incident.',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please add at least one crime type.',
                }),
              },
            ]}
          >
            <Select
              loading={tagsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={2}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for a crime type...',
              })}
            >
              {crimeTypes.map((tag) => (
                <Select.Option value={tag.value} key={tag.value}>
                  {tag.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="tagsInvolved"
            label={intl.formatMessage({
              defaultMessage: 'Aggravating Factors',
            })}
          >
            <Select
              loading={tagsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={2}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for a crime type...',
              })}
            >
              {involvedTags.map((tag) => (
                <Select.Option value={tag.value} key={tag.value}>
                  {tag.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="tagsImpact"
            label={intl.formatMessage({
              defaultMessage: 'Incident Impact',
            })}
          >
            <Select
              loading={tagsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={2}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for a crime type...',
              })}
            >
              {impactTags.map((tag) => (
                <Select.Option value={tag.value} key={tag.value}>
                  {tag.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="priority"
            label={intl.formatMessage({
              defaultMessage: 'Priority',
            })}
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
            name="date"
            label={intl.formatMessage({
              defaultMessage: 'Time & Date',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'The date and time that the incident occurred.',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please select a date for the incident.',
                }),
              },
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabled={saving}
              disabledDate={(current) =>
                current && current.getTime() > Date.now()
              }
              format="HH:mm - DD/MM/YY"
              showTime={{ showSecond: false, showNow: true }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Set Date & Time',
              })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="subject"
            label={intl.formatMessage({
              defaultMessage: 'Subject',
            })}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="customerRef"
            label={intl.formatMessage({
              defaultMessage: 'Customer Reference',
            })}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="description"
        label={intl.formatMessage({
          defaultMessage: 'Description',
        })}
        tooltip={intl.formatMessage({
          defaultMessage: 'A more detailed description of the incident.',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              defaultMessage: 'Please enter a description for the incident.',
            }),
          },
        ]}
      >
        <Input.TextArea disabled={saving} />
      </Form.Item>

      <Row>
        <Col span={24}>
          <Form.Item
            name="groups"
            label={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            tooltip={intl.formatMessage({
              defaultMessage:
                'Please select the relevant groups to report this incident to, for GDPR it is important that the data is relevant to the groups.',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please add at least one group that you would like this incident to be visible to.',
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
            name="business"
            label={intl.formatMessage({
              defaultMessage: 'Business',
            })}
          >
            <DebounceSelect
              style={{ width: '100%' }}
              showSearch
              allowClear
              disabled={saving}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for a business...',
              })}
              fetchOptions={onSearchBusiness}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            name="policeReported"
            tooltip={intl.formatMessage({
              defaultMessage: 'The incident has been reported to the police',
            })}
            label={intl.formatMessage({
              defaultMessage: 'Was this incident reported to the police?',
            })}
          >
            <Radio.Group
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
              optionType="button"
              disabled={saving}
            />
          </Form.Item>
        </Col>
        <Col span={1} />
        <Col span={11}>
          <Form.Item
            name="policeRef"
            label={intl.formatMessage({
              defaultMessage: 'Crime Ref No.',
            })}
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
            name="policeInvolved"
            tooltip={intl.formatMessage({
              defaultMessage: 'The police have been involved in the incident.',
            })}
            label={intl.formatMessage({
              defaultMessage: 'Were the police involved in this incident?',
            })}
          >
            <Radio.Group
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
              optionType="button"
              disabled={saving}
            />
          </Form.Item>
        </Col>
        <Col span={1} />
        <Col span={11}>
          <Form.Item
            name="policeNo"
            label={intl.formatMessage({
              defaultMessage: 'Officer Collar No.',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'The collar number of the officer(s) involved.',
            })}
          >
            <Input disabled={saving} style={{ width: 200 }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
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
  );
};

export default EditGroup;
