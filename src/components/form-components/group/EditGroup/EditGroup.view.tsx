import type { UserSelectOption } from '#/components/form-components/UsersSelect/UsersSelectFetchMore.view';
import type { GroupQuery } from 'graphql/group/queries/__generated__/group.generated';
import type { SelectOptions } from 'types/DataType';

import UsersSelectFetchMore from '#/components/form-components/UsersSelect/UsersSelectFetchMore.view';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Switch,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useEditGroup';

interface Props {
  adminUsersData: SelectOptions[] | undefined;
  data: GroupQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  onUsersOptionsChange: (options: UserSelectOption[]) => void;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
  setShowOffenderSettings: (value: boolean) => void;
  showOffenderSettings: boolean;
}

const EditGroup = ({
  adminUsersData,
  data,
  loading,
  onClose,
  onSubmit,
  onUsersOptionsChange,
  saving,
  selectedUsers,
  setSelectedUsers,
  setShowOffenderSettings,
  showOffenderSettings,
}: Props): JSX.Element => {
  const intl = useIntl();

  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        approvers:
          data?.group?.approver && data.group.approver.length > 0
            ? data.group.approver.map(({ id }) => id)
            : [],
        description: data?.group?.description,
        name: data?.group?.name,
        showAge: data?.group.offenderSettings?.age || true,
        showAlias: data?.group.offenderSettings?.alias || true,
        showBuild: data?.group.offenderSettings?.build || true,
        showComment: data?.group.offenderSettings?.comment || true,
        showDateOfBirth: data?.group.offenderSettings?.dateOfBirth || true,
        showDateOfBirthSource:
          data?.group.offenderSettings?.dateOfBirthSource || true,
        showEthnicity: data?.group.offenderSettings?.ethnicity || true,
        showGender: data?.group.offenderSettings?.gender || true,
        showHair: data?.group.offenderSettings?.hair || true,
        showHeight: data?.group.offenderSettings?.height || true,
        showIdVerified: data?.group.offenderSettings?.idVerified || true,
        showImages: data?.group.offenderSettings?.images || true,
        showName: data?.group.offenderSettings?.name || true,
        showPeculiarities: data?.group.offenderSettings?.peculiarities || true,
        users:
          data?.group?.users && data.group.users.length > 0
            ? data.group.users.map(({ id }) => id)
            : [],
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Name',
            })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the group.',
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
        <Col span={23}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Description',
            })}
            name="description"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select at a description for the group.',
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
        <Col span={23}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Users',
            })}
            name="users"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select at least one user for the group.',
                }),
                required: true,
              },
            ]}
          >
            <UsersSelectFetchMore
              disabled={saving}
              maxTagCount={3}
              mode="multiple"
              onChange={setSelectedUsers}
              onOptionsChange={onUsersOptionsChange}
              value={selectedUsers}
            />
          </Form.Item>
        </Col>
      </Row>
      {selectedUsers && selectedUsers.length > 0 && (
        <Row gutter={16}>
          <Col span={23}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Approvers',
              })}
              name="approvers"
            >
              <Select
                disabled={saving}
                maxTagCount={3}
                mode="multiple"
                optionFilterProp="label"
                optionLabelProp="label"
                options={adminUsersData?.filter(({ value }) =>
                  selectedUsers.includes(value)
                )}
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
              defaultMessage: 'Control Offender Settings',
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
  );
};

export default EditGroup;
