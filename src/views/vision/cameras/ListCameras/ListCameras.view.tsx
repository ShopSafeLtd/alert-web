import type {
  CameraList,
  DeafultTimeoutForm,
} from '#/views/vision/cameras/ListCameras/useListCameras';
import type { FormInstance } from 'antd';

import { EditOutlined } from '@ant-design/icons';
import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import DebouncedInput from '#/utils/debounced-input';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  PageHeader,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const ListCamerasView = ({
  data,
  loading,
  search: _,
  setSearch,
  page,
  pageSize,
  total,
  onPageChange,
  defaultTimeout,
  loadingDefault,
  drawerVisible,
  form,
  submitting,
  handleEditClick,
  handleDrawerClose,
  handleFormSubmit,
}: {
  data: CameraList[];
  loading: boolean;
  search?: string;
  setSearch: (value: string | null) => void;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
  defaultTimeout?: string;
  loadingDefault: boolean;
  onUpdateDefaultTimeout: (values: DeafultTimeoutForm) => Promise<void>;
  drawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
  form: FormInstance<DeafultTimeoutForm>;
  submitting: boolean;
  handleEditClick: () => void;
  handleDrawerClose: () => void;
  handleFormSubmit: () => void;
}) => {
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div>
      <PageHeader
        extra={[
          <PermissionCheckWrapper
            key="create-button"
            permission={{
              method: PermissionMethod.Read,
              model: PermissionModel.VisionAi,
            }}
            unauthorizedElement={<div />}
          >
            <Button key="1" onClick={() => navigate('add')} type="primary">
              <FormattedMessage defaultMessage="Create Camera" />
            </Button>
          </PermissionCheckWrapper>,
        ]}
        title={<FormattedMessage defaultMessage="Connected Cameras" />}
      />
      <Card
        loading={loadingDefault}
        style={{
          margin: `${[0, 16, 16, 16].join('px ')}px`,
        }}
        title={<FormattedMessage defaultMessage="Scheme Default Timeout" />}
        extra={
          <PermissionCheckWrapper
            permission={{
              method: PermissionMethod.Write,
              model: PermissionModel.VisionAi,
            }}
            unauthorizedElement={<div />}
          >
            <Button
              icon={<EditOutlined />}
              onClick={handleEditClick}
              size="small"
            >
              <FormattedMessage defaultMessage="Edit" />
            </Button>
          </PermissionCheckWrapper>
        }
      >
        <Typography.Text
          strong
          style={{
            marginRight: 8,
          }}
        >
          <FormattedMessage defaultMessage="Default Duplicate Match Timeout: " />
        </Typography.Text>
        <Typography.Text>{defaultTimeout}</Typography.Text>
      </Card>

      <Card
        bodyStyle={{
          padding: 0,
        }}
        style={{
          margin: `${[0, 16, 16, 16].join('px ')}px`,
        }}
      >
        <Row gutter={8} style={{ padding: 16 }}>
          <Col span={6}>
            <DebouncedInput
              allowClear
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for camera...',
              })}
              size="small"
              onChange={(event) => {
                setSearch(event.target.value || null);
              }}
            />
          </Col>
        </Row>
        <Table
          loading={loading}
          columns={[
            {
              dataIndex: 'status',
              key: 'status',
              render: (value) => (
                <Typography.Text
                  type={value === 'Online' ? 'success' : 'danger'}
                >
                  {value}
                </Typography.Text>
              ),
              title: <FormattedMessage defaultMessage="Status" />,
            },
            {
              dataIndex: 'serialNumber',
              key: 'serialNumber',
              title: <FormattedMessage defaultMessage="Serial Number" />,
            },
            {
              dataIndex: 'business',
              key: 'business',
              title: <FormattedMessage defaultMessage="Business" />,
            },
            {
              dataIndex: 'make',
              key: 'make',
              title: <FormattedMessage defaultMessage="Make" />,
            },
            {
              dataIndex: 'model',
              key: 'model',
              title: <FormattedMessage defaultMessage="Model" />,
            },
            {
              dataIndex: 'lastUploaded',
              key: 'lastUploaded',
              title: <FormattedMessage defaultMessage="Last Uploaded" />,
            },
            {
              dataIndex: 'actions',
              key: 'actions',
              render: (_, record: CameraList) => (
                <Space>
                  <Button
                    onClick={() => navigate(`edit/${record.id}/`)}
                    size="small"
                  >
                    <FormattedMessage defaultMessage="Edit" />
                  </Button>
                </Space>
              ),
            },
          ]}
          dataSource={data}
          pagination={{
            current: page,
            pageSize,
            total,
            hideOnSinglePage: true,
            showTotal: (totalCount) => `Total ${totalCount} cameras`,
            onChange: onPageChange,
          }}
          size="small"
        />
      </Card>

      <Drawer
        title={<FormattedMessage defaultMessage="Edit Default Timeout" />}
        open={drawerVisible}
        onClose={handleDrawerClose}
        width={500}
        footer={
          <Space style={{ float: 'right' }}>
            <Button onClick={handleDrawerClose}>
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
            <Button
              type="primary"
              loading={submitting}
              onClick={handleFormSubmit}
            >
              <FormattedMessage defaultMessage="Save" />
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={<FormattedMessage defaultMessage="Default Timeout" />}
          >
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  name="hours"
                  noStyle
                  rules={[
                    { required: true, message: '' },
                    { type: 'number', min: 0, max: 99, message: '' },
                  ]}
                >
                  <Input
                    type="number"
                    min={0}
                    max={99}
                    addonAfter={<FormattedMessage defaultMessage="Hours" />}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="minutes"
                  noStyle
                  rules={[
                    { required: true, message: '' },
                    { type: 'number', min: 0, max: 59, message: '' },
                  ]}
                >
                  <Input
                    type="number"
                    min={0}
                    max={59}
                    addonAfter={<FormattedMessage defaultMessage="Minutes" />}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="seconds"
                  noStyle
                  rules={[
                    { required: true, message: '' },
                    { type: 'number', min: 0, max: 59, message: '' },
                  ]}
                >
                  <Input
                    type="number"
                    min={0}
                    max={59}
                    addonAfter={<FormattedMessage defaultMessage="Seconds" />}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item name="updateAllWithDefault" valuePropName="checked">
            <Checkbox>
              <FormattedMessage defaultMessage="Update all cameras with this default timeout" />
            </Checkbox>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ListCamerasView;
