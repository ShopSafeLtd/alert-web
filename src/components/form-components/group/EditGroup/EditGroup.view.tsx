import React from 'react';
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
import type { SelectOptions } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { FormData } from './useEditGroup';
import type { GroupQuery } from 'graphql/group/queries/group.generated';

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data: GroupQuery | undefined;
  loading: boolean;
  usersData: SelectOptions[] | undefined;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
  showOffenderSettings: boolean;
  setShowOffenderSettings: (value: boolean) => void;
}

const EditGroup = ({
  onSubmit,
  onClose,
  data,
  loading,
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

  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        name: data?.group?.name,
        description: data?.group?.description,
        users:
          data?.group?.users && data.group.users.length > 0
            ? data.group.users.map(({ id }) => id)
            : [],
        approvers:
          data?.group?.approver && data.group.approver.length > 0
            ? data.group.approver.map(({ id }) => id)
            : [],
        showName: data?.group.offenderSettings?.name || true,
        showAlias: data?.group.offenderSettings?.alias || true,
        showEthnicity: data?.group.offenderSettings?.ethnicity || true,
        showGender: data?.group.offenderSettings?.gender || true,
        showBuild: data?.group.offenderSettings?.build || true,
        showHeight: data?.group.offenderSettings?.height || true,
        showHair: data?.group.offenderSettings?.hair || true,
        showAge: data?.group.offenderSettings?.age || true,
        showDateOfBirth: data?.group.offenderSettings?.dateOfBirth || true,
        showDateOfBirthSource:
          data?.group.offenderSettings?.dateOfBirthSource || true,
        showIdVerified: data?.group.offenderSettings?.idVerified || true,
        showPeculiarities: data?.group.offenderSettings?.peculiarities || true,
        showComment: data?.group.offenderSettings?.comment || true,
        showImages: data?.group.offenderSettings?.images || true,
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="name"
            label={intl.formatMessage({
              defaultMessage: 'Name',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the group.',
                }),
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
            name="description"
            label={intl.formatMessage({
              defaultMessage: 'Description',
            })}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
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
          <Col span={23}>
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
              defaultMessage: 'Control Offender Settings',
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
