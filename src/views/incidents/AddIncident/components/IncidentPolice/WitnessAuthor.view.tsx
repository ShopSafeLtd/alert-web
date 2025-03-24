import type { UserContactQuery } from '#/views/incidents/AddIncident/components/IncidentPolice/graphql/queries/__generated__/get-contact.generated';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useUpsertContactMutation } from '#/views/incidents/AddIncident/components/IncidentPolice/graphql/mutations/__generated__/upsert-contact.generated';
import {
  UserContactDocument,
  useUserContactQuery,
} from '#/views/incidents/AddIncident/components/IncidentPolice/graphql/queries/__generated__/get-contact.generated';
import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface FormData {
  address: string;
  dobPlace: string;
  email: string;
  formerName?: string;
  gender: string;
  height?: string;
  homeTel?: string;
  mobileTel: string;
  name: string;
  occupation?: string;
  postcode: string;
  prefContact?: string;
  workTel?: string;
}

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

  const onFinish = (values: FormData) => {
    setSaving(true);
    const { email: __, name: _, ...rest } = values;
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
          id: data?.userContact?.id || undefined,
          userId,
        },
      },
    });
  };
  useEffect(() => {
    if (data?.userContact) {
      detailsExist();
    }
  }, [data]);

  return (
    <>
      <Card
        bodyStyle={{ padding: 10 }}
        onClick={() => {
          if (!loading) setCreatingWitness(true);
        }}
        style={{
          borderColor: 'lightgray',
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
            <Col>
              <Typography.Text
                style={{
                  fontSize: 16,
                }}
              >
                {data.userContact.user?.fullName}
              </Typography.Text>
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
      <Drawer
        destroyOnClose
        onClose={() => setCreatingWitness(false)}
        open={creatingWitness}
        title={
          data?.userContact
            ? intl.formatMessage({ defaultMessage: 'Update Witness' })
            : intl.formatMessage({ defaultMessage: 'Create Witness' })
        }
        width="900"
      >
        <Form<FormData>
          form={form}
          initialValues={{
            address: data?.userContact?.address,
            dobPlace: data?.userContact?.dobPlace,
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
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Date and Place of Birth',
                })}
                name="dobPlace"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter a DOB and place of birth.',
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
