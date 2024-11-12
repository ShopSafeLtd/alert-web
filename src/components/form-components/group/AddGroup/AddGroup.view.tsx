import type { SelectOptions } from 'types/DataType';

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
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddGroup';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;

  setSelectedUsers: (value: string[]) => void;
  setShowOffenderSettings: (value: boolean) => void;
  showOffenderSettings: boolean;
  usersData: SelectOptions[] | undefined;
  usersLoading: boolean;
}

const AddGroup = ({
  onClose,
  onSubmit,
  saving,

  setSelectedUsers,
  setShowOffenderSettings,
  showOffenderSettings,
  usersData,
  usersLoading,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Name',
            })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the new group.',
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
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a description for the new group.',
                }),
                required: true,
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
            label={intl.formatMessage({
              defaultMessage: 'Users',
            })}
            name="users"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select at least one user for the new group.',
                }),
                required: true,
              },
            ]}
          >
            <Select
              disabled={saving}
              filterOption
              loading={usersLoading}
              maxTagCount={3}
              mode="multiple"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              onChange={(value) => setSelectedUsers(value)}
              optionFilterProp="label"
              options={usersData}
            />
          </Form.Item>
        </Col>
      </Row>
      {/* {selectedUsers && selectedUsers.length > 0 && ( */}
      {/*   <Row gutter={16}> */}
      {/*     <Col span={24}> */}
      {/*       <Form.Item */}
      {/*         name="approvers" */}
      {/*         label={intl.formatMessage({ */}
      {/*           defaultMessage: 'Approvers', */}
      {/*         })} */}
      {/*       > */}
      {/*         <Select */}
      {/*           loading={usersLoading} */}
      {/*           disabled={saving} */}
      {/*           mode="multiple" */}
      {/*           maxTagCount={3} */}
      {/*           options={adminUsersData?.filter(({ value }) => */}
      {/*             selectedUsers.includes(value) */}
      {/*           )} */}
      {/*           optionFilterProp="label" */}
      {/*           optionLabelProp="label" */}
      {/*         /> */}
      {/*       </Form.Item> */}
      {/*     </Col> */}
      {/*   </Row> */}
      {/* )} */}

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
            checked={showOffenderSettings}
            disabled={saving}
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
                valuePropName="checked"
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
