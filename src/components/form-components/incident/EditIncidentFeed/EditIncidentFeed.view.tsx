import React from 'react';
import type { EditIncidentFeedQuery } from 'graphql/generated';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import { useIntl } from 'react-intl';
import moment from 'moment';
import DebounceSelect from 'components/form-components/DebounceSelect';
import type { FormData } from './useEditIncidentFeed';

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
        description: data?.description,
        date: moment(data?.date, 'YYYY-MM-DD,HH:mm:ss'),
        business: {
          label: data?.business?.name,
          value: data?.business?.id,
        },
        policeInvolved: data?.policeInvolved || false,
        policeRef: data?.policeRef,
        policeNo: data?.policeNo,
        policeReported: data?.policeReported || false,
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
        building: data?.location?.building,
        street: data?.location?.street,
        townCity: data?.location?.townCity,
        county: data?.location?.county,
        postcode: data?.location?.postcode,
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="tagsCrimeTypes"
            label={intl.formatMessage({
              id: '3OwM2P',
              defaultMessage: 'Incident Type',
            })}
            tooltip={intl.formatMessage({
              id: 'j/5VxV',
              defaultMessage:
                'Select the relevant crime types for this incident, these help to categorise the incident.',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'eSRsUW',
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
                id: 'y7GECT',
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
              id: 'tEuhMY',
              defaultMessage: 'Aggravating Factors',
            })}
          >
            <Select
              loading={tagsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={2}
              placeholder={intl.formatMessage({
                id: 'y7GECT',
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
              id: 'KxS/zg',
              defaultMessage: 'Incident Impact',
            })}
          >
            <Select
              loading={tagsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={2}
              placeholder={intl.formatMessage({
                id: 'y7GECT',
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
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="date"
            label={intl.formatMessage({
              id: 'rXTgTq',
              defaultMessage: 'Time & Date',
            })}
            tooltip={intl.formatMessage({
              id: '4eTajC',
              defaultMessage: 'The date and time that the incident occurred.',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'Cgy3GX',
                  defaultMessage: 'Please select a date for the incident.',
                }),
              },
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabled={saving}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
              format="HH:mm - DD/MM/YY"
              showTime={{ showSecond: false, showNow: true }}
              placeholder={intl.formatMessage({
                id: 'hQHL0E',
                defaultMessage: 'Set Date & Time',
              })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="subject"
            label={intl.formatMessage({
              id: 'LLtKhp',
              defaultMessage: 'Subject',
            })}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="description"
        label={intl.formatMessage({
          id: 'Q8Qw5B',
          defaultMessage: 'Description',
        })}
        tooltip={intl.formatMessage({
          id: 'gL4S9+',
          defaultMessage: 'A more detailed description of the incident.',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'AIkkvf',
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
              id: 'hzmswI',
            })}
            tooltip={intl.formatMessage({
              defaultMessage:
                'Please select the relevant groups to report this incident to, for GDPR it is important that the data is relevant to the groups.',
              id: 'vi+XKb',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please add at least one group that you would like this incident to be visible to.',
                  id: 'ukeLzq',
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
                id: '13MEnK',
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
              id: 'w1Fanr',
            })}
          >
            <DebounceSelect
              style={{ width: '100%' }}
              showSearch
              allowClear
              disabled={saving}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for a business...',
                id: 'qaJxSS',
              })}
              fetchOptions={onSearchBusiness}
            />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Location',
          id: 'rvirM2',
        })}
      </Typography.Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="building"
            label={intl.formatMessage({
              defaultMessage: 'Building',
              id: 'oS/nae',
            })}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="street"
            label={intl.formatMessage({
              defaultMessage: 'Street',
              id: 'BaIwdV',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a street for the incident.',
                  id: '+dEOlx',
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="townCity"
            label={intl.formatMessage({
              defaultMessage: 'Town/City',
              id: 'byaTQZ',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a town/city for the incident.',
                  id: 'A3DgcN',
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="county"
            label={intl.formatMessage({
              defaultMessage: 'County',
              id: 'B+KJhc',
            })}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="postcode"
            label={intl.formatMessage({
              defaultMessage: 'Postcode',
              id: 'FJhjgz',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a postcode for the incident.',
                  id: '2S6C4z',
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col>
          <Form.Item
            name="policeReported"
            tooltip={intl.formatMessage({
              defaultMessage: 'The incident has been reported to the police',
              id: 'hLeud7',
            })}
            label={intl.formatMessage({
              defaultMessage: 'Was this incident reported to the police?',
              id: 'dVzhQl',
            })}
          >
            <Radio.Group
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Yes',
                    id: 'a5msuh',
                  }),
                  value: true,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'No',
                    id: 'oUWADl',
                  }),
                  value: false,
                },
              ]}
              optionType="button"
              disabled={saving}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="policeRef"
            label={intl.formatMessage({
              defaultMessage: 'Crime Ref No.',
              id: 'lXj6/P',
            })}
            tooltip={intl.formatMessage({
              defaultMessage:
                'The crime reference number provided by the police.',
              id: 'tMiPZU',
            })}
          >
            <Input disabled={saving} style={{ width: 200 }} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="policeInvolved"
            tooltip={intl.formatMessage({
              defaultMessage: 'The police have been involved in the incident.',
              id: 'ymfx6F',
            })}
            label={intl.formatMessage({
              defaultMessage: 'Were the police involved in this incident?',
              id: 'hXJRLT',
            })}
          >
            <Radio.Group
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Yes',
                    id: 'a5msuh',
                  }),
                  value: true,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'No',
                    id: 'oUWADl',
                  }),
                  value: false,
                },
              ]}
              optionType="button"
              disabled={saving}
            />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="policeNo"
            label={intl.formatMessage({
              defaultMessage: 'Officer Collar No.',
              id: '6gfZFu',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'The collar number of the officer(s) involved.',
              id: 'eo8Q5+',
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
  );
};

export default EditGroup;
