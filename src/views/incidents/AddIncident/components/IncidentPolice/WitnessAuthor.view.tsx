import type { UserContactQuery } from '#/views/incidents/AddIncident/components/IncidentPolice/graphql/queries/__generated__/get-contact.generated';
import type { Dayjs } from 'dayjs';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useUpsertContactMutation } from '#/views/incidents/AddIncident/components/IncidentPolice/graphql/mutations/__generated__/upsert-contact.generated';
import {
  UserContactDocument,
  useUserContactQuery,
} from '#/views/incidents/AddIncident/components/IncidentPolice/graphql/queries/__generated__/get-contact.generated';
import {
  CheckCircleFilled,
  UserOutlined,
  WarningFilled,
} from '@ant-design/icons';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

dayjs.extend(customParseFormat);

interface FormData {
  address: string;
  dob?: Dayjs;
  dobPlace?: string;
  email: string;
  formerName?: string;
  gender: string;
  height?: string;
  homeTel?: string;
  mobileTel: string;
  name: string;
  occupation?: string;
  placeOfBirth?: string;
  postcode: string;
  prefContact?: string;
  workTel?: string;
}

const isWitnessDataComplete = (
  contact: UserContactQuery['userContact']
): boolean => {
  if (!contact) return false;

  // Check all required fields
  const requiredFields = [
    contact.gender,
    contact.mobileTel,
    contact.dobPlace,
    contact.address,
    contact.postcode,
  ];

  return requiredFields.every((field) => field && field.trim().length > 0);
};

const getMissingFieldsCount = (
  contact: UserContactQuery['userContact']
): number => {
  if (!contact) return 5; // All required fields missing (gender, mobileTel, dobPlace, address, postcode)

  const requiredFields = [
    contact.gender,
    contact.mobileTel,
    contact.dobPlace,
    contact.address,
    contact.postcode,
  ];

  return requiredFields.filter((field) => !field || field.trim().length === 0)
    .length;
};

const parseDobPlace = (
  dobPlace: null | string | undefined
): { dob: Dayjs | null; placeOfBirth: string } => {
  if (!dobPlace) return { dob: null, placeOfBirth: '' };

  // Expected format: "DD/MM/YYYY - Place" or "DD/MM/YYYY Place"
  const match = dobPlace.match(/^((?:\d{2}\/){2}\d{4})\s*-?\s*(.*)$/);
  if (match) {
    const [, dateStr, place] = match;
    try {
      // Parse DD/MM/YYYY format using dayjs
      const date = dayjs(dateStr, 'DD/MM/YYYY');
      if (date.isValid()) {
        return { dob: date, placeOfBirth: place.trim() };
      }
      return { dob: null, placeOfBirth: dobPlace };
    } catch {
      return { dob: null, placeOfBirth: dobPlace };
    }
  }

  // Fallback: treat entire string as place
  return { dob: null, placeOfBirth: dobPlace };
};

