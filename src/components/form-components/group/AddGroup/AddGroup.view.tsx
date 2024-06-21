import React from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import type { SelectOptions } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { FormData } from './useAddGroup';

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  usersData: SelectOptions[] | undefined;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
  showOffenderSettings: boolean;
  setShowOffenderSettings: (value: boolean) => void;
}

const AddGroup = ({
  onSubmit,
  onClose,
  usersData,
  adminUsersData,
  usersLoading,
  saving,
  selectedUsers,
  setSelectedUsers,
  showOffenderSettings,
  setShowOffenderSettings,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label={intl.formatMessage({
              defaultMessage: 'Name',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the new group.',
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
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a description for the new group.',
                }),
              },
            ]}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="users"
            label={intl.formatMessage({
              defaultMessage: 'Users',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select at least one user for the new group.',
                }),
              },
            ]}
          >
            <Select
              loading={usersLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              filterOption
              optionFilterProp="label"
              options={usersData}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              onChange={(value) => setSelectedUsers(value)}
            />
          </Form.Item>
        </Col>
      </Row>
      {selectedUsers && selectedUsers.length > 0 && (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="approvers"
              label={intl.formatMessage({
                defaultMessage: 'Approvers',
              })}
            >
              <Select
                loading={usersLoading}
                disabled={saving}
                mode="multiple"
                maxTagCount={3}
                options={adminUsersData?.filter(({ value }) =>
                  selectedUsers.includes(value)
                )}
                optionFilterProp="label"
                optionLabelProp="label"
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Row gutter={16}>
        <Col>
          <Typography.Title
            level={4}
            style={{ fontSize: 15, marginBottom: 20 }}
          >
            {intl.formatMessage({
              defaultMessage: 'Show Control Offender Settings?',
            })}
          </Typography.Title>
        </Col>
        <Col flex={1}>
          <Switch
            disabled={saving}
            checked={showOffenderSettings}
            onChange={() => setShowOffenderSettings(!showOffenderSettings)}
          />
        </Col>
      </Row>

      {showOffenderSettings && (
        <>
          {/* <Row gutter={8}>
            <Col>
              <Typography.Title level={4} style={{ fontSize: 14 }}>
                {intl.formatMessage({
                  defaultMessage: 'Show Name',
                  id: 'LxDnoc',
                })}
              </Typography.Title>
            </Col>
            <Col flex={1}>
              <Form.Item
                // label={intl.formatMessage({
                //   defaultMessage: 'Show Name',
                //   id: 'LxDnoc',
                // })}
                name="showName"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                  //
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col>
              <Typography.Title level={4} style={{ fontSize: 14 }}>
                {intl.formatMessage({
                  defaultMessage: 'Show Alias',
                  id: 'jcV2wy',
                })}
              </Typography.Title>
            </Col>
            <Col flex={1}>
              <Form.Item
                // label={intl.formatMessage({
                //   defaultMessage: 'Show Name',
                //   id: 'LxDnoc',
                // })}
                name="showName"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                  //
                />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Name',
                })}
                name="showName"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Alias',
                })}
                name="showAlias"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Ethnicity',
                })}
                name="showEthnicity"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Gender',
                })}
                name="showGender"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Build',
                })}
                name="showBuild"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Height',
                })}
                name="showHeight"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Hair',
                })}
                name="showHair"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Age',
                })}
                name="showAge"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Date Of Birth',
                })}
                name="showDateOfBirth"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Date Of Birth Source',
                })}
                name="showDateOfBirthSource"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Id Verified',
                })}
                name="showIdVerified"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Peculiarities',
                })}
                name="showPeculiarities"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Comment',
                })}
                name="showComment"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Images',
                })}
                name="showImages"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5, marginTop: -22 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
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
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              {intl.formatMessage({
                defaultMessage: 'Create Group',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddGroup;