const WitnessAuthorView = ({ detailsExist }: { detailsExist: () => void }) => {
  const [saving, setSaving] = useState(false);
  const [creatingWitness, setCreatingWitness] = useState(false);
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const email = useAtomValue(currentUserAtom)?.email ?? '';
  const userId = useAtomValue(currentUserAtom)?.id ?? '';
  const fullName = useAtomValue(currentUserAtom)?.fullName ?? '';
  const { data, loading } = useUserContactQuery();
  const [upsertContact] = useUpsertContactMutation({
    update: (store, result) => {
      result.data &&
        result.data.upsertContact.user &&
        store.writeQuery<UserContactQuery>({
          data: {
            userContact: {
              ...result.data.upsertContact,
              user: {
                ...result.data.upsertContact.user,
              },
            },
          },
          query: UserContactDocument,
        });
    },
  });

  const isComplete = data?.userContact
    ? isWitnessDataComplete(data.userContact)
    : false;
  const missingFieldsCount = getMissingFieldsCount(data?.userContact);

  const onFinish = (values: FormData) => {
    setSaving(true);
    const { dob, email: __, name: _, placeOfBirth, ...rest } = values;

    // Combine dob and placeOfBirth into dobPlace format
    let dobPlace = '';
    if (dob && placeOfBirth) {
      const formattedDate = dob.format('DD/MM/YYYY');
      dobPlace = `${formattedDate} - ${placeOfBirth}`;
    } else if (placeOfBirth) {
      dobPlace = placeOfBirth;
    }

    void upsertContact({
      onCompleted: () => {
        setSaving(false);
        setCreatingWitness(false);
      },
      onError: () => {
        setSaving(false);
      },
      variables: {
        data: {
          ...rest,
          dobPlace,
          id: data?.userContact?.id || undefined,
          userId,
        },
      },
    });
  };
  useEffect(() => {
    if (data?.userContact && isWitnessDataComplete(data.userContact)) {
      detailsExist();
    }
  }, [data, detailsExist]);

  return (
    <>
      <div>
        <Card
          bodyStyle={{ padding: 10 }}
          onClick={() => {
            if (!loading) setCreatingWitness(true);
          }}
          style={{
            borderColor:
              data?.userContact && !isComplete ? '#faad14' : 'lightgray',
            borderWidth: 2,
            cursor: 'pointer',
            width: 200,
          }}
        >
          {data?.userContact ? (
            <Row align="middle" gutter={8}>
              <Col>
                <Avatar>
                  {data.userContact.user?.fullName
                    ? data.userContact.user?.fullName[0]
                    : ''}
                </Avatar>
              </Col>
              <Col flex="auto">
                <Typography.Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  {data.userContact.user?.fullName}
                </Typography.Text>
              </Col>
              <Col>
                {isComplete ? (
                  <CheckCircleFilled
                    style={{ color: '#52c41a', fontSize: 20 }}
                  />
                ) : (
                  <Badge
                    count={missingFieldsCount}
                    style={{ backgroundColor: '#faad14' }}
                  >
                    <WarningFilled style={{ color: '#faad14', fontSize: 20 }} />
                  </Badge>
                )}
              </Col>
            </Row>
          ) : (
            <Row align="middle" gutter={8}>
              <Col>
                <Avatar icon={<UserOutlined />} />
              </Col>
              <Col>
                {loading ? (
                  <Typography.Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Loading...' })}
                  </Typography.Text>
                ) : (
                  <Typography.Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Create Witness' })}
                  </Typography.Text>
                )}
              </Col>
            </Row>
          )}
        </Card>

        {/* Warning Alert for Incomplete Data */}
        {data?.userContact && !isComplete && (
          <Alert
            banner
            message={intl.formatMessage(
              {
                defaultMessage:
                  'Incomplete details - {count} required {count, plural, one {field} other {fields}} missing',
              },
              { count: missingFieldsCount }
            )}
            showIcon
            style={{ marginTop: 8, width: 200 }}
            type="warning"
          />
        )}
      </div>
      <Drawer
        destroyOnClose
        onClose={() => setCreatingWitness(false)}
        open={creatingWitness}
        title={
          data?.userContact
            ? isComplete
              ? intl.formatMessage({ defaultMessage: 'Update Witness Details' })
              : intl.formatMessage(
                  {
                    defaultMessage:
                      'Complete Witness Details ({count} required {count, plural, one {field} other {fields}} missing)',
                  },
                  { count: missingFieldsCount }
                )
            : intl.formatMessage({ defaultMessage: 'Create Witness Details' })
        }
        width="900"
      >
        <Form<FormData>
          form={form}
          initialValues={{
            address: data?.userContact?.address,
            ...parseDobPlace(data?.userContact?.dobPlace),
            email,
            formerName: data?.userContact?.formerName,
            gender: data?.userContact?.gender,
            height: data?.userContact?.height,
            homeTel: data?.userContact?.homeTel,
            mobileTel: data?.userContact?.mobileTel,
            name: fullName,
            occupation: data?.userContact?.occupation,
            postcode: data?.userContact?.postcode,
            prefContact: data?.userContact?.prefContact,
            workTel: data?.userContact?.workTel,
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Name' })}
                name="name"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter a name for the witness.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Former Name (if applicable)',
                })}
                name="formerName"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Email' })}
                name="email"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter an email for the witness.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Occupation' })}
                name="occupation"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Height' })}
                name="height"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Gender' })}
                name="gender"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please select a gender.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Select disabled={saving}>
                  <Select.Option value="male">
                    {intl.formatMessage({ defaultMessage: 'Male' })}
                  </Select.Option>
                  <Select.Option value="female">
                    {intl.formatMessage({ defaultMessage: 'Female' })}
                  </Select.Option>
                  <Select.Option value="other">
                    {intl.formatMessage({ defaultMessage: 'Other' })}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Date of Birth',
                })}
                name="dob"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter your date of birth.',
                    }),
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  disabled={saving}
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Place of Birth',
                })}
                name="placeOfBirth"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter your place of birth.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input
                  disabled={saving}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'e.g., London, UK',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Home Address' })}
                name="address"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter an address.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input.TextArea
                  autoComplete="off"
                  autoSize={{ maxRows: 6, minRows: 2 }}
                  disabled={saving}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Home address',
                  })}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Postcode' })}
                name="postcode"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter a postcode.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Home Phone no.' })}
                name="homeTel"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Work Phone no.' })}
                name="workTel"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Mobile Phone no.',
                })}
                name="mobileTel"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter a mobile number.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Preferred Means of Contact',
                })}
                name="prefContact"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={10} justify="end" style={{ marginTop: 10 }}>
            <Col>
              <Button
                disabled={saving}
                onClick={() => setCreatingWitness(false)}
              >
                {intl.formatMessage({ defaultMessage: 'Cancel' })}
              </Button>
            </Col>
            <Col>
              <Button disabled={saving} htmlType={'submit'} type="primary">
                {data?.userContact
                  ? intl.formatMessage({ defaultMessage: 'Update Witness' })
                  : intl.formatMessage({ defaultMessage: 'Create Witness' })}
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default WitnessAuthorView;
